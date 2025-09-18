import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { User } from "@supabase/supabase-js";
import { UserGroup } from "./groups";
import { Profile } from "./profiles";

interface State {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  profile: Profile | null;
  userGroups: UserGroup[];
  selectedGroup: string | null;
}

interface Actions {
  loginUser: (user: User, profile: Profile) => void;
  setUserGroups: (groups: UserGroup[], selectedGroupId?: string | null) => void;
  setSelectedGroup: (groupId: string | null) => void;
  resetPassword: () => void;
  logoutUser: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<State & Actions>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isLoading: true,
      user: null,
      profile: null,
      userGroups: [],
      selectedGroup: null,

      loginUser: async (user: User, profile: Profile) => {
        set({ 
          isAuthenticated: true, 
          user: user, 
          profile: profile,
          selectedGroup: profile.group,
          isLoading: false
        });
      },

      setUserGroups: async (groups: UserGroup[], selectedGroupId?: string | null) => {
        let newSelectedGroup = selectedGroupId;
        if (!newSelectedGroup && groups.length > 0) {
          newSelectedGroup = groups[0].group_id;
        }
        
        set({ 
          userGroups: groups,
          selectedGroup: newSelectedGroup
        });
      },

      setSelectedGroup: async (groupId: string | null) => {
        set({ selectedGroup: groupId });
      },

      resetPassword: () => {
        set({ 
          isAuthenticated: false, 
          user: null, 
          profile: null,
          userGroups: [],
          selectedGroup: null,
          isLoading: false
        });
      },

      logoutUser: () => {
        set({ 
          isAuthenticated: false, 
          user: null, 
          profile: null,
          userGroups: [],
          selectedGroup: null,
          isLoading: false
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: "echama:auth",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isLoading = false;
        }
      },
    }
  )
);

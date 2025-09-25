import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { User } from "@supabase/supabase-js";
import { Profile, Member } from "../role/profiles";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  userId: string | null;
  profile: Profile | null;
  member: Member | null;
}

interface AuthActions {
  setLoginState: (user: User, profile: Profile, member: Member) => void;
  resetPassword: () => void;
  logoutUser: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isLoading: true,
      user: null,
      userId: null,
      profile: null,
      member: null,

      setLoginState: async (user: User, profile: Profile, member: Member) => {
        set({
          isAuthenticated: true,
          user: user,
          userId: user.id,
          profile: profile,
          member: member,
          isLoading: false
        });
      },

      resetPassword: () => {
        set({
          isAuthenticated: false,
          user: null,
          userId: null,
          profile: null,
          member: null,
          isLoading: false
        });
      },

      logoutUser: () => {
        set({
          isAuthenticated: false,
          user: null,
          userId: null,
          profile: null,
          member: null,
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
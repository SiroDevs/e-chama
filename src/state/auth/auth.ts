import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { User } from "@supabase/supabase-js";
import { Profile } from "../role/profiles";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  profile: Profile | null;
}

interface AuthActions {
  loginUser: (user: User, profile: Profile) => void;
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
      profile: null,

      loginUser: async (user: User, profile: Profile) => {
        set({ 
          isAuthenticated: true, 
          user: user, 
          profile: profile,
          isLoading: false
        });
      },

      resetPassword: () => {
        set({ 
          isAuthenticated: false, 
          user: null, 
          profile: null,
          isLoading: false
        });
      },

      logoutUser: () => {
        set({ 
          isAuthenticated: false, 
          user: null, 
          profile: null,
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
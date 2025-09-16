import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { User } from "@supabase/supabase-js";

interface State {
  isAuthenticated: boolean;
  user: null | any;
  profile: null | any;
}

interface Actions {
  loginUser: (user: User, profile: any) => Promise<any>;
  resetPassword: () => void;
  logoutUser: () => void;
}

export const useAuthStore = create<State & Actions>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      profile: null,
      token: null,
      loginUser: async (user: User, profile: any) => {
        set({ isAuthenticated: true, user: user, profile: profile });
      },
      resetPassword: () => {
        set({ isAuthenticated: false, user: null, profile: null });
      },
      logoutUser: () => {
        set({ isAuthenticated: false, user: null, profile: null });
      },
    }),
    {
      name: "echama:auth",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand";
import { User } from "@supabase/supabase-js";

interface State {
  isAuthenticated: boolean;
  user: null | any;
  session: null | any;
}

interface Actions {
  loginUser: (user: User) => Promise<any>;
  resetPassword: () => void;
  logoutUser: () => void;
}

export const useAuthStore = create<State & Actions>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      session: null,
      token: null,
      loginUser: async (user: User) => {
        set({ isAuthenticated: true, user: user });
      },
      resetPassword: () => {
        set({ isAuthenticated: false, user: null });
      },
      logoutUser: () => {
        set({ isAuthenticated: false, user: null });
      },
    }),
    {
      name: "echama:auth",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppUser } from "../../domain/entities/app-user";
import { Profile } from "@/domain/entities";

interface AuthState {
  user: AppUser | null;
  profile: Profile | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  profile: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AppUser | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setProfile: (state, action: PayloadAction<Profile | null>) => {
      state.profile = action.payload;
    },
    resetAuthState: (state) => {
      state.user = null;
      state.profile = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, setProfile, resetAuthState } =
  authSlice.actions;

export default authSlice.reducer;

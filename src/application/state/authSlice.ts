import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppUser } from "../../domain/entities/app-user";
import { Profile } from "@/domain/entities";

interface AuthState {
  user: AppUser | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AppUser | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setProfile: (state, action: PayloadAction<Profile | null>) => {
      state.profile = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetState: (state) => {
      state.user = null;
      state.profile = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { setUser, setProfile, setLoading, setError, clearError, resetState } =
  authSlice.actions;

export default authSlice.reducer;

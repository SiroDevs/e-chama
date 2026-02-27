import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppUser } from "../../domain/entities/app.user.entity";
import { Group, Member, Profile } from "@/domain/entities";

interface SaccoState {
  member: Member | null;
  group: Group | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: SaccoState = {
  member: null,
  group: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

export const saccoSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMember: (state, action: PayloadAction<Member | null>) => {
      state.member = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setGroup: (state, action: PayloadAction<Group | null>) => {
      state.group = action.payload;
      state.isAuthenticated = !!action.payload;
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
      state.member = null;
      state.group = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { setMember, setGroup, setLoading, setError, clearError, resetState } =
  saccoSlice.actions;

export default saccoSlice.reducer;

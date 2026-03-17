import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  isLoading: boolean;
  error: string | null;
}

const initialState: AppState = {
  isLoading: true,
  error: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
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
    resetAppState: (state) => {
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setLoading, setError, clearError, resetAppState } =
  appSlice.actions;

export default appSlice.reducer;

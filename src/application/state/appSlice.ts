import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  error: string | null;
}

const initialState: AppState = {
  error: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetAppState: (state) => {
      state.error = null;
    },
  },
});

export const { setError, clearError, resetAppState } =
  appSlice.actions;

export default appSlice.reducer;

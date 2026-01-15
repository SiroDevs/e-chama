import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Group, Member, UserGroup } from "@/domain/entities";

interface GroupState {
  member: Member | null;
  group: Group | null;
  groups: UserGroup[] | null;
  hasGroups: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: GroupState = {
  member: null,
  group: null,
  groups: [],
  hasGroups: false,
  isLoading: true,
  error: null,
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setMember: (state, action: PayloadAction<Member | null>) => {
      state.member = action.payload;
      state.hasGroups = !!action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setGroup: (state, action: PayloadAction<Group | null>) => {
      state.group = action.payload;
      state.hasGroups = !!action.payload;
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
      state.hasGroups = false;
      state.error = null;
    },
  },
});

export const { setMember, setGroup, setLoading, setError, clearError, resetState } =
  groupSlice.actions;

export default groupSlice.reducer;

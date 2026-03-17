import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Member, UserGroup } from "@/domain/entities";

interface GroupState {
  member: Member | null;
  group: UserGroup | null;
  groups: UserGroup[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: GroupState = {
  member: null,
  group: null,
  groups: [],
  isLoading: true,
  error: null,
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setMember: (state, action: PayloadAction<Member | null>) => {
      state.member = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setGroup: (state, action: PayloadAction<UserGroup | null>) => {
      state.group = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setGroups: (state, action: PayloadAction<UserGroup[]>) => {
      state.groups = action.payload;
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
    resetGroupState: (state) => {
      state.member = null;
      state.group = null;
      state.groups = null;
      state.error = null;
    },
  },
});

export const { setMember, setGroup, setGroups, setLoading, setError, clearError, resetGroupState } =
  groupSlice.actions;

export default groupSlice.reducer;

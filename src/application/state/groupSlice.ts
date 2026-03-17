import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Member, UserGroup } from "@/domain/entities";

interface GroupState {
  member: Member | null;
  group: UserGroup | null;
  groups: UserGroup[] | null;
}

const initialState: GroupState = {
  member: null,
  group: null,
  groups: [],
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setMember: (state, action: PayloadAction<Member | null>) => {
      state.member = action.payload;
    },
    setGroup: (state, action: PayloadAction<UserGroup | null>) => {
      state.group = action.payload;
    },
    setGroups: (state, action: PayloadAction<UserGroup[]>) => {
      state.groups = action.payload;
    },
    resetGroupState: (state) => {
      state.member = null;
      state.group = null;
      state.groups = null;
    },
  },
});

export const { setMember, setGroup, setGroups, resetGroupState } =
  groupSlice.actions;

export default groupSlice.reducer;

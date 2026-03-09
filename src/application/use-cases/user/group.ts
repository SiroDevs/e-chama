import { Dispatch } from "@reduxjs/toolkit";

import { fetchUserGroups, fetchUserMember } from "@/app/actions/user-actions";
import { setLoading, setError } from "@/application/state/authSlice";
import { setMember, setGroup, setGroups } from "@/application/state/groupSlice";
import { Group } from "@/domain/entities";

export const signinUser = (userid: string, group: Group) => {
  return async (dispatch: Dispatch) => {
    try {
      const member = await fetchUserMember(userid, group.id);
      if (!member) {
        throw new Error("Member not found after changing groups");
      }
      dispatch(setMember(member));

      dispatch(setGroup(group));
    } catch (error: unknown) {
      dispatch(
        setError(error instanceof Error ? error.message : "Failed to set user group")
      );
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
};

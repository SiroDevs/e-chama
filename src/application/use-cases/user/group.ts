import { Dispatch } from "@reduxjs/toolkit";

import { UserGroup } from "@/domain/entities";
import { fetchGroupMember } from "@/app/actions/user-actions";
import { setLoading, setError, setMember, setGroup } from "@/application/state/groupSlice";

export const switchGroup = (userid: string, group: UserGroup) => {
  return async (dispatch: Dispatch) => {
    try {
      const member = await fetchGroupMember(userid, group.group_id);

      if (member) {
        dispatch(setMember(member));
        dispatch(setGroup(group));
      } else {
        dispatch(
          setError("Failed to set user group")
        );
      }
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

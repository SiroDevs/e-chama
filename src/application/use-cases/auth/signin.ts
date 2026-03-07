import { Dispatch } from "@reduxjs/toolkit";

import { signinUserAction } from "@/app/actions/auth-actions";
import { fetchUserGroups, fetchUserMember } from "@/app/actions/user-actions";
import { setUser, setLoading, setError, setProfile } from "../../state/authSlice";
import { setMember, setGroup, setGroups } from "@/application/state/groupSlice";

export const signinUser = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading(true));

      const data = await signinUserAction(email, password);

      if (!data) {
        throw new Error("User not found after signin");
      }

      dispatch(setUser(data.user));

      if (!data.profile) {
        throw new Error("User profile not found after signin");
      }

      dispatch(setProfile(data.profile));

      const member = await fetchUserMember(data.user.uid, data.profile.group_id);
      if (!member) {
        throw new Error("Member not found after signin");
      }
      dispatch(setMember(member));

      const groups = await fetchUserGroups(data.user.uid);
      if (groups.length > 0) {
        dispatch(setGroups(groups));
        if (data.profile.group_id) {
          const userGroup = groups.find(group => group.group_id === data.profile!.group_id);
          dispatch(setGroup(userGroup || null));
        } else {
          dispatch(setGroup(groups[0] || null));
        }
      }
    } catch (error: unknown) {
      dispatch(
        setError(error instanceof Error ? error.message : "Failed to signin")
      );
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
};

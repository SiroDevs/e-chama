import { Dispatch } from "@reduxjs/toolkit";

import { setUser, setLoading, setError, setProfile } from "../../state/authSlice";
import { signinUserAction } from "@/app/actions/auth-actions";
import { fetchUserProfile } from "@/app/actions/user-actions";

export const signinUser = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading(true));

      const user = await signinUserAction(email, password);

      if (!user) {
        throw new Error("User not found after signin");
      }

      dispatch(setUser(user));

      const profile = await fetchUserProfile(user.uid);

      if (!profile) {
        throw new Error("User profile not found after signin");
      }

      dispatch(setProfile(profile));

      return user;
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

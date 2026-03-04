import { Dispatch } from "@reduxjs/toolkit";

import { setUser, setLoading, setError, setProfile } from "../../state/authSlice";
import { signinUserAction } from "@/app/actions/auth-actions";

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

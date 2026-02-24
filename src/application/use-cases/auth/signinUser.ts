import { Dispatch } from "@reduxjs/toolkit";

import { setUser, setLoading, setError } from "../../state/authSlice";
import { signinUserAction } from "@/app/actions/auth-actions";

export const signinUser = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading(true));

      // Call signin action
      const user = await signinUserAction(email, password);

      if (!user) {
        throw new Error("User not found after signin");
      }

      // Update the auth state
      dispatch(setUser(user));

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

import { Dispatch } from "@reduxjs/toolkit";

import { resetState, setLoading, setError } from "../../state/authSlice";
import { signoutUserAction } from "@/app/actions/auth-actions";

export const signoutUser = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading(true));

      await signoutUserAction();

      dispatch(resetState());
    } catch (error: unknown) {
      dispatch(
        setError(error instanceof Error ? error.message : "Failed to logout")
      );
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
};

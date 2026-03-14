import { Dispatch } from "@reduxjs/toolkit";

import { resetAuthState, setLoading, setError } from "../../state/authSlice";
import { signoutUserAction } from "@/app/actions/auth-actions";
import { resetGroupState } from "@/application/state/groupSlice";

export const signoutUser = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading(true));

      await signoutUserAction();

      dispatch(resetAuthState());
      dispatch(resetGroupState());
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

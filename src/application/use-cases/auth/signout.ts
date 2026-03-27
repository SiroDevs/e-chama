import { Dispatch } from "@reduxjs/toolkit";

import { resetAuthState } from "../../state/authSlice";
import { signoutUserAction } from "@/app/actions/auth-actions";
import { resetGroupState } from "@/application/state/groupSlice";
import { resetNavState } from "@/application/state/navSlice";
import { resetAppState, setError } from "@/application/state/appSlice";

export const signoutUser = () => {
  return async (dispatch: Dispatch) => {
    try {

      await signoutUserAction();

      dispatch(resetAppState());
      dispatch(resetAuthState());
      dispatch(resetGroupState());
      dispatch(resetNavState());
    } catch (error: unknown) {
      dispatch(
        setError(error instanceof Error ? error.message : "Failed to logout")
      );
      throw error;
    }
  };
};

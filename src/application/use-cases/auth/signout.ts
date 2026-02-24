import { Dispatch } from "@reduxjs/toolkit";
import { resetState, setLoading, setError } from "../../state/authSlice";
import { signoutUserAction } from "@/app/actions/auth-actions";

// Logout use case - now using the API route
export const signoutUser = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading(true));

      // Call the sign out action
      await signoutUserAction();

      // Reset the auth and todo states
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

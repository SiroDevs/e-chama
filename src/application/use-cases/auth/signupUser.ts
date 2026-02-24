import { Dispatch } from "@reduxjs/toolkit";
import { setUser, setLoading, setError } from "../../state/authSlice";
import { signupUserAction } from "@/app/actions/auth-actions";

// Register use case 
export const signupUser = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading(true));

      // Call the register user action
      const user = await signupUserAction("", "", "", email, password);

      if (!user) {
        throw new Error("Account creation failed");
      }
      dispatch(setUser(user));

      return user;
    } catch (error: unknown) {
      dispatch(
        setError(error instanceof Error ? error.message : "Failed to register")
      );
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
};

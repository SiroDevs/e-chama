import { Dispatch } from "@reduxjs/toolkit";
import { signupUserAction } from "@/app/actions/auth-actions";
import { fetchUserProfile } from "@/app/actions/user-actions";
import { setError, setLoading } from "@/application/state/appSlice";
import { setProfile, setUser } from "@/application/state/authSlice";

export const signupUser = (first_name: string, last_name: string, phone: string, email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading(true));

      const user = await signupUserAction(first_name, last_name, phone, email, password);

      if (!user) {
        throw new Error("Account creation failed");
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
        setError(error instanceof Error ? error.message : "Failed to register")
      );
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };
};

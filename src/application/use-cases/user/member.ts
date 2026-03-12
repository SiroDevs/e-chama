import { Dispatch } from "@reduxjs/toolkit";
import { setLoading, setError } from "../../state/authSlice";
import { signupUserAction } from "@/app/actions/auth-actions";
import { newGroupMember } from "@/app/actions/user-actions";

export const newMember = (
  first_name: string,
  last_name: string,
  phone: string,
  email: string,
  password: string,
  memberno: string,
  groupid: string
) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoading(true));

      const user = await signupUserAction(first_name, last_name, phone, email, password);

      if (!user) {
        throw new Error("Account creation failed");
      }

      await newGroupMember({
        group_id: groupid,
        user_id: user.uid,
        member_no: memberno,
        role: "member",
      });
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

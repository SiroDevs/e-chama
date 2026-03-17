import { Dispatch } from "@reduxjs/toolkit";

import { newGroupMember, newUserAccount, newUserProfile } from "@/app/actions/user-actions";
import { setError } from "@/application/state/appSlice";

export const newMemberAction = (
  first_name: string,
  last_name: string,
  phone: string,
  email: string,
  password: string,
  memberno: string,
  id_number: string,
  kra_pin: string,
  groupid: string,
  address: string,
  country: string,
  sex: string,
  dob: string,
) => {
  return async (dispatch: Dispatch) => {
    try {
      // dispatch(setLoading(true));

      const user = await newUserAccount(first_name, last_name, phone, email, password);

      if (!user) {
        throw new Error("Account creation failed");
      }

      const profile = await newUserProfile({
        id: user.id,
        group_id: groupid,
        first_name: first_name,
        last_name: last_name,
        id_number: id_number,
        // kra_pin: kra_pin,
        // country: country,
        // address: address,
        // sex: sex,
        // dob: dob,
      });

      if (!profile) {
        throw new Error("Profile creation failed");
      }

      const member = await newGroupMember({
        group_id: groupid,
        user_id: user.id,
        member_no: memberno,
        role: "member",
      });

      if (!member) {
        throw new Error("Member creation failed");
      }
    } catch (error: unknown) {
      dispatch(
        setError(error instanceof Error ? error.message : "Failed to register")
      );
      throw error;
    } finally {
      // dispatch(setLoading(false));
    }
  };
};

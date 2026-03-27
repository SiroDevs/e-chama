import { Dispatch } from "@reduxjs/toolkit";

import { editUserInfo, newGroupMember, newUserAccount, newUserProfile, updateGroupMember, updateUserProfile } from "@/app/actions/user-actions";
import { setError } from "@/application/state/appSlice";
import { GroupMember } from "@/domain/entities";
import { EditMemberFormValues } from "@/app/(protected)/members/[id]/edit/schema";
import { toE164 } from "@/lib/utils";
import { NewMemberFormValues } from "@/app/(protected)/members/new/schema";

export const newMemberAction = (
  values: NewMemberFormValues,
  group_id: string,
) => {
  return async (dispatch: Dispatch) => {
    try {
      const user = await newUserAccount(
        values.first_name + ' ' + values.last_name,
        toE164(values.phone!),
        values.email,
        values.password
      );

      if (!user) {
        throw new Error("Account creation failed");
      }

      const profile = await newUserProfile({
        id: user.id,
        group_id: group_id,
        first_name: values.first_name,
        last_name: values.last_name,
        id_number: values.id_number,
        kra_pin: values.kra_pin,
        country: values.country,
        address: values.address,
        sex: values.sex,
        dob: values.dob,
      });

      if (!profile) {
        throw new Error("Profile creation failed");
      }

      const member = await newGroupMember({
        group_id: group_id,
        user_id: user.id,
        member_no: values.member_no,
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
    }
  };
};

export const editMemberAction = (
  values: EditMemberFormValues,
  member: GroupMember,
  group_id: string,
) => {
  return async (dispatch: Dispatch) => {
    try {
      const userUpdated = await editUserInfo(
        member?.user_id!,
        values.first_name + " " + values.last_name,
        toE164(values.phone!)
      );

      if (!userUpdated) {
        throw new Error("Account updating failed");
      }

      const profileUpdated = await updateUserProfile({
        id: member.user_id!,
        group_id: group_id,
        first_name: values.first_name,
        last_name: values.last_name,
        id_number: values.id_number,
        kra_pin: values.kra_pin,
        country: values.country,
        address: values.address,
        sex: values.sex,
        dob: values.dob,
      });

      if (!profileUpdated) {
        throw new Error("Profile updating failed");
      }

      const memberUpdated = await await updateGroupMember({
        id: member.id!,
        member_no: values.member_no,
        role: member.role!,
      });

      if (!memberUpdated) {
        throw new Error("Member updating failed");
      }

    } catch (error: unknown) {
      dispatch(
        setError(error instanceof Error ? error.message : "Failed to update member")
      );
      throw error;
    }
  };
};

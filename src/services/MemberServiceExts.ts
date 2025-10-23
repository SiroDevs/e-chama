"use server";

import { newGroup } from "./GroupService";
import { updateSelectedGroup } from "./ProfileService";
import { newMember } from "./MemberService";
import { signUpMeNow } from "./AuthService";
import { Profile } from "@/state/role/profiles";
import { Group, Member } from "@/types/types";

export async function newMemberGroup(group: Group) {
  try {
    const groupResult = await newGroup(group);

    if (groupResult.error) {
      console.error("Group creation error:", groupResult.error);
      return {
        data: null,
        error: groupResult.error,
      };
    }
    console.info("Group has been created");
    const memberResult = await newMember(
      {
        group_id: groupResult.data.id,
        user_id: group.owner,
        member_no: "001",
        role: "official",
      });

    if (memberResult.error) {
      console.error("Member creation error:", memberResult.error.message);
      return {
        data: null,
        error: memberResult.error,
      };
    }
    console.info("Group member has been created");

    await updateSelectedGroup(group.owner!, groupResult.data.id);

    console.info("Group owner has been updated");
    return {
      data: {
        group: groupResult.data,
        member: memberResult.data
      },
      error: null
    };
  } catch (error) {
    console.error("Unexpected error in createMemberGroup:", error);
    return {
      data: null,
      error: error instanceof Error ? error : new Error("Unknown error occurred")
    };
  }
}

export async function newMemberProfile(payload: {
  email: string;
  phone: string;
  profile: Profile;
  member: Member;
}) {
  try {
    const { data, error } = await signUpMeNow({
      email: payload.email,
      phone: payload.phone,
      password: "",
      profile: payload.profile
    });
    if (error) {
      console.error("Signup error:", error);
      return { data: null, error: error };
    }

    const memberResult = await newMember(
      {
        group_id: payload.member.group_id,
        user_id: data.user.id,
        member_no: payload.member.member_no,
        role: payload.member.role,
      });
    return memberResult;
  } catch (error) {
    console.error("Unexpected error in newMemberProfile:", error);
    return {
      data: null,
      error: error instanceof Error ? error : new Error("Unknown error occurred")
    };
  }
}

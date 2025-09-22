"use server";

import { newGroup } from "./GroupService";
import { updateSelectedGroup } from "./ProfileService";
import { newMember } from "./MemberService";
import { signUpMeNow } from "./AuthService";

export async function newMemberGroup(
  userId: string,
  title: string,
  description: string,
  initials: string,
  location: string,
  address: string,
) {
  try {
    const groupResult = await newGroup({
      user: userId,
      title: title,
      description: description,
      initials: initials,
      location: location,
      address: address,
    });

    if (groupResult.error) {
      console.error("Group creation error:", groupResult.error);
      return {
        data: null,
        error: groupResult.error,
      };
    }

    const memberResult = await newMember(
      groupResult.data.id,
      userId,
      "001",
      'official'
    );

    if (memberResult.error) {
      console.error("Member creation error:", memberResult.error.message);
      return {
        data: null,
        error: memberResult.error,
      };
    }

    await updateSelectedGroup(userId, groupResult.data.id);

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
  groupId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  idNumber: string;
  sex: string;
  memberNo: string;
  role: string;
  joinedAt: string;
}) {
  try {
    const { data, error } = await signUpMeNow({
      first_name: payload.firstName,
      last_name: payload.lastName,
      email: payload.email,
      password: "password1"
    });
    if (error) {
      console.error("Signup error:", error);
      return { data: null, error: error };
    }

    const memberResult = await newMember(
      payload.groupId,
      data.user.id,
      payload.memberNo,
      payload.role,
    );
    return memberResult;
  } catch (error) {
    console.error("Unexpected error in newMemberProfile:", error);
    return {
      data: null,
      error: error instanceof Error ? error : new Error("Unknown error occurred")
    };
  }
}

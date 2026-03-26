"use server";

import { User } from "@supabase/supabase-js";

import { Member, Profile, UserGroup } from "@/domain/entities";
import { groupService } from "@/infrastructure/services/groupService";
import { memberService } from "@/infrastructure/services/memberService";
import { profileService } from "@/infrastructure/services/profileService";
import { userService } from "@/infrastructure/services/userService";

export async function newUserAccount(
  full_name: string,
  phone: string,
  email: string,
  password: string
): Promise<User> {
  try {
    const { data, error } = await userService.createUser(
      full_name,
      email,
      phone,
      password,
    );

    if (error) throw error;
    if (!data) throw new Error("No user created");
    return data.user!;
  } catch (error: unknown) {
    console.error("Error creating user:", error);

    throw new Error(
      `Failed to create user: ${error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function editUserInfo(userid: string, full_name: string, phone: string): Promise<Boolean> {
  try {
    const { data, error } = await userService.updateUserInfo(userid, full_name, phone);

    if (error) throw error;
    if (!data) throw new Error("No user info updated");
    return true;
  } catch (error: unknown) {
    console.error("Error updating user info:", error);

    throw new Error(
      `Failed to update user info: ${error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function editUserEmail(userid: string, email: string): Promise<Boolean> {
  try {
    const { data, error } = await userService.updateUserEmail(userid, email);

    if (error) throw error;
    if (!data) throw new Error("No user email updated");
    return true;
  } catch (error: unknown) {
    console.error("Error updating user email:", error);

    throw new Error(
      `Failed to update user email: ${error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function editUserPassword(userid: string, password: string): Promise<Boolean> {
  try {
    const { data, error } = await userService.updateUserPassword(userid, password);

    if (error) throw error;
    if (!data) throw new Error("No user password updated");
    return true;
  } catch (error: unknown) {
    console.error("Error updating user password:", error);

    throw new Error(
      `Failed to update user password: ${error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function newGroupMember(
  member: Member,
): Promise<Member> {
  try {
    const { data, error } = await memberService.newMember(member);

    if (error) throw error;
    if (!data) throw new Error("No member created");
    return data;
  } catch (error: unknown) {
    console.error("Error creating member:", error);

    throw new Error(
      `Failed to create member: ${error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function updateGroupMember(member: Member): Promise<Boolean> {
  try {
    const { error } = await memberService.editMember(member);
    if (error) throw error;
    return true;
  } catch (error: unknown) {
    console.error("Error updating member:", error);

    throw new Error(
      `Failed to update member: ${error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function newUserProfile(
  profile: Profile,
): Promise<Profile> {
  try {
    const { data, error } = await profileService.newUserProfile(profile);

    if (error) throw error;
    if (!data) throw new Error("No profile created");
    return data;
  } catch (error: unknown) {
    console.error("Error creating profile:", error);

    throw new Error(
      `Failed to create profile: ${error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function updateUserProfile(
  profile: Profile,
): Promise<Boolean> {
  try {
    const { error } = await profileService.updateUserProfile(profile);

    if (error) throw error;
    return true;
  } catch (error: unknown) {
    console.error("Error updating profile:", error);
    throw new Error(
      `Failed to update profile: ${error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function fetchUserGroups(userId: string): Promise<UserGroup[]> {
  let groups: UserGroup[] = [];
  try {
    groups = await groupService.getUserGroups(userId);
  } catch (error: unknown) {
    console.error("Error fetching in user groups:", error);
    throw new Error(
      `Failed to fetch user groups: ${error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
  return groups;
}

export async function fetchUserProfile(
  userId?: string
): Promise<Profile | null> {
  try {
    const { data, error } = await profileService.fetchUserProfile(userId!);

    if (error || !data) {
      console.warn("Profile not found or error occurred:", error);
      return null;
    }

    return data;
  } catch (error: unknown) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

export async function fetchGroupMember(
  userId?: string,
  groupId?: string,
): Promise<Member | null> {
  try {
    const { data, error } = await memberService.fetchGroupMember(userId!, groupId!);

    if (error || !data) {
      console.warn("Member not found or error occurred:", error);
      return null;
    }

    return data;
  } catch (error: unknown) {
    console.error("Error fetching member:", error);
    return null;
  }
}

"use server";

import { User } from "@supabase/supabase-js";

import { Member, Profile, UserGroup } from "@/domain/entities";
import { authService } from "@/infrastructure/services/authService";
import { groupService } from "@/infrastructure/services/groupService";
import { memberService } from "@/infrastructure/services/memberService";
import { profileService } from "@/infrastructure/services/profileService";

export async function newUserAccount(
  first_name: string,
  last_name: string,
  phone: string,
  email: string,
  password: string
): Promise<User> {
  try {
    const { data, error } = await authService.signupUser(
      first_name + " " + last_name,
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

"use server";

import { Member, Profile, UserGroup } from "@/domain/entities";
import { groupService } from "@/infrastructure/services/groupService";
import { memberService } from "@/infrastructure/services/memberService";
import { profileService } from "@/infrastructure/services/profileService";

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
): Promise<Profile> {
  try {
    const { data, error } = await profileService.fetchUserProfile(userId!);

    if (error) throw error;
    if (!data) throw new Error("No profile data returned");

    return data;

  } catch (error: unknown) {
    console.error("Error fetching profile:", error);

    throw new Error(
      `Failed to fetch profile: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function fetchGroupMember(
  userId?: string,
  groupId?: string,
): Promise<Member> {
  try {
    const { data, error } = await memberService.fetchGroupMember(userId!, groupId!);

    if (error) throw error;
    if (!data) throw new Error("No member data returned");

    return data;
  } catch (error: unknown) {
    console.error("Error fetching member:", error);

    throw new Error(
      `Failed to fetch member: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

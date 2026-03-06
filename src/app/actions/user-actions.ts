"use server";

import { dataToMember, dataToProfile, Member, Profile, UserGroup } from "@/domain/entities";
import { groupService } from "@/infrastructure/services/groupService";
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

    const profile = dataToProfile({
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      country: data.country,
      address: data.address,
      sex: data.sex,
      dob: data.dob,
      avatar: data.avatar,
      group_id: data.group_id,
      created_at: data.created_at,
      updated_at: data.updated_at,
    });

    if (!profile) {
      throw new Error("Failed to convert data to profile");
    }

    return profile;

  } catch (error: unknown) {
    console.error("Error fetching profile:", error);

    throw new Error(
      `Failed to fetch profile: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function fetchUserMember(
  userId?: string,
  groupId?: string,
): Promise<Member> {
  try {
    const { data, error } = await profileService.fetchUserMember(userId!, groupId!);

    if (error) throw error;
    if (!data) throw new Error("No profile data returned");

    const member = dataToMember({
      id: data.id,
      group_id: data.group_id,
      user_id: data.user_id,
      member_no: data.member_no,
      role: data.role,
      joined_at: data.joined_at,
      created_at: data.created_at,
      updated_at: data.updated_at,
    });

    if (!member) {
      throw new Error("Failed to convert data to member");
    }

    return member;

  } catch (error: unknown) {
    console.error("Error fetching member:", error);

    throw new Error(
      `Failed to fetch member: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

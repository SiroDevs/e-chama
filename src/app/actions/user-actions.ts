"use server";

import { dataToProfile, Profile } from "@/domain/entities";
import { groupService } from "@/infrastructure/services/groupService";
import { profileService } from "@/infrastructure/services/profileService";
import { UserGroup } from "@/types";

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
      id_number: data.id_number,
      kra_pin: data.kra_pin,
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

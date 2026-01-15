"use server";

import { AppUser, dataToProfile, Profile, supabaseUserToAppUser } from "@/domain/entities";
import { groupService } from "@/infrastructure/services/groupService";
import { profileService } from "@/infrastructure/services/profileService";
import { UserGroup } from "@/types";

export async function fetchUserProfile(userId: string): Promise<Profile> {
  try {
    const { data, error } = await profileService.fetchUserProfile(userId);

    if (error) throw error;
    if (!data.user) throw new Error("No profile data returned");

    return dataToProfile(
      data.id,
      data.first_name,
      data.last_name,
      data.country,
      data.address,
      data.sex,
      data.dob,
      data.avatar,
      data.id_number,
      data.kra_pin,
    );
  } catch (error: unknown) {
    console.error("Error fetching in user profile:", error);
    throw new Error(
      `Failed to login: ${error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function setUserGroups(
  groups: UserGroup[],
  groupId?: string
): Promise<AppUser> {
  try {
    if (!groupId) {
      groupId = groups[0].group_id;
    }
    const { data, error } = await groupService.signinUser(groups, groupId);

    if (error) throw error;
    if (!data.user) throw new Error("No user data returned");

    let profileData = null;
    try {
      const { data: profile } = await profileService.fetchUserProfile(data.user.id)
      profileData = profile;
    } catch (profileError) {
      console.log("No profile found for user:", profileError);
    }

    const domainUser = supabaseUserToAppUser({
      user: data.user,
      session: data.session,
      profile: profileData
    });

    if (!domainUser) {
      throw new Error("Failed to convert user to app user");
    }

    return domainUser;
  } catch (error: unknown) {
    console.error("Error logging in user:", error);
    throw new Error(
      `Failed to login: ${error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}


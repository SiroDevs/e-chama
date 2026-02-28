"use server";

import { AppUser, dataToProfile, Profile, supabaseUserToAppUser } from "@/domain/entities";
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


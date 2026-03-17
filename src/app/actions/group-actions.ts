"use server";

import { Group, GroupExt, UserGroup } from "@/domain/entities";
import { groupService } from "@/infrastructure/services/groupService";
import { memberService } from "@/infrastructure/services/memberService";

export async function newGroup(group: Group) {
  try {
    const { data, error } = await groupService.newGroup(group);

    if (error) throw error;
    if (!data) throw new Error("No group created");
    return data;
  } catch (error: unknown) {
    console.error("Error creating group:", error);

    throw new Error(
      `Failed to create group: ${error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function searchGroup(joinCode: string) {
  try {
    const groupResult = await groupService.searchByCode(joinCode);
    if (groupResult) {
      return groupResult;
    } else {
      throw new Error("No Chama found with this code");
    }
  } catch (err) {
    console.error("Search group error:", err);
    throw new Error("Failed to search for that Chama. Please try again.");
  }
}

export async function joinGroupAction(userId: string, group: GroupExt) {
  try {
    const { error } = await memberService.newMember({
      group_id: group.id,
      user_id: userId,
      member_no: "000",
      role: "member",
    });

    if (error) {
      console.error("Joining group error:", error.message);
      if (error.code !== "PGRST116") {
        return await groupService.getUserGroups(userId);
      }
      throw new Error(error.details);
    }
    return await groupService.getUserGroups(userId);
  } catch (err) {
    console.error("Join group error:", err);
    throw new Error(
      `Failed to join group: ${err instanceof Error ? err.message : "Unknown error"
      }`
    );
  }
}

export async function fetchGroups(userId: string) {
  let groups: UserGroup[] = [];
  try {
    return await groupService.getUserGroups(userId);
  } catch (groupError) {
    console.warn("No groups found for this user:", groupError);
  }
  return groups;
}

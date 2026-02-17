import toast from "react-hot-toast";

import { newMember } from "@/infrastucture/services/MemberService";
import { newMemberGroup } from "@/infrastucture/services/MemberServiceExts";
import { getUserGroups, searchByCode } from "@/infrastucture/services/GroupService";
import { Group, GroupExt, UserGroup } from "@/data/types/types";

export async function newGroupAction(group: Group) {
  try {
    const { data, error } = await newMemberGroup(group);

    if (error) {
      console.error("Group creation error:", error.message);
      const errorMessage = error.message || "An unknown error occurred";
      const status = "status" in error ? error.status : undefined;

      if (status) {
        switch (status) {
          case "23505":
            toast.error("A group with similar details already exists.");
            break;
          case "42501":
            toast.error("You don't have permission to create a group.");
            break;
          case 400:
            toast.error("Invalid data. Please check your text fields.");
            break;
          case 401:
            toast.error("Unauthorized. Please try again.");
            break;
          case 403:
            toast.error(
              "Access forbidden. Contact support if this issue persists."
            );
            break;
          case 500:
            toast.error(`Internal server error: ${errorMessage}`);
            break;
          default:
            toast.error(errorMessage);
        }
      } else {
        toast.error(errorMessage);
      }

      throw new Error(errorMessage);
    }

    toast.success("Chama created successfully!");
    return {
      success: true,
      member: data.member,
      groups: data.groups,
      groupId: data.groupId,
    };
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "An error occurred during group creation. Please try again.";

    console.error("Unexpected error in createGroupAction:", err);
    throw err;
  }
}

export async function searchGroupAction(joinCode: string) {
  try {
    if (!joinCode.trim()) {
      return { success: false, error: "Please enter a Chama code" };
    }

    const groupResult = await searchByCode(joinCode);
    if (groupResult) {
      return { success: true, group: groupResult };
    } else {
      return { success: false, error: "No Chama found with this code" };
    }
  } catch (err) {
    console.error("Search group error:", err);
    return {
      success: false,
      error: "Failed to search for that Chama. Please try again.",
    };
  }
}

export async function joinGroupAction(userId: string, group: GroupExt) {
  try {
    const { error } = await newMember({
      group_id: group.id,
      user_id: userId,
      member_no: "000",
      role: "member",
    });

    if (error) {
      console.error("Joining group error:", error.message);
      if (error.code !== "PGRST116") {
        toast.success("Successfully joined the Chama!");
        const groups = await getUserGroups(userId);
        return { success: true, groups: groups };
      }
      return { success: false, error };
    }
    toast.success("Successfully joined the Chama!");
    const groups = await getUserGroups(userId);
    return { success: true, groups: groups };
  } catch (err) {
    console.error("Join group error:", err);
    return {
      success: false,
      error: "Failed to join Chama. Please try again.",
    };
  }
}

export async function fetchGroups(userId: string) {
  let groups: UserGroup[] = [];
  try {
    groups = await getUserGroups(userId);
  } catch (groupError) {
    console.warn("No groups found for this user:", groupError);
  }
  return groups;
}

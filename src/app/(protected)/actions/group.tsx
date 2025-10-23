import toast from "react-hot-toast";

import { newMember } from "@/services/MemberService";
import { newMemberGroup } from "@/services/MemberServiceExts";
import { getUserGroups, searchByCode } from "@/services/GroupService";
import { Group, GroupExt, UserGroup } from "@/types/types";

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
          case "23505":
            toast.error("A group with similar details already exists.");
            break;
          case "42501":
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

      return { success: false, error: errorMessage };
    }

    if (data && data.group) {
      console.info("Let's get user groups");
      const groups = await getUserGroups(group.owner!);
      return {
        success: true,
        groups: groups,
        groupId: data.group.id,
      };
    } else {
      console.info("No get user groups detected");
      toast.error("Chama creation failed - no data returned");
      return { success: false, error: "No data returned from group creation" };
    }
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "An error occurred during group creation. Please try again.";

    toast.error(errorMessage);
    console.error("Unexpected error in createGroupAction:", err);

    return { success: false, error: errorMessage };
  }
}

export async function searchGroupAction(joinCode: string){
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

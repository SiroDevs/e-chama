import toast from "react-hot-toast";

import { createMember, createMemberGroup } from "@/services/MemberService";
import { getUserGroups, searchByCode } from "@/services/GroupService";
import { GroupExt, UserGroup } from "@/types/types";

export async function createGroupAction(payload: {
  userId: string;
  title: string;
  description: string;
  initials: string;
  location: string;
  address: string;
}) {
  try {
    const { data, error } = await createMemberGroup(
      payload.userId,
      payload.title,
      payload.description,
      payload.initials,
      payload.location,
      payload.address
    );

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
      const groups = await getUserGroups(payload.userId);
      return {
        success: true,
        groups: groups,
        groupId: data.group.id,
      };
    } else {
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

export async function searchGroupAction(joinCode: string): Promise<{
  success: boolean;
  group?: GroupExt;
  error?: any;
}> {
  try {
    if (!joinCode.trim()) {
      return { success: false, error: "Please enter a Chama code" };
    }

    const group = await searchByCode(joinCode);
    if (group) {
      return { success: true, group };
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
    const { error } = await createMember(group.id, userId, "000", "member");

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

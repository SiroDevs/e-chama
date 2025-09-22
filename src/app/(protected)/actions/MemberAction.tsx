import toast from "react-hot-toast";

import { newMemberProfile } from "@/services/MemberServiceExts";
import { searchByCode } from "@/services/GroupService";
import { GroupExt } from "@/types/types";

export async function newMemberAction(payload: {
  groupId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  idNumber: string;
  sex: string;
  memberNo: string;
  role: string;
  joinedAt: Date;
}) {
  try {
    const { data, error } = await newMemberProfile(payload);

    if (error) {
      console.error("Group creation error:", error.message);
      const errorMessage = error.message || "An unknown error occurred";
      const status = "status" in error ? error.status : undefined;

      if (status) {
        switch (status) {
          case 23505:
            toast.error("A member with similar details already exists.");
            break;
          case 42501:
            toast.error("You don't have permission to do this action.");
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
    } else {
      return { success: true, member: data };
    }
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "An error occurred during member registration. Please try again.";

    toast.error(errorMessage);
    console.error("Unexpected error in newMemberAction:", err);

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

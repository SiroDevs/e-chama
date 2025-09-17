import toast from "react-hot-toast";

import { createMemberGroup } from "@/services/MemberService";
import { getUserGroups } from "@/services/GroupService";

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
      console.error("Group creation error:", error);

      const errorMessage = error.message || "An unknown error occurred";
      const status = "status" in error ? error.status : undefined;

      switch (status) {
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

      return { success: false };
    } else if (data) {
      const groups = await getUserGroups(payload.userId);
      return { success: true, groups: groups, group: data.group.id };
    } else {
      toast.error("Chama creation failed");
      return { success: false };
    }
  } catch (err) {
    toast.error(
      err instanceof Error
        ? err.message
        : "An error occurred during signup. Please try again."
    );
    return { success: false };
  }
}

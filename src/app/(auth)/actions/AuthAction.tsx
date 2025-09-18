import { EmailOutlined } from "@mui/icons-material";
import toast from "react-hot-toast";

import { signInMeNow, signUpMeNow, signMeOut } from "@/services/AuthService";
import { NotificationCard } from "@/components/general";
import { getUserGroups } from "@/services/GroupService";
import { UserGroup } from "@/state/auth/groups";

export async function handleSigninAction(payload: {
  email: string;
  password: string;
}) {
  try {
    const { data, error } = await signInMeNow(payload);

    if (error) {
      console.error("Signin error:", error);

      const errorMessage = error.message || "An unknown error occurred";
      const status = "status" in error ? error.status : undefined;

      switch (status) {
        case 400:
          toast.error(
            "Invalid credentials. Please check your email and password."
          );
          break;
        case 401:
          toast.error("Unauthorized. Please try again.");
          break;
        case 403:
          toast.error(
            "Access forbidden. Contact support if this issue persists."
          );
          break;
        case 404:
          toast.error("User profile not found.");
          break;
        case 500:
          toast.error("Internal server error. Please try again later.");
          break;
        default:
          toast.error(errorMessage);
      }

      return { success: false };
    } else if (data) {
      let groups: UserGroup[] = [];
      try {
        groups = await getUserGroups(data.user.id);
      } catch (groupError) {
        console.warn("No groups found for this user:", groupError);
      }
      return {
        success: true,
        user: data.user,
        profile: data.profile,
        groups: groups,
      };
    } else {
      toast.error("No data returned from sign in");
      return { success: false };
    }
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Something went wrong.";
    toast.error(message);
    return { success: false };
  }
}

export async function handleSignupAction(payload: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) {
  try {
    const { data, error } = await signUpMeNow(payload);

    if (error) {
      console.error("Signup error:", error);

      const errorMessage = error.message || "An unknown error occurred";
      const status = "status" in error ? error.status : undefined;

      switch (status) {
        case 400:
          toast.error(
            "Invalid credentials. Please check your email and password."
          );
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
      toast.custom((t) => (
        <NotificationCard
          title="Signup successful"
          message="Please check your email for a verification link!"
          icon={<EmailOutlined />}
          iconBgColor="success.main"
          actionLabel="Close"
          onAction={() => toast.dismiss(t.id)}
        />
      ));

      return {
        success: true,
        user: data.user,
        profile: data.profile,
      };
    } else {
      toast.error("Signup failed");
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

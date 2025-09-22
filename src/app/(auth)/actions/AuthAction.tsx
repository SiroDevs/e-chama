import { EmailOutlined } from "@mui/icons-material";

import { signInMeNow, signUpMeNow } from "@/services/AuthService";
import { NotificationCard } from "@/components/general";
import toast from "react-hot-toast";

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
          return {
            success: false,
            error: "Invalid credentials. Please check your email and password.",
          };

        case 401:
          return { success: false, error: "Unauthorized. Please try again." };

        case 403:
          return {
            success: false,
            error: "Access forbidden. Contact support if this issue persists.",
          };

        case 404:
          return { success: false, error: "User profile not found." };

        case 500:
          return {
            success: false,
            error: "Internal server error. Please try again later.",
          };
        default:
          return { success: false, error: errorMessage };
      }
    } else if (data) {
      return {
        success: true,
        user: data.user,
        profile: data.profile,
        member: data.member,
      };
    } else {
      return { success: false, error: "No data returned from sign in" };
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Something went wrong.",
    };
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
          return {
            success: false,
            error: "Invalid credentials. Please check your email and password.",
          };

        case 401:
          return { success: false, error: "Unauthorized. Please try again." };

        case 403:
          return {
            success: false,
            error: "Access forbidden. Contact support if this issue persists.",
          };

        case 500:
          return {
            success: false,
            error: `Internal server error: ${errorMessage}`,
          };
        default:
          return { success: false, error: errorMessage };
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
        member: data.member,
      };
    } else {
      return { success: false, error: "Signup failed" };
    }
  } catch (err) {
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "An error occurred during signup. Please try again.",
    };
  }
}

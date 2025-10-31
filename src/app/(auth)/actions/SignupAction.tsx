import { EmailOutlined } from "@mui/icons-material";

import { signUpMeNow } from "@/services/AuthService";
import { NotificationCard } from "@/components/general";
import toast from "react-hot-toast";

export async function onSignupAction(payload: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}) {
  try {
    const { data, error } = await signUpMeNow({
      email: payload.email,
      phone: "",
      password: payload.password,
      profile: {
        id: "",
        first_name: payload.first_name,
        last_name: payload.last_name,
      },
    });

    if (error) {
      console.error("Signup error:", error);

      const errorMessage = error.message || "An unknown error occurred";
      const status = "status" in error ? error.status : undefined;
      console.error("Success rate:", status);

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

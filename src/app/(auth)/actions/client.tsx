import { signInMeNow, signMeOut, signUpMeNow } from "@/app/(auth)/actions/server";
import { NotificationCard } from "@/app/components/general/NotificationCard";
import { useAuthStore } from "@/state/auth/auth";
import { EmailOutlined } from "@mui/icons-material";
import toast from "react-hot-toast";

export async function handleSigninAction(payload: {
  email: string;
  password: string;
}) {
  const { loginUser } = useAuthStore();
  try {
    const { data, error } = await signInMeNow(payload);
    if (error) {
      switch (error.status) {
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
          toast.error("Internal server error. Please try again later.");
          break;
        default:
          toast.error("An unknown error occurred.");
      }
      return { success: false };
    } else {
      await loginUser(data.user!);
      return { success: true };
    }
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Something went wrong.";
    toast.error(message);
    return { success: false };
  }
}

export async function handleSignupAction(payload: {
  email: string;
  password: string;
  full_name: string;
}) {
  try {
    const { data, error } = await signUpMeNow(payload);
    if (error) {
      console.error("Signup error:", error);
      switch (error.status) {
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
          toast.error(`Internal server error: ${error.message}`);
          break;
        default:
          toast.error(error.message ?? "An unknown error occurred.");
      }
      return { success: false };
    } else {
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
      return { success: true };
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

export async function handleSignOutAction() {
  await signMeOut();
  toast.success("You have been logged out. Check back soon");
}

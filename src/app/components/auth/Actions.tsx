import { signInMeNow, signUpMeNow } from "@/app/(auth)/actions";
import { EmailOutlined } from "@mui/icons-material";
import toast from "react-hot-toast";
import { NotificationCard } from "../general/NotificationCard";

export async function handleSigninAction(data: {
  email: string;
  password: string;
}) {
  try {
    const result = await signInMeNow(data);
    const parsedResult = JSON.parse(result);

    if (parsedResult.error?.status) {
      switch (parsedResult.error.status) {
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
    } else {
      toast.success("You have been logged in.");
    }
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Something went wrong.";
    toast.error(message);
  }
}

export async function handleSignupAction(data: {
  email: string;
  password: string;
  full_name: string;
}) {
  try {
    const result = await signUpMeNow(data);
    if (typeof result !== "string") {
      throw new Error("Unexpected result type");
    }
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
  } catch (err) {
    toast.error(
      err instanceof Error
        ? err.message
        : "An error occurred during signup. Please try again."
    );
  }
}

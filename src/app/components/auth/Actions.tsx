import toast from "react-hot-toast";

export function handleAuthResult(result: any) {
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
}

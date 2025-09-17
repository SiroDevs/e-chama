import toast from "react-hot-toast";

import { signMeOut } from "@/services/AuthService";

export async function handleSignOutAction() {
  await signMeOut();
  toast.success("You have been logged out. Check back soon");
  return { success: true };
}

import { signMeOut } from "@/services/AuthService";

export async function handleSignOutAction() {
  await signMeOut();
  return { success: true };
}

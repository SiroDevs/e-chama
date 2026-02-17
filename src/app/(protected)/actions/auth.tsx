import { signMeOut } from "@/infrastucture/services/AuthService";

export async function handleSignOutAction() {
  await signMeOut();
  return { success: true };
}

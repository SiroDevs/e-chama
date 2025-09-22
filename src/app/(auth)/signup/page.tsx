"use client";

import { SignUpCard } from "@/components/auth";
import { useAuthStore } from "@/state/auth/auth";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    router.push("/");
    return null;
  }

  function handleOnAuthSuccess() {
    router.push("/");
  }

  return <SignUpCard onAuthSuccess={handleOnAuthSuccess} />;
}

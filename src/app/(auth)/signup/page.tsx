"use client";

import { SignUpCard } from "@/presentation/components/auth";
import { useAuthStore } from "@/infrastucture/state/auth/auth";
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

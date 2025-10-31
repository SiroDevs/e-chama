"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/state/auth/auth";
import Dashboard from "./(protected)/dashboard";
import { SignInCard } from "@/components/auth";
import { AppIcon } from "@/components/general/AppIcon";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCheckingAuth(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || isCheckingAuth) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <AppIcon width={200} />
      </Box>
    );
  }

  function handleOnAuthSuccess() {
    router.push("/");
  }
  
  return (
    <div>
      {isAuthenticated ? (
        <Dashboard />
      ) : (
        <SignInCard onAuthSuccess={handleOnAuthSuccess} />
      )}
    </div>
  );
}

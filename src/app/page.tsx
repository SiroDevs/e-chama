"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/state/auth/auth";
import Dashboard from "./(protected)/dashboard";
import { AppIcon, Copyright } from "@/components/general";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { SignInCard } from "@/components/auth/signin";

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

        <Copyright sx={{ flex: 1, my: 4 }} />
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

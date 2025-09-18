"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/state/auth/auth";
import Dashboard from "./(protected)/dashboard";
import { SignInCard } from "@/components/auth";
import { AppIcon } from "@/components/general/CustomIcons";
import { Box } from "@mui/material";

export default function Home() {
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

  return <div>{isAuthenticated ? <Dashboard /> : <SignInCard />}</div>;
}
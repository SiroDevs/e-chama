"use client";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { AuthWrapper } from "@/components/layouts/AuthWrapper";
import { MainWrapper } from "@/components/layouts/MainWrapper";
import { useAuthStore } from "@/state/auth/auth";
import { JoinGroupCard } from "../groups/JoinGroupCard";
import { GenericWrapper } from "./GenericWrapper";
import { useGroupStore } from "@/state/auth/group";
import { Box } from "@mui/material";
import { AppIcon } from "../general";

type AppState =
  | "LOADING"
  | "UNAUTHENTICATED"
  | "AUTHENTICATED_NO_GROUPS"
  | "AUTHENTICATED_HAS_GROUPS";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading: authLoading } = useAuthStore();
  const { userGroups, isLoading: groupsLoading } = useGroupStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getAppState = (): AppState => {
    if (!mounted || authLoading || groupsLoading) {
      return "LOADING";
    }

    if (!isAuthenticated) {
      return "UNAUTHENTICATED";
    }

    const hasGroups = Array.isArray(userGroups) && userGroups.length > 0;
    return hasGroups ? "AUTHENTICATED_HAS_GROUPS" : "AUTHENTICATED_NO_GROUPS";
  };

  const appState = getAppState();

  const renderContent = () => {
    switch (appState) {
      case "LOADING":
        return (
          <GenericWrapper>
            <Box sx={{ margin: 3 }}>
              <AppIcon />
            </Box>
          </GenericWrapper>
        );

      case "UNAUTHENTICATED":
        return <AuthWrapper>{children}</AuthWrapper>;

      case "AUTHENTICATED_NO_GROUPS":
        return (
          <GenericWrapper>
            <JoinGroupCard />
          </GenericWrapper>
        );

      case "AUTHENTICATED_HAS_GROUPS":
        return <MainWrapper>{children}</MainWrapper>;

      default:
        return (
          <GenericWrapper>
            <div></div>
          </GenericWrapper>
        );
    }
  };

  return (
    <>
      {renderContent()}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

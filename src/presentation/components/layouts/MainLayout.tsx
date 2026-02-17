"use client";

import { Toaster } from "react-hot-toast";
import { AuthWrapper } from "@/presentation/components/layouts/AuthWrapper";
import { MainWrapper } from "@/presentation/components/layouts/MainWrapper";
import { useAuthStore } from "@/infrastucture/state/auth/auth";
import { JoinGroupCard } from "../groups/JoinGroupCard";
import { GenericWrapper } from "./GenericWrapper";
import { useGroupStore } from "@/infrastucture/state/auth/group";
import { Box, Typography } from "@mui/material";
import { AppIcon, Copyright, Loader } from "../general";

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

  const getAppState = (): AppState => {
    if (!isAuthenticated) {
      return "UNAUTHENTICATED";
    } else if (authLoading || groupsLoading) {
      return "LOADING";
    }

    const hasGroups = Array.isArray(userGroups) && userGroups.length > 0;
    return hasGroups ? "AUTHENTICATED_HAS_GROUPS" : "AUTHENTICATED_NO_GROUPS";
  };

  const appState = getAppState();

  const renderContent = () => {
    if (!isAuthenticated) {
      return <AuthWrapper>{children}</AuthWrapper>;
    } else if (isAuthenticated) {
      if (userGroups) {
        return <MainWrapper>{children}</MainWrapper>;
      } else
        return (
          <GenericWrapper>
            <JoinGroupCard />
          </GenericWrapper>
        );
    } else {
      return (
        <GenericWrapper>
          <Box sx={{ margin: 3 }}>
            <Typography
              variant="body2"
              align="center"
              sx={[
                {
                  color: "text.secondary",
                },
              ]}
            >
              <AppIcon />
            </Typography>
            <Loader />
            <Copyright sx={{ flex: 1, my: 4 }} />
          </Box>
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

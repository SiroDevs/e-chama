"use client";

import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, PaletteMode } from "@mui/material";

import { AuthWrapper, SignInCard } from "@/components/auth";
import { UserWrapper } from "@/components/user/UserWrapper";
import { useAuthStore } from "@/state/auth/auth";
import Dashboard from "./(protected)/dashboard";
import NoGroups from "./(protected)/nogroups";

export default function Home() {
  const [mode] = useState<PaletteMode>("light");
  const { isAuthenticated, userGroups } = useAuthStore();
  const defaultTheme = createTheme({ palette: { mode } });
  const hasGroups = Array.isArray(userGroups) && userGroups.length > 0;

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Toaster position="top-center" reverseOrder={false} />
      {isAuthenticated ? (
        hasGroups ? (
          <UserWrapper>
            <Dashboard />
          </UserWrapper>
        ) : (
          <NoGroups />
        )
      ) : (
        <AuthWrapper>
          <SignInCard />
        </AuthWrapper>
      )}
    </ThemeProvider>
  );
}

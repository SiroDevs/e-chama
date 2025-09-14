"use client";

import * as React from "react";
import { CssBaseline, PaletteMode } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Dashboard from "./(protected)/dashboard/page";
import { AuthWrapper, SignInCard } from "@/components/auth";
import { useAuthStore } from "@/state/auth/auth";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const [mode] = React.useState<PaletteMode>("light");
  const { isAuthenticated } = useAuthStore();

  const defaultTheme = createTheme({ palette: { mode } });

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      {isAuthenticated ? (
        <Dashboard />
      ) : (
        <AuthWrapper>
          <SignInCard />
        </AuthWrapper>
      )}
    </ThemeProvider>
  );
}

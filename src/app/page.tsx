// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { CssBaseline, PaletteMode, CircularProgress, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { User } from "@supabase/supabase-js";

import Dashboard from "./(protected)/dashboard/page";
import { AuthWrapper, SignInCard } from "@/components/auth";
import { useAuthStore } from "@/state/auth/auth";
import { Toaster } from "react-hot-toast";
import { Loader } from "@/components/general/Loader";

export default function Home() {
  const [mode] = useState<PaletteMode>("light");
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuthStore();

  const defaultTheme = createTheme({ palette: { mode } });

  useEffect(() => {
    const checkAuth = () => {
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Loader />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Toaster position="top-center" reverseOrder={false} />
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

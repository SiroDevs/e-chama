"use client";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, PaletteMode } from "@mui/material";

import { AuthWrapper, SignInCard } from "@/components/auth";
import { UserWrapper } from "@/components/user/UserWrapper";
import { Loader } from "@/components/general/Loader";
import { useAuthStore } from "@/state/auth/auth";
import Dashboard from "./(protected)/dashboard";

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
        <UserWrapper >
          <Dashboard />
        </UserWrapper>
      ) : (
        <AuthWrapper>
          <SignInCard />
        </AuthWrapper>
      )}
    </ThemeProvider>
  );
}

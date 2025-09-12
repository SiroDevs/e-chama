"use client";

import * as React from "react";
import { CssBaseline, PaletteMode } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Dashboard from "./(protected)/dashboard/page";
import { AuthWrapper, SignInCard } from "@/app/components/auth";
import Loader from "./components/general/Loader";
import { checkTheUser } from "./(auth)/actions/server";

export default function Home() {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const [user, setUser] = React.useState<any>(undefined);

  const defaultTheme = createTheme({ palette: { mode } });

  React.useEffect(() => {
    checkTheUser().then(setUser);
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      {user === undefined ? (
        <Loader />
      ) : user ? (
        <Dashboard />
      ) : (
        <AuthWrapper>
          <SignInCard />
        </AuthWrapper>
      )}
    </ThemeProvider>
  );
}

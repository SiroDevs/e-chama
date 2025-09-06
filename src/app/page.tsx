"use client";

import * as React from "react";

import { CssBaseline, PaletteMode } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Home() {
  const [mode, setMode] = React.useState<PaletteMode>("light");

  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <div></div>
    </ThemeProvider>
  );
}

"use client";

import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, PaletteMode } from "@mui/material";
import MainLayout from "@/presentation/components/layouts/MainLayout";
import DialogsProvider from "@/presentation/hooks/dialogs/DialogsProvider";
import NotificationsProvider from "@/presentation/hooks/notifications/NotificationsProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mode] = useState<PaletteMode>("light");
  const defaultTheme = createTheme({ palette: { mode } });

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <NotificationsProvider>
        <DialogsProvider>
          <MainLayout>{children}</MainLayout>
        </DialogsProvider>
      </NotificationsProvider>
    </ThemeProvider>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";

import { AppThemeProvider } from "@/presentation/providers/AppThemeProvider";
import { ReduxProvider } from "@/presentation/providers/ReduxProvider";
import { MainLayout } from "@/presentation/providers/MainLayout";
import { Toaster } from "sonner";
import { Toaster as SonnerToaster } from "@/presentation/components/ui/sonner";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "eChama",
  description: "The digital sacco management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.className} antialiased`}
        suppressHydrationWarning
      >
        <ReduxProvider>
          <AppThemeProvider>
            <MainLayout>
              {children}
              <Toaster />
              <SonnerToaster />
            </MainLayout>
          </AppThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";

import { Toaster } from "@/presentation/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/presentation/components/ui/sonner";
import { AppProvider } from "@/presentation/providers/ThemeProvider";
import { ReduxProvider } from "@/presentation/providers/ReduxProvider";
import Footer from "@/presentation/components/common/footer";
import Navbar from "@/presentation/components/common/navbar";

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
          <AppProvider>
            <Navbar />
            {children}
            <Toaster />
            <SonnerToaster />
            <Footer />
          </AppProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

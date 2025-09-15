import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { Toaster } from "react-hot-toast";

import { GLOBAL_STYLES } from "@/styles";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <GlobalStyles styles={GLOBAL_STYLES} />
      <CssBaseline />
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

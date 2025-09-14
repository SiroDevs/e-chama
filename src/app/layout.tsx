import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CssBaseline, GlobalStyles } from "@mui/material";

import { GLOBAL_STYLES } from "@/styles";
import { AppProvider } from "./provider";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}

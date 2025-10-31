import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { GlobalStyles } from "@mui/material";

import { GLOBAL_STYLES } from "@/styles";
import Provider from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "eChama",
  description: "The digital sacco management",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="eChama" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />
        <meta name="format-detection" content="telephone=no, email=no, address=no" />
      </head>
      <GlobalStyles styles={GLOBAL_STYLES} />
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CssBaseline, GlobalStyles } from "@mui/material";

import { GLOBAL_STYLES } from "@/styles";
import Provider from "./provider";

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
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Geist } from "next/font/google";

import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "eChama",
  description: "The digital sacco management",
};

export default function NotFound() {
  return (
    <html lang="en">
      <body
        className={`${geist.className} antialiased`}
        suppressHydrationWarning
      >
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2>404 - Page Not Found</h2>
          <p>Could not find the requested resource</p>
          <Link href="/">Return Home</Link>
        </div>
      </body>
    </html>
  );
}

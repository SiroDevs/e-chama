import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/presentation/providers/AppProvider";
import { Toaster } from "@/presentation/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/presentation/components/ui/sonner";
import { Providers } from "@/presentation/providers/ThemeProvider";
import { Geist } from "next/font/google";
import Navbar from "@/presentation/components/common/navbar";
import Footer from "@/presentation/components/common/footer";

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
        <AppProvider>
          <Providers>
            <Navbar />
            {children}
            <Toaster />
            <SonnerToaster />
            <Footer />
          </Providers>
        </AppProvider>
      </body>
    </html>
  );
}

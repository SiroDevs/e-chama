"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <main className="flex flex-col min-h-dvh bg-[#eeeeee] dark:bg-black">
        {children}
      </main>
    </ThemeProvider>
  );
}

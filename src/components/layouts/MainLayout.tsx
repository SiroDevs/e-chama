"use client";

import { AuthWrapper } from "@/components/layouts/AuthWrapper";
import { MainWrapper } from "@/components/layouts/MainWrapper";
import { JoinGroupCard } from "@/components/groups/JoinGroupCard";
import { useAuthStore } from "@/state/auth/auth";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { LoadingWrapper } from "./LoadingWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, userGroups, isLoading } = useAuthStore();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const hasGroups = Array.isArray(userGroups) && userGroups.length > 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCheckingAuth(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading || isCheckingAuth) {
    return <LoadingWrapper />;
  }

  return (
    <>
      {isAuthenticated ? (
        hasGroups ? (
          <MainWrapper>{children}</MainWrapper>
        ) : (
          <JoinGroupCard hasGroups={hasGroups} />
        )
      ) : (
        <AuthWrapper>{children}</AuthWrapper>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

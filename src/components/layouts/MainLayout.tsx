"use client";

import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

import { AuthWrapper } from "@/components/layouts/AuthWrapper";
import { MainWrapper } from "@/components/layouts/MainWrapper";
import { useAuthStore } from "@/state/auth/auth";
import { LoadingWrapper } from "./LoadingWrapper";
import { useGroupStore } from "@/state/auth/group";
import { JoinGroupCard } from "@/app/(protected)/join/JoinGroupCard";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuthStore();
  const { userGroups } = useGroupStore();
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

"use client";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { AuthWrapper } from "@/components/layouts/AuthWrapper";
import { MainWrapper } from "@/components/layouts/MainWrapper";
import { useAuthStore } from "@/state/auth/auth";
import { JoinGroupCard } from "../groups/JoinGroupCard";
import { GenericWrapper } from "./GenericWrapper";
import { useGroupStore } from "@/state/auth/group";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuthStore();
  const { userGroups } = useGroupStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <GenericWrapper>
        <div></div>
      </GenericWrapper>
    );
  }

  const hasGroups = Array.isArray(userGroups) && userGroups.length > 0;

  return (
    <>
      {isAuthenticated ? (
        hasGroups ? (
          <MainWrapper>{children}</MainWrapper>
        ) : (
          <GenericWrapper>
            <JoinGroupCard hasGroups={hasGroups} />
          </GenericWrapper>
        )
      ) : (
        <AuthWrapper>{children}</AuthWrapper>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

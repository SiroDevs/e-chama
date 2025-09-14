"use client";

import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import { readAccess } from "./(protected)/actions";
import { checkTheUser } from "./(auth)/actions/server";
import { UserLayout } from "@/components/user/UserLayout";
import { Loader } from "@/components/general/Loader";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(undefined);
  const [role, setRole] = useState<any>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const userData = await checkTheUser();
        setUser(userData);

        if (userData) {
          const { data: permissions } = await readAccess();
          setRole(permissions.role);
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {loading ? (
        <Loader />
      ) : user ? (
        <UserLayout role={role || "user"}>{children}</UserLayout>
      ) : (
        children
      )}
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";

import DashboardLayout from "./components/dashboard/DashboardLayout";
import { checkTheUser } from "./(auth)/actions";
import Loader from "./components/general/Loader";
import { readAccess } from "./(protected)/actions";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
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
      {loading ? (
        <Loader />
      ) : user ? (
        <DashboardLayout role={role || "user"}>{children}</DashboardLayout>
      ) : (
        children
      )}
    </div>
  );
}

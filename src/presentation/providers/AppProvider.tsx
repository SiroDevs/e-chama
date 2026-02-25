"use client";

import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/application/state/store";
import { useAuthStateListener } from "../hooks/useAuthStateListener";
import { useRehydration } from "../hooks/useRehydration";

const AuthStateListener: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const rehydrated = useRehydration();
  const isInitialized = useAuthStateListener();

  if (!rehydrated || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }
  return <>{children}</>;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Provider store={store}>
      {mounted ? (
        <AuthStateListener>{children}</AuthStateListener>
      ) : (
        <div className="contents">{children}</div>
      )}
    </Provider>
  );
};

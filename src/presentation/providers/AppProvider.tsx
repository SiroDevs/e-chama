"use client";

import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/application/state/store";
import { useAuthStateListener } from "../hooks/useAuthStateListener";

const PersistGateLoading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
      <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your session...</p>
    </div>
  );
};

// Inner component that uses hooks
const AppContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const isAuthInitialized = useAuthStateListener();

  useEffect(() => {
    if (isAuthInitialized) {
      console.log("App is ready!");
      setIsReady(true);
    }
  }, [isAuthInitialized]);

  return isReady ? <>{children}</> : <PersistGateLoading />;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR, return children without any Redux or auth logic
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<PersistGateLoading />} persistor={persistor}>
        <AppContent>{children}</AppContent>
      </PersistGate>
    </Provider>
  );
};
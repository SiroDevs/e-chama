"use client";

import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/application/state/store";
import { useAuthStateListener } from "../hooks/useAuthStateListener";
import RehydrateGate from "./RehydrateGate";

const AuthStateListener: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isInitialized = useAuthStateListener();

  if (!isInitialized) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
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
        <RehydrateGate>
          <AuthStateListener>{children}</AuthStateListener>
        </RehydrateGate>
      ) : (
        <div className="contents">{children}</div>
      )}
    </Provider>
  );
};

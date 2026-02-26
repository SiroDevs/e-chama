"use client";

import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "@/application/state/store";
import { useAuthStateListener } from "../hooks/useAuthStateListener";
import { PersistGate } from "redux-persist/integration/react";

const AuthStateListener: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isInitialized = useAuthStateListener();

  if (!isInitialized) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }
  return <>{children}</>;
};

const LoadingFallback = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    Loading ...
  </div>
);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Provider store={store}>{children}</Provider>;
  }

  return (
    <Provider store={store}>
      {persistor ? (
        <PersistGate loading={<LoadingFallback />} persistor={persistor}>
          <AuthStateListener>{children}</AuthStateListener>
        </PersistGate>
      ) : (
        <AuthStateListener>{children}</AuthStateListener>
      )}
    </Provider>
  );
};
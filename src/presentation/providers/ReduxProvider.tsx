"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from "@/application/state/store";
import LoadingSpinner from "../components/ui/loading-spinner";
import { AppThemeProvider } from "./AppThemeProvider";

function PersistLoader() {
  return (
    <AppThemeProvider>
      <LoadingSpinner />
    </AppThemeProvider>
  );
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<PersistLoader />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

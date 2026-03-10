"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from "@/application/state/store";
import LoadingSpinner from "../components/ui/states/loading-spinner";
import { AppThemeProvider } from "./AppThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

function PersistLoader() {
  return (
    <AppThemeProvider>
      <LoadingSpinner />
    </AppThemeProvider>
  );
}

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <Provider store={store}>
      <PersistGate loading={<PersistLoader />} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

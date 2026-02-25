import { configureStore } from "@reduxjs/toolkit";
import { rememberReducer, rememberEnhancer } from "redux-remember";
import authReducer from "./authSlice";

const rememberedKeys = ['auth'];

const rootReducer = rememberReducer({
  auth: authReducer,
});

const isClient = typeof window !== 'undefined';

export const rehydrationComplete = isClient 
  ? new Promise((resolve) => {
      window.addEventListener('redux-remember:rehydrate-complete', () => {
        resolve(true);
      });
      
      setTimeout(() => resolve(true), 2000);
    })
  : Promise.resolve(true);

export const store = configureStore({
  reducer: rootReducer,
  enhancers: (getDefaultEnhancers) => {
    if (isClient) {
      return getDefaultEnhancers().concat(
        rememberEnhancer(
          window.localStorage,
          rememberedKeys,
          {
            persistWholeStore: false,
            prefix: 'echama-v1:'
          }
        )
      );
    }
    return getDefaultEnhancers();
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["auth/setUser", "persist/REHYDRATE"],
        ignoredPaths: [
          "auth.user.createdAt",
          "auth.user.updatedAt",
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
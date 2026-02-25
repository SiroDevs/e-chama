import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from "./authSlice";

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // only auth reducer will be persisted
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Configure the Redux store
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    // todos: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these paths in the state
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, "auth/setUser"],
        ignoredPaths: [
          "auth._persist",
          "auth.user.createdAt",
          "todos.items.createdAt",
          "todos.items.updatedAt",
        ],
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);

// Export types for the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

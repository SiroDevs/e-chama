import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import appReducer from "./appSlice";
import authReducer from "./authSlice";
import groupReducer from './groupSlice';
import navReducer from './navSlice';
import storage from "@/lib/storage";

const rootReducer = combineReducers({
  auth: authReducer,
  group: groupReducer,
  nav: navReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["app", "auth", "group", "nav"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
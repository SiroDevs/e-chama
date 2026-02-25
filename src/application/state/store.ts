import { configureStore } from "@reduxjs/toolkit";
import { rememberReducer, rememberEnhancer } from 'redux-remember';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer, { authSlice } from "./authSlice";

const rememberedKeys: (keyof typeof reducers)[] = ['authkey'];

const reducers = {
  authkey: authReducer
};

export const actions = {
  ...authSlice.actions,
};

export const store = configureStore({
  reducer: rememberReducer(reducers),
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(
    rememberEnhancer(
      window.localStorage,
      rememberedKeys,
      {
        persistWholeStore: true
      }
    )
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["auth/setUser"],
        ignoredPaths: [
          "auth.user.createdAt",
          "todos.items.createdAt",
          "todos.items.updatedAt",
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


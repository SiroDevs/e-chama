"use client";

import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { AuthRepoImpl } from "@/infrastructure/implementations/AuthRepoImpl";
import { setUser } from "@/application/state/authSlice";
import { AppDispatch } from "@/application/state/store";

const authRepo = new AuthRepoImpl();

export const useAuthStateListener = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isInitialized, setIsInitialized] = useState(false);

  const setupAuthListener = useCallback(() => {
    authRepo.getCurrentUser().then((user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
      setIsInitialized(true);
    });

    return authRepo.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = setupAuthListener();

    return () => unsubscribe();
  }, [setupAuthListener]);

  return isInitialized;
};

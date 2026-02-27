"use client";

import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AuthRepoImpl } from "@/infrastructure/implementations/AuthRepoImpl";
import { setUser, setLoading } from "@/application/state/authSlice";
import { AppDispatch } from "@/application/state/store";

const authRepo = new AuthRepoImpl();

export const useAuthStateListener = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isInitialized, setIsInitialized] = useState(false);

  const setupAuthListener = useCallback(() => {
    dispatch(setLoading(true));

    authRepo.getCurrentUser().then((user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
      setIsInitialized(true);
      dispatch(setLoading(false));
    });

    return authRepo.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }

      dispatch(setLoading(false));
    });
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = setupAuthListener();

    return () => unsubscribe();
  }, [setupAuthListener]);

  return isInitialized;
};

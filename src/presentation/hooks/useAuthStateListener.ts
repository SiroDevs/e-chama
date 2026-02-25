"use client";

import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthRepoImpl } from "@/infrastructure/repos/AuthRepoImpl";
import { setUser, setLoading } from "@/application/state/authSlice";
import { AppDispatch, RootState, rehydrationComplete } from "@/application/state/store";

const authRepo = new AuthRepoImpl();

export const useAuthStateListener = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isInitialized, setIsInitialized] = useState(false);
  
  const reduxUser = useSelector((state: RootState) => state.auth.user);
  const reduxLoading = useSelector((state: RootState) => state.auth.isLoading);
  
  const setupAuthListener = useCallback(async () => {
    if (typeof window !== 'undefined') {
      await rehydrationComplete;
    }
    
    if (!reduxUser && !reduxLoading) {
      dispatch(setLoading(true));
    }

    try {
      const currentUser = await authRepo.getCurrentUser();
      
      if (currentUser && reduxUser?.uid !== currentUser.uid) {
        dispatch(setUser(currentUser));
      } else if (!currentUser && reduxUser) {
        dispatch(setUser(null));
      } else if (currentUser && !reduxUser) {
        dispatch(setUser(currentUser));
      }
      
      setIsInitialized(true);
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error checking auth state:", error);
      setIsInitialized(true);
      dispatch(setLoading(false));
    }

    const unsubscribe = authRepo.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
      dispatch(setLoading(false));
    });

    return unsubscribe;
  }, [dispatch, reduxUser, reduxLoading]);

  useEffect(() => {
    const unsubscribePromise = setupAuthListener();

    return () => {
      unsubscribePromise.then(unsubscribe => {
        if (unsubscribe) unsubscribe();
      });
    };
  }, [setupAuthListener]);

  return isInitialized;
};
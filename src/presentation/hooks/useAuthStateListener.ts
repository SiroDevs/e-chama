"use client";

import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthRepoImpl } from "@/infrastructure/repos/AuthRepoImpl";
import { setUser, setLoading } from "@/application/state/authSlice";
import { AppDispatch, RootState } from "@/application/state/store";

// Create an instance of the auth repository
const authRepo = new AuthRepoImpl();

// Auth provider hook for Supabase authentication state
export const useAuthStateListener = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Get the rehydration status from Redux persist
  const rehydrated = useSelector((state: RootState) => state.auth._persist?.rehydrated);
  
  // Get current auth state to avoid unnecessary updates
  const { user: currentUser } = useSelector((state: RootState) => state.auth);

  const setupAuthListener = useCallback(() => {
    console.log("Setting up auth listener...");
    
    // Don't set loading if we already have a user from rehydration
    if (!currentUser) {
      dispatch(setLoading(true));
    }

    // First, check if there's a current user (but only after rehydration)
    authRepo.getCurrentUser().then((user) => {
      console.log("getCurrentUser result:", user);
      
      // Only update if the user is different from what we have
      if (JSON.stringify(user) !== JSON.stringify(currentUser)) {
        if (user) {
          dispatch(setUser(user));
        } else {
          dispatch(setUser(null));
        }
      }
      
      setIsInitialized(true);
      dispatch(setLoading(false));
    });

    // Subscribe to auth state changes - onAuthStateChanged returns unsubscribe function directly
    const unsubscribe = authRepo.onAuthStateChanged((user) => {
      console.log("onAuthStateChanged:", user);
      
      // Only update if the user is different from what we have
      if (JSON.stringify(user) !== JSON.stringify(currentUser)) {
        if (user) {
          dispatch(setUser(user));
        } else {
          dispatch(setUser(null));
        }
      }

      dispatch(setLoading(false));
      setIsInitialized(true);
    });

    // Return the unsubscribe function directly
    return unsubscribe;
  }, [dispatch, currentUser]);

  useEffect(() => {
    // Only set up the listener after Redux has rehydrated
    if (rehydrated) {
      console.log("Redux rehydrated, setting up auth listener");
      const unsubscribe = setupAuthListener();

      return () => {
        console.log("Cleaning up auth listener");
        if (unsubscribe) {
          unsubscribe();
        }
      };
    } else {
      console.log("Waiting for rehydration...");
    }
  }, [rehydrated, setupAuthListener]);

  // Consider initialized when we're rehydrated and have checked auth
  useEffect(() => {
    if (rehydrated) {
      // Give a small delay to ensure auth check completes
      const timer = setTimeout(() => {
        setIsInitialized(true);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [rehydrated]);

  return isInitialized;
};
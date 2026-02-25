"use client";

import { useEffect, useState } from "react";
import { rehydrationComplete } from "@/application/state/store";

export const useRehydration = () => {
  const [rehydrated, setRehydrated] = useState(false);

  useEffect(() => {
    rehydrationComplete.then(() => {
      setRehydrated(true);
    });
  }, []);

  return rehydrated;
};
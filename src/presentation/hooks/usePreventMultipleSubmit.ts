import { useState, useCallback } from 'react';

export function usePreventMultipleSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const execute = useCallback(async (fn: () => Promise<void>) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await fn();
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting]);
  
  return { execute, isSubmitting };
}
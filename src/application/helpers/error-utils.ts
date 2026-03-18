import * as Sentry from "@sentry/nextjs";

type ErrorOptions = {
  context?: Record<string, any>;
  tags?: Record<string, string>;
  userMessage?: string;
  rethrow?: boolean;
};

export function handleError(error: unknown, options?: ErrorOptions) {
  // Default user message
  const defaultMessage = "An unexpected error occurred. Please try again.";
  
  // Determine error message
  const message = error instanceof Error 
    ? error.message 
    : (options?.userMessage || defaultMessage);
  
  // Send to Sentry with rich context
  Sentry.withScope(scope => {
    // Add tags if provided
    if (options?.tags) {
      Object.entries(options.tags).forEach(([key, value]) => {
        scope.setTag(key, value);
      });
    }
    
    // Add extra context if provided
    if (options?.context) {
      Object.entries(options.context).forEach(([key, value]) => {
        scope.setExtra(key, value);
      });
    }
    
    // Set fingerprint for grouping similar errors
    if (error instanceof Error) {
      scope.setFingerprint([error.name, error.message]);
    }
    
    Sentry.captureException(error);
  });
  
  // Optionally rethrow if needed
  if (options?.rethrow) {
    throw error;
  }
  
  return message;
}

import { useState, useCallback } from "react";
import { toast } from "sonner";

/**
 * A hook for managing marketplace errors consistently
 * Provides methods for setting, clearing, and handling errors with automatic toast notifications
 */
export function useMarketplaceError() {
  const [error, setError] = useState<Error | null>(null);
  
  const handleError = useCallback((error: unknown, context?: string) => {
    console.error(`Error in ${context || 'marketplace'}:`, error);
    
    // Determine error message to display
    let errorMessage = "An unexpected error occurred";
    
    if (error instanceof Error) {
      setError(error);
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      setError(new Error(error));
      errorMessage = error;
    } else {
      setError(new Error('An unknown error occurred'));
    }
    
    // Show toast notification for user feedback
    toast.error("Error", {
      description: errorMessage.substring(0, 100), // Truncate very long messages
    });
  }, []);
  
  const clearError = useCallback(() => {
    setError(null);
  }, []);
  
  const wrapAsync = useCallback(async <T,>(
    asyncFn: () => Promise<T>,
    context?: string
  ): Promise<T | null> => {
    try {
      clearError();
      return await asyncFn();
    } catch (caught) {
      handleError(caught, context);
      return null;
    }
  }, [handleError, clearError]);
  
  return {
    error,
    setError,
    handleError,
    clearError,
    wrapAsync
  };
}

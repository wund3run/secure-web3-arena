
import { useState, useCallback } from "react";

/**
 * A hook for managing marketplace errors consistently
 * Provides methods for setting, clearing, and handling errors
 */
export function useMarketplaceError() {
  const [error, setError] = useState<Error | null>(null);
  
  const handleError = useCallback((error: unknown, context?: string) => {
    console.error(`Error in ${context || 'marketplace'}:`, error);
    
    if (error instanceof Error) {
      setError(error);
    } else if (typeof error === 'string') {
      setError(new Error(error));
    } else {
      setError(new Error('An unknown error occurred'));
    }
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

import { useState, useCallback } from "react";
import { withErrorHandling } from '@/utils/apiErrorHandler';

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
  }, []);
  
  const clearError = useCallback(() => {
    setError(null);
  }, []);
  
  return {
    error,
    setError,
    handleError,
    clearError,
    withErrorHandling
  };
}

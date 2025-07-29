import React, { useContext, useState, ReactNode } from "react";
import { toast } from "sonner";
import { ErrorContext, ErrorContextType } from './ErrorContext';
import { withErrorHandling } from '../../utils/apiErrorHandler';

interface ErrorProviderProps {
  children: ReactNode;
}

export function ErrorProvider({ children }: ErrorProviderProps) {
  const [error, setError] = useState<Error | null>(null);

  const handleError = (error: unknown, context?: string) => {
    console.error(`Error in ${context || 'application'}:`, error);
    
    let errorMessage = "An unexpected error occurred";
    let errorInstance: Error;
    
    if (error instanceof Error) {
      errorInstance = error;
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorInstance = new Error(error);
      errorMessage = error;
    } else {
      errorInstance = new Error('An unknown error occurred');
    }
    
    setError(errorInstance);
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    error,
    setError,
    handleError,
    clearError
  };

  return (
    <ErrorContext.Provider value={value}>
      {children}
    </ErrorContext.Provider>
  );
}

export function useError() {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
}

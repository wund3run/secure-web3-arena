import { createContext } from 'react';

export interface ErrorContextType {
  error: Error | null;
  setError: (error: Error | null) => void;
  handleError: (error: unknown, context?: string) => void;
  clearError: () => void;
}

export const ErrorContext = createContext<ErrorContextType | undefined>(undefined); 

import React from 'react';
import { ProductionErrorBoundary } from '@/components/error/production-error-boundary';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  return (
    <ProductionErrorBoundary fallbackComponent={fallback}>
      {children}
    </ProductionErrorBoundary>
  );
}

// Utility function for handling async errors
export function handleAsyncError(error: any, context?: string) {
  console.error(`Async error${context ? ` in ${context}` : ''}:`, error);
  
  // You can integrate with error tracking services here
  // Example: Sentry.captureException(error, { extra: { context } });
}

// Utility function for API error handling
export function handleApiError(error: any, defaultMessage: string = 'An error occurred') {
  if (error?.message) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return defaultMessage;
}

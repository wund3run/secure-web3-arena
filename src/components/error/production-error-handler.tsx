
import React from 'react';
import { EnhancedErrorBoundary } from './enhanced-error-boundary';
import { useLocation } from 'react-router-dom';

interface ProductionErrorHandlerProps {
  children: React.ReactNode;
}

export function ProductionErrorHandler({ children }: ProductionErrorHandlerProps) {
  const location = useLocation();

  // Custom error handling based on route
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Log error to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      console.error('Production Error:', {
        error: error.message,
        stack: error.stack,
        route: location.pathname,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      });
      
      // In a real app, send to error monitoring service like Sentry
      // Sentry.captureException(error, { extra: errorInfo });
    }
  };

  return (
    <EnhancedErrorBoundary 
      onReset={() => {
        // Clear any cached data that might be causing issues
        window.location.reload();
      }}
      routeFallback={true}
    >
      {children}
    </EnhancedErrorBoundary>
  );
}

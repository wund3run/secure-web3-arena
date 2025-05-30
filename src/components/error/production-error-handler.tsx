
import React from 'react';
import { EnhancedErrorBoundary } from './enhanced-error-boundary';
import { useLocation } from 'react-router-dom';

interface ProductionErrorHandlerProps {
  children: React.ReactNode;
}

// Inner component that uses useLocation - must be inside Router
function LocationAwareErrorHandler({ children }: ProductionErrorHandlerProps) {
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

// Outer component that doesn't use router hooks
export function ProductionErrorHandler({ children }: ProductionErrorHandlerProps) {
  // Basic error handling without location context
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Log error to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      console.error('Production Error:', {
        error: error.message,
        stack: error.stack,
        route: 'unknown', // Can't access location outside router
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

// Export the location-aware version for use inside Router
export { LocationAwareErrorHandler };

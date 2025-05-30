
import React from 'react';
import { EnhancedErrorBoundary } from './EnhancedErrorBoundary';

interface AppErrorBoundaryProps {
  children: React.ReactNode;
}

export function AppErrorBoundary({ children }: AppErrorBoundaryProps) {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Log error to external service in production
    console.error('Application Error:', error, errorInfo);
    
    // You could send this to error reporting services like:
    // - Sentry
    // - LogRocket
    // - Bugsnag
    // - Custom error endpoint
  };

  return (
    <EnhancedErrorBoundary onError={handleError}>
      {children}
    </EnhancedErrorBoundary>
  );
}

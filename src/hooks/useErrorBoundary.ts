
import { useState, useCallback } from 'react';
import { auditLogger } from '@/utils/security/AuditLogger';

interface ErrorInfo {
  message: string;
  stack?: string;
  componentStack?: string;
}

export function useErrorBoundary() {
  const [error, setError] = useState<ErrorInfo | null>(null);

  const captureError = useCallback((error: Error, errorInfo?: { componentStack: string }) => {
    const errorDetails: ErrorInfo = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo?.componentStack
    };

    setError(errorDetails);

    // Log error for monitoring
    auditLogger.log(
      'system_configuration_changed',
      'Application error captured',
      {
        error: errorDetails,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      },
      'high'
    );

    // In production, you might want to send this to an error reporting service
    console.error('Error captured:', errorDetails);
  }, []);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return { error, captureError, resetError };
}

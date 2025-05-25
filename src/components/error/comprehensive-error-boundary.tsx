
import React from 'react';
import { EnhancedErrorBoundary } from './enhanced-error-boundary';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EnhancedToastSystem } from '@/components/ui/enhanced-toast-system';

interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
  errorInfo?: React.ErrorInfo;
}

function ErrorFallback({ error, resetError, errorInfo }: ErrorFallbackProps) {
  const handleReport = () => {
    // In production, this would send error to monitoring service
    console.error('Error reported:', { error, errorInfo });
    EnhancedToastSystem.info(
      "Error Reported", 
      "Thank you for reporting this issue. Our team has been notified."
    );
  };

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="rounded-full bg-red-100 p-4">
        <AlertTriangle className="h-12 w-12 text-red-600" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Something went wrong</h2>
        <p className="text-muted-foreground max-w-md">
          We encountered an unexpected error. Our team has been automatically notified.
        </p>
      </div>

      <Alert variant="destructive" className="max-w-md">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          {error.message || "An unexpected error occurred"}
        </AlertDescription>
      </Alert>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={resetError}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>
        
        <Button 
          variant="outline" 
          onClick={handleReport}
          className="flex items-center gap-2"
        >
          <Bug className="h-4 w-4" />
          Report Issue
        </Button>
        
        <Button variant="outline" asChild>
          <Link to="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Go Home
          </Link>
        </Button>
      </div>

      {process.env.NODE_ENV === 'development' && errorInfo && (
        <details className="mt-6 max-w-2xl">
          <summary className="cursor-pointer text-sm font-medium mb-2">
            Developer Details
          </summary>
          <div className="text-left bg-muted p-4 rounded-md text-xs overflow-auto">
            <pre>{error.stack}</pre>
            <hr className="my-2" />
            <pre>{errorInfo.componentStack}</pre>
          </div>
        </details>
      )}
    </div>
  );
}

interface ComprehensiveErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
}

export function ComprehensiveErrorBoundary({ 
  children, 
  fallback: CustomFallback 
}: ComprehensiveErrorBoundaryProps) {
  return (
    <EnhancedErrorBoundary
      fallback={CustomFallback ? 
        (error, resetError, errorInfo) => 
          <CustomFallback error={error} resetError={resetError} errorInfo={errorInfo} /> 
        : undefined
      }
      onReset={() => {
        // Clear any cached data or state
        window.location.reload();
      }}
    >
      {children}
    </EnhancedErrorBoundary>
  );
}

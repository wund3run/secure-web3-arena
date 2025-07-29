import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface RouteErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function RouteErrorFallback({ error, resetErrorBoundary }: RouteErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
          <CardTitle>Something went wrong</CardTitle>
          <CardDescription>
            We encountered an error while loading this page. This has been reported to our team.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-3 rounded-md">
            <p className="text-sm font-mono text-muted-foreground">
              {error.message}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={resetErrorBoundary} className="flex-1">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface RouteErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<RouteErrorFallbackProps>;
}

export function RouteErrorBoundary({ children, fallback }: RouteErrorBoundaryProps) {
  return (
    <ErrorBoundary
      FallbackComponent={fallback || RouteErrorFallback}
      onError={(error, errorInfo) => {
        console.error('Route Error:', error, errorInfo);
        // In production, send to error reporting service
        if (import.meta.env.MODE === 'production') {
          // Example: sendErrorToService(error, errorInfo);
        }
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

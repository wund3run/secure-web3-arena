
import React from 'react';
import ErrorBoundary from '@/components/ui/error-boundary';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface MarketplaceErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onReset?: () => void;
}

export const MarketplaceErrorBoundary: React.FC<MarketplaceErrorBoundaryProps> = ({ 
  children, 
  fallback,
  onReset 
}) => {
  // Custom fallback UI specifically for marketplace components
  const defaultFallback = (
    <div className="p-6 rounded-lg border border-destructive/20 bg-background/95 shadow-sm">
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          We encountered an issue with the marketplace
        </AlertDescription>
      </Alert>
      
      <p className="text-sm text-muted-foreground mb-4">
        Something went wrong while loading this section. We've been notified and are working on a fix.
      </p>
      
      <Button 
        onClick={onReset} 
        variant="outline" 
        className="w-full"
        type="button"
      >
        <RefreshCw className="mr-2 h-4 w-4" /> Try Again
      </Button>
    </div>
  );

  return (
    <ErrorBoundary fallback={fallback || defaultFallback}>
      {children}
    </ErrorBoundary>
  );
};

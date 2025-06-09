
import React from 'react';
import { LoadingSpinner } from './loading-spinner';

interface PageLoaderProps {
  message?: string;
}

export function PageLoader({ message = "Loading..." }: PageLoaderProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinner size="lg" brand />
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

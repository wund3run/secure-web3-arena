
import React from 'react';
import { LoadingSpinner } from './loading-spinner';

interface PageLoaderProps {
  message?: string;
}

export function PageLoader({ message = "Loading..." }: PageLoaderProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <LoadingSpinner size="lg" text={message} />
    </div>
  );
}

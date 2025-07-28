
import React from 'react';

interface PageLoaderProps {
  message?: string;
}

export function PageLoader({ message = "Loading..." }: PageLoaderProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <img 
          src="/hawkly-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png" 
          alt="Hawkly Logo"
          className="h-16 w-16 object-contain bg-transparent animate-pulse"
          style={{ backgroundColor: 'transparent' }}
        />
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

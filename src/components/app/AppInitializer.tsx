
import React, { useState, useEffect } from "react";

interface AppInitializerProps {
  children: React.ReactNode;
}

// Dramatically simplified and faster app initialization
export const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    // Minimal initialization - show content almost immediately
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 50); // Reduced from 100ms to 50ms
    
    return () => clearTimeout(timer);
  }, []);

  if (appLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <img 
            src="/lovable-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png" 
            alt="Hawkly Logo"
            className="h-20 w-20 object-contain bg-transparent animate-pulse"
            style={{ backgroundColor: 'transparent' }}
            loading="eager"
          />
          <p className="text-sm text-muted-foreground">Welcome to Hawkly</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

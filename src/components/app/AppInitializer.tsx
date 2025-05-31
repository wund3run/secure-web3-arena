
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
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <img 
            src="/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png" 
            alt="Hawkly"
            className="h-16 w-16 mb-4"
            loading="eager"
          />
          <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

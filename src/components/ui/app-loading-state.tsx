
import React from "react";

interface AppLoadingProps {
  message?: string;
}

const AppLoadingState: React.FC<AppLoadingProps> = ({
  message = "Loading...",
}) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      <div className="flex flex-col items-center justify-center p-4 text-center">
        {/* Simplified loading with just the new logo */}
        <img 
          src="/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png" 
          alt="Hawkly Logo"
          className="h-16 w-16 object-contain mb-4"
          loading="eager"
        />
        
        {/* Simple spinner */}
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
        
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};

export default AppLoadingState;

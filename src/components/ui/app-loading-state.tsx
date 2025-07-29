
import React from "react";

interface AppLoadingProps {
  message?: string;
}

// Ultra-minimal loading state for fastest possible render
const AppLoadingState: React.FC<AppLoadingProps> = ({
  message = "Loading...",
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <img 
          src="/hawkly-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png" 
          alt="Hawkly Logo"
          className="h-20 w-20 object-contain bg-transparent animate-pulse"
          style={{ backgroundColor: 'transparent' }}
          loading="eager"
        />
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};

export default AppLoadingState;

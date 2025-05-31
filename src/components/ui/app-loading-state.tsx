
import React from "react";

interface AppLoadingProps {
  message?: string;
}

// Ultra-minimal loading state for fastest possible render
const AppLoadingState: React.FC<AppLoadingProps> = ({
  message = "Loading...",
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <img 
          src="/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png" 
          alt="Hawkly"
          className="h-16 w-16 mb-4"
          loading="eager"
        />
        <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-2"></div>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default AppLoadingState;


import React from "react";
import { HawklyLogo } from "@/components/layout/hawkly-logo";

interface AppLoadingProps {
  message?: string;
}

const AppLoadingState: React.FC<AppLoadingProps> = ({
  message = "Loading...",
}) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <HawklyLogo variant="large" className="mb-4" />
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{message}</p>
      </div>
    </div>
  );
};

export default AppLoadingState;

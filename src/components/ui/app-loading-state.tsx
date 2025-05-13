
import React from "react";
import { HawklyLogo } from "@/components/layout/hawkly-logo";
import LoadingTrivia from "@/components/ui/loading-trivia";

interface AppLoadingProps {
  message?: string;
}

const AppLoadingState: React.FC<AppLoadingProps> = ({
  message = "Loading Hawkly platform...",
}) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <HawklyLogo variant="large" className="mb-6" />
        <LoadingTrivia 
          message={message} 
          size="lg" 
        />
      </div>
    </div>
  );
};

export default AppLoadingState;

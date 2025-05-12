
import React from "react";
import { Loader2 } from "lucide-react";
import { HawklyLogo } from "@/components/layout/hawkly-logo";

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
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <p className="text-lg font-medium text-muted-foreground">{message}</p>
        <p className="text-sm text-muted-foreground/70 mt-2 max-w-md">
          Initializing security marketplace components and user interface...
        </p>
      </div>
    </div>
  );
};

export default AppLoadingState;

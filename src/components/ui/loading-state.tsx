
import React from "react";
import { Loader } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  fullPage?: boolean;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading...",
  size = "md",
  fullPage = false,
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-10 w-10",
  };

  const containerClasses = fullPage
    ? "flex flex-col items-center justify-center min-h-screen"
    : "flex flex-col items-center justify-center py-8";

  return (
    <div className={containerClasses}>
      <Loader className={`${sizeClasses[size]} animate-spin text-primary`} />
      {message && (
        <p className="text-muted-foreground mt-2 text-sm">{message}</p>
      )}
    </div>
  );
};

export default LoadingState;


import React from "react";

interface LoadingStateProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  fullPage?: boolean;
  showTrivia?: boolean;
}

const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading...",
  size = "md",
  fullPage = false,
  showTrivia = false,
}) => {
  const containerClasses = fullPage
    ? "flex flex-col items-center justify-center min-h-screen"
    : "flex flex-col items-center justify-center py-8";

  const logoSizes = {
    sm: "h-8 w-8",
    md: "h-12 w-12", 
    lg: "h-16 w-16"
  };

  return (
    <div className={containerClasses}>
      <img 
        src="/hawkly-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png" 
        alt="Hawkly Logo"
        className={`${logoSizes[size]} object-contain bg-transparent animate-pulse mb-4`}
        style={{ backgroundColor: 'transparent' }}
      />
      {message && (
        <p className="text-muted-foreground mt-2 text-sm text-center">{message}</p>
      )}
    </div>
  );
};

export default LoadingState;

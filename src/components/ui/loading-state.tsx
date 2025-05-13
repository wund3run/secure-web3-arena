
import React from "react";
import LoadingTrivia from "@/components/ui/loading-trivia";

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
  showTrivia = true,
}) => {
  if (showTrivia) {
    return <LoadingTrivia message={message} size={size} fullPage={fullPage} />;
  }
  
  // Fallback to simple loading spinner without trivia (for very short loading times)
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
      <div className="animate-spin rounded-full border-t-2 border-b-2 border-primary" style={{
        width: size === "sm" ? "1rem" : size === "md" ? "1.5rem" : "2.5rem",
        height: size === "sm" ? "1rem" : size === "md" ? "1.5rem" : "2.5rem"
      }}></div>
      {message && (
        <p className="text-muted-foreground mt-2 text-sm">{message}</p>
      )}
    </div>
  );
};

export default LoadingState;

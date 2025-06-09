
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
  
  // Fallback to simple loading spinner with Hawkly logo
  const containerClasses = fullPage
    ? "flex flex-col items-center justify-center min-h-screen"
    : "flex flex-col items-center justify-center py-8";

  return (
    <div className={containerClasses}>
      <img 
        src="/lovable-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png" 
        alt="Hawkly Logo"
        className="h-12 w-12 object-contain bg-transparent animate-pulse mb-4"
        style={{ backgroundColor: 'transparent' }}
      />
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

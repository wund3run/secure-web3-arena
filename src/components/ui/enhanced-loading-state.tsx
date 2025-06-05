
import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnhancedLoadingStateProps {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "skeleton" | "pulse" | "dots";
  message?: string;
  className?: string;
  fullPage?: boolean;
  showLogo?: boolean;
}

export function EnhancedLoadingState({
  size = "md",
  variant = "spinner",
  message,
  className,
  fullPage = false,
  showLogo = false
}: EnhancedLoadingStateProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12"
  };

  const containerClasses = {
    sm: "p-2",
    md: "p-4",
    lg: "p-6"
  };

  const containerClass = cn(
    "flex flex-col items-center justify-center",
    fullPage ? "min-h-screen" : containerClasses[size],
    className
  );

  if (variant === "skeleton") {
    return (
      <div className={cn("animate-pulse space-y-2", containerClasses[size], className)}>
        <div className="h-4 bg-muted rounded w-3/4"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
        <div className="h-4 bg-muted rounded w-5/6"></div>
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={containerClass}>
        <div className={cn("bg-primary rounded-full animate-pulse", sizeClasses[size])}></div>
        {message && <span className="ml-2 text-sm text-muted-foreground">{message}</span>}
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className={containerClass}>
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "bg-primary rounded-full animate-pulse",
                size === "sm" ? "h-1 w-1" : size === "md" ? "h-2 w-2" : "h-3 w-3"
              )}
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1s"
              }}
            />
          ))}
        </div>
        {message && (
          <p className="mt-2 text-sm text-muted-foreground text-center">{message}</p>
        )}
      </div>
    );
  }

  return (
    <div className={containerClass}>
      {showLogo && fullPage && (
        <img 
          src="/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png" 
          alt="Hawkly"
          className="h-12 w-12 mb-4"
          loading="eager"
        />
      )}
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
      {message && (
        <p className="mt-2 text-sm text-muted-foreground text-center">{message}</p>
      )}
    </div>
  );
}

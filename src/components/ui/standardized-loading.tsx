
import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface StandardizedLoadingProps {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "skeleton" | "pulse";
  message?: string;
  className?: string;
}

export function StandardizedLoading({
  size = "md",
  variant = "spinner",
  message,
  className
}: StandardizedLoadingProps) {
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
      <div className={cn("flex items-center justify-center", containerClasses[size], className)}>
        <div className={cn("bg-primary rounded-full animate-pulse", sizeClasses[size])}></div>
        {message && <span className="ml-2 text-sm text-muted-foreground">{message}</span>}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center justify-center", containerClasses[size], className)}>
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
      {message && (
        <p className="mt-2 text-sm text-muted-foreground text-center">{message}</p>
      )}
    </div>
  );
}

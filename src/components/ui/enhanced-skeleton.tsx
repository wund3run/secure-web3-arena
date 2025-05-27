
import React from "react";
import { cn } from "@/lib/utils";

interface EnhancedSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "card" | "text" | "avatar" | "button";
  animation?: "pulse" | "wave" | "shimmer";
  lines?: number;
}

export function EnhancedSkeleton({
  className,
  variant = "default",
  animation = "pulse",
  lines = 1,
  ...props
}: EnhancedSkeletonProps) {
  const variantClasses = {
    default: "bg-muted",
    card: "bg-muted/80 rounded-lg",
    text: "bg-muted/60 rounded",
    avatar: "bg-muted rounded-full",
    button: "bg-muted rounded-md"
  };

  const animationClasses = {
    pulse: "animate-pulse",
    wave: "animate-[wave_2s_ease-in-out_infinite]",
    shimmer: "animate-[shimmer_2s_ease-in-out_infinite] bg-gradient-to-r from-muted via-muted/50 to-muted"
  };

  if (variant === "text" && lines > 1) {
    return (
      <div className={cn("space-y-2", className)} {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-4",
              variantClasses[variant],
              animationClasses[animation],
              i === lines - 1 && "w-3/4" // Last line shorter
            )}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-md",
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      {...props}
    />
  );
}

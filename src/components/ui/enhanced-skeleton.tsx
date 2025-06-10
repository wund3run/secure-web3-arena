
import React from "react";
import { cn } from "@/lib/utils";

interface EnhancedSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "card" | "text" | "avatar" | "button";
  size?: "sm" | "md" | "lg";
  animation?: "pulse" | "shimmer" | "wave";
}

export function EnhancedSkeleton({
  className,
  variant = "default",
  size = "md",
  animation = "pulse",
  ...props
}: EnhancedSkeletonProps) {
  const variantClasses = {
    default: "bg-muted",
    card: "bg-muted/80 rounded-lg",
    text: "bg-muted/60 rounded",
    avatar: "bg-muted rounded-full",
    button: "bg-muted rounded-md",
  };

  const sizeClasses = {
    sm: "h-3",
    md: "h-4", 
    lg: "h-6",
  };

  const animationClasses = {
    pulse: "animate-pulse",
    shimmer: "animate-shimmer-security",
    wave: "animate-trust-wave",
  };

  return (
    <div
      className={cn(
        "rounded-md",
        variantClasses[variant],
        sizeClasses[size],
        animationClasses[animation],
        className
      )}
      {...props}
    />
  );
}

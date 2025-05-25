
import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

export function LoadingSpinner({ size = "md", className, text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="flex flex-col items-center space-y-2">
        <Loader2 className={cn("animate-spin", sizeClasses[size])} />
        {text && (
          <p className="text-sm text-muted-foreground" role="status" aria-live="polite">
            {text}
          </p>
        )}
      </div>
    </div>
  );
}

interface SkeletonProps {
  className?: string;
  count?: number;
  height?: string;
}

export function Skeleton({ className, count = 1, height = "h-4" }: SkeletonProps) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "loading-skeleton rounded",
            height,
            "w-full",
            className
          )}
          role="status"
          aria-label="Loading content"
        />
      ))}
    </div>
  );
}

interface CardSkeletonProps {
  count?: number;
  className?: string;
}

export function CardSkeleton({ count = 3, className }: CardSkeletonProps) {
  return (
    <div className={cn("grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 space-y-3"
          role="status"
          aria-label={`Loading card ${index + 1}`}
        >
          <Skeleton height="h-6" className="w-3/4" />
          <Skeleton height="h-4" count={2} />
          <div className="flex space-x-2">
            <Skeleton height="h-8" className="w-16" />
            <Skeleton height="h-8" className="w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export function TableSkeleton({ rows = 5, columns = 4, className }: TableSkeletonProps) {
  return (
    <div className={cn("w-full", className)} role="status" aria-label="Loading table">
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {/* Header */}
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={`header-${index}`} height="h-8" className="w-full" />
        ))}
        
        {/* Rows */}
        {Array.from({ length: rows }).map((rowIndex) =>
          Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton 
              key={`row-${rowIndex}-col-${colIndex}`} 
              height="h-6" 
              className="w-full" 
            />
          ))
        )}
      </div>
    </div>
  );
}

interface PageLoadingProps {
  message?: string;
  className?: string;
}

export function PageLoading({ message = "Loading...", className }: PageLoadingProps) {
  return (
    <div className={cn("flex items-center justify-center min-h-[400px]", className)}>
      <LoadingSpinner size="lg" text={message} />
    </div>
  );
}

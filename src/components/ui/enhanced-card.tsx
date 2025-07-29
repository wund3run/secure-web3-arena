
import React from "react";
import { cn } from "@/lib/utils";

interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outlined" | "elevated" | "security" | "trust";
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
}

export function EnhancedCard({
  className,
  variant = "default",
  size = "md",
  interactive = false,
  children,
  ...props
}: EnhancedCardProps) {
  const variantClasses = {
    default: "bg-card text-card-foreground border border-border",
    outlined: "bg-background border-2 border-border hover:border-primary/50",
    elevated: "bg-card shadow-security border-0",
    security: "bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 shadow-security",
    trust: "bg-gradient-to-br from-secondary/5 to-accent/5 border border-secondary/20 shadow-trust",
  };

  const sizeClasses = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  const interactiveClasses = interactive
    ? "cursor-pointer transition-all duration-200 hover:shadow-security-lg hover:scale-[1.02] active:scale-[0.98]"
    : "";

  return (
    <div
      className={cn(
        "rounded-lg transition-colors",
        variantClasses[variant],
        sizeClasses[size],
        interactiveClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface EnhancedCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  centered?: boolean;
}

export function EnhancedCardHeader({
  className,
  centered = false,
  ...props
}: EnhancedCardHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col space-y-1.5 pb-2",
        centered && "text-center items-center",
        className
      )}
      {...props}
    />
  );
}

interface EnhancedCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: "sm" | "md" | "lg";
  gradient?: boolean;
}

export function EnhancedCardTitle({
  className,
  size = "md",
  gradient = false,
  ...props
}: EnhancedCardTitleProps) {
  const sizeClasses = {
    sm: "text-sm font-medium",
    md: "text-lg font-semibold",
    lg: "text-xl font-bold",
  };

  const gradientClass = gradient ? "bg-brand-gradient bg-clip-text text-transparent" : "";

  return (
    <h3
      className={cn(
        "leading-none tracking-tight",
        sizeClasses[size],
        gradientClass,
        className
      )}
      {...props}
    />
  );
}

export function EnhancedCardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("pt-0", className)} {...props} />;
}

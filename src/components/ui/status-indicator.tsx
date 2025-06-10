
import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, AlertCircle, Clock, XCircle, Loader2 } from "lucide-react";

interface StatusIndicatorProps {
  status: "success" | "warning" | "error" | "pending" | "loading";
  message?: string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

export function StatusIndicator({
  status,
  message,
  size = "md",
  showIcon = true,
  className,
}: StatusIndicatorProps) {
  const statusConfig = {
    success: {
      icon: CheckCircle,
      color: "text-security-low",
      bgColor: "bg-security-low/10",
      borderColor: "border-security-low/20",
    },
    warning: {
      icon: AlertCircle,
      color: "text-security-medium",
      bgColor: "bg-security-medium/10",
      borderColor: "border-security-medium/20",
    },
    error: {
      icon: XCircle,
      color: "text-security-critical",
      bgColor: "bg-security-critical/10",
      borderColor: "border-security-critical/20",
    },
    pending: {
      icon: Clock,
      color: "text-security-high",
      bgColor: "bg-security-high/10",
      borderColor: "border-security-high/20",
    },
    loading: {
      icon: Loader2,
      color: "text-security-info",
      bgColor: "bg-security-info/10",
      borderColor: "border-security-info/20",
    },
  };

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border font-medium",
        config.color,
        config.bgColor,
        config.borderColor,
        sizeClasses[size],
        className
      )}
    >
      {showIcon && (
        <Icon 
          className={cn(
            iconSizes[size],
            status === "loading" && "animate-spin"
          )} 
        />
      )}
      {message && <span>{message}</span>}
    </div>
  );
}

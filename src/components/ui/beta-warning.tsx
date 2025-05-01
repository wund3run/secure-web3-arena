
import React from "react";
import { AlertCircle, Info, X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const betaWarningVariants = cva(
  "rounded-lg p-3 text-sm flex items-start w-full relative",
  {
    variants: {
      variant: {
        default: "bg-amber-50 border border-amber-200 text-amber-800",
        subtle: "bg-amber-50/50 border border-amber-100 text-amber-700",
        minimal: "bg-transparent border border-amber-200 text-amber-700",
        info: "bg-blue-50 border border-blue-200 text-blue-800",
      },
      size: {
        default: "p-4",
        sm: "p-2 text-xs",
        lg: "p-6 text-base",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BetaWarningProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof betaWarningVariants> {
  title?: string;
  showIcon?: boolean;
  iconType?: "alert" | "info";
  dismissable?: boolean;
  onDismiss?: () => void;
}

export function BetaWarning({
  className,
  variant,
  size,
  title = "Beta Feature",
  children,
  showIcon = true,
  iconType = "alert",
  dismissable = false,
  onDismiss,
  ...props
}: BetaWarningProps) {
  const Icon = iconType === "alert" ? AlertCircle : Info;
  
  return (
    <div
      className={cn(betaWarningVariants({ variant, size }), className)}
      {...props}
    >
      {showIcon && (
        <Icon className={cn(
          "h-5 w-5 mr-3 flex-shrink-0 mt-0.5",
          variant === "info" ? "text-blue-500" : "text-amber-500"
        )} />
      )}
      <div className="flex-1">
        {title && <h4 className="font-medium mb-1">{title}</h4>}
        <div className={cn(title ? variant === "info" ? "text-blue-700" : "text-amber-700" : "")}>{children}</div>
      </div>
      
      {dismissable && onDismiss && (
        <button 
          onClick={onDismiss}
          className={cn(
            "absolute top-2 right-2 p-1 rounded-full hover:bg-black/5",
            variant === "info" ? "text-blue-700" : "text-amber-700"
          )}
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

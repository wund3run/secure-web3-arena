
import React from "react";
import { AlertCircle, Info } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const betaWarningVariants = cva(
  "rounded-lg p-3 text-sm flex items-start w-full",
  {
    variants: {
      variant: {
        default: "bg-amber-50 border border-amber-200 text-amber-800",
        subtle: "bg-amber-50/50 border border-amber-100 text-amber-700",
        minimal: "bg-transparent border border-amber-200 text-amber-700",
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
}

export function BetaWarning({
  className,
  variant,
  size,
  title = "Beta Feature",
  children,
  showIcon = true,
  iconType = "alert",
  ...props
}: BetaWarningProps) {
  const Icon = iconType === "alert" ? AlertCircle : Info;
  
  return (
    <div
      className={cn(betaWarningVariants({ variant, size }), className)}
      {...props}
    >
      {showIcon && (
        <Icon className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0 mt-0.5" />
      )}
      <div>
        {title && <h4 className="font-medium mb-1">{title}</h4>}
        <div className={cn(title ? "text-amber-700" : "")}>{children}</div>
      </div>
    </div>
  );
}

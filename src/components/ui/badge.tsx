import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  [
    "inline-flex items-center",
    "rounded-full border-none",
    "bg-[var(--elevation1)] text-accent-primary",
    "px-[1em] py-[0.22em] font-medium text-[0.95em]",
    "transition-hover",
    "font-[Space Grotesk,sans-serif]",
    "tracking-normal",
    "select-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-[var(--elevation1)] text-accent-primary",
        accent: "bg-accent-primary text-white",
        secondary: "bg-surface text-accent-secondary",
        outline: "bg-transparent border border-accent-primary text-accent-primary",
        success: "bg-success text-white",
        warning: "bg-warning text-inverse",
        error: "bg-error text-white",
      },
      size: {
        sm: "text-xs px-2 py-1",
        md: "text-sm px-3 py-1.5",
        lg: "text-base px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof badgeVariants>, 'variant'> {
  variant?: "default" | "accent" | "secondary" | "outline" | "success" | "warning" | "error" | "destructive" | null | undefined;
  size?: "sm" | "md" | "lg";
}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  // Handle legacy "destructive" variant used in older code
  let safeVariant = variant;
  if (variant === "destructive") {
    safeVariant = "error";
  }
  
  return (
    <div className={cn(badgeVariants({ variant: safeVariant as any, size }), className)} {...props} />
  )
}

export { Badge }

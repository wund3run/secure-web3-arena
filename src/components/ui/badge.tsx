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
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge }

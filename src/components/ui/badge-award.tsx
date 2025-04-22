
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeAwardVariants = cva(
  "inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        expert: "bg-web3-purple text-white",
        verified: "bg-web3-teal text-white",
        rookie: "bg-web3-orange text-white",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-8 text-xs",
        sm: "h-6 text-xs",
        lg: "h-10 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeAwardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeAwardVariants> {}

function BadgeAward({ className, variant, size, ...props }: BadgeAwardProps) {
  return (
    <div className={cn(badgeAwardVariants({ variant, size }), className)} {...props} />
  )
}

export { BadgeAward, badgeAwardVariants }

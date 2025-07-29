import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"; import { buttonVariants } from "./button-variants"


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<VariantProps<typeof buttonVariants>, 'variant'> {
  asChild?: boolean;
  variant?: "link" | "default" | "secondary" | "destructive" | "ghost" | "outline" | "error" | null | undefined;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    // Handle legacy "error" variant used in older code
    let safeVariant = variant;
    if (variant === "error") {
      safeVariant = "destructive";
    }
    
    return (
      <Comp
        className={cn(buttonVariants({ variant: safeVariant as any, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

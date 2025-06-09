
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden transition-all duration-300 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "gradient-primary text-white hover:shadow-[0_8px_30px_rgba(138,115,226,0.3)] hover:-translate-y-0.5 shadow-sm",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-primary/30 hover:shadow-[0_4px_20px_rgba(138,115,226,0.1)]",
        secondary:
          "bg-gradient-to-r from-brand-secondary to-brand-secondary-light text-white hover:shadow-[0_8px_30px_rgba(51,195,240,0.3)] hover:-translate-y-0.5 shadow-sm",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        brand: "bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-size-200 text-white hover:shadow-[0_8px_40px_rgba(138,115,226,0.4)] hover:-translate-y-1 hover:scale-105 animate-[gradientShift_3s_ease-in-out_infinite]",
        accent: "bg-gradient-to-r from-brand-accent to-brand-accent-light text-white hover:shadow-[0_8px_30px_rgba(255,87,34,0.3)] hover:-translate-y-0.5 shadow-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

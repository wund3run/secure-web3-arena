
import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const skeletonVariants = cva(
  "animate-pulse rounded-md bg-muted",
  {
    variants: {
      variant: {
        default: "bg-muted",
        card: "bg-muted/70 border border-border/20",
        text: "bg-muted/50 h-4",
        avatar: "bg-muted rounded-full",
        button: "bg-muted/80 h-10"
      },
      size: {
        sm: "h-4",
        md: "h-6", 
        lg: "h-8",
        xl: "h-12"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

export interface EnhancedSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

const EnhancedSkeleton = React.forwardRef<HTMLDivElement, EnhancedSkeletonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(skeletonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

EnhancedSkeleton.displayName = "EnhancedSkeleton";

export { EnhancedSkeleton, skeletonVariants };

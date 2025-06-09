
import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const skeletonVariants = cva(
  "animate-pulse rounded-md bg-muted",
  {
    variants: {
      variant: {
        default: "bg-muted",
        shimmer: "bg-gradient-to-r from-muted via-muted-foreground/10 to-muted bg-[length:200%_100%] animate-[shimmer_2s_infinite]",
        pulse: "animate-pulse bg-muted",
        wave: "bg-gradient-to-r from-transparent via-muted to-transparent bg-[length:200%_100%] animate-[wave_2s_infinite]",
        card: "bg-muted border border-border/50 shadow-sm"
      },
      speed: {
        slow: "animate-[pulse_3s_ease-in-out_infinite]",
        normal: "animate-[pulse_2s_ease-in-out_infinite]",
        fast: "animate-[pulse_1s_ease-in-out_infinite]"
      }
    },
    defaultVariants: {
      variant: "default",
      speed: "normal"
    }
  }
);

export interface EnhancedSkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  lines?: number;
  avatar?: boolean;
  card?: boolean;
}

const EnhancedSkeleton = React.forwardRef<HTMLDivElement, EnhancedSkeletonProps>(
  ({ className, variant, speed, lines, avatar, card, ...props }, ref) => {
    if (lines) {
      return (
        <div className="space-y-2">
          {Array.from({ length: lines }).map((_, i) => (
            <div
              key={i}
              className={cn(
                skeletonVariants({ variant, speed }),
                "h-4",
                i === lines - 1 && "w-3/4", // Last line is shorter
                className
              )}
            />
          ))}
        </div>
      );
    }

    if (avatar) {
      return (
        <div className="flex items-center space-x-4">
          <div className={cn(skeletonVariants({ variant, speed }), "h-12 w-12 rounded-full")} />
          <div className="space-y-2 flex-1">
            <div className={cn(skeletonVariants({ variant, speed }), "h-4 w-1/2")} />
            <div className={cn(skeletonVariants({ variant, speed }), "h-4 w-1/3")} />
          </div>
        </div>
      );
    }

    if (card) {
      return (
        <div className="space-y-4 p-6 border rounded-lg">
          <div className={cn(skeletonVariants({ variant, speed }), "h-6 w-3/4")} />
          <div className="space-y-2">
            <div className={cn(skeletonVariants({ variant, speed }), "h-4 w-full")} />
            <div className={cn(skeletonVariants({ variant, speed }), "h-4 w-5/6")} />
            <div className={cn(skeletonVariants({ variant, speed }), "h-4 w-4/6")} />
          </div>
          <div className="flex space-x-2 pt-4">
            <div className={cn(skeletonVariants({ variant, speed }), "h-8 w-20 rounded")} />
            <div className={cn(skeletonVariants({ variant, speed }), "h-8 w-16 rounded")} />
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant, speed }), className)}
        {...props}
      />
    );
  }
);

EnhancedSkeleton.displayName = "EnhancedSkeleton";

export { EnhancedSkeleton, skeletonVariants };

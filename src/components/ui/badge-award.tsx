
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeAwardVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground",
        destructive:
          "bg-destructive text-destructive-foreground",
        outline:
          "text-foreground border border-input",
        ghost:
          "bg-muted/50 text-foreground",
        rookie:
          "bg-muted text-muted-foreground",
        verified:
          "bg-secondary/20 text-secondary border border-secondary/30",
        expert:
          "bg-primary/20 text-primary border border-primary/30",
        elite:
          "bg-web3-orange/20 text-web3-orange border border-web3-orange/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeAwardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeAwardVariants> {}

function BadgeAward({ className, variant, ...props }: BadgeAwardProps) {
  return (
    <div className={cn(badgeAwardVariants({ variant }), className)} {...props} />
  );
}

export { BadgeAward, badgeAwardVariants };

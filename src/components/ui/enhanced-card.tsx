
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const enhancedCardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300",
  {
    variants: {
      variant: {
        default: "hover:shadow-md",
        elevated: "shadow-lg hover:shadow-xl hover:-translate-y-1",
        interactive: "cursor-pointer hover:shadow-lg hover:-translate-y-0.5 hover:border-primary/50",
        minimal: "border-0 shadow-none hover:shadow-sm",
        outlined: "border-2 hover:border-primary/50 hover:shadow-md",
        gradient: "bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-primary/20 hover:shadow-lg"
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
        xl: "p-10"
      }
    },
    defaultVariants: {
      variant: "default",
      padding: "default"
    }
  }
);

export interface EnhancedCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof enhancedCardVariants> {
  hover?: boolean;
  glow?: boolean;
}

const EnhancedCard = React.forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ className, variant, padding, hover = false, glow = false, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          enhancedCardVariants({ variant, padding }),
          hover && "hover:scale-105",
          glow && "hover:shadow-primary/20",
          className
        )}
        {...props}
      />
    );
  }
);

EnhancedCard.displayName = "EnhancedCard";

// Enhanced Card Header with better spacing and typography
const EnhancedCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    gradient?: boolean;
    centered?: boolean;
  }
>(({ className, gradient = false, centered = false, ...props }, ref) => (
  <CardHeader
    ref={ref}
    className={cn(
      "space-y-2",
      gradient && "bg-gradient-to-r from-primary/10 to-secondary/10 rounded-t-lg -m-6 mb-6 p-6",
      centered && "text-center",
      className
    )}
    {...props}
  />
));

EnhancedCardHeader.displayName = "EnhancedCardHeader";

// Enhanced Card Title with better typography
const EnhancedCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    size?: "sm" | "default" | "lg" | "xl";
    gradient?: boolean;
  }
>(({ className, size = "default", gradient = false, ...props }, ref) => {
  const sizeClasses = {
    sm: "text-lg",
    default: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl"
  };

  return (
    <CardTitle
      ref={ref}
      className={cn(
        "font-semibold leading-tight tracking-tight",
        sizeClasses[size],
        gradient && "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent",
        className
      )}
      {...props}
    />
  );
});

EnhancedCardTitle.displayName = "EnhancedCardTitle";

// Enhanced Card Description with better styling
const EnhancedCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    muted?: boolean;
  }
>(({ className, muted = true, ...props }, ref) => (
  <CardDescription
    ref={ref}
    className={cn(
      "leading-relaxed",
      muted ? "text-muted-foreground" : "text-foreground",
      className
    )}
    {...props}
  />
));

EnhancedCardDescription.displayName = "EnhancedCardDescription";

// Enhanced Card Content with better spacing
const EnhancedCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    spacing?: "sm" | "default" | "lg";
  }
>(({ className, spacing = "default", ...props }, ref) => {
  const spacingClasses = {
    sm: "space-y-3",
    default: "space-y-4",
    lg: "space-y-6"
  };

  return (
    <CardContent
      ref={ref}
      className={cn(spacingClasses[spacing], className)}
      {...props}
    />
  );
});

EnhancedCardContent.displayName = "EnhancedCardContent";

// Enhanced Card Footer with better styling
const EnhancedCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    border?: boolean;
    centered?: boolean;
  }
>(({ className, border = false, centered = false, ...props }, ref) => (
  <CardFooter
    ref={ref}
    className={cn(
      "gap-2",
      border && "border-t pt-6",
      centered && "justify-center",
      className
    )}
    {...props}
  />
));

EnhancedCardFooter.displayName = "EnhancedCardFooter";

export {
  EnhancedCard,
  EnhancedCardHeader,
  EnhancedCardTitle,
  EnhancedCardDescription,
  EnhancedCardContent,
  EnhancedCardFooter,
  enhancedCardVariants
};

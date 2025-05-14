
import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "card" | "text";
}

function Skeleton({
  className,
  variant = "default",
  ...props
}: SkeletonProps) {
  const variantClasses = {
    default: "bg-muted",
    card: "bg-muted/80",
    text: "bg-muted/60",
  };

  return (
    <div
      className={cn(
        "animate-pulse rounded-md", 
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }

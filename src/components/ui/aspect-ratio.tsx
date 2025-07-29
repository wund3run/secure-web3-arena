
import * as React from "react"
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
import { cn } from "@/lib/utils"

interface AspectRatioProps extends React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {
  className?: string;
  fallbackContent?: React.ReactNode;
}

const AspectRatio = React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  AspectRatioProps
>(({ className, fallbackContent, children, ...props }, ref) => (
  <div className={cn("relative w-full overflow-hidden", className)}>
    <AspectRatioPrimitive.Root 
      ref={ref} 
      className="w-full h-full"
      {...props}
    >
      {children || fallbackContent}
    </AspectRatioPrimitive.Root>
  </div>
))
AspectRatio.displayName = "AspectRatio"

export { AspectRatio }

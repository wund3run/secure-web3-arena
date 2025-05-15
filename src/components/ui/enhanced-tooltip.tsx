
import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface EnhancedTooltipProps {
  content: React.ReactNode;
  children?: React.ReactNode;
  showIcon?: boolean;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  className?: string;
  iconClassName?: string;
  delay?: number;
  id?: string;
}

/**
 * Enhanced tooltip component for providing contextual help and information
 * Provides a more user-friendly interface than the basic tooltip
 */
export function EnhancedTooltip({ 
  content, 
  children, 
  showIcon = true, 
  side = "top", 
  align = "center",
  className = "",
  iconClassName = "",
  delay = 300,
  id
}: EnhancedTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={delay}>
        <TooltipTrigger asChild id={id}>
          {children || (showIcon && (
            <Info 
              className={`h-4 w-4 text-muted-foreground cursor-help inline-block ${iconClassName}`} 
              aria-label="More information" 
            />
          ))}
        </TooltipTrigger>
        <TooltipContent 
          side={side} 
          align={align}
          className={`max-w-xs ${className}`}
          role="tooltip"
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

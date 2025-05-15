
import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface EnhancedTooltipProps {
  content: React.ReactNode;
  children?: React.ReactNode;
  showIcon?: boolean;
  side?: "top" | "right" | "bottom" | "left";
}

export function EnhancedTooltip({ content, children, showIcon = true, side = "top" }: EnhancedTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          {children || (showIcon && <Info className="h-4 w-4 text-muted-foreground cursor-help inline-block" />)}
        </TooltipTrigger>
        <TooltipContent side={side} className="max-w-xs">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

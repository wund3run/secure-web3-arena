
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface EnhancedTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
  side?: "top" | "right" | "bottom" | "left";
  showIcon?: boolean;
  className?: string;
  iconClassName?: string;
  iconSize?: number;
}

export function EnhancedTooltip({
  content,
  children,
  delay = 300,
  side = "top",
  showIcon = false,
  className = "",
  iconClassName = "",
  iconSize = 16,
}: EnhancedTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TooltipProvider delayDuration={delay}>
      <Tooltip open={isOpen} onOpenChange={setIsOpen}>
        <TooltipTrigger asChild>
          <div className="inline-flex items-center gap-1" tabIndex={0} role="button">
            {children}
            {showIcon && (
              <Info 
                className={`text-muted-foreground cursor-help ${iconClassName}`} 
                size={iconSize}
                aria-hidden="true"
              />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent 
          side={side} 
          sideOffset={5} 
          className={`z-50 max-w-xs bg-background/95 backdrop-blur-sm border border-border shadow-md rounded-md p-3 text-sm ${className}`}
          role="tooltip"
        >
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

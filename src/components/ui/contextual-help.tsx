
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HelpCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContextualHelpProps {
  title: string;
  content: string;
  placement?: "top" | "bottom" | "left" | "right";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function ContextualHelp({ 
  title, 
  content, 
  placement = "top",
  className,
  size = "sm"
}: ContextualHelpProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5", 
    lg: "h-6 w-6"
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn("h-auto w-auto p-1 text-muted-foreground hover:text-foreground", className)}
        >
          <HelpCircle className={sizeClasses[size]} />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0" 
        side={placement}
        align="start"
      >
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-medium text-sm">{title}</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface QuickTooltipProps {
  content: string;
  children: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
}

export function QuickTooltip({ content, children, placement = "top" }: QuickTooltipProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent 
        className="px-3 py-2 text-sm bg-foreground text-background border-none shadow-md"
        side={placement}
        align="center"
      >
        {content}
      </PopoverContent>
    </Popover>
  );
}

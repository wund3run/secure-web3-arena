
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Compare } from "../icons/Compare";
import { cn } from "@/lib/utils";

interface CompareButtonProps extends ButtonProps {
  selected?: boolean;
  serviceCount?: number;
  count?: number;
  onCompare?: () => void;
  touchFriendly?: boolean;
}

export function CompareButton({ 
  selected = false, 
  serviceCount = 0,
  count = 0,
  className,
  children,
  onCompare,
  touchFriendly = false,
  ...props 
}: CompareButtonProps) {
  // Calculate which count to use (prefer serviceCount for backward compatibility)
  const displayCount = serviceCount || count;

  // Handle click event including onCompare callback if provided
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onCompare) {
      onCompare();
    }
    // Allow other click handlers to run if they exist
    if (props.onClick) {
      props.onClick(e);
    }
  };
  
  return (
    <Button
      variant={selected ? "secondary" : "outline"}
      size={touchFriendly ? "default" : "sm"}
      className={cn(
        "flex items-center gap-1.5", 
        selected ? "bg-primary/10" : "",
        touchFriendly ? "py-3 px-4" : "", 
        className
      )}
      onClick={handleClick}
      aria-pressed={selected}
      aria-label={selected ? "Remove from comparison" : "Add to comparison"}
      {...props}
    >
      <Compare className={touchFriendly ? "h-5 w-5" : "h-4 w-4"} aria-hidden="true" />
      <span>{children || "Compare"}</span>
      {displayCount > 0 && (
        <span 
          className={cn(
            "inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground",
            touchFriendly ? "h-6 w-6 text-sm" : "h-5 w-5 text-xs"
          )}
          aria-label={`${displayCount} ${displayCount === 1 ? 'item' : 'items'} selected`}
        >
          {displayCount}
        </span>
      )}
    </Button>
  );
}

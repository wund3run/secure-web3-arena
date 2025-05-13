
import { Button, ButtonProps } from "@/components/ui/button";
import { Compare } from "../icons/Compare";

interface CompareButtonProps extends ButtonProps {
  selected?: boolean;
  serviceCount?: number;
  count?: number; // Add count prop
  onCompare?: () => void; // Add onCompare prop
}

export function CompareButton({ 
  selected = false, 
  serviceCount = 0,
  count = 0, // Use new count prop
  className,
  children,
  onCompare, // Add onCompare prop
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
      size="sm"
      className={`flex items-center gap-1.5 ${selected ? 'bg-primary/10' : ''} ${className || ''}`}
      onClick={handleClick} // Use the new handler
      {...props}
    >
      <Compare className="h-4 w-4" />
      {children || "Compare"}
      {displayCount > 0 && (
        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs">
          {displayCount}
        </span>
      )}
    </Button>
  );
}

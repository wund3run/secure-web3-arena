
import { Button, ButtonProps } from "@/components/ui/button";
import { Compare } from "../icons/Compare";

interface CompareButtonProps extends ButtonProps {
  selected?: boolean;
  serviceCount?: number;
}

export function CompareButton({ 
  selected = false, 
  serviceCount = 0,
  className,
  children,
  ...props 
}: CompareButtonProps) {
  return (
    <Button
      variant={selected ? "secondary" : "outline"}
      size="sm"
      className={`flex items-center gap-1.5 ${selected ? 'bg-primary/10' : ''} ${className || ''}`}
      {...props}
    >
      <Compare className="h-4 w-4" />
      {children || "Compare"}
      {serviceCount > 0 && (
        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs">
          {serviceCount}
        </span>
      )}
    </Button>
  );
}

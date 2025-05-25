
import { Badge } from "@/components/ui/badge";
import { Bell } from "lucide-react";

interface RealtimeNotificationBadgeProps {
  count: number;
  onClick?: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary";
}

export function RealtimeNotificationBadge({ 
  count, 
  onClick, 
  variant = "destructive" 
}: RealtimeNotificationBadgeProps) {
  if (count === 0) return null;

  return (
    <div className="relative inline-flex">
      <Bell 
        className="h-5 w-5 cursor-pointer text-muted-foreground hover:text-foreground transition-colors" 
        onClick={onClick}
      />
      <Badge 
        variant={variant} 
        className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs animate-pulse"
      >
        {count > 99 ? '99+' : count}
      </Badge>
    </div>
  );
}

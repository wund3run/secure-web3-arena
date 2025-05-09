
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface MobileCardFooterProps {
  onClick: (e: React.MouseEvent) => void;
}

export function MobileCardFooter({ onClick }: MobileCardFooterProps) {
  return (
    <Button 
      className="w-full touch-manipulation h-8 text-sm z-10"
      variant="default"
      onClick={onClick}
    >
      View Details
      <ArrowRight className="ml-1 h-3.5 w-3.5" />
    </Button>
  );
}

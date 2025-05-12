
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye } from "lucide-react";

interface MobileCardFooterProps {
  onClick: (e: React.MouseEvent) => void;
}

export function MobileCardFooter({ onClick }: MobileCardFooterProps) {
  return (
    <Button 
      className="w-full touch-manipulation h-8 text-sm z-10 flex items-center justify-center"
      variant="default"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(e);
      }}
      title="View detailed service information"
    >
      <Eye className="mr-1.5 h-3.5 w-3.5 opacity-80" />
      Service Details
      <ArrowRight className="ml-1 h-3.5 w-3.5" />
    </Button>
  );
}


import { Button } from "@/components/ui/button";
import { ArrowRight, Eye } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface MobileCardFooterProps {
  onClick: (e: React.MouseEvent) => void;
}

export function MobileCardFooter({ onClick }: MobileCardFooterProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            className="w-full touch-manipulation h-10 text-sm z-10 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-md transition-all group focus:ring-2 focus:ring-primary/50 focus:outline-none"
            variant="default"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClick(e);
            }}
            title="View detailed service information"
            aria-label="View service details"
          >
            <Eye className="mr-1.5 h-3.5 w-3.5 opacity-80" aria-hidden="true" />
            <span className="hidden xs:inline">View Details</span>
            <span className="xs:hidden">View Details</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Get comprehensive information about this service</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

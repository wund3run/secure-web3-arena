
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
            className="w-full touch-manipulation h-10 text-sm z-10 flex items-center justify-center hover:shadow-md transition-all group"
            variant="default"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClick(e);
            }}
            title="View detailed service information"
            aria-label="View service details"
          >
            <Eye className="mr-1.5 h-3.5 w-3.5 opacity-80" />
            <span className="hidden xs:inline">View Service Details</span>
            <span className="xs:hidden">View Details</span>
            <ArrowRight className="ml-1 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Get comprehensive information about this service</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

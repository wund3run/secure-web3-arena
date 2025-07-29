
import { memo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface ServiceCardFooterProps {
  pricing: {
    amount: number;
    currency: string;
  };
  onViewDetails: (e: React.MouseEvent) => void;
}

export const ServiceCardFooter = memo(function ServiceCardFooter({
  pricing,
  onViewDetails
}: ServiceCardFooterProps) {
  // Memoize the click handler
  const handleViewDetailsClick = useCallback((e: React.MouseEvent) => {
    onViewDetails(e);
  }, [onViewDetails]);

  return (
    <div className="p-5 pt-0 mt-auto border-t border-border/30">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 font-medium">
            Basic
          </Badge>
        </div>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="default" 
                size="sm" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white z-10 flex items-center hover:shadow-sm transition-all group focus:ring-2 focus:ring-primary/50 focus:outline-none"
                onClick={handleViewDetailsClick}
                title="View detailed service information"
                aria-label="View service details"
              >
                <Eye className="mr-1.5 h-3.5 w-3.5 opacity-80" aria-hidden="true" />
                <span>View Details</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Get comprehensive information about this service</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
});

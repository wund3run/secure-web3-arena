
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, InfoIcon } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface ServiceCardFooterProps {
  pricing: {
    amount: number;
    currency: string;
  };
  onViewDetails: (e: React.MouseEvent) => void;
}

export function ServiceCardFooter({
  pricing,
  onViewDetails
}: ServiceCardFooterProps) {
  return (
    <div className="p-5 pt-0 mt-auto border-t border-border/30">
      <div className="w-full flex justify-between items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                <div className="font-bold text-lg text-gradient bg-gradient-to-r from-primary to-primary/80">
                  {pricing.amount} {pricing.currency}
                </div>
                <InfoIcon className="h-3.5 w-3.5 ml-1 text-muted-foreground" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">Starting price for this security service</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="default" 
                size="sm" 
                className="group-hover:bg-primary/90 z-10 flex items-center hover:shadow-sm transition-all group"
                onClick={onViewDetails}
                title="View detailed service information"
                aria-label="View service details"
              >
                <Eye className="mr-1.5 h-3.5 w-3.5 opacity-80" />
                <span className="hidden sm:inline">View Details</span>
                <ArrowRight className="ml-1 h-3 w-3 opacity-70 transition-transform group-hover:translate-x-1" />
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
}

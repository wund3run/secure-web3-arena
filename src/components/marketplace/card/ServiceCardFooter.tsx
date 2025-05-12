
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye, InfoIcon } from "lucide-react";
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

export function ServiceCardFooter({
  pricing,
  onViewDetails
}: ServiceCardFooterProps) {
  // Determine the price tier badge based on amount
  const getPriceBadge = (amount: number) => {
    if (amount >= 5000) return { text: "Premium", className: "bg-amber-100 text-amber-800 border-amber-200" };
    if (amount >= 2000) return { text: "Standard", className: "bg-blue-100 text-blue-800 border-blue-200" };
    return { text: "Basic", className: "bg-green-100 text-green-800 border-green-200" };
  };
  
  const priceBadge = getPriceBadge(pricing.amount);
  
  return (
    <div className="p-5 pt-0 mt-auto border-t border-border/30">
      <div className="w-full flex justify-between items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2" tabIndex={0}>
                <div className="font-bold text-lg text-gradient bg-gradient-to-r from-primary to-primary/80">
                  {pricing.amount} {pricing.currency}
                </div>
                <Badge variant="outline" className={`text-xs ${priceBadge.className}`}>
                  {priceBadge.text}
                </Badge>
                <InfoIcon className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                <span className="sr-only">Price information</span>
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
                className="group-hover:bg-primary/90 z-10 flex items-center hover:shadow-sm transition-all group focus:ring-2 focus:ring-primary/50 focus:outline-none"
                onClick={onViewDetails}
                title="View detailed service information"
                aria-label="View service details"
              >
                <Eye className="mr-1.5 h-3.5 w-3.5 opacity-80" aria-hidden="true" />
                <span className="hidden sm:inline">View Details</span>
                <ArrowRight className="ml-1 h-3 w-3 opacity-70 transition-transform group-hover:translate-x-1" aria-hidden="true" />
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

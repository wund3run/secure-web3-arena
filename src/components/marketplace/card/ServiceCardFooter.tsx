
import { Button } from "@/components/ui/button";
import { ArrowRight, Eye } from "lucide-react";

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
        <div className="font-bold text-lg text-gradient bg-gradient-to-r from-primary to-primary/80">
          {pricing.amount} {pricing.currency}
        </div>
        <Button 
          variant="default" 
          size="sm" 
          className="group-hover:bg-primary/90 z-10 flex items-center"
          onClick={onViewDetails}
          title="View detailed service information"
        >
          <Eye className="mr-1.5 h-3.5 w-3.5 opacity-80" />
          <span>Service Details</span>
          <ArrowRight className="ml-1 h-3 w-3 opacity-70 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
}

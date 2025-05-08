
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceCardFooterProps {
  pricing: {
    amount: number;
    currency: string;
  };
  onViewDetails: () => void;
}

export function ServiceCardFooter({ pricing, onViewDetails }: ServiceCardFooterProps) {
  return (
    <div className="p-5 pt-0 mt-auto border-t border-border/30">
      <div className="w-full flex justify-between items-center">
        <div className="font-bold text-lg text-gradient bg-gradient-to-r from-primary to-primary/80">
          {pricing.amount} {pricing.currency}
        </div>
        <Button 
          variant="default" 
          size="sm" 
          className="group-hover:bg-primary/90"
          onClick={onViewDetails}
          type="button"
        >
          <span>View Details</span>
          <ArrowRight className="ml-1 h-3 w-3 opacity-70 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
}


import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ComparisonHeader } from "./ComparisonHeader";
import { ComparisonTable } from "./ComparisonTable";
import { EmptyComparison } from "./EmptyComparison";
import { ServiceCards } from "./ServiceCards";

interface ServiceComparisonProps {
  services: any[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ServiceComparison({ 
  services, 
  open, 
  onOpenChange 
}: ServiceComparisonProps) {
  
  if (!services || services.length === 0) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <EmptyComparison />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
        <div className="flex justify-end p-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-6 w-6"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        
        <div className="px-6 pb-6 space-y-6">
          <ComparisonHeader services={services} />
          
          <ServiceCards services={services} />
          
          <ComparisonTable services={services} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { CompareButton } from './CompareButton';


import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ComparisonHeader } from "./ComparisonHeader";
import { ComparisonTable } from "./ComparisonTable";
import { EmptyComparison } from "./EmptyComparison";
import { MarketplaceService } from "../hooks/types/marketplace-types";
import { X } from "lucide-react";

interface ServiceComparisonProps {
  services: MarketplaceService[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ServiceComparison({ services, open, onOpenChange }: ServiceComparisonProps) {
  const handleClose = () => {
    onOpenChange(false);
  };

  const handleRemoveService = (serviceId: string) => {
    // This would normally update state in the parent component
    // For now, just close the dialog if there are no services left
    const updatedServices = services.filter(service => service.id !== serviceId);
    if (updatedServices.length === 0) {
      handleClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>

        <ComparisonHeader services={services} />
        
        {services.length > 0 ? (
          <ComparisonTable 
            services={services} 
            onRemoveService={handleRemoveService} 
          />
        ) : (
          <EmptyComparison onClose={handleClose} />
        )}
      </DialogContent>
    </Dialog>
  );
}

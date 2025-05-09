
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ServiceCardProps } from "@/data/marketplace-data";
import { ComparisonHeader } from "./ComparisonHeader";
import { ServiceCards } from "./ServiceCards";
import { ComparisonTable } from "./ComparisonTable";
import { EmptyComparison } from "./EmptyComparison";
import { CompareButton } from "./CompareButton";

interface ServiceComparisonProps {
  services: ServiceCardProps[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ServiceComparison({ services, open, onOpenChange }: ServiceComparisonProps) {
  const [selectedServices, setSelectedServices] = useState<ServiceCardProps[]>(services || []);
  
  const handleRemoveService = (serviceId: string) => {
    setSelectedServices(prev => prev.filter(service => service.id !== serviceId));
    if (selectedServices.length <= 1) {
      onOpenChange(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <ComparisonHeader />
        
        {selectedServices.length === 0 ? (
          <EmptyComparison onClose={() => onOpenChange(false)} />
        ) : (
          <>
            <ServiceCards 
              services={selectedServices} 
              onRemoveService={handleRemoveService} 
            />
            
            {/* Detailed comparison table */}
            <ComparisonTable services={selectedServices} />
            
            <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export { CompareButton };

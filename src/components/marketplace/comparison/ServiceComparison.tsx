
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ComparisonHeader } from "./ComparisonHeader";
import { ComparisonResponsive } from "./ComparisonResponsive";
import { EmptyComparison } from "./EmptyComparison";
import { ServiceCardProps } from "@/types/marketplace-unified";
import { X } from "lucide-react";
import { convertToMarketplaceService } from "../comparison-manager/utils/ServiceConverter";
import { MarketplaceErrorBoundary } from "@/components/marketplace/error-handling/MarketplaceErrorBoundary";
import { MarketplaceLoadingState } from "../error-handling/MarketplaceLoadingState";

interface ServiceComparisonProps {
  services: ServiceCardProps[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ServiceComparison({ services, open, onOpenChange }: ServiceComparisonProps) {
  const [isLoading, setIsLoading] = useState(false);

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
        {/* Add DialogTitle for accessibility */}
        <DialogTitle className="sr-only">Service Comparison</DialogTitle>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>

        <MarketplaceErrorBoundary>
          {isLoading ? (
            <MarketplaceLoadingState type="detail" />
          ) : (
            <>
              <ComparisonHeader 
                services={services.map(convertToMarketplaceService)}
              />
              
              {services.length > 0 ? (
                <ComparisonResponsive 
                  services={services} 
                  onRemoveService={handleRemoveService} 
                />
              ) : (
                <EmptyComparison onClose={handleClose} />
              )}
            </>
          )}
        </MarketplaceErrorBoundary>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from "react";
import { toast } from "sonner";
import { MarketplaceService } from "./useMarketplaceServices";

export function useMarketplaceComparison() {
  const [servicesForComparison, setServicesForComparison] = useState<MarketplaceService[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  // Add or remove a service to/from comparison
  const toggleCompareService = (service: MarketplaceService | MarketplaceService[]) => {
    if (Array.isArray(service)) {
      // Reset comparison if empty array is passed
      if (service.length === 0) {
        setServicesForComparison([]);
        return;
      }
      
      // Otherwise replace the comparison with the new array
      setServicesForComparison(service);
      return;
    }
    
    setServicesForComparison(prev => {
      const isAlreadyAdded = prev.some(s => s.id === service.id);
      
      if (isAlreadyAdded) {
        return prev.filter(s => s.id !== service.id);
      } else {
        if (prev.length >= 3) {
          toast.warning("You can compare up to 3 services at a time", {
            description: "Remove a service before adding another"
          });
          return prev;
        }
        return [...prev, service];
      }
    });
  };

  // Check if a service is selected for comparison
  const isServiceInComparison = (serviceId: string) => {
    return servicesForComparison.some(service => service.id === serviceId);
  };

  // Open comparison dialog
  const handleOpenComparison = () => {
    if (servicesForComparison.length >= 2) {
      setShowComparison(true);
    } else {
      toast.info("Select at least 2 services to compare", {
        description: "You can select up to 3 services"
      });
    }
  };

  return {
    servicesForComparison,
    showComparison,
    setShowComparison,
    toggleCompareService,
    isServiceInComparison,
    handleOpenComparison
  };
}

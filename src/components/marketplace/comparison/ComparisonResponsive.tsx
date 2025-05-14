
import React from "react";
import { useMediaQuery } from "@/hooks/use-mobile";
import { ServiceCardProps } from "@/types/marketplace-unified";
import { ComparisonTable } from "./ComparisonTable";
import { MobileComparisonTable } from "./MobileComparisonTable";
import { convertToMarketplaceService } from "../comparison-manager/utils/ServiceConverter";
import { MarketplaceErrorBoundary } from "@/utils/error-handling";

interface ComparisonResponsiveProps {
  services: ServiceCardProps[];
  onRemoveService: (serviceId: string) => void;
}

export function ComparisonResponsive({ services, onRemoveService }: ComparisonResponsiveProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // Convert ServiceCardProps to MarketplaceService for the internal components
  const marketplaceServices = services.map(convertToMarketplaceService);
  
  return (
    <div className="space-y-6 mt-4">
      <MarketplaceErrorBoundary>
        {isMobile ? (
          <MobileComparisonTable services={marketplaceServices} onRemoveService={onRemoveService} />
        ) : (
          <ComparisonTable services={marketplaceServices} onRemoveService={onRemoveService} />
        )}
      </MarketplaceErrorBoundary>
    </div>
  );
}

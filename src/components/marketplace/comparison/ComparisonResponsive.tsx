
import React from "react";
import { useMediaQuery } from "@/hooks/use-mobile";
import { ServiceCardProps } from "@/types/marketplace";
import { ComparisonTable } from "./ComparisonTable";
import { MobileComparisonTable } from "./MobileComparisonTable";

interface ComparisonResponsiveProps {
  services: ServiceCardProps[];
  onRemoveService: (serviceId: string) => void;
}

export function ComparisonResponsive({ services, onRemoveService }: ComparisonResponsiveProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <div className="space-y-6 mt-4">
      {isMobile ? (
        <MobileComparisonTable services={services} onRemoveService={onRemoveService} />
      ) : (
        <ComparisonTable services={services} onRemoveService={onRemoveService} />
      )}
    </div>
  );
}


import React, { useState } from "react";
import { ComparisonProvider, useComparison } from "./ComparisonContext";
import { SelectionIndicator, CompareIcon } from "./SelectionIndicator";
import { SelectionToggle } from "./SelectionToggle";
import { ServiceComparison } from "../comparison";
import { convertToMarketplaceService } from "./ServiceConverter";

interface ComparisonManagerProps {
  maxCompare?: number;
}

export function ComparisonManager({ maxCompare = 3 }: ComparisonManagerProps) {
  const [showComparison, setShowComparison] = useState(false);
  
  // Create a wrapper ComparisonProvider that includes the maxCompare prop
  const CustomComparisonProvider = ({ children }: { children: React.ReactNode }) => (
    <ComparisonProvider maxCompare={maxCompare}>
      {children}
    </ComparisonProvider>
  );

  // Expose the components and hooks that should be available outside
  return {
    ComparisonProvider: CustomComparisonProvider,
    useComparison,
    SelectionIndicator: (props: { onCompare?: () => void }) => (
      <SelectionIndicator onCompare={() => {
        if (props.onCompare) props.onCompare();
        setShowComparison(true);
      }} />
    ),
    SelectionToggle,
    ComparisonDialog: ({ 
      services = [], 
      open, 
      onOpenChange 
    }: { 
      services?: any[], 
      open?: boolean, 
      onOpenChange?: (open: boolean) => void 
    }) => {
      const { selectedServices } = useComparison();
      
      // Convert ServiceCardProps to MarketplaceService for the comparison dialog
      const marketplaceServices = selectedServices.map(convertToMarketplaceService);
      
      return (
        <ServiceComparison
          services={marketplaceServices}
          open={open !== undefined ? open : showComparison}
          onOpenChange={onOpenChange || setShowComparison}
        />
      );
    }
  };
}

export { CompareIcon };
export type { ComparisonManagerProps };

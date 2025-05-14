
import React, { useState } from "react";
import { ServiceComparison } from "../comparison";
import { useComparison } from "./ComparisonContext";
import { convertToMarketplaceService, convertToServiceCardProps } from "./utils/ServiceConverter";
import { ServiceCardProps } from "@/types/marketplace-unified";

interface ComparisonDialogProps {
  services?: any[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ComparisonDialog({
  services = [],
  open,
  onOpenChange
}: ComparisonDialogProps) {
  const [showComparison, setShowComparison] = useState(false);
  const { selectedServices } = useComparison();
  
  // Convert ServiceCardProps to MarketplaceService and then back to ServiceCardProps for the comparison dialog
  // This ensures the types match properly while preserving all data
  const convertedServices: ServiceCardProps[] = selectedServices.map(service => 
    convertToServiceCardProps(convertToMarketplaceService(service))
  );
  
  return (
    <ServiceComparison
      services={convertedServices}
      open={open !== undefined ? open : showComparison}
      onOpenChange={onOpenChange || setShowComparison}
    />
  );
}

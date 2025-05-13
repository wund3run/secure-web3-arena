
import React, { useState } from "react";
import { ServiceComparison } from "../comparison";
import { useComparison } from "./ComparisonContext";
import { convertToMarketplaceService } from "./utils/ServiceConverter";

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

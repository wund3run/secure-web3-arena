
import { Dispatch, SetStateAction } from "react";
import { MarketplaceService } from "../hooks/types/marketplace-types";

export interface ComparisonManagerProps {
  maxCompare?: number;
}

export interface ComparisonDialogProps {
  services?: MarketplaceService[];
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export interface ComparisonMetrics {
  priceRange: {
    min: number;
    max: number;
    average: number;
  };
  deliveryTimeRange: {
    min: number;
    max: number;
    average: number;
  };
  topRecommended?: string; // ID of top recommended service
}

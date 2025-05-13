
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Compare } from "../icons/Compare";
import { MarketplaceService } from "../hooks/types/marketplace-types";

export interface ComparisonHeaderProps {
  services?: MarketplaceService[];
}

export function ComparisonHeader({ services }: ComparisonHeaderProps) {
  return (
    <DialogHeader>
      <DialogTitle className="flex items-center">
        <Compare className="mr-2 h-5 w-5" />
        Service Comparison
        {services && services.length > 0 && (
          <span className="ml-2 text-muted-foreground text-sm font-normal">
            ({services.length} {services.length === 1 ? 'service' : 'services'})
          </span>
        )}
      </DialogTitle>
      <DialogDescription>
        Compare security services side by side to find the best match for your project
      </DialogDescription>
    </DialogHeader>
  );
}

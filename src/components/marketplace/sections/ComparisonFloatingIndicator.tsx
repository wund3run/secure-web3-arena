
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Compare } from "../icons/Compare";

interface ComparisonFloatingIndicatorProps {
  servicesForComparison: any[];
  toggleCompareService: (service: any) => void;
  handleOpenComparison: () => void;
}

export function ComparisonFloatingIndicator({
  servicesForComparison,
  toggleCompareService,
  handleOpenComparison
}: ComparisonFloatingIndicatorProps) {
  if (servicesForComparison.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-card border border-border shadow-lg rounded-lg p-3 w-[280px]">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-sm flex items-center">
            <Compare className="h-4 w-4 mr-2" />
            Selected for comparison
          </h3>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={() => toggleCompareService([])}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-2 max-h-[150px] overflow-y-auto mb-3">
          {servicesForComparison.map(service => (
            <div 
              key={service.id} 
              className="flex justify-between items-center bg-muted/50 p-2 rounded text-sm"
            >
              <div className="truncate max-w-[180px]">{service.title}</div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => toggleCompareService(service)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            {servicesForComparison.length} of 3 selected
          </span>
          <Button
            variant={servicesForComparison.length >= 2 ? "default" : "outline"}
            size="sm"
            disabled={servicesForComparison.length < 2}
            onClick={handleOpenComparison}
          >
            <Compare className="h-4 w-4 mr-1" />
            Compare
          </Button>
        </div>
      </div>
    </div>
  );
}

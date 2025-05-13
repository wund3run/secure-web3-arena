
import { Button } from "@/components/ui/button";

export interface EmptyComparisonProps {
  onClose: () => void;
}

export function EmptyComparison({ onClose }: EmptyComparisonProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <p className="text-muted-foreground">No services selected for comparison</p>
      <Button 
        variant="outline" 
        className="mt-4"
        onClick={onClose}
      >
        Select Services
      </Button>
    </div>
  );
}


import { Button } from "@/components/ui/button";
import { Compare } from "../icons/Compare";
import { Link } from "react-router-dom";

interface EmptyComparisonProps {
  onClose: () => void;
}

export function EmptyComparison({ onClose }: EmptyComparisonProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-muted p-6 rounded-full mb-6">
        <Compare className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No Services to Compare</h3>
      <p className="text-muted-foreground max-w-md mb-6">
        Select at least two security services from the marketplace to compare their features and pricing side by side.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link to="/marketplace">
          <Button>
            Browse Services
          </Button>
        </Link>
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}

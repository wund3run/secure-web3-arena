
import { Star } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { FilterSectionHeader } from "./filter-section-header";

interface ReputationFilterProps {
  minReputation: number;
  setMinReputation: (value: number) => void;
  isCollapsed: boolean;
  toggleSection: (section: string) => void;
}

export function ReputationFilter({ 
  minReputation, 
  setMinReputation, 
  isCollapsed, 
  toggleSection 
}: ReputationFilterProps) {
  return (
    <div className="border-t border-border/50 pt-2">
      <FilterSectionHeader 
        title="Provider Reputation" 
        section="reputation" 
        isCollapsed={isCollapsed} 
        toggleSection={toggleSection} 
      />
      {!isCollapsed && (
        <div className="mt-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm">Min Score: {minReputation}</span>
            </div>
          </div>
          <Slider 
            defaultValue={[0]} 
            max={100} 
            step={1} 
            value={[minReputation]}
            onValueChange={(value) => setMinReputation(value[0])}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>
      )}
    </div>
  );
}

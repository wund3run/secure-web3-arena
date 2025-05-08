
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { FilterSectionHeader } from "./filter-section-header";

interface PriceRangeFilterProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  isCollapsed: boolean;
  toggleSection: (section: string) => void;
}

export function PriceRangeFilter({ 
  priceRange, 
  setPriceRange, 
  isCollapsed, 
  toggleSection 
}: PriceRangeFilterProps) {
  return (
    <div className="border-t border-border/50 pt-2">
      <FilterSectionHeader 
        title="Price Range (ETH)" 
        section="price" 
        isCollapsed={isCollapsed} 
        toggleSection={toggleSection} 
      />
      {!isCollapsed && (
        <div className="mt-2">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-muted-foreground">
              {priceRange[0]} - {priceRange[1]} ETH
            </div>
          </div>
          <Slider 
            defaultValue={[0, 10]} 
            max={10} 
            step={0.1} 
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="mb-4"
          />
          <div className="flex gap-2 items-center">
            <Input 
              type="number" 
              placeholder="Min" 
              className="w-24" 
              value={priceRange[0]}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value) && value >= 0 && value <= priceRange[1]) {
                  setPriceRange([value, priceRange[1]]);
                }
              }}
              step={0.1}
              min={0}
              max={priceRange[1]}
            />
            <span className="text-muted-foreground">to</span>
            <Input 
              type="number" 
              placeholder="Max" 
              className="w-24" 
              value={priceRange[1]}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value) && value >= priceRange[0]) {
                  setPriceRange([priceRange[0], value]);
                }
              }}
              step={0.1}
              min={priceRange[0]}
              max={10}
            />
          </div>
        </div>
      )}
    </div>
  );
}


import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

export function MarketplaceFilters() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const handleLevelChange = (level: string) => {
    setSelectedLevels(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level) 
        : [...prev, level]
    );
  };

  const handleTypeChange = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };

  const handleFeatureChange = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature) 
        : [...prev, feature]
    );
  };

  const handleApplyFilters = () => {
    const filterSummary = {
      priceRange,
      levels: selectedLevels,
      types: selectedTypes,
      features: selectedFeatures
    };
    
    console.log("Applied filters:", filterSummary);
    toast.success("Filters applied", {
      description: `${selectedLevels.length + selectedTypes.length + selectedFeatures.length} filters applied`,
    });
  };

  const resetFilters = () => {
    setPriceRange([0, 10]);
    setSelectedLevels([]);
    setSelectedTypes([]);
    setSelectedFeatures([]);
    toast.info("Filters reset", {
      description: "All filters have been cleared",
    });
  };

  return (
    <div className="glass-card p-6 rounded-xl space-y-6 sticky top-4">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Price Range (ETH)</h3>
          <div className="text-sm text-muted-foreground">
            {priceRange[0]} - {priceRange[1]}
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

      <div>
        <h3 className="font-semibold mb-4">Provider Level</h3>
        <div className="space-y-2">
          {["Expert", "Verified", "Rookie"].map((level) => (
            <div key={level} className="flex items-center space-x-2">
              <Checkbox 
                id={level} 
                checked={selectedLevels.includes(level)}
                onCheckedChange={() => handleLevelChange(level)}
              />
              <Label 
                htmlFor={level} 
                className="cursor-pointer"
              >
                {level}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Service Type</h3>
        <div className="space-y-2">
          {[
            "Smart Contract Audit",
            "DApp Security",
            "Protocol Review",
            "NFT Security",
            "DeFi Security"
          ].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox 
                id={type} 
                checked={selectedTypes.includes(type)}
                onCheckedChange={() => handleTypeChange(type)}
              />
              <Label 
                htmlFor={type}
                className="cursor-pointer"
              >
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Features</h3>
        <div className="space-y-2">
          {[
            "24/7 Support",
            "Fast Turnaround",
            "Multiple Revisions",
            "Live Consultation"
          ].map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <Checkbox 
                id={feature} 
                checked={selectedFeatures.includes(feature)}
                onCheckedChange={() => handleFeatureChange(feature)}
              />
              <Label 
                htmlFor={feature}
                className="cursor-pointer"
              >
                {feature}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 flex flex-col gap-2">
        <Button onClick={handleApplyFilters} className="w-full">
          Apply Filters
        </Button>
        <Button variant="outline" onClick={resetFilters} className="w-full">
          Reset
        </Button>
      </div>
    </div>
  );
}

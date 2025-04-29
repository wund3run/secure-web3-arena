
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Shield, BadgeCheck, Star, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

interface FilterOption {
  id: string;
  name: string;
  count?: number;
}

export function EnhancedFilters({ onFilterChange }: { onFilterChange?: (filters: any) => void }) {
  const [priceRange, setPriceRange] = useState([0, 10]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedVerification, setSelectedVerification] = useState<string[]>([]);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const categories: FilterOption[] = [
    { id: "smart-contracts", name: "Smart Contracts", count: 124 },
    { id: "dapps", name: "DApps", count: 87 },
    { id: "protocols", name: "Protocols", count: 53 },
    { id: "nfts", name: "NFTs", count: 28 },
    { id: "bridges", name: "Bridges", count: 42 }
  ];
  
  const verificationLevels: FilterOption[] = [
    { id: "verified", name: "Verified" },
    { id: "expert", name: "Expert" },
    { id: "elite", name: "Elite" }
  ];

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    updateFiltersCount();
  };

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
    updateFiltersCount();
  };

  const toggleVerification = (id: string) => {
    setSelectedVerification(prev => 
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
    updateFiltersCount();
  };
  
  const updateFiltersCount = () => {
    let count = 0;
    if (priceRange[0] > 0 || priceRange[1] < 10) count++;
    if (selectedCategories.length > 0) count++;
    if (selectedVerification.length > 0) count++;
    setActiveFiltersCount(count);
  };
  
  const clearFilters = () => {
    setPriceRange([0, 10]);
    setSelectedCategories([]);
    setSelectedVerification([]);
    setActiveFiltersCount(0);
    if (onFilterChange) onFilterChange({});
  };
  
  const applyFilters = () => {
    const filters = {
      priceRange,
      categories: selectedCategories,
      verification: selectedVerification
    };
    if (onFilterChange) onFilterChange(filters);
  };

  return (
    <>
      {/* Mobile filter button */}
      <div className="lg:hidden w-full mb-4">
        <Button 
          variant="outline" 
          className="w-full justify-between"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">{activeFiltersCount}</Badge>
            )}
          </div>
          {isExpanded ? (
            <X className="h-4 w-4" />
          ) : (
            <div className="h-4 w-4 text-primary">+</div>
          )}
        </Button>
      </div>
      
      <Card className={`w-full lg:block ${isExpanded ? 'block' : 'hidden'}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Filters</CardTitle>
            {activeFiltersCount > 0 && (
              <Button 
                variant="ghost" 
                className="h-auto p-0 text-sm text-muted-foreground"
                onClick={clearFilters}
              >
                Clear all
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price Range */}
          <div>
            <Label className="text-base font-medium mb-3 block">Price Range (ETH)</Label>
            <div className="px-2">
              <Slider 
                defaultValue={[0, 10]} 
                max={10} 
                step={0.1} 
                value={priceRange}
                onValueChange={handlePriceChange}
              />
            </div>
            <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
              <div>{priceRange[0]} ETH</div>
              <div>{priceRange[1]} ETH</div>
            </div>
          </div>
          
          <Separator />
          
          {/* Categories */}
          <div>
            <Label className="text-base font-medium mb-3 block">Categories</Label>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={`category-${category.id}`} 
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => toggleCategory(category.id)}
                    />
                    <Label 
                      htmlFor={`category-${category.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {category.name}
                    </Label>
                  </div>
                  {category.count !== undefined && (
                    <Badge variant="outline" className="text-xs font-normal">
                      {category.count}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          {/* Verification Levels */}
          <div>
            <Label className="text-base font-medium mb-3 block">Verification Level</Label>
            <div className="space-y-3">
              {verificationLevels.map((level) => (
                <div key={level.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`level-${level.id}`} 
                    checked={selectedVerification.includes(level.id)}
                    onCheckedChange={() => toggleVerification(level.id)}
                  />
                  <Label 
                    htmlFor={`level-${level.id}`}
                    className="text-sm font-normal cursor-pointer flex items-center"
                  >
                    {level.id === "verified" && <BadgeCheck className="h-3 w-3 text-web3-teal mr-1" />}
                    {level.id === "expert" && <Shield className="h-3 w-3 text-primary mr-1" />}
                    {level.id === "elite" && <Star className="h-3 w-3 text-web3-orange mr-1" />}
                    {level.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <Separator className="lg:hidden" />
          
          {/* Mobile Apply Button */}
          <div className="pt-2 lg:hidden">
            <Button 
              className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              onClick={() => {
                applyFilters();
                setIsExpanded(false);
              }}
            >
              Apply Filters
              <Filter className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          {/* Desktop Apply Button */}
          <div className="pt-2 hidden lg:block">
            <Button 
              className="w-full"
              onClick={applyFilters}
            >
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

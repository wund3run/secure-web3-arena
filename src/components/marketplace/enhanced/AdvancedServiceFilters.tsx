
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Filter, X, Star, Clock, DollarSign } from 'lucide-react';

interface AdvancedServiceFiltersProps {
  onFiltersChange: (filters: Record<string, any>) => void;
  onClose: () => void;
}

export const AdvancedServiceFilters = ({ onFiltersChange, onClose }: AdvancedServiceFiltersProps) => {
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedBlockchains, setSelectedBlockchains] = useState<string[]>([]);
  const [minRating, setMinRating] = useState([0]);
  const [maxDeliveryTime, setMaxDeliveryTime] = useState([30]);
  const [featured, setFeatured] = useState(false);
  const [verified, setVerified] = useState(false);

  const blockchains = [
    'Ethereum', 'Polygon', 'BSC', 'Arbitrum', 'Optimism', 
    'Avalanche', 'Solana', 'Cardano', 'Polkadot'
  ];

  const handleBlockchainToggle = (blockchain: string) => {
    setSelectedBlockchains(prev => 
      prev.includes(blockchain) 
        ? prev.filter(b => b !== blockchain)
        : [...prev, blockchain]
    );
  };

  const applyFilters = () => {
    const filters = {
      priceRange,
      blockchains: selectedBlockchains,
      minRating: minRating[0],
      maxDeliveryTime: maxDeliveryTime[0],
      featured,
      verified
    };
    onFiltersChange(filters);
  };

  const clearFilters = () => {
    setPriceRange([0, 10000]);
    setSelectedBlockchains([]);
    setMinRating([0]);
    setMaxDeliveryTime([30]);
    setFeatured(false);
    setVerified(false);
    onFiltersChange({});
  };

  return (
    <Card className="w-80">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Advanced Filters
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Price Range */}
        <div>
          <label className="text-sm font-medium flex items-center gap-2 mb-3">
            <DollarSign className="h-4 w-4" />
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={10000}
            min={0}
            step={100}
            className="w-full"
          />
        </div>

        <Separator />

        {/* Rating */}
        <div>
          <label className="text-sm font-medium flex items-center gap-2 mb-3">
            <Star className="h-4 w-4" />
            Minimum Rating: {minRating[0]}/5
          </label>
          <Slider
            value={minRating}
            onValueChange={setMinRating}
            max={5}
            min={0}
            step={0.5}
            className="w-full"
          />
        </div>

        <Separator />

        {/* Delivery Time */}
        <div>
          <label className="text-sm font-medium flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4" />
            Max Delivery: {maxDeliveryTime[0]} days
          </label>
          <Slider
            value={maxDeliveryTime}
            onValueChange={setMaxDeliveryTime}
            max={90}
            min={1}
            step={1}
            className="w-full"
          />
        </div>

        <Separator />

        {/* Blockchains */}
        <div>
          <label className="text-sm font-medium mb-3 block">Blockchain Support</label>
          <div className="grid grid-cols-2 gap-2">
            {blockchains.map((blockchain) => (
              <div key={blockchain} className="flex items-center space-x-2">
                <Checkbox
                  id={blockchain}
                  checked={selectedBlockchains.includes(blockchain)}
                  onCheckedChange={() => handleBlockchainToggle(blockchain)}
                />
                <label htmlFor={blockchain} className="text-xs cursor-pointer">
                  {blockchain}
                </label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Special Filters */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={featured}
              onCheckedChange={setFeatured}
            />
            <label htmlFor="featured" className="text-sm cursor-pointer">
              Featured services only
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="verified"
              checked={verified}
              onCheckedChange={setVerified}
            />
            <label htmlFor="verified" className="text-sm cursor-pointer">
              Verified providers only
            </label>
          </div>
        </div>

        <Separator />

        {/* Actions */}
        <div className="flex gap-2">
          <Button onClick={applyFilters} className="flex-1">
            Apply Filters
          </Button>
          <Button variant="outline" onClick={clearFilters}>
            Clear
          </Button>
        </div>

        {/* Active Filters Summary */}
        {(selectedBlockchains.length > 0 || featured || verified) && (
          <div className="pt-2">
            <p className="text-xs text-muted-foreground mb-2">Active filters:</p>
            <div className="flex flex-wrap gap-1">
              {selectedBlockchains.map(blockchain => (
                <Badge key={blockchain} variant="secondary" className="text-xs">
                  {blockchain}
                </Badge>
              ))}
              {featured && <Badge variant="secondary" className="text-xs">Featured</Badge>}
              {verified && <Badge variant="secondary" className="text-xs">Verified</Badge>}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

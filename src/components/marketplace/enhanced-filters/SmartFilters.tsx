
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Filter, X, Zap } from 'lucide-react';

interface SmartFiltersProps {
  onFilterChange: (filters: any) => void;
  totalResults?: number;
}

export const SmartFilters: React.FC<SmartFiltersProps> = ({ onFilterChange, totalResults = 0 }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: [0, 50000] as [number, number],
    deliveryTime: [1, 30] as [number, number],
    rating: 0,
    verified: false,
    categories: [] as string[],
    blockchains: [] as string[],
    expertise: '',
    availability: ''
  });

  const categories = [
    'Smart Contract Audit',
    'DeFi Protocol Review',
    'NFT Security Assessment',
    'Bridge Audit',
    'DAO Security Review',
    'Penetration Testing'
  ];

  const blockchains = [
    'Ethereum', 'Polygon', 'Binance Smart Chain', 'Arbitrum',
    'Optimism', 'Solana', 'Avalanche', 'Fantom'
  ];

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFilterChange(updated);
  };

  const toggleCategory = (category: string) => {
    const updated = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    updateFilters({ categories: updated });
  };

  const toggleBlockchain = (blockchain: string) => {
    const updated = filters.blockchains.includes(blockchain)
      ? filters.blockchains.filter(b => b !== blockchain)
      : [...filters.blockchains, blockchain];
    updateFilters({ blockchains: updated });
  };

  const clearAllFilters = () => {
    const cleared = {
      priceRange: [0, 50000] as [number, number],
      deliveryTime: [1, 30] as [number, number],
      rating: 0,
      verified: false,
      categories: [],
      blockchains: [],
      expertise: '',
      availability: ''
    };
    setFilters(cleared);
    onFilterChange(cleared);
  };

  const activeFilterCount = [
    filters.priceRange[0] > 0 || filters.priceRange[1] < 50000,
    filters.deliveryTime[0] > 1 || filters.deliveryTime[1] < 30,
    filters.rating > 0,
    filters.verified,
    filters.categories.length > 0,
    filters.blockchains.length > 0,
    filters.expertise !== '',
    filters.availability !== ''
  ].filter(Boolean).length;

  return (
    <Card className="sticky top-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                <CardTitle className="text-lg">Smart Filters</CardTitle>
                {activeFilterCount > 0 && (
                  <Badge variant="secondary">{activeFilterCount}</Badge>
                )}
              </div>
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
            <p className="text-sm text-muted-foreground text-left">
              {totalResults} services found
            </p>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* AI-Powered Quick Filters */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <Label className="text-sm font-medium">AI Suggestions</Label>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => updateFilters({ verified: true, rating: 4.5 })}>
                  Top Rated
                </Button>
                <Button variant="outline" size="sm" onClick={() => updateFilters({ deliveryTime: [1, 7] })}>
                  Fast Delivery
                </Button>
                <Button variant="outline" size="sm" onClick={() => updateFilters({ priceRange: [0, 5000] })}>
                  Budget Friendly
                </Button>
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Budget Range (USD)</Label>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
                max={50000}
                min={0}
                step={500}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${filters.priceRange[0].toLocaleString()}</span>
                <span>${filters.priceRange[1].toLocaleString()}</span>
              </div>
            </div>

            {/* Delivery Time */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Delivery Time (days)</Label>
              <Slider
                value={filters.deliveryTime}
                onValueChange={(value) => updateFilters({ deliveryTime: value as [number, number] })}
                max={30}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{filters.deliveryTime[0]} days</span>
                <span>{filters.deliveryTime[1]} days</span>
              </div>
            </div>

            {/* Rating */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Minimum Rating</Label>
              <Slider
                value={[filters.rating]}
                onValueChange={(value) => updateFilters({ rating: value[0] })}
                max={5}
                min={0}
                step={0.5}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                {filters.rating} stars and above
              </p>
            </div>

            {/* Verified Only */}
            <div className="flex items-center justify-between">
              <Label htmlFor="verified" className="text-sm font-medium">Verified Auditors Only</Label>
              <Switch
                id="verified"
                checked={filters.verified}
                onCheckedChange={(checked) => updateFilters({ verified: checked })}
              />
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Categories</Label>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Badge
                    key={category}
                    variant={filters.categories.includes(category) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/80"
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                    {filters.categories.includes(category) && (
                      <X className="h-3 w-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Blockchains */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Blockchain Expertise</Label>
              <div className="flex flex-wrap gap-2">
                {blockchains.map(blockchain => (
                  <Badge
                    key={blockchain}
                    variant={filters.blockchains.includes(blockchain) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/80"
                    onClick={() => toggleBlockchain(blockchain)}
                  >
                    {blockchain}
                    {filters.blockchains.includes(blockchain) && (
                      <X className="h-3 w-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Expertise Level */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Expertise Level</Label>
              <Select value={filters.expertise} onValueChange={(value) => updateFilters({ expertise: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Any level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any level</SelectItem>
                  <SelectItem value="junior">Junior (1-3 years)</SelectItem>
                  <SelectItem value="mid">Mid-level (3-7 years)</SelectItem>
                  <SelectItem value="senior">Senior (7+ years)</SelectItem>
                  <SelectItem value="expert">Expert (10+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Availability */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Availability</Label>
              <Select value={filters.availability} onValueChange={(value) => updateFilters({ availability: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Any availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any availability</SelectItem>
                  <SelectItem value="immediate">Available Immediately</SelectItem>
                  <SelectItem value="week">Within 1 Week</SelectItem>
                  <SelectItem value="month">Within 1 Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters */}
            {activeFilterCount > 0 && (
              <Button variant="outline" onClick={clearAllFilters} className="w-full">
                Clear All Filters ({activeFilterCount})
              </Button>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

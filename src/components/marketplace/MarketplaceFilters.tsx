
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';

interface MarketplaceFiltersProps {
  onFiltersChange: (filters: any) => void;
  onSearchChange: (search: string) => void;
}

export const MarketplaceFilters: React.FC<MarketplaceFiltersProps> = ({
  onFiltersChange,
  onSearchChange
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([50, 500]);
  const [selectedBlockchains, setSelectedBlockchains] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedAvailability, setSelectedAvailability] = useState('');
  const [selectedRating, setSelectedRating] = useState('');

  const blockchains = [
    'Ethereum', 'Solana', 'Polygon', 'Binance Smart Chain', 
    'Cardano', 'Polkadot', 'Avalanche', 'Cosmos'
  ];

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleBlockchainToggle = (blockchain: string) => {
    const updated = selectedBlockchains.includes(blockchain)
      ? selectedBlockchains.filter(b => b !== blockchain)
      : [...selectedBlockchains, blockchain];
    setSelectedBlockchains(updated);
    updateFilters({ blockchains: updated });
  };

  const updateFilters = (newFilters: any) => {
    onFiltersChange({
      priceRange,
      blockchains: selectedBlockchains,
      experience: selectedExperience,
      availability: selectedAvailability,
      rating: selectedRating,
      ...newFilters
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setPriceRange([50, 500]);
    setSelectedBlockchains([]);
    setSelectedExperience('');
    setSelectedAvailability('');
    setSelectedRating('');
    onSearchChange('');
    onFiltersChange({});
  };

  const hasActiveFilters = searchTerm || selectedBlockchains.length > 0 || 
    selectedExperience || selectedAvailability || selectedRating;

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search auditors by name, skills, or expertise..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </CardTitle>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price Range */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Hourly Rate ($)</Label>
            <Slider
              value={priceRange}
              onValueChange={(value) => {
                setPriceRange(value);
                updateFilters({ priceRange: value });
              }}
              max={1000}
              min={25}
              step={25}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}+</span>
            </div>
          </div>

          {/* Experience Level */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Experience Level</Label>
            <Select value={selectedExperience} onValueChange={(value) => {
              setSelectedExperience(value);
              updateFilters({ experience: value });
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Entry Level (1-3 years)</SelectItem>
                <SelectItem value="mid">Mid Level (3-7 years)</SelectItem>
                <SelectItem value="senior">Senior Level (7+ years)</SelectItem>
                <SelectItem value="expert">Expert (10+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Availability */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Availability</Label>
            <Select value={selectedAvailability} onValueChange={(value) => {
              setSelectedAvailability(value);
              updateFilters({ availability: value });
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available Now</SelectItem>
                <SelectItem value="busy">Available Soon</SelectItem>
                <SelectItem value="any">Any Availability</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Rating */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Minimum Rating</Label>
            <Select value={selectedRating} onValueChange={(value) => {
              setSelectedRating(value);
              updateFilters({ rating: value });
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select minimum rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4.5">4.5+ Stars</SelectItem>
                <SelectItem value="4.0">4.0+ Stars</SelectItem>
                <SelectItem value="3.5">3.5+ Stars</SelectItem>
                <SelectItem value="3.0">3.0+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Blockchain Expertise */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Blockchain Expertise</Label>
            <div className="grid grid-cols-2 gap-2">
              {blockchains.map((blockchain) => (
                <div key={blockchain} className="flex items-center space-x-2">
                  <Checkbox
                    id={blockchain}
                    checked={selectedBlockchains.includes(blockchain)}
                    onCheckedChange={() => handleBlockchainToggle(blockchain)}
                  />
                  <Label htmlFor={blockchain} className="text-sm font-normal">
                    {blockchain}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="pt-4 border-t">
              <Label className="text-sm font-medium mb-2 block">Active Filters</Label>
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <Badge variant="secondary">Search: {searchTerm}</Badge>
                )}
                {selectedBlockchains.map((blockchain) => (
                  <Badge key={blockchain} variant="secondary">
                    {blockchain}
                  </Badge>
                ))}
                {selectedExperience && (
                  <Badge variant="secondary">
                    {selectedExperience.charAt(0).toUpperCase() + selectedExperience.slice(1)} Level
                  </Badge>
                )}
                {selectedAvailability && (
                  <Badge variant="secondary">
                    {selectedAvailability === 'available' ? 'Available Now' : 'Available Soon'}
                  </Badge>
                )}
                {selectedRating && (
                  <Badge variant="secondary">{selectedRating}+ Stars</Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

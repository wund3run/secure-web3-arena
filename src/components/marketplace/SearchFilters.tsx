
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface SearchFiltersProps {
  filters: {
    blockchain: string;
    expertise: string;
    availability: string;
    priceRange: number[];
    rating: number;
    experience: string;
    location: string;
  };
  onFiltersChange: (filters: any) => void;
}

export function SearchFilters({ filters, onFiltersChange }: SearchFiltersProps) {
  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      blockchain: '',
      expertise: '',
      availability: '',
      priceRange: [0, 10000],
      rating: 0,
      experience: '',
      location: ''
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Filters</CardTitle>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Blockchain</Label>
          <Select value={filters.blockchain} onValueChange={(value) => updateFilter('blockchain', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select blockchain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ethereum">Ethereum</SelectItem>
              <SelectItem value="solana">Solana</SelectItem>
              <SelectItem value="polygon">Polygon</SelectItem>
              <SelectItem value="arbitrum">Arbitrum</SelectItem>
              <SelectItem value="optimism">Optimism</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Expertise</Label>
          <Select value={filters.expertise} onValueChange={(value) => updateFilter('expertise', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select expertise" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="defi">DeFi</SelectItem>
              <SelectItem value="nft">NFT</SelectItem>
              <SelectItem value="gamefi">GameFi</SelectItem>
              <SelectItem value="dao">DAO</SelectItem>
              <SelectItem value="bridge">Cross-chain</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Availability</Label>
          <Select value={filters.availability} onValueChange={(value) => updateFilter('availability', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Immediate</SelectItem>
              <SelectItem value="week">Within 1 week</SelectItem>
              <SelectItem value="month">Within 1 month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label>Price Range (USD)</Label>
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilter('priceRange', value)}
            max={10000}
            min={0}
            step={100}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Experience Level</Label>
          <Select value={filters.experience} onValueChange={(value) => updateFilter('experience', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="junior">Junior (1-2 years)</SelectItem>
              <SelectItem value="mid">Mid-level (3-5 years)</SelectItem>
              <SelectItem value="senior">Senior (5+ years)</SelectItem>
              <SelectItem value="expert">Expert (10+ years)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Minimum Rating</Label>
          <Select value={filters.rating.toString()} onValueChange={(value) => updateFilter('rating', parseInt(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Select rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any rating</SelectItem>
              <SelectItem value="3">3+ stars</SelectItem>
              <SelectItem value="4">4+ stars</SelectItem>
              <SelectItem value="5">5 stars only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

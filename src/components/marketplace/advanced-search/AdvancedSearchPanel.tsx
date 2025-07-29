
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { X, Search, Filter } from 'lucide-react';

interface AdvancedSearchFilters {
  keywords: string;
  serviceTypes: string[];
  blockchains: string[];
  priceRange: [number, number];
  experienceLevel: string;
  rating: number;
  availability: string;
  certifications: string[];
  location: string;
}

interface AdvancedSearchPanelProps {
  onFiltersChange: (filters: AdvancedSearchFilters) => void;
  onClear: () => void;
}

const serviceTypes = [
  'Smart Contract Audit', 'DeFi Protocol Audit', 'NFT Security Review',
  'Bridge Security Audit', 'DAO Governance Review', 'Penetration Testing'
];

const blockchains = [
  'Ethereum', 'Solana', 'Polygon', 'Avalanche', 'BSC', 'Arbitrum', 'Optimism'
];

const certifications = [
  'CEH', 'CISSP', 'OSCP', 'Smart Contract Security', 'DeFi Specialist'
];

export const AdvancedSearchPanel: React.FC<AdvancedSearchPanelProps> = ({
  onFiltersChange,
  onClear
}) => {
  const [filters, setFilters] = useState<AdvancedSearchFilters>({
    keywords: '',
    serviceTypes: [],
    blockchains: [],
    priceRange: [0, 10000],
    experienceLevel: '',
    rating: 0,
    availability: '',
    certifications: [],
    location: ''
  });

  const updateFilters = (newFilters: Partial<AdvancedSearchFilters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange(updated);
  };

  const toggleArrayFilter = (array: string[], value: string) => {
    return array.includes(value) 
      ? array.filter(item => item !== value)
      : [...array, value];
  };

  const clearFilters = () => {
    const cleared = {
      keywords: '',
      serviceTypes: [],
      blockchains: [],
      priceRange: [0, 10000] as [number, number],
      experienceLevel: '',
      rating: 0,
      availability: '',
      certifications: [],
      location: ''
    };
    setFilters(cleared);
    onClear();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Advanced Search
          </CardTitle>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Keywords Search */}
        <div className="space-y-2">
          <Label>Keywords</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for specific skills, technologies..."
              value={filters.keywords}
              onChange={(e) => updateFilters({ keywords: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        {/* Service Types */}
        <div className="space-y-2">
          <Label>Service Types</Label>
          <div className="flex flex-wrap gap-2">
            {serviceTypes.map((type) => (
              <Badge
                key={type}
                variant={filters.serviceTypes.includes(type) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => updateFilters({
                  serviceTypes: toggleArrayFilter(filters.serviceTypes, type)
                })}
              >
                {type}
                {filters.serviceTypes.includes(type) && (
                  <X className="h-3 w-3 ml-1" />
                )}
              </Badge>
            ))}
          </div>
        </div>

        {/* Blockchains */}
        <div className="space-y-2">
          <Label>Blockchain Expertise</Label>
          <div className="flex flex-wrap gap-2">
            {blockchains.map((blockchain) => (
              <Badge
                key={blockchain}
                variant={filters.blockchains.includes(blockchain) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => updateFilters({
                  blockchains: toggleArrayFilter(filters.blockchains, blockchain)
                })}
              >
                {blockchain}
                {filters.blockchains.includes(blockchain) && (
                  <X className="h-3 w-3 ml-1" />
                )}
              </Badge>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <Label>Budget Range (USD)</Label>
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
              max={50000}
              min={0}
              step={500}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>${filters.priceRange[0].toLocaleString()}</span>
              <span>${filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Experience Level */}
        <div className="space-y-2">
          <Label>Experience Level</Label>
          <Select value={filters.experienceLevel} onValueChange={(value) => updateFilters({ experienceLevel: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="junior">Junior (1-3 years)</SelectItem>
              <SelectItem value="mid">Mid-level (3-7 years)</SelectItem>
              <SelectItem value="senior">Senior (7+ years)</SelectItem>
              <SelectItem value="expert">Expert (10+ years)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Minimum Rating */}
        <div className="space-y-2">
          <Label>Minimum Rating</Label>
          <Slider
            value={[filters.rating]}
            onValueChange={(value) => updateFilters({ rating: value[0] })}
            max={5}
            min={0}
            step={0.5}
            className="w-full"
          />
          <div className="text-sm text-muted-foreground">
            {filters.rating} stars and above
          </div>
        </div>

        {/* Availability */}
        <div className="space-y-2">
          <Label>Availability</Label>
          <Select value={filters.availability} onValueChange={(value) => updateFilters({ availability: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Available Immediately</SelectItem>
              <SelectItem value="week">Within 1 Week</SelectItem>
              <SelectItem value="month">Within 1 Month</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Certifications */}
        <div className="space-y-2">
          <Label>Certifications</Label>
          <div className="flex flex-wrap gap-2">
            {certifications.map((cert) => (
              <Badge
                key={cert}
                variant={filters.certifications.includes(cert) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => updateFilters({
                  certifications: toggleArrayFilter(filters.certifications, cert)
                })}
              >
                {cert}
                {filters.certifications.includes(cert) && (
                  <X className="h-3 w-3 ml-1" />
                )}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

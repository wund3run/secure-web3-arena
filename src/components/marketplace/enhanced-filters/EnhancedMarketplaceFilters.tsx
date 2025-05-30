
import React, { useState } from 'react';
import { FilterSection } from './FilterSection';
import { PriceRangeFilter } from './PriceRangeFilter';
import { MultiSelectFilter } from './MultiSelectFilter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Filter } from 'lucide-react';

interface EnhancedMarketplaceFiltersProps {
  onFiltersChange: (filters: any) => void;
  activeFiltersCount: number;
  onClearAll: () => void;
}

export function EnhancedMarketplaceFilters({ onFiltersChange, activeFiltersCount, onClearAll }: EnhancedMarketplaceFiltersProps) {
  const [collapsedSections, setCollapsedSections] = useState({
    price: false,
    expertise: false,
    blockchain: false,
    experience: false,
    features: false
  });

  const [filters, setFilters] = useState({
    priceRange: [1000, 50000] as [number, number],
    expertise: [] as string[],
    blockchains: [] as string[],
    experienceLevel: [] as string[],
    features: [] as string[]
  });

  const expertiseOptions = [
    { id: 'smart-contracts', label: 'Smart Contracts', count: 45 },
    { id: 'defi', label: 'DeFi Protocols', count: 32 },
    { id: 'nft', label: 'NFT Security', count: 28 },
    { id: 'bridges', label: 'Cross-chain Bridges', count: 15 },
    { id: 'dao', label: 'DAO Security', count: 18 },
    { id: 'layer2', label: 'Layer 2 Solutions', count: 12 }
  ];

  const blockchainOptions = [
    { id: 'ethereum', label: 'Ethereum', count: 67 },
    { id: 'polygon', label: 'Polygon', count: 43 },
    { id: 'arbitrum', label: 'Arbitrum', count: 25 },
    { id: 'optimism', label: 'Optimism', count: 21 },
    { id: 'bsc', label: 'Binance Smart Chain', count: 34 },
    { id: 'solana', label: 'Solana', count: 19 }
  ];

  const experienceOptions = [
    { id: 'junior', label: 'Junior (0-2 years)', count: 23 },
    { id: 'mid', label: 'Mid-level (2-5 years)', count: 41 },
    { id: 'senior', label: 'Senior (5+ years)', count: 28 },
    { id: 'expert', label: 'Expert (10+ years)', count: 12 }
  ];

  const featureOptions = [
    { id: 'fast-turnaround', label: 'Fast Turnaround', count: 34 },
    { id: '24-7-support', label: '24/7 Support', count: 18 },
    { id: 'multiple-revisions', label: 'Multiple Revisions', count: 45 },
    { id: 'consultation', label: 'Live Consultation', count: 29 },
    { id: 'continuous-monitoring', label: 'Continuous Monitoring', count: 12 }
  ];

  const toggleSection = (section: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="font-medium">Filters</span>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary">{activeFiltersCount}</Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onClearAll}>
            <X className="h-4 w-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <FilterSection
        title="Budget Range"
        isCollapsed={collapsedSections.price}
        onToggle={() => toggleSection('price')}
      >
        <PriceRangeFilter
          min={1000}
          max={100000}
          value={filters.priceRange}
          onChange={(value) => updateFilters({ priceRange: value })}
        />
      </FilterSection>

      <FilterSection
        title="Expertise Areas"
        isCollapsed={collapsedSections.expertise}
        onToggle={() => toggleSection('expertise')}
      >
        <MultiSelectFilter
          options={expertiseOptions}
          selected={filters.expertise}
          onChange={(selected) => updateFilters({ expertise: selected })}
        />
      </FilterSection>

      <FilterSection
        title="Blockchain Ecosystems"
        isCollapsed={collapsedSections.blockchain}
        onToggle={() => toggleSection('blockchain')}
      >
        <MultiSelectFilter
          options={blockchainOptions}
          selected={filters.blockchains}
          onChange={(selected) => updateFilters({ blockchains: selected })}
        />
      </FilterSection>

      <FilterSection
        title="Experience Level"
        isCollapsed={collapsedSections.experience}
        onToggle={() => toggleSection('experience')}
      >
        <MultiSelectFilter
          options={experienceOptions}
          selected={filters.experienceLevel}
          onChange={(selected) => updateFilters({ experienceLevel: selected })}
        />
      </FilterSection>

      <FilterSection
        title="Features & Services"
        isCollapsed={collapsedSections.features}
        onToggle={() => toggleSection('features')}
      >
        <MultiSelectFilter
          options={featureOptions}
          selected={filters.features}
          onChange={(selected) => updateFilters({ features: selected })}
        />
      </FilterSection>
    </div>
  );
}

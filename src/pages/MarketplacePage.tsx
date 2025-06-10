
import React, { useState } from 'react';
import { ServiceGrid } from '@/components/marketplace/ServiceGrid';
import { ServiceSearch } from '@/components/marketplace/ServiceSearch';
import { AdvancedServiceFilters } from '@/components/marketplace/enhanced/AdvancedServiceFilters';
import { EnhancedLoading } from '@/components/ui/enhanced-loading';

export const MarketplacePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [filters, setFilters] = useState({});
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
  };

  const handleFiltersChange = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
    setShowAdvancedFilters(false);
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery('');
    setCategory('all');
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Security Marketplace</h1>
        <p className="text-xl text-muted-foreground">
          Find verified Web3 security experts for your project
        </p>
      </div>

      <ServiceSearch
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        onFilterToggle={() => setShowAdvancedFilters(!showAdvancedFilters)}
        showFilters={showAdvancedFilters}
        activeFilters={filters}
        onClearFilters={clearFilters}
      />

      <div className="flex gap-6">
        <div className="flex-1">
          <ServiceGrid
            filters={filters}
            searchQuery={searchQuery}
            category={category}
          />
        </div>

        {showAdvancedFilters && (
          <div className="w-80 flex-shrink-0">
            <AdvancedServiceFilters
              onFiltersChange={handleFiltersChange}
              onClose={() => setShowAdvancedFilters(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

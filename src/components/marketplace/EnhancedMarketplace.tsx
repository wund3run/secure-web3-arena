
import React, { useState } from 'react';
import { SearchFilters } from './SearchFilters';
import { AuditorGrid } from './AuditorGrid';
import { AIMatchingBanner } from './AIMatchingBanner';
import { MarketplaceStats } from './MarketplaceStats';

export function EnhancedMarketplace() {
  const [filters, setFilters] = useState({
    blockchain: '',
    expertise: '',
    availability: '',
    priceRange: [0, 10000],
    rating: 0,
    experience: '',
    location: ''
  });

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">Security Auditor Marketplace</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Connect with expert Web3 security auditors. Browse profiles, compare expertise, and find the perfect match for your project.
        </p>
      </div>

      <MarketplaceStats />
      <AIMatchingBanner />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <SearchFilters filters={filters} onFiltersChange={setFilters} />
        </div>
        <div className="lg:col-span-3">
          <AuditorGrid filters={filters} />
        </div>
      </div>
    </div>
  );
}

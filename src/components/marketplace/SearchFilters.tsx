
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedBlockchain: string;
  onBlockchainChange: (blockchain: string) => void;
  selectedPriceRange: string;
  onPriceRangeChange: (range: string) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedBlockchain,
  onBlockchainChange,
  selectedPriceRange,
  onPriceRangeChange,
  onClearFilters,
  activeFiltersCount
}) => {
  const categories = [
    'Smart Contract Audit',
    'DeFi Protocol Review',
    'NFT Security Assessment',
    'Bridge Audit',
    'DAO Security Review',
    'Penetration Testing'
  ];

  const blockchains = [
    'Ethereum',
    'Polygon',
    'Binance Smart Chain',
    'Arbitrum',
    'Optimism',
    'Solana',
    'Avalanche',
    'Fantom'
  ];

  const priceRanges = [
    'Under $1,000',
    '$1,000 - $5,000',
    '$5,000 - $15,000',
    '$15,000 - $50,000',
    'Over $50,000'
  ];

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search security services..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedBlockchain} onValueChange={onBlockchainChange}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Blockchain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Blockchains</SelectItem>
                {blockchains.map((blockchain) => (
                  <SelectItem key={blockchain} value={blockchain}>
                    {blockchain}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedPriceRange} onValueChange={onPriceRangeChange}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                {priceRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {activeFiltersCount > 0 && (
              <Button
                variant="outline"
                onClick={onClearFilters}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Clear {activeFiltersCount > 1 && `(${activeFiltersCount})`}
              </Button>
            )}
          </div>
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Filter className="h-3 w-3" />
              Active filters:
            </span>
            {selectedCategory !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {selectedCategory}
                <X className="h-3 w-3 cursor-pointer" onClick={() => onCategoryChange('all')} />
              </Badge>
            )}
            {selectedBlockchain !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {selectedBlockchain}
                <X className="h-3 w-3 cursor-pointer" onClick={() => onBlockchainChange('all')} />
              </Badge>
            )}
            {selectedPriceRange !== 'all' && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {selectedPriceRange}
                <X className="h-3 w-3 cursor-pointer" onClick={() => onPriceRangeChange('all')} />
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchFilters;

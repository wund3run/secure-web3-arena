
import React, { useState } from 'react';
import { Search, Filter, Grid, List, SortAsc, Star, DollarSign, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface EnhancedMarketplaceHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterChange: (filters: unknown) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  resultsCount?: number;
}

export function EnhancedMarketplaceHeader({
  searchQuery,
  onSearchChange,
  onFilterChange,
  viewMode,
  onViewModeChange,
  resultsCount = 0
}: EnhancedMarketplaceHeaderProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filterOptions = [
    { id: 'smart-contract', label: 'Smart Contract Audit', icon: '🔒' },
    { id: 'defi', label: 'DeFi Security', icon: '💰' },
    { id: 'nft', label: 'NFT Security', icon: '🎨' },
    { id: 'bridge', label: 'Bridge Audit', icon: '🌉' },
    { id: 'dao', label: 'DAO Governance', icon: '🏛️' },
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant', icon: Star },
    { value: 'rating', label: 'Highest Rated', icon: Star },
    { value: 'price-low', label: 'Price: Low to High', icon: DollarSign },
    { value: 'price-high', label: 'Price: High to Low', icon: DollarSign },
    { value: 'response-time', label: 'Fastest Response', icon: Clock },
  ];

  const toggleFilter = (filterId: string) => {
    const newFilters = activeFilters.includes(filterId)
      ? activeFilters.filter(f => f !== filterId)
      : [...activeFilters, filterId];
    
    setActiveFilters(newFilters);
    onFilterChange({ categories: newFilters });
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    onFilterChange({ categories: [] });
  };

  return (
    <div className="bg-card border-b border-border/50 sticky top-16 z-40 backdrop-blur-lg bg-background/95">
      <div className="container-modern py-6">
        {/* Header with title and view controls */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Security Marketplace</h1>
            <p className="text-muted-foreground">
              {resultsCount > 0 ? `${resultsCount} expert services available` : 'Discover expert security services'}
            </p>
          </div>
          
          {/* View mode toggle */}
          <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className="h-8 w-8 p-0"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className="h-8 w-8 p-0"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search and filter row */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          {/* Enhanced search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search auditors, services, or expertise..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 h-12 bg-background/50 border-border/50 focus:border-primary/50"
            />
          </div>

          {/* Sort dropdown */}
          <Select defaultValue="relevance">
            <SelectTrigger className="w-48 h-12 bg-background/50">
              <SortAsc className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-2">
                    <option.icon className="h-4 w-4" />
                    {option.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Advanced filters */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-12 px-4 bg-background/50">
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {activeFilters.length > 0 && (
                  <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {activeFilters.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end">
              <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {filterOptions.map((option) => (
                <DropdownMenuItem
                  key={option.id}
                  onClick={() => toggleFilter(option.id)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span>{option.icon}</span>
                    <span>{option.label}</span>
                  </div>
                  {activeFilters.includes(option.id) && (
                    <Badge variant="secondary" className="h-5 w-5 rounded-full p-0 flex items-center justify-center">
                      ✓
                    </Badge>
                  )}
                </DropdownMenuItem>
              ))}
              {activeFilters.length > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={clearAllFilters} className="text-red-600 cursor-pointer">
                    Clear all filters
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Active filters display */}
        {activeFilters.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {activeFilters.map((filterId) => {
              const option = filterOptions.find(opt => opt.id === filterId);
              return option ? (
                <Badge 
                  key={filterId} 
                  variant="secondary" 
                  className="flex items-center gap-1 cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                  onClick={() => toggleFilter(filterId)}
                >
                  <span>{option.icon}</span>
                  <span>{option.label}</span>
                  <span className="ml-1">×</span>
                </Badge>
              ) : null;
            })}
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-6 text-xs">
              Clear all
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}


import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ServiceSearchProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onFilterToggle: () => void;
  showFilters: boolean;
  activeFilters: Record<string, any>;
  onClearFilters: () => void;
}

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'smart-contract', label: 'Smart Contract Audit' },
  { value: 'defi', label: 'DeFi Security' },
  { value: 'nft', label: 'NFT Audit' },
  { value: 'governance', label: 'Governance Review' },
  { value: 'tokenomics', label: 'Tokenomics Analysis' },
];

export function ServiceSearch({
  onSearch,
  onCategoryChange,
  onFilterToggle,
  showFilters,
  activeFilters,
  onClearFilters
}: ServiceSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const activeFilterCount = Object.keys(activeFilters).filter(key => 
    activeFilters[key] && (
      Array.isArray(activeFilters[key]) ? activeFilters[key].length > 0 : true
    )
  ).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" variant="outline">
            Search
          </Button>
        </form>
        
        <div className="flex gap-2">
          <Select onValueChange={onCategoryChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            onClick={onFilterToggle}
            className="relative"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
      
      {activeFilterCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {Object.entries(activeFilters).map(([key, value]) => {
            if (!value || (Array.isArray(value) && value.length === 0)) return null;
            
            return (
              <Badge key={key} variant="secondary" className="gap-1">
                {key}: {Array.isArray(value) ? value.join(', ') : String(value)}
              </Badge>
            );
          })}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-6 px-2 text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}

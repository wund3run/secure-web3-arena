
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

interface SearchFilters {
  types: string[];
  tags: string[];
  category?: string;
  sortBy: 'relevance' | 'newest' | 'rating';
}

interface AdvancedSearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onClear: () => void;
}

const CONTENT_TYPES = [
  { value: 'article', label: 'Articles' },
  { value: 'tutorial', label: 'Tutorials' },
  { value: 'topic', label: 'Forum Topics' }
];

const CATEGORIES = [
  { value: 'smart-contract-security', label: 'Smart Contract Security' },
  { value: 'defi-security', label: 'DeFi Security' },
  { value: 'security-tools', label: 'Security Tools' },
  { value: 'audit-methodology', label: 'Audit Methodology' },
  { value: 'vulnerability-research', label: 'Vulnerability Research' },
  { value: 'best-practices', label: 'Best Practices' }
];

const POPULAR_TAGS = [
  'solidity', 'ethereum', 'defi', 'smart-contracts', 'security', 'audit',
  'vulnerability', 'gas-optimization', 'testing', 'formal-verification'
];

export const AdvancedSearchFilters: React.FC<AdvancedSearchFiltersProps> = ({
  filters,
  onFiltersChange,
  onClear
}) => {
  const toggleType = (type: string) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    
    onFiltersChange({ ...filters, types: newTypes });
  };

  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    
    onFiltersChange({ ...filters, tags: newTags });
  };

  const hasActiveFilters = filters.types.length > 0 || filters.tags.length > 0 || filters.category;

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClear}>
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Content Types */}
        <div>
          <h4 className="font-medium mb-3">Content Type</h4>
          <div className="flex flex-wrap gap-2">
            {CONTENT_TYPES.map(type => (
              <Badge
                key={type.value}
                variant={filters.types.includes(type.value) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleType(type.value)}
              >
                {type.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <h4 className="font-medium mb-3">Category</h4>
          <Select 
            value={filters.category || ""} 
            onValueChange={(value) => 
              onFiltersChange({ ...filters, category: value || undefined })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {CATEGORIES.map(category => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Popular Tags */}
        <div>
          <h4 className="font-medium mb-3">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {POPULAR_TAGS.map(tag => (
              <Badge
                key={tag}
                variant={filters.tags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Sort By */}
        <div>
          <h4 className="font-medium mb-3">Sort By</h4>
          <Select 
            value={filters.sortBy} 
            onValueChange={(value: 'relevance' | 'newest' | 'rating') => 
              onFiltersChange({ ...filters, sortBy: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

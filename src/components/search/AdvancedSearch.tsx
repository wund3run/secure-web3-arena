
import React, { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { search, Filter, ChevronDown, X, Zap, TrendingUp } from 'lucide-react';
import { analyticsTracker } from '@/utils/analytics-tracker';

interface SearchFilter {
  id: string;
  label: string;
  type: 'text' | 'select' | 'range' | 'boolean';
  options?: string[];
  value: any;
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  relevance: number;
  url: string;
  metadata: Record<string, any>;
}

interface AdvancedSearchProps {
  placeholder?: string;
  categories?: string[];
  onResults?: (results: SearchResult[]) => void;
}

export function AdvancedSearch({ 
  placeholder = "Search auditors, services, or documentation...",
  categories = ['auditors', 'services', 'docs', 'tools'],
  onResults 
}: AdvancedSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilter[]>([
    {
      id: 'category',
      label: 'Category',
      type: 'select',
      options: categories,
      value: ''
    },
    {
      id: 'rating',
      label: 'Min Rating',
      type: 'range',
      value: 0
    },
    {
      id: 'verified',
      label: 'Verified Only',
      type: 'boolean',
      value: false
    }
  ]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Mock data for demonstration
  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'Elite Security Auditor',
      description: 'Specialized in DeFi protocols with 50+ successful audits',
      category: 'auditors',
      relevance: 0.95,
      url: '/auditor/elite-security',
      metadata: { rating: 4.9, verified: true, experience: '5+ years' }
    },
    {
      id: '2',
      title: 'Smart Contract Audit Service',
      description: 'Comprehensive security analysis for Ethereum contracts',
      category: 'services',
      relevance: 0.87,
      url: '/service/smart-contract-audit',
      metadata: { rating: 4.7, verified: true, price: '$5000-$15000' }
    },
    {
      id: '3',
      title: 'Security Best Practices Guide',
      description: 'Complete guide to Web3 security implementation',
      category: 'docs',
      relevance: 0.72,
      url: '/docs/security-best-practices',
      metadata: { type: 'documentation', updated: '2024-01-15' }
    }
  ];

  useEffect(() => {
    // Load search history
    const history = JSON.parse(localStorage.getItem('hawkly_search_history') || '[]');
    setSearchHistory(history.slice(0, 5)); // Keep last 5 searches
  }, []);

  useEffect(() => {
    if (query.length > 2) {
      performSearch(query);
    } else {
      setResults([]);
      setSuggestions([]);
    }
  }, [query, filters]);

  const performSearch = async (searchQuery: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Apply filters and search logic
      let filteredResults = mockResults.filter(result => {
        const matchesQuery = result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            result.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = !filters.find(f => f.id === 'category')?.value || 
                               result.category === filters.find(f => f.id === 'category')?.value;
        
        const matchesRating = result.metadata.rating >= (filters.find(f => f.id === 'rating')?.value || 0);
        
        const matchesVerified = !filters.find(f => f.id === 'verified')?.value || 
                               result.metadata.verified;
        
        return matchesQuery && matchesCategory && matchesRating && matchesVerified;
      });

      // Sort by relevance
      filteredResults.sort((a, b) => b.relevance - a.relevance);
      
      setResults(filteredResults);
      onResults?.(filteredResults);
      
      // Generate suggestions based on search
      const newSuggestions = generateSuggestions(searchQuery);
      setSuggestions(newSuggestions);
      
      // Track search
      analyticsTracker.track('search', 'interaction', 'search_performed', searchQuery);
      
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSuggestions = (query: string): string[] => {
    const suggestions = [
      'smart contract audit',
      'defi security',
      'nft audit service',
      'solidity security',
      'web3 penetration testing',
      'blockchain security tools'
    ];
    
    return suggestions.filter(s => 
      s.toLowerCase().includes(query.toLowerCase()) && s !== query
    ).slice(0, 3);
  };

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      setQuery(searchQuery);
      
      // Update search history
      const newHistory = [searchQuery, ...searchHistory.filter(h => h !== searchQuery)].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('hawkly_search_history', JSON.stringify(newHistory));
    }
  };

  const updateFilter = (filterId: string, value: any) => {
    setFilters(prev => prev.map(filter => 
      filter.id === filterId ? { ...filter, value } : filter
    ));
  };

  const clearFilters = () => {
    setFilters(prev => prev.map(filter => ({ ...filter, value: filter.type === 'boolean' ? false : '' })));
  };

  const activeFiltersCount = filters.filter(f => f.value && f.value !== '').length;

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-20"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(query);
            }
          }}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          <Popover open={showFilters} onOpenChange={setShowFilters}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-3 w-3 mr-1" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Search Filters</h4>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear all
                  </Button>
                </div>
                
                {filters.map(filter => (
                  <div key={filter.id} className="space-y-2">
                    <label className="text-sm font-medium">{filter.label}</label>
                    
                    {filter.type === 'select' && (
                      <Command>
                        <CommandInput placeholder={`Search ${filter.label.toLowerCase()}...`} />
                        <CommandList>
                          <CommandEmpty>No options found.</CommandEmpty>
                          <CommandGroup>
                            {filter.options?.map(option => (
                              <CommandItem
                                key={option}
                                onSelect={() => updateFilter(filter.id, option)}
                              >
                                {option}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    )}
                    
                    {filter.type === 'boolean' && (
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={filter.value}
                          onChange={(e) => updateFilter(filter.id, e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-sm">{filter.label}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Search Suggestions */}
      {suggestions.length > 0 && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Suggestions:</span>
          {suggestions.map(suggestion => (
            <Button
              key={suggestion}
              variant="ghost"
              size="sm"
              onClick={() => handleSearch(suggestion)}
              className="h-6 px-2 text-xs"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      )}

      {/* Search Results */}
      {query && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span>Search Results</span>
              {isLoading && <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results.length > 0 ? (
              <div className="space-y-3">
                {results.map(result => (
                  <div key={result.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{result.title}</h4>
                          <Badge variant="outline" className="text-xs">
                            {result.category}
                          </Badge>
                          {result.metadata.verified && (
                            <Badge variant="default" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {result.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          {result.metadata.rating && (
                            <span>★ {result.metadata.rating}</span>
                          )}
                          {result.metadata.experience && (
                            <span>{result.metadata.experience}</span>
                          )}
                          {result.metadata.price && (
                            <span>{result.metadata.price}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {Math.round(result.relevance * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {isLoading ? 'Searching...' : 'No results found'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Search History */}
      {searchHistory.length > 0 && !query && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Recent Searches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map(historyItem => (
                <Button
                  key={historyItem}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSearch(historyItem)}
                  className="h-6 px-2 text-xs"
                >
                  {historyItem}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

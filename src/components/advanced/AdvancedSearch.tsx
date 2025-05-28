
import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { 
  Search, Filter, X, Clock, Star, DollarSign, Shield, 
  TrendingUp, Zap, BookOpen, Users, Target, SortAsc, SortDesc
} from "lucide-react";
import { analyticsTracker } from "@/utils/analytics-tracker";

interface SearchFilters {
  query: string;
  categories: string[];
  priceRange: [number, number];
  rating: number;
  experienceLevel: string[];
  blockchain: string[];
  deliveryTime: string[];
  availability: boolean;
  verified: boolean;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  provider: string;
  experienceLevel: string;
  blockchain: string[];
  deliveryTime: string;
  available: boolean;
  verified: boolean;
  tags: string[];
  relevanceScore: number;
}

export function AdvancedSearch() {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    categories: [],
    priceRange: [0, 10000],
    rating: 0,
    experienceLevel: [],
    blockchain: [],
    deliveryTime: [],
    availability: false,
    verified: false,
    sortBy: 'relevance',
    sortOrder: 'desc'
  });

  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Mock data for search results
  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'Comprehensive Smart Contract Security Audit',
      description: 'Full security audit for Ethereum smart contracts with detailed vulnerability assessment',
      category: 'Smart Contract Audit',
      price: 2500,
      rating: 4.9,
      provider: 'SecureCode Labs',
      experienceLevel: 'Expert',
      blockchain: ['Ethereum', 'Polygon'],
      deliveryTime: '5-7 days',
      available: true,
      verified: true,
      tags: ['solidity', 'defi', 'security', 'ethereum'],
      relevanceScore: 0.95
    },
    {
      id: '2',
      title: 'DeFi Protocol Security Review',
      description: 'Specialized security review for DeFi protocols including flash loan protection',
      category: 'DeFi Security',
      price: 4200,
      rating: 4.8,
      provider: 'DeFi Security Pro',
      experienceLevel: 'Expert',
      blockchain: ['Ethereum', 'BSC', 'Arbitrum'],
      deliveryTime: '7-10 days',
      available: true,
      verified: true,
      tags: ['defi', 'flash-loans', 'liquidity', 'amm'],
      relevanceScore: 0.88
    },
    {
      id: '3',
      title: 'Cross-Chain Bridge Security Audit',
      description: 'Security audit for cross-chain bridge protocols and interoperability solutions',
      category: 'Cross-Chain Security',
      price: 6800,
      rating: 4.7,
      provider: 'Bridge Security Experts',
      experienceLevel: 'Expert',
      blockchain: ['Ethereum', 'Polygon', 'Arbitrum', 'Optimism'],
      deliveryTime: '10-14 days',
      available: false,
      verified: true,
      tags: ['cross-chain', 'bridges', 'interoperability'],
      relevanceScore: 0.82
    }
  ];

  const categories = [
    'Smart Contract Audit',
    'DeFi Security',
    'NFT Security',
    'Cross-Chain Security',
    'Governance Security',
    'Token Economics'
  ];

  const blockchains = [
    'Ethereum',
    'Polygon',
    'BSC',
    'Arbitrum',
    'Optimism',
    'Avalanche',
    'Solana'
  ];

  const experienceLevels = ['Beginner', 'Intermediate', 'Expert'];
  const deliveryTimes = ['1-3 days', '3-5 days', '5-7 days', '7-10 days', '10+ days'];

  // Search suggestions
  const searchSuggestions = [
    'smart contract audit',
    'defi security review',
    'flash loan protection',
    'cross-chain bridge audit',
    'nft marketplace security',
    'governance token audit',
    'yield farming security'
  ];

  useEffect(() => {
    // Load search history
    const history = JSON.parse(localStorage.getItem('search-history') || '[]');
    setSearchHistory(history);
  }, []);

  useEffect(() => {
    // Update suggestions based on query
    if (filters.query.length > 0) {
      const filtered = searchSuggestions.filter(s => 
        s.toLowerCase().includes(filters.query.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [filters.query]);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (filters.query.length > 0) {
        performSearch();
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filters]);

  const performSearch = async () => {
    setIsLoading(true);
    
    // Track search event
    analyticsTracker.track('search', 'query', 'performed', {
      query: filters.query,
      filters_applied: Object.keys(filters).filter(key => 
        key !== 'query' && key !== 'sortBy' && key !== 'sortOrder' &&
        (Array.isArray(filters[key as keyof SearchFilters]) 
          ? (filters[key as keyof SearchFilters] as any[]).length > 0
          : filters[key as keyof SearchFilters] !== false && filters[key as keyof SearchFilters] !== 0)
      ).length
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Filter and sort results
    let filteredResults = mockResults.filter(result => {
      // Text search
      const matchesQuery = filters.query === '' || 
        result.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        result.description.toLowerCase().includes(filters.query.toLowerCase()) ||
        result.tags.some(tag => tag.toLowerCase().includes(filters.query.toLowerCase()));

      // Category filter
      const matchesCategory = filters.categories.length === 0 || 
        filters.categories.includes(result.category);

      // Price range
      const matchesPrice = result.price >= filters.priceRange[0] && 
        result.price <= filters.priceRange[1];

      // Rating
      const matchesRating = result.rating >= filters.rating;

      // Experience level
      const matchesExperience = filters.experienceLevel.length === 0 || 
        filters.experienceLevel.includes(result.experienceLevel);

      // Blockchain
      const matchesBlockchain = filters.blockchain.length === 0 || 
        filters.blockchain.some(chain => result.blockchain.includes(chain));

      // Availability
      const matchesAvailability = !filters.availability || result.available;

      // Verification
      const matchesVerification = !filters.verified || result.verified;

      return matchesQuery && matchesCategory && matchesPrice && matchesRating && 
             matchesExperience && matchesBlockchain && matchesAvailability && matchesVerification;
    });

    // Sort results
    filteredResults.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (filters.sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'relevance':
        default:
          aValue = a.relevanceScore;
          bValue = b.relevanceScore;
      }

      if (filters.sortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

    setResults(filteredResults);
    setIsLoading(false);

    // Save to search history
    if (filters.query && !searchHistory.includes(filters.query)) {
      const newHistory = [filters.query, ...searchHistory.slice(0, 9)];
      setSearchHistory(newHistory);
      localStorage.setItem('search-history', JSON.stringify(newHistory));
    }
  };

  const updateFilter = <K extends keyof SearchFilters>(
    key: K,
    value: SearchFilters[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      query: filters.query, // Keep the search query
      categories: [],
      priceRange: [0, 10000],
      rating: 0,
      experienceLevel: [],
      blockchain: [],
      deliveryTime: [],
      availability: false,
      verified: false,
      sortBy: 'relevance',
      sortOrder: 'desc'
    });
  };

  const appliedFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.categories.length > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000) count++;
    if (filters.rating > 0) count++;
    if (filters.experienceLevel.length > 0) count++;
    if (filters.blockchain.length > 0) count++;
    if (filters.deliveryTime.length > 0) count++;
    if (filters.availability) count++;
    if (filters.verified) count++;
    return count;
  }, [filters]);

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Advanced Search
          </CardTitle>
          <CardDescription>
            Find the perfect security audit service with intelligent filtering and sorting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Main Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search audits, services, or providers..."
              value={filters.query}
              onChange={(e) => updateFilter('query', e.target.value)}
              className="pl-10 pr-12"
            />
            {filters.query && (
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-1 top-1/2 transform -translate-y-1/2"
                onClick={() => updateFilter('query', '')}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          {/* Search Suggestions */}
          {suggestions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant="outline"
                  onClick={() => updateFilter('query', suggestion)}
                  className="text-xs"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          )}

          {/* Search History */}
          {searchHistory.length > 0 && filters.query === '' && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Recent searches:</p>
              <div className="flex flex-wrap gap-2">
                {searchHistory.slice(0, 5).map((search, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant="outline"
                    onClick={() => updateFilter('query', search)}
                    className="text-xs"
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    {search}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Filter Toggle */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
              {appliedFiltersCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {appliedFiltersCount}
                </Badge>
              )}
            </Button>

            <div className="flex items-center gap-2">
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilter('sortBy', e.target.value)}
                className="text-sm border rounded px-2 py-1"
              >
                <option value="relevance">Relevance</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
              </select>
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateFilter('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                {filters.sortOrder === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters */}
      {showFilters && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Advanced Filters</CardTitle>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Categories */}
              <div className="space-y-3">
                <h4 className="font-medium">Categories</h4>
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFilter('categories', [...filters.categories, category]);
                        } else {
                          updateFilter('categories', filters.categories.filter(c => c !== category));
                        }
                      }}
                    />
                    <label htmlFor={category} className="text-sm">
                      {category}
                    </label>
                  </div>
                ))}
              </div>

              {/* Blockchain Networks */}
              <div className="space-y-3">
                <h4 className="font-medium">Blockchain Networks</h4>
                {blockchains.map((blockchain) => (
                  <div key={blockchain} className="flex items-center space-x-2">
                    <Checkbox
                      id={blockchain}
                      checked={filters.blockchain.includes(blockchain)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFilter('blockchain', [...filters.blockchain, blockchain]);
                        } else {
                          updateFilter('blockchain', filters.blockchain.filter(b => b !== blockchain));
                        }
                      }}
                    />
                    <label htmlFor={blockchain} className="text-sm">
                      {blockchain}
                    </label>
                  </div>
                ))}
              </div>

              {/* Experience Level */}
              <div className="space-y-3">
                <h4 className="font-medium">Experience Level</h4>
                {experienceLevels.map((level) => (
                  <div key={level} className="flex items-center space-x-2">
                    <Checkbox
                      id={level}
                      checked={filters.experienceLevel.includes(level)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFilter('experienceLevel', [...filters.experienceLevel, level]);
                        } else {
                          updateFilter('experienceLevel', filters.experienceLevel.filter(l => l !== level));
                        }
                      }}
                    />
                    <label htmlFor={level} className="text-sm">
                      {level}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <h4 className="font-medium">Price Range</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => updateFilter('priceRange', value as [number, number])}
                  max={10000}
                  min={0}
                  step={100}
                  className="w-full"
                />
              </div>
            </div>

            {/* Rating */}
            <div className="space-y-3">
              <h4 className="font-medium">Minimum Rating</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Any rating</span>
                  <span>{filters.rating} stars and above</span>
                </div>
                <Slider
                  value={[filters.rating]}
                  onValueChange={([value]) => updateFilter('rating', value)}
                  max={5}
                  min={0}
                  step={0.5}
                  className="w-full"
                />
              </div>
            </div>

            {/* Quick Filters */}
            <div className="space-y-3">
              <h4 className="font-medium">Quick Filters</h4>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="availability"
                    checked={filters.availability}
                    onCheckedChange={(checked) => updateFilter('availability', checked as boolean)}
                  />
                  <label htmlFor="availability" className="text-sm">
                    Available now
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="verified"
                    checked={filters.verified}
                    onCheckedChange={(checked) => updateFilter('verified', checked as boolean)}
                  />
                  <label htmlFor="verified" className="text-sm">
                    Verified providers only
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results */}
      <Card>
        <CardHeader>
          <CardTitle>
            Search Results
            {results.length > 0 && (
              <Badge variant="secondary" className="ml-2">
                {results.length} found
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                  <div className="h-3 bg-muted rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8">
              <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">
                {filters.query ? 'No results found. Try adjusting your search or filters.' : 'Enter a search query to get started.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((result) => (
                <Card key={result.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h3 className="font-semibold text-lg">{result.title}</h3>
                          <p className="text-muted-foreground">{result.description}</p>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            <span className="font-bold">${result.price}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {result.rating}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {result.provider}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {result.deliveryTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {result.experienceLevel}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {result.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {result.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{result.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {result.verified && (
                            <Badge className="text-xs bg-green-100 text-green-700">
                              <Shield className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          {result.available && (
                            <Badge className="text-xs bg-blue-100 text-blue-700">
                              <Zap className="h-3 w-3 mr-1" />
                              Available
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

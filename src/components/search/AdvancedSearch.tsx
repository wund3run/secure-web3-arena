import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc, 
  Calendar,
  Star,
  DollarSign,
  Clock
} from 'lucide-react';

interface SearchFilters {
  query: string;
  categories: string[];
  priceRange: [number, number];
  rating: number;
  deliveryTime: string;
  sortBy: 'relevance' | 'price' | 'rating' | 'date';
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
  deliveryTime: string;
  tags: string[];
}

export function AdvancedSearch() {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    categories: [],
    priceRange: [0, 10000],
    rating: 0,
    deliveryTime: '',
    sortBy: 'relevance',
    sortOrder: 'desc'
  });

  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock search results
  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'Smart Contract Security Audit',
      description: 'Comprehensive security audit for DeFi protocols with detailed vulnerability assessment',
      category: 'Smart Contract Audit',
      price: 2500,
      rating: 4.8,
      provider: 'SecureWeb3 Labs',
      deliveryTime: '5-7 days',
      tags: ['DeFi', 'Solidity', 'Security']
    },
    {
      id: '2',
      title: 'NFT Collection Security Review',
      description: 'Complete security review for NFT smart contracts including minting mechanisms',
      category: 'NFT Security',
      price: 1800,
      rating: 4.9,
      provider: 'CryptoSec Experts',
      deliveryTime: '3-5 days',
      tags: ['NFT', 'ERC-721', 'Minting']
    },
    {
      id: '3',
      title: 'Cross-Chain Bridge Audit',
      description: 'Advanced security audit for cross-chain bridge protocols and interoperability',
      category: 'Bridge Security',
      price: 4500,
      rating: 4.7,
      provider: 'Bridge Security Inc',
      deliveryTime: '7-10 days',
      tags: ['Bridge', 'Cross-chain', 'Interoperability']
    }
  ];

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setResults(mockResults);
      setIsSearching(false);
    }, 1000);
  };

  const categories = [
    'Smart Contract Audit',
    'NFT Security',
    'DeFi Protocol',
    'Bridge Security',
    'Token Audit',
    'Game Security',
    'DAO Governance'
  ];

  const deliveryOptions = [
    '1-3 days',
    '3-5 days',
    '5-7 days',
    '7-10 days',
    '10+ days'
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Search className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Advanced Search</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Search Filters */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search Query */}
            <div>
              <label className="text-sm font-medium mb-2 block">Search Query</label>
              <Input
                placeholder="Enter keywords..."
                value={filters.query}
                onChange={(e) => setFilters({ ...filters, query: e.target.value })}
              />
            </div>

            {/* Categories */}
            <div>
              <label className="text-sm font-medium mb-2 block">Categories</label>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      checked={filters.categories.includes(category)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFilters({
                            ...filters,
                            categories: [...filters.categories, category]
                          });
                        } else {
                          setFilters({
                            ...filters,
                            categories: filters.categories.filter(c => c !== category)
                          });
                        }
                      }}
                    />
                    <label className="text-sm">{category}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-sm font-medium mb-2 block">Price Range</label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange[0]}
                  onChange={(e) => setFilters({
                    ...filters,
                    priceRange: [parseInt(e.target.value) || 0, filters.priceRange[1]]
                  })}
                />
                <span>-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters({
                    ...filters,
                    priceRange: [filters.priceRange[0], parseInt(e.target.value) || 10000]
                  })}
                />
              </div>
            </div>

            {/* Minimum Rating */}
            <div>
              <label className="text-sm font-medium mb-2 block">Minimum Rating</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Button
                    key={rating}
                    variant={filters.rating >= rating ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilters({ ...filters, rating })}
                  >
                    <Star className="h-3 w-3" />
                  </Button>
                ))}
              </div>
            </div>

            {/* Delivery Time */}
            <div>
              <label className="text-sm font-medium mb-2 block">Delivery Time</label>
              <div className="space-y-2">
                {deliveryOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      checked={filters.deliveryTime === option}
                      onCheckedChange={(checked) => {
                        setFilters({
                          ...filters,
                          deliveryTime: checked ? option : ''
                        });
                      }}
                    />
                    <label className="text-sm">{option}</label>
                  </div>
                ))}
              </div>
            </div>

            <Button onClick={handleSearch} className="w-full" disabled={isSearching}>
              {isSearching ? 'Searching...' : 'Apply Filters'}
            </Button>
          </CardContent>
        </Card>

        {/* Search Results */}
        <div className="lg:col-span-3 space-y-4">
          {/* Sort Controls */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    {results.length} results found
                  </span>
                  {filters.categories.length > 0 && (
                    <div className="flex items-center gap-2">
                      {filters.categories.map((category) => (
                        <Badge key={category} variant="secondary">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as 'relevance' | 'price' | 'rating' | 'date' })}
                    className="text-sm border rounded px-2 py-1"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price">Price</option>
                    <option value="rating">Rating</option>
                    <option value="date">Date</option>
                  </select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFilters({
                      ...filters,
                      sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc'
                    })}
                  >
                    {filters.sortOrder === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-4">
            {results.map((result) => (
              <Card key={result.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{result.title}</h3>
                      <p className="text-muted-foreground mb-3">{result.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span>{result.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          <span>${result.price}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{result.deliveryTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        {result.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-2">by {result.provider}</p>
                      <Button>View Details</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

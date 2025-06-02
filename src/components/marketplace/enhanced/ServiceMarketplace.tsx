
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Star, Shield, Clock, DollarSign, Users, MapPin } from 'lucide-react';
import { MultiSelectFilter } from '../enhanced-filters/MultiSelectFilter';

interface ServiceProvider {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  specializations: string[];
  blockchains: string[];
  priceRange: string;
  completedAudits: number;
  responseTime: string;
  location: string;
  verified: boolean;
  featured: boolean;
  description: string;
  experienceYears: number;
}

interface FilterOptions {
  blockchains: string[];
  specializations: string[];
  priceRanges: string[];
  experienceLevels: string[];
  locations: string[];
}

const mockServiceProviders: ServiceProvider[] = [
  {
    id: '1',
    name: 'CyberGuard Security',
    avatar: '/api/placeholder/100/100',
    rating: 4.9,
    reviewCount: 47,
    specializations: ['Smart Contract Audit', 'DeFi Security', 'Flash Loan Protection'],
    blockchains: ['Ethereum', 'Polygon', 'Binance Smart Chain'],
    priceRange: '$10,000 - $25,000',
    completedAudits: 150,
    responseTime: '< 2 hours',
    location: 'Global',
    verified: true,
    featured: true,
    description: 'Leading security firm specializing in DeFi protocols and smart contract auditing.',
    experienceYears: 6
  },
  {
    id: '2',
    name: 'BlockShield Labs',
    avatar: '/api/placeholder/100/100',
    rating: 4.8,
    reviewCount: 32,
    specializations: ['Layer 2 Security', 'Cross-chain Bridges', 'MEV Protection'],
    blockchains: ['Ethereum', 'Arbitrum', 'Optimism'],
    priceRange: '$15,000 - $40,000',
    completedAudits: 89,
    responseTime: '< 4 hours',
    location: 'North America',
    verified: true,
    featured: true,
    description: 'Specialized in Layer 2 solutions and cross-chain security assessments.',
    experienceYears: 4
  },
  {
    id: '3',
    name: 'SecureChain Experts',
    avatar: '/api/placeholder/100/100',
    rating: 4.7,
    reviewCount: 28,
    specializations: ['NFT Security', 'GameFi Audits', 'Token Economics'],
    blockchains: ['Ethereum', 'Solana', 'Flow'],
    priceRange: '$5,000 - $15,000',
    completedAudits: 67,
    responseTime: '< 6 hours',
    location: 'Europe',
    verified: true,
    featured: false,
    description: 'Focused on NFT marketplaces and gaming protocol security.',
    experienceYears: 3
  }
];

const filterOptions: FilterOptions = {
  blockchains: ['Ethereum', 'Solana', 'Polygon', 'Binance Smart Chain', 'Arbitrum', 'Optimism', 'Flow'],
  specializations: [
    'Smart Contract Audit',
    'DeFi Security',
    'NFT Security',
    'Flash Loan Protection',
    'Layer 2 Security',
    'Cross-chain Bridges',
    'MEV Protection',
    'GameFi Audits',
    'Token Economics'
  ],
  priceRanges: ['$5,000 - $10,000', '$10,000 - $25,000', '$25,000 - $50,000', '$50,000+'],
  experienceLevels: ['1-2 years', '3-5 years', '5+ years'],
  locations: ['Global', 'North America', 'Europe', 'Asia Pacific']
};

export function ServiceMarketplace() {
  const [providers, setProviders] = useState<ServiceProvider[]>(mockServiceProviders);
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>(mockServiceProviders);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');
  const [filters, setFilters] = useState({
    blockchains: [] as string[],
    specializations: [] as string[],
    priceRange: '',
    experienceLevel: '',
    location: '',
    minRating: 0
  });
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, filters, sortBy, selectedTab, providers]);

  const applyFilters = () => {
    let filtered = [...providers];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(provider =>
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.specializations.some(spec => 
          spec.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Tab filter
    if (selectedTab === 'featured') {
      filtered = filtered.filter(provider => provider.featured);
    } else if (selectedTab === 'verified') {
      filtered = filtered.filter(provider => provider.verified);
    }

    // Blockchain filter
    if (filters.blockchains.length > 0) {
      filtered = filtered.filter(provider =>
        filters.blockchains.some(blockchain =>
          provider.blockchains.includes(blockchain)
        )
      );
    }

    // Specialization filter
    if (filters.specializations.length > 0) {
      filtered = filtered.filter(provider =>
        filters.specializations.some(spec =>
          provider.specializations.includes(spec)
        )
      );
    }

    // Price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(provider => provider.priceRange === filters.priceRange);
    }

    // Experience level filter
    if (filters.experienceLevel) {
      const [min, max] = filters.experienceLevel.split('-').map(s => parseInt(s.replace(/\D/g, '')));
      filtered = filtered.filter(provider => {
        if (filters.experienceLevel.includes('+')) {
          return provider.experienceYears >= min;
        }
        return provider.experienceYears >= min && provider.experienceYears <= (max || min + 1);
      });
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(provider => provider.location === filters.location);
    }

    // Rating filter
    if (filters.minRating > 0) {
      filtered = filtered.filter(provider => provider.rating >= filters.minRating);
    }

    // Sort results
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        filtered.sort((a, b) => {
          const aPrice = parseInt(a.priceRange.split('-')[0].replace(/\D/g, ''));
          const bPrice = parseInt(b.priceRange.split('-')[0].replace(/\D/g, ''));
          return aPrice - bPrice;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const aPrice = parseInt(a.priceRange.split('-')[0].replace(/\D/g, ''));
          const bPrice = parseInt(b.priceRange.split('-')[0].replace(/\D/g, ''));
          return bPrice - aPrice;
        });
        break;
      case 'experience':
        filtered.sort((a, b) => b.experienceYears - a.experienceYears);
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
        break;
    }

    setFilteredProviders(filtered);
  };

  const clearFilters = () => {
    setFilters({
      blockchains: [],
      specializations: [],
      priceRange: '',
      experienceLevel: '',
      location: '',
      minRating: 0
    });
    setSearchQuery('');
  };

  const ServiceProviderCard = ({ provider }: { provider: ServiceProvider }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={provider.avatar} />
              <AvatarFallback>{provider.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold">{provider.name}</h3>
                {provider.verified && (
                  <Badge variant="secondary" className="text-xs">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
                {provider.featured && (
                  <Badge variant="default" className="text-xs">Featured</Badge>
                )}
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  {provider.rating} ({provider.reviewCount})
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {provider.responseTime}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {provider.location}
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-primary">{provider.priceRange}</div>
            <div className="text-sm text-muted-foreground">{provider.completedAudits} audits completed</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{provider.description}</p>
        
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium mb-2">Specializations</h4>
            <div className="flex flex-wrap gap-1">
              {provider.specializations.map((spec, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Blockchain Expertise</h4>
            <div className="flex flex-wrap gap-1">
              {provider.blockchains.map((blockchain, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {blockchain}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            {provider.experienceYears} years experience
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm">
              View Profile
            </Button>
            <Button size="sm">
              Request Quote
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, specialization, or technology..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured First</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="experience">Most Experienced</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 p-4 border rounded-lg bg-muted/50">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Blockchain Expertise</h4>
                  <MultiSelectFilter
                    options={filterOptions.blockchains.map(b => ({ id: b, label: b }))}
                    selected={filters.blockchains}
                    onChange={(selected) => setFilters(prev => ({ ...prev, blockchains: selected }))}
                  />
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Specializations</h4>
                  <MultiSelectFilter
                    options={filterOptions.specializations.map(s => ({ id: s, label: s }))}
                    selected={filters.specializations}
                    onChange={(selected) => setFilters(prev => ({ ...prev, specializations: selected }))}
                  />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-3">Price Range</h4>
                    <Select value={filters.priceRange} onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any price range" />
                      </SelectTrigger>
                      <SelectContent>
                        {filterOptions.priceRanges.map(range => (
                          <SelectItem key={range} value={range}>{range}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Experience Level</h4>
                    <Select value={filters.experienceLevel} onValueChange={(value) => setFilters(prev => ({ ...prev, experienceLevel: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any experience" />
                      </SelectTrigger>
                      <SelectContent>
                        {filterOptions.experienceLevels.map(level => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Location</h4>
                    <Select value={filters.location} onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any location" />
                      </SelectTrigger>
                      <SelectContent>
                        {filterOptions.locations.map(location => (
                          <SelectItem key={location} value={location}>{location}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <Button variant="outline" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">All Providers ({providers.length})</TabsTrigger>
          <TabsTrigger value="featured">Featured ({providers.filter(p => p.featured).length})</TabsTrigger>
          <TabsTrigger value="verified">Verified ({providers.filter(p => p.verified).length})</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-6">
          <div className="space-y-4">
            {filteredProviders.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <h3 className="text-lg font-medium mb-2">No providers found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search terms
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredProviders.map(provider => (
                <ServiceProviderCard key={provider.id} provider={provider} />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

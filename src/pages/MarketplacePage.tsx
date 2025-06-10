
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Star, MapPin, Clock, DollarSign, Shield, Filter } from 'lucide-react';
import { ProductionErrorBoundary } from '@/components/error/production-error-boundary';

interface Service {
  id: string;
  title: string;
  provider: string;
  rating: number;
  reviews: number;
  price: string;
  category: string;
  location: string;
  verified: boolean;
  timeframe: string;
  description: string;
}

const mockServices: Service[] = [
  {
    id: '1',
    title: 'Smart Contract Security Audit',
    provider: 'CyberSec Labs',
    rating: 4.9,
    reviews: 127,
    price: '$5,000 - $15,000',
    category: 'Smart Contract Audit',
    location: 'Global',
    verified: true,
    timeframe: '2-4 weeks',
    description: 'Comprehensive security audit for Ethereum smart contracts with detailed vulnerability assessment.'
  },
  {
    id: '2',
    title: 'DeFi Protocol Security Review',
    provider: 'BlockShield Security',
    rating: 4.8,
    reviews: 89,
    price: '$10,000 - $25,000',
    category: 'DeFi Audit',
    location: 'US/EU',
    verified: true,
    timeframe: '3-6 weeks',
    description: 'End-to-end security review for DeFi protocols including tokenomics and governance mechanisms.'
  },
  {
    id: '3',
    title: 'NFT Marketplace Audit',
    provider: 'SecureCode Pro',
    rating: 4.7,
    reviews: 56,
    price: '$3,000 - $8,000',
    category: 'NFT Audit',
    location: 'Global',
    verified: true,
    timeframe: '1-3 weeks',
    description: 'Security audit specifically designed for NFT marketplaces and minting contracts.'
  },
  {
    id: '4',
    title: 'Cross-Chain Bridge Security',
    provider: 'ChainGuard Analytics',
    rating: 4.9,
    reviews: 73,
    price: '$15,000 - $30,000',
    category: 'Bridge Audit',
    location: 'Global',
    verified: true,
    timeframe: '4-8 weeks',
    description: 'Specialized security audit for cross-chain bridges and interoperability protocols.'
  }
];

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredServices, setFilteredServices] = useState(mockServices);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'smart-contract', label: 'Smart Contract Audit' },
    { value: 'defi', label: 'DeFi Audit' },
    { value: 'nft', label: 'NFT Audit' },
    { value: 'bridge', label: 'Bridge Audit' }
  ];

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = mockServices.filter(service =>
      service.title.toLowerCase().includes(term.toLowerCase()) ||
      service.provider.toLowerCase().includes(term.toLowerCase()) ||
      service.description.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredServices(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredServices(mockServices);
    } else {
      const filtered = mockServices.filter(service =>
        service.category.toLowerCase().includes(category.replace('-', ' '))
      );
      setFilteredServices(filtered);
    }
  };

  return (
    <ProductionErrorBoundary>
      <div className="container mx-auto py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Security Audit Marketplace</h1>
          <p className="text-muted-foreground">
            Connect with verified security auditors for your Web3 projects
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for audit services..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              Advanced Filters
            </Button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredServices.length} of {mockServices.length} audit services
          </p>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{service.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-medium text-sm">{service.provider}</span>
                      {service.verified && (
                        <Badge variant="default" className="text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {service.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{service.rating}</span>
                    <span className="text-muted-foreground">({service.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{service.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{service.timeframe}</span>
                  </div>
                  <div className="flex items-center gap-1 font-medium">
                    <DollarSign className="h-3 w-3" />
                    <span>{service.price}</span>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <Badge variant="outline" className="text-xs">
                    {service.category}
                  </Badge>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button className="flex-1" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent>
              <h3 className="text-xl font-bold mb-2">Ready to secure your project?</h3>
              <p className="text-muted-foreground mb-4">
                Get matched with the perfect security auditor for your needs
              </p>
              <Button size="lg">
                Request Custom Quote
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProductionErrorBoundary>
  );
}

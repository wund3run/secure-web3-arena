
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Clock, 
  DollarSign, 
  Filter, 
  Search, 
  Shield, 
  Star, 
  TrendingUp,
  Users,
  Verified,
  MapPin
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  provider: {
    name: string;
    avatar?: string;
    rating: number;
    reviewCount: number;
    verified: boolean;
    location?: string;
  };
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  deliveryTime: number;
  category: string;
  tags: string[];
  featured: boolean;
  blockchainEcosystems: string[];
}

interface EnhancedMarketplaceGridProps {
  services: Service[];
  loading?: boolean;
}

export function EnhancedMarketplaceGrid({ services, loading }: EnhancedMarketplaceGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    const matchesPrice = priceFilter === 'all' || 
                        (priceFilter === 'budget' && service.priceRange.max <= 5000) ||
                        (priceFilter === 'premium' && service.priceRange.min >= 10000);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.priceRange.min - b.priceRange.min;
      case 'price-high':
        return b.priceRange.min - a.priceRange.min;
      case 'rating':
        return b.provider.rating - a.provider.rating;
      case 'delivery':
        return a.deliveryTime - b.deliveryTime;
      default:
        return b.featured ? 1 : -1;
    }
  });

  const getUniqueCategories = () => {
    const categories = [...new Set(services.map(s => s.category))];
    return categories;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search auditors and services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {getUniqueCategories().map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={priceFilter} onValueChange={setPriceFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="budget">Budget ($0-$5K)</SelectItem>
              <SelectItem value="premium">Premium ($10K+)</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="delivery">Fastest Delivery</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing {sortedServices.length} of {services.length} services
        </p>
        {searchTerm && (
          <Button variant="ghost" size="sm" onClick={() => setSearchTerm('')}>
            Clear search
          </Button>
        )}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedServices.map((service) => (
          <Card key={service.id} className="group hover:shadow-lg transition-shadow duration-200">
            {service.featured && (
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium px-3 py-1 rounded-t-lg">
                ⭐ Featured Service
              </div>
            )}
            
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 mt-1">
                    {service.description}
                  </CardDescription>
                </div>
              </div>

              {/* Provider Info */}
              <div className="flex items-center gap-3 mt-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={service.provider.avatar} />
                  <AvatarFallback>
                    {service.provider.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-medium truncate">
                      {service.provider.name}
                    </p>
                    {service.provider.verified && (
                      <Verified className="h-3 w-3 text-blue-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{service.provider.rating}</span>
                      <span>({service.provider.reviewCount})</span>
                    </div>
                    {service.provider.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{service.provider.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {service.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {service.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{service.tags.length - 3} more
                  </Badge>
                )}
              </div>

              {/* Blockchain Ecosystems */}
              <div className="flex flex-wrap gap-1">
                {service.blockchainEcosystems.slice(0, 2).map((ecosystem, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {ecosystem}
                  </Badge>
                ))}
              </div>

              {/* Price and Delivery */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="font-medium">
                    ${service.priceRange.min.toLocaleString()} - ${service.priceRange.max.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{service.deliveryTime} days</span>
                </div>
              </div>

              {/* Action Button */}
              <Button className="w-full" variant="outline">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {sortedServices.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">No services found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search filters or browse all categories
          </p>
          <Button 
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('all');
              setPriceFilter('all');
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}

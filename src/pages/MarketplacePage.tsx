
import React, { useState, useEffect, useCallback } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { ServiceCard } from '@/components/marketplace/card/ServiceCard';
import { useMarketplaceServices } from '@/hooks/useMarketplaceServices';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast"

const MarketplacePage = () => {
  const { services, loading } = useMarketplaceServices();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const { toast } = useToast()

  const handleServiceClick = (id: string) => {
    navigate(`/service/${id}`);
  };

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const filteredServices = services.filter((service) => {
    const searchMatch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());

    const categoryMatch = categoryFilter ? service.category === categoryFilter : true;

    // Use min_price and max_price from the actual service data
    const priceMatch = service.min_price 
      ? service.min_price >= priceRange[0] && service.min_price <= priceRange[1]
      : true;

    return searchMatch && categoryMatch && priceMatch;
  });

  const categories = [...new Set(services.map(service => service.category))];

  const handleClearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setPriceRange([0, 1000]);
    toast({
      title: "Filters Cleared",
      description: "All filters have been cleared.",
    })
  };

  return (
    <StandardLayout
      title="Marketplace"
      description="Explore security audit services"
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              type="text"
              placeholder="Search for services..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Filter by Category
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {categories.map((category) => (
                <DropdownMenuItem key={category} onClick={() => handleCategoryChange(category)}>
                  {category}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem onClick={() => handleCategoryChange('')}>
                Clear Category
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div>
            <Button variant="secondary" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="price-range" className="block text-sm font-medium text-gray-700">
            Price Range ($0 - $1000)
          </Label>
          <Slider
            id="price-range"
            defaultValue={priceRange}
            max={1000}
            step={10}
            onValueChange={handlePriceChange}
            aria-label="Price range"
          />
          <div className="text-sm text-gray-500">
            Range: ${priceRange[0]} - ${priceRange[1]}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-40 w-full rounded-md" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))}
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              title={service.title}
              description={service.description}
              provider={{
                name: 'Service Provider', // Default since provider data isn't available
                reputation: 0,
                level: 'verified',
                isVerified: true,
                avatarUrl: undefined
              }}
              pricing={{
                amount: service.min_price || 0,
                currency: 'USD',
                model: 'fixed'
              }}
              rating={service.average_rating || 0}
              completedJobs={service.review_count || 0}
              category={service.category || 'General'}
              tags={service.tags || []}
              imageUrl={undefined} // No image URL in the current service data
              securityScore={85}
              responseTime="24h"
              onClick={() => handleServiceClick(service.id)}
            />
          ))}
        </div>
        )}
      </div>
    </StandardLayout>
  );
};

export default MarketplacePage;

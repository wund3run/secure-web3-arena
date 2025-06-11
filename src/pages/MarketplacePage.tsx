
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { MarketplaceProvider } from '@/contexts/marketplace/MarketplaceContext';
import { MarketplaceErrorBoundary } from '@/components/marketplace/error-handling/MarketplaceErrorBoundary';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Star, Shield, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import SearchFilters from '@/components/marketplace/SearchFilters';
import { SERVICES } from '@/data/marketplace-data';
import { AIRecommendations } from '@/components/marketplace/ai-recommendations';

const MarketplacePage = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedBlockchain, setSelectedBlockchain] = React.useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = React.useState('all');

  // Calculate active filters
  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedBlockchain !== 'all', 
    selectedPriceRange !== 'all',
    searchQuery.length > 0
  ].filter(Boolean).length;

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedBlockchain('all');
    setSelectedPriceRange('all');
  };

  // Filter services based on current filters
  const filteredServices = SERVICES.filter(service => {
    const matchesSearch = searchQuery === '' || 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
      service.category === selectedCategory;
    
    const matchesBlockchain = selectedBlockchain === 'all' ||
      service.tags.some(tag => tag.toLowerCase().includes(selectedBlockchain.toLowerCase()));
    
    return matchesSearch && matchesCategory && matchesBlockchain;
  });

  return (
    <>
      <Helmet>
        <title>Security Marketplace | Hawkly</title>
        <meta name="description" content="Find verified Web3 security experts for your project" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <MarketplaceProvider services={SERVICES}>
            <MarketplaceErrorBoundary>
              <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                  <Badge variant="outline" className="px-4 py-2 mb-4">
                    <Shield className="h-4 w-4 mr-2" />
                    Verified Security Experts
                  </Badge>
                  <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
                    Security Marketplace
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Connect with verified Web3 security experts for comprehensive audits and security services
                  </p>
                </div>

                {/* Search and Filters */}
                <SearchFilters 
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  selectedBlockchain={selectedBlockchain}
                  onBlockchainChange={setSelectedBlockchain}
                  selectedPriceRange={selectedPriceRange}
                  onPriceRangeChange={setSelectedPriceRange}
                  onClearFilters={handleClearFilters}
                  activeFiltersCount={activeFiltersCount}
                />

                {/* AI Recommendations */}
                <div className="mb-8">
                  <AIRecommendations 
                    services={filteredServices.slice(0, 3)}
                    projectSize="medium"
                    blockchains={selectedBlockchain !== 'all' ? [selectedBlockchain] : []}
                    onRecommendationSelect={(serviceId) => {
                      console.log('Selected service:', serviceId);
                    }}
                  />
                </div>

                {/* Results */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <Card key={service.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary">{service.category}</Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{service.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground line-clamp-2">{service.description}</p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">
                            {service.pricing.amount} {service.pricing.currency}
                          </span>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Zap className="h-3 w-3" />
                            {service.provider.level}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {service.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <Button className="w-full">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredServices.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No services found matching your criteria.</p>
                    <Button variant="outline" onClick={handleClearFilters} className="mt-4">
                      Clear filters
                    </Button>
                  </div>
                )}
              </div>
            </MarketplaceErrorBoundary>
          </MarketplaceProvider>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MarketplacePage;

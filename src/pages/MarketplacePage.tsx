
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { MarketplaceProvider } from '@/contexts/marketplace/MarketplaceContext';
import { MarketplaceErrorBoundary } from '@/components/marketplace/error-handling/MarketplaceErrorBoundary';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Shield, Star, Zap } from 'lucide-react';
import { SERVICES } from '@/data/marketplace-data';
import { AIRecommendations } from '@/components/marketplace/ai-recommendations';
import { SmartFilters } from '@/components/marketplace/enhanced-filters/SmartFilters';

const MarketplacePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<any>({});

  // Apply filters to services
  const filteredServices = SERVICES.filter(service => {
    const matchesSearch = searchQuery === '' || 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !filters.categories?.length || 
      filters.categories.includes(service.category);
    
    const matchesBlockchain = !filters.blockchains?.length ||
      service.tags.some((tag: string) => 
        filters.blockchains.some((blockchain: string) => 
          tag.toLowerCase().includes(blockchain.toLowerCase())
        )
      );

    const matchesPrice = !filters.priceRange || 
      (service.pricing.amount >= filters.priceRange[0] && 
       service.pricing.amount <= filters.priceRange[1]);

    const matchesRating = !filters.rating || service.rating >= filters.rating;

    const matchesVerified = !filters.verified || service.provider.isVerified;

    return matchesSearch && matchesCategory && matchesBlockchain && 
           matchesPrice && matchesRating && matchesVerified;
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

                {/* Enhanced Search */}
                <div className="mb-8">
                  <div className="relative max-w-2xl mx-auto">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search for security services, auditors, or expertise..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-12 text-lg bg-background/50 border-border/50 focus:border-primary/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                  {/* Smart Filters Sidebar */}
                  <div className="lg:col-span-1">
                    <SmartFilters 
                      onFilterChange={setFilters}
                      totalResults={filteredServices.length}
                    />
                  </div>

                  {/* Main Content */}
                  <div className="lg:col-span-3 space-y-8">
                    {/* AI Recommendations */}
                    <div className="mb-8">
                      <AIRecommendations 
                        services={filteredServices.slice(0, 3)}
                        projectSize="medium"
                        blockchains={filters.blockchains || []}
                        onRecommendationSelect={(serviceId) => {
                          console.log('Selected service:', serviceId);
                        }}
                      />
                    </div>

                    {/* Results Header */}
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold">
                        Available Services ({filteredServices.length})
                      </h2>
                      <div className="text-sm text-muted-foreground">
                        Sorted by relevance
                      </div>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredServices.map((service) => (
                        <Card key={service.id} className="hover:shadow-lg transition-all duration-300 group">
                          <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="secondary">{service.category}</Badge>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">{service.rating}</span>
                              </div>
                            </div>
                            <CardTitle className="text-lg group-hover:text-primary transition-colors">
                              {service.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-muted-foreground line-clamp-2">{service.description}</p>
                            
                            {/* Provider Info */}
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                                {service.provider.name.charAt(0)}
                              </div>
                              <div>
                                <p className="text-sm font-medium">{service.provider.name}</p>
                                <div className="flex items-center gap-1">
                                  {service.provider.isVerified && (
                                    <Badge variant="outline" className="text-xs">
                                      <Zap className="h-3 w-3 mr-1" />
                                      Verified
                                    </Badge>
                                  )}
                                  <span className="text-xs text-muted-foreground">
                                    {service.completedJobs} completed
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-lg font-bold">
                                  ${service.pricing.amount.toLocaleString()}
                                </span>
                                <span className="text-sm text-muted-foreground ml-1">
                                  {service.pricing.currency}
                                </span>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {service.responseTime} response
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {service.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {service.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{service.tags.length - 3}
                                </Badge>
                              )}
                            </div>

                            <Button className="w-full group-hover:bg-primary/90 transition-colors">
                              View Details & Book
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {filteredServices.length === 0 && (
                      <div className="text-center py-12">
                        <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No services found</h3>
                        <p className="text-muted-foreground mb-4">
                          Try adjusting your filters or search terms
                        </p>
                        <Button variant="outline" onClick={() => {setFilters({}); setSearchQuery('');}}>
                          Clear all filters
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
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

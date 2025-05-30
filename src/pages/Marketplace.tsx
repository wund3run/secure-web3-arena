
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { EnhancedMarketplaceFilters } from '@/components/marketplace/enhanced-filters/EnhancedMarketplaceFilters';
import { EnhancedAuditorCard } from '@/components/marketplace/auditor-cards/EnhancedAuditorCard';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('rating');
  const [filters, setFilters] = useState({});
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Mock auditor data - enhanced version
  const auditors = [
    {
      id: '1',
      name: "CyberGuard Security",
      avatar: "/placeholder-avatar.jpg",
      rating: 4.9,
      reviewCount: 47,
      expertise: ["Smart Contracts", "DeFi", "NFT", "Cross-chain"],
      blockchains: ["Ethereum", "Polygon", "Arbitrum", "Optimism"],
      completedAudits: 127,
      responseTime: "2h avg",
      hourlyRate: { min: 150, max: 300 },
      isVerified: true,
      isPremium: true,
      description: "Expert security auditing firm with 3+ years in Web3. Specialized in DeFi protocols and smart contract security with formal verification expertise.",
      availability: 'available' as const
    },
    {
      id: '2',
      name: "BlockSafe Auditors",
      avatar: "/placeholder-avatar.jpg",
      rating: 4.8,
      reviewCount: 32,
      expertise: ["Smart Contracts", "Gaming", "Layer 2"],
      blockchains: ["Ethereum", "BSC", "Solana"],
      completedAudits: 89,
      responseTime: "4h avg",
      hourlyRate: { min: 100, max: 200 },
      isVerified: true,
      isPremium: false,
      description: "Rapid security assessments with comprehensive reporting. Trusted by leading GameFi projects and emerging DeFi protocols.",
      availability: 'busy' as const
    },
    {
      id: '3',
      name: "SecureChain Labs",
      avatar: "/placeholder-avatar.jpg",
      rating: 4.7,
      reviewCount: 28,
      expertise: ["Infrastructure", "Layer 2", "Bridges"],
      blockchains: ["Ethereum", "Optimism", "Arbitrum"],
      completedAudits: 76,
      responseTime: "6h avg",
      hourlyRate: { min: 200, max: 400 },
      isVerified: true,
      isPremium: true,
      description: "Deep technical expertise in Layer 2 solutions and complex DeFi protocols. Specializing in cross-chain bridge security.",
      availability: 'available' as const
    }
  ];

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    // Calculate active filters count
    let count = 0;
    if (newFilters.expertise?.length > 0) count++;
    if (newFilters.blockchains?.length > 0) count++;
    if (newFilters.experienceLevel?.length > 0) count++;
    if (newFilters.features?.length > 0) count++;
    if (newFilters.priceRange && (newFilters.priceRange[0] > 1000 || newFilters.priceRange[1] < 100000)) count++;
    setActiveFiltersCount(count);
  };

  const handleClearAllFilters = () => {
    setFilters({});
    setActiveFiltersCount(0);
  };

  const handleContact = (auditorId: string) => {
    console.log('Contact auditor:', auditorId);
    // Implement contact logic
  };

  const handleRequestQuote = (auditorId: string) => {
    console.log('Request quote from:', auditorId);
    // Navigate to request audit form with prefilled auditor
  };

  const filteredAuditors = auditors.filter(auditor => {
    return auditor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           auditor.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <>
      <Helmet>
        <title>Security Marketplace | Hawkly</title>
        <meta name="description" content="Connect with verified Web3 security auditors and experts" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Security Marketplace
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Connect with verified security auditors and experts for your Web3 projects. 
                Get professional audits with transparent pricing and quality guarantees.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search auditors, skills, or blockchain expertise..."
                  className="pl-10 h-12 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            {/* Desktop Filters */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-4">
                <EnhancedMarketplaceFilters
                  onFiltersChange={handleFiltersChange}
                  activeFiltersCount={activeFiltersCount}
                  onClearAll={handleClearAllFilters}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <p className="text-gray-600">
                    {filteredAuditors.length} verified auditors found
                  </p>
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary">
                      {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden">
                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                        Filters
                        {activeFiltersCount > 0 && (
                          <Badge variant="secondary" className="ml-2">
                            {activeFiltersCount}
                          </Badge>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80">
                      <EnhancedMarketplaceFilters
                        onFiltersChange={handleFiltersChange}
                        activeFiltersCount={activeFiltersCount}
                        onClearAll={handleClearAllFilters}
                      />
                    </SheetContent>
                  </Sheet>

                  {/* View Mode Toggle */}
                  <div className="flex border rounded-lg">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-r-none"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-l-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Sort Dropdown */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="experience">Most Experienced</SelectItem>
                      <SelectItem value="response-time">Fastest Response</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Auditors Grid */}
              <div className={
                viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-4"
              }>
                {filteredAuditors.map(auditor => (
                  <EnhancedAuditorCard
                    key={auditor.id}
                    {...auditor}
                    onContact={() => handleContact(auditor.id)}
                    onRequestQuote={() => handleRequestQuote(auditor.id)}
                  />
                ))}
              </div>

              {/* Call to Action */}
              <div className="text-center mt-12 py-8 border-t">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Can't find the right auditor?
                </h3>
                <p className="text-gray-600 mb-6">
                  Post your audit request and let our AI matching system find the perfect auditors for your project.
                </p>
                <Button asChild size="lg">
                  <Link to="/request-audit">Request Security Audit</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Marketplace;

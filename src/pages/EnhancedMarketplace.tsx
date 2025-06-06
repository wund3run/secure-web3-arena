
import React, { useState, useEffect } from 'react';
import { StandardizedLayout } from '@/components/layout/StandardizedLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Shield, Clock, DollarSign, Filter, Search, MapPin, Award } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const EnhancedMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlockchain, setSelectedBlockchain] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [priceRange, setPriceRange] = useState('all');

  // Fetch auditor profiles with their services
  const { data: auditors, isLoading } = useQuery({
    queryKey: ['auditors', selectedBlockchain, selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from('auditor_profiles')
        .select(`
          *,
          extended_profiles!inner(
            full_name,
            avatar_url,
            bio,
            verification_status
          ),
          services(
            title,
            description,
            category,
            price_range,
            average_rating,
            review_count
          ),
          auditor_reviews(
            rating,
            review_text,
            created_at
          )
        `)
        .eq('verification_status', 'verified')
        .eq('availability_status', 'available');

      if (selectedBlockchain !== 'all') {
        query = query.contains('blockchain_expertise', [selectedBlockchain]);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    }
  });

  const blockchains = [
    'Ethereum', 'Binance Smart Chain', 'Polygon', 'Avalanche',
    'Arbitrum', 'Optimism', 'Solana', 'Cardano'
  ];

  const categories = [
    'Smart Contract Audit', 'DeFi Protocol Review', 'NFT Security',
    'Cross-chain Bridge Audit', 'DAO Governance Review', 'Token Audit'
  ];

  const filteredAuditors = auditors?.filter(auditor => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        auditor.extended_profiles?.full_name?.toLowerCase().includes(searchLower) ||
        auditor.specialization_tags?.some((tag: string) => tag.toLowerCase().includes(searchLower)) ||
        auditor.services?.some((service: any) => 
          service.title?.toLowerCase().includes(searchLower) ||
          service.description?.toLowerCase().includes(searchLower)
        )
      );
    }
    return true;
  }) || [];

  const sortedAuditors = [...filteredAuditors].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        const aRating = a.auditor_reviews?.reduce((acc: number, review: any) => acc + review.rating, 0) / (a.auditor_reviews?.length || 1) || 0;
        const bRating = b.auditor_reviews?.reduce((acc: number, review: any) => acc + review.rating, 0) / (b.auditor_reviews?.length || 1) || 0;
        return bRating - aRating;
      case 'experience':
        return (b.years_experience || 0) - (a.years_experience || 0);
      case 'price_low':
        return (a.hourly_rate_min || 0) - (b.hourly_rate_min || 0);
      case 'price_high':
        return (b.hourly_rate_max || 0) - (a.hourly_rate_max || 0);
      default:
        return 0;
    }
  });

  const AuditorCard = ({ auditor }: { auditor: any }) => {
    const avgRating = auditor.auditor_reviews?.reduce((acc: number, review: any) => acc + review.rating, 0) / (auditor.auditor_reviews?.length || 1) || 0;
    const reviewCount = auditor.auditor_reviews?.length || 0;

    return (
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={auditor.extended_profiles?.avatar_url} />
                <AvatarFallback>
                  {auditor.extended_profiles?.full_name?.split(' ').map((n: string) => n[0]).join('') || 'AU'}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl">
                  {auditor.extended_profiles?.full_name || 'Anonymous Auditor'}
                </CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">
                      {avgRating.toFixed(1)} ({reviewCount} reviews)
                    </span>
                  </div>
                  {auditor.extended_profiles?.verification_status === 'verified' && (
                    <Badge variant="secondary" className="text-xs">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">
                ${auditor.hourly_rate_min}-${auditor.hourly_rate_max}/hr
              </div>
              <div className="text-sm text-muted-foreground">
                {auditor.years_experience} years exp.
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="mb-4">
            {auditor.extended_profiles?.bio || 'Professional security auditor specializing in Web3 security assessments.'}
          </CardDescription>
          
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium mb-2">Specializations</h4>
              <div className="flex flex-wrap gap-1">
                {auditor.specialization_tags?.slice(0, 4).map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {auditor.specialization_tags?.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{auditor.specialization_tags.length - 4} more
                  </Badge>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Blockchain Expertise</h4>
              <div className="flex flex-wrap gap-1">
                {auditor.blockchain_expertise?.slice(0, 3).map((chain: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {chain}
                  </Badge>
                ))}
                {auditor.blockchain_expertise?.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{auditor.blockchain_expertise.length - 3} more
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {auditor.response_time_hours}h response
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-1" />
                  {auditor.total_audits_completed} audits
                </div>
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
                <Button size="sm">
                  Contact
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <StandardizedLayout
      title="Security Marketplace | Hawkly"
      description="Find and hire verified Web3 security auditors for your project"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Security Marketplace</h1>
          <p className="text-muted-foreground">
            Connect with verified security experts for comprehensive Web3 audits
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Search</label>
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                  <Input
                    placeholder="Search auditors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Blockchain</label>
                <Select value={selectedBlockchain} onValueChange={setSelectedBlockchain}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Blockchains" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Blockchains</SelectItem>
                    {blockchains.map((chain) => (
                      <SelectItem key={chain} value={chain}>
                        {chain}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Price Range</label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Price</SelectItem>
                    <SelectItem value="0-100">$0 - $100/hr</SelectItem>
                    <SelectItem value="100-200">$100 - $200/hr</SelectItem>
                    <SelectItem value="200-500">$200 - $500/hr</SelectItem>
                    <SelectItem value="500+">$500+/hr</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rating</SelectItem>
                    <SelectItem value="experience">Most Experience</SelectItem>
                    <SelectItem value="price_low">Price: Low to High</SelectItem>
                    <SelectItem value="price_high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-muted-foreground">
            {isLoading ? 'Loading...' : `${sortedAuditors.length} verified auditors found`}
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-16 bg-muted rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedAuditors.map((auditor) => (
              <AuditorCard key={auditor.id} auditor={auditor} />
            ))}
          </div>
        )}

        {!isLoading && sortedAuditors.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No auditors found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search terms to find more auditors.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </StandardizedLayout>
  );
};

export default EnhancedMarketplace;

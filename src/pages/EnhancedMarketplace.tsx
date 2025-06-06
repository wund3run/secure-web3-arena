import React, { useState } from 'react';
import {
  useQuery,
  gql
} from "@apollo/client";
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Brain } from 'lucide-react';
import { AdvancedSearchPanel } from '@/components/marketplace/advanced-search/AdvancedSearchPanel';
import { ServiceComparisonTool } from '@/components/marketplace/comparison/ServiceComparisonTool';
import { SmartMatchingEngine } from '@/components/marketplace/ai-matching/SmartMatchingEngine';
import { RealtimeCollaboration } from '@/components/marketplace/real-time/RealtimeCollaboration';
import { ServiceCard } from '@/components/marketplace/card/ServiceCard';
import { ProductionErrorBoundary } from '@/components/error/production-error-boundary';
import { useMarketplaceServices } from '@/hooks/useMarketplaceServices';
import { ServiceCardProps } from '@/types/marketplace-unified';

// GraphQL query to fetch auditors
const GET_AUDITORS = gql`
  query GetAuditors {
    auditors {
      user_id
      years_experience
      hourly_rate_min
      hourly_rate_max
      verification_status
      availability_status
      blockchain_expertise
      specialization_tags
      total_audits_completed
      success_rate
      extended_profiles
    }
  }
`;

interface AuditorProfile {
  user_id: string;
  years_experience: number;
  hourly_rate_min: number;
  hourly_rate_max: number;
  verification_status: string;
  availability_status: string;
  blockchain_expertise: string[];
  specialization_tags: string[];
  total_audits_completed: number;
  success_rate: number;
  extended_profiles: {
    full_name: string;
    verification_status: string;
  };
}

export default function EnhancedMarketplace() {
  const { services: servicesData, loading } = useMarketplaceServices();
  const { loading: auditorsLoading, error: auditorsError, data: auditorsData } = useQuery(GET_AUDITORS);
  const [filteredServices, setFilteredServices] = useState<ServiceCardProps[]>([]);
  const [selectedForComparison, setSelectedForComparison] = useState<ServiceCardProps[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [activeTab, setActiveTab] = useState('browse');

  // Mock matching criteria - in real app this would come from user preferences
  const mockCriteria = {
    projectType: 'Smart Contract Audit',
    blockchain: 'Ethereum',
    budget: 15000,
    timeline: '2-4 weeks',
    complexity: 'medium',
    requirements: ['DeFi', 'Security', 'Gas Optimization']
  };

  const transformToAuditorProfile = (rawAuditor: any): AuditorProfile => {
    // Handle extended_profiles safely with null checks
    const extendedProfile = rawAuditor.extended_profiles && 
      typeof rawAuditor.extended_profiles === 'object' && 
      !('error' in rawAuditor.extended_profiles) 
      ? rawAuditor.extended_profiles 
      : null;
    
    return {
      user_id: rawAuditor.user_id,
      years_experience: rawAuditor.years_experience || 0,
      hourly_rate_min: rawAuditor.hourly_rate_min || 0,
      hourly_rate_max: rawAuditor.hourly_rate_max || 0,
      verification_status: rawAuditor.verification_status || 'pending',
      availability_status: rawAuditor.availability_status || 'available',
      blockchain_expertise: rawAuditor.blockchain_expertise || [],
      specialization_tags: rawAuditor.specialization_tags || [],
      total_audits_completed: rawAuditor.total_audits_completed || 0,
      success_rate: rawAuditor.success_rate || 0,
      extended_profiles: {
        full_name: extendedProfile?.full_name || 'Unknown Auditor',
        verification_status: extendedProfile?.verification_status || rawAuditor.verification_status || 'pending'
      }
    };
  };

  const auditorProfiles = (auditorsData?.auditors || []).map(transformToAuditorProfile);

  const enhancedServices = servicesData?.map(service => ({
    id: service.id,
    title: service.title,
    description: service.description,
    category: service.category,
    blockchain_ecosystems: service.blockchain_ecosystems || [],
    price_range: service.price_range || { min: 1000, max: 10000 },
    average_rating: service.average_rating || 4.5,
    review_count: service.review_count || 10,
    provider: auditorProfiles.find(auditor => auditor.user_id === service.provider_id) || {
      user_id: service.provider_id || 'unknown',
      years_experience: 0,
      hourly_rate_min: 0,
      hourly_rate_max: 0,
      verification_status: 'pending',
      availability_status: 'available',
      blockchain_expertise: [],
      specialization_tags: [],
      total_audits_completed: 0,
      success_rate: 0,
      extended_profiles: {
        full_name: 'Service Provider',
        verification_status: 'pending'
      }
    }
  })) || [];

  const handleFiltersChange = (filters: any) => {
    // Transform services data to match ServiceCardProps interface
    const transformedServices = enhancedServices.map(service => ({
      id: service.id,
      title: service.title,
      description: service.description,
      provider: {
        name: service.provider.extended_profiles?.full_name || 'Unknown Provider',
        reputation: service.provider.success_rate || 0,
        level: (service.provider.verification_status === 'verified' ? "verified" : "rookie") || 'rookie',
        isVerified: service.provider.verification_status === 'verified' || false,
        avatarUrl: ''
      },
      pricing: {
        amount: typeof service.price_range === 'object' && service.price_range !== null && 'min' in service.price_range 
          ? service.price_range.min 
          : 5000,
        currency: 'USD'
      },
      rating: service.average_rating || 0,
      completedJobs: service.review_count || 0,
      category: service.category,
      tags: service.blockchain_ecosystems || [],
      responseTime: '24h',
      securityScore: 85
    }));

    // Apply filters
    let filtered = transformedServices;
    
    if (filters.keywords) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(filters.keywords.toLowerCase()) ||
        service.description.toLowerCase().includes(filters.keywords.toLowerCase())
      );
    }

    if (filters.serviceTypes.length > 0) {
      filtered = filtered.filter(service =>
        filters.serviceTypes.some((type: string) => 
          service.category.toLowerCase().includes(type.toLowerCase())
        )
      );
    }

    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 50000) {
      filtered = filtered.filter(service =>
        service.pricing.amount >= filters.priceRange[0] &&
        service.pricing.amount <= filters.priceRange[1]
      );
    }

    setFilteredServices(filtered);
  };

  const toggleServiceComparison = (service: ServiceCardProps) => {
    setSelectedForComparison(prev => {
      const exists = prev.find(s => s.id === service.id);
      if (exists) {
        return prev.filter(s => s.id !== service.id);
      } else if (prev.length < 3) {
        return [...prev, service];
      }
      return prev;
    });
  };

  const handleAIMatches = (matches: { service: ServiceCardProps; score: any }[]) => {
    setFilteredServices(matches.map(m => m.service));
  };

  return (
    <ProductionErrorBoundary>
      <Helmet>
        <title>Enhanced Marketplace | Hawkly</title>
        <meta name="description" content="Advanced Web3 security marketplace with AI matching and real-time collaboration" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow container py-8">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Enhanced Marketplace</h1>
                <p className="text-muted-foreground">
                  AI-powered matching, advanced search, and real-time collaboration
                </p>
              </div>
              {selectedForComparison.length > 0 && (
                <Button onClick={() => setShowComparison(true)} className="flex items-center gap-2">
                  Compare ({selectedForComparison.length})
                </Button>
              )}
            </div>

            {/* Main Content */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="browse" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Browse & Search
                </TabsTrigger>
                <TabsTrigger value="ai-matching" className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  AI Matching
                </TabsTrigger>
                <TabsTrigger value="comparison" className="flex items-center gap-2">
                  Comparison
                </TabsTrigger>
                <TabsTrigger value="collaboration" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Collaboration
                </TabsTrigger>
              </TabsList>

              <TabsContent value="browse" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-1">
                    <AdvancedSearchPanel
                      onFiltersChange={handleFiltersChange}
                      onClear={() => setFilteredServices([])}
                    />
                  </div>
                  
                  <div className="lg:col-span-3">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">
                          Search Results ({filteredServices.length})
                        </h3>
                        <Badge variant="outline">
                          {loading ? 'Loading...' : `${enhancedServices.length} total services`}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredServices.map((service) => (
                          <div key={service.id} className="relative">
                            <ServiceCard {...service} />
                            <Button
                              variant="outline"
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => toggleServiceComparison(service)}
                            >
                              {selectedForComparison.find(s => s.id === service.id) ? 'Remove' : 'Compare'}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ai-matching" className="space-y-6">
                <SmartMatchingEngine
                  services={enhancedServices.map(service => ({
                    id: service.id,
                    title: service.title,
                    description: service.description,
                    provider: {
                      name: service.provider.extended_profiles?.full_name || 'Service Provider',
                      reputation: 4.5,
                      level: 'verified' as const,
                      isVerified: true
                    },
                    pricing: { amount: 5000, currency: 'USD' },
                    rating: service.average_rating || 4.5,
                    completedJobs: service.review_count || 10,
                    category: service.category,
                    tags: service.blockchain_ecosystems || [],
                    responseTime: '24h',
                    securityScore: 85
                  }))}
                  criteria={mockCriteria}
                  onMatchesFound={handleAIMatches}
                />
              </TabsContent>

              <TabsContent value="comparison" className="space-y-6">
                <ServiceComparisonTool
                  services={selectedForComparison}
                  onRemoveService={(id) => setSelectedForComparison(prev => prev.filter(s => s.id !== id))}
                  onClearAll={() => setSelectedForComparison([])}
                  onSelectService={(service) => console.log('Selected:', service)}
                />
              </TabsContent>

              <TabsContent value="collaboration" className="space-y-6">
                <RealtimeCollaboration
                  projectId="demo-project-123"
                  currentUserId="user-123"
                />
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    </ProductionErrorBoundary>
  );
}


import React, { useState, useEffect } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Star, Clock, DollarSign, Filter, Search, Users, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface ExtendedProfile {
  full_name: string;
  verification_status: string;
}

interface AuditorProfile {
  user_id: string;
  years_experience: number;
  hourly_rate_min: number | null;
  hourly_rate_max: number | null;
  verification_status: string;
  availability_status: string;
  blockchain_expertise: string[];
  specialization_tags: string[];
  total_audits_completed: number;
  success_rate: number;
  extended_profiles: ExtendedProfile;
}

interface MarketplaceService {
  id: string;
  title: string;
  description: string;
  category: string;
  price_range: {
    min: number;
    max: number;
    currency: string;
  };
  provider: AuditorProfile;
  rating: number;
  completed_jobs: number;
  tags: string[];
}

export default function EnhancedMarketplace() {
  const [services, setServices] = useState<MarketplaceService[]>([]);
  const [filteredServices, setFilteredServices] = useState<MarketplaceService[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBlockchain, setSelectedBlockchain] = useState<string>('all');

  const stats = [
    { label: 'Verified Auditors', value: '150+', icon: <Users className="h-5 w-5" /> },
    { label: 'Completed Audits', value: '1,200+', icon: <Shield className="h-5 w-5" /> },
    { label: 'Average Rating', value: '4.8', icon: <Star className="h-5 w-5" /> },
    { label: 'Success Rate', value: '99.2%', icon: <TrendingUp className="h-5 w-5" /> }
  ];

  const categories = [
    'all',
    'Smart Contract Audit',
    'DeFi Protocol Review',
    'NFT Security Check',
    'Bridge Assessment',
    'DAO Governance Review'
  ];

  const blockchains = [
    'all',
    'Ethereum',
    'Polygon',
    'Binance Smart Chain',
    'Avalanche',
    'Solana',
    'Arbitrum',
    'Optimism'
  ];

  const transformPriceRange = (priceData: any) => {
    if (typeof priceData === 'object' && priceData !== null && !Array.isArray(priceData)) {
      return {
        min: priceData.min || 100,
        max: priceData.max || 500,
        currency: priceData.currency || 'USD'
      };
    }
    return { min: 100, max: 500, currency: 'USD' };
  };

  useEffect(() => {
    fetchAuditors();
  }, []);

  const fetchAuditors = async () => {
    try {
      setLoading(true);
      
      const { data: auditorsData, error } = await supabase
        .from('auditor_profiles')
        .select(`
          user_id,
          years_experience,
          hourly_rate_min,
          hourly_rate_max,
          verification_status,
          availability_status,
          blockchain_expertise,
          specialization_tags,
          total_audits_completed,
          success_rate,
          extended_profiles (
            full_name,
            verification_status
          )
        `)
        .eq('verification_status', 'verified')
        .eq('availability_status', 'available');

      if (error) {
        console.error('Error fetching auditors:', error);
        toast.error('Failed to load auditors');
        return;
      }

      // Transform and validate the data
      const transformedServices: MarketplaceService[] = [];
      
      if (auditorsData && Array.isArray(auditorsData)) {
        for (const rawAuditor of auditorsData) {
          // Check if extended_profiles exists and has the required properties
          if (rawAuditor.extended_profiles && 
              typeof rawAuditor.extended_profiles === 'object' &&
              'full_name' in rawAuditor.extended_profiles &&
              'verification_status' in rawAuditor.extended_profiles) {
            
            const extendedProfile = rawAuditor.extended_profiles as ExtendedProfile;
            
            // Create a properly typed AuditorProfile
            const auditorProfile: AuditorProfile = {
              user_id: rawAuditor.user_id,
              years_experience: rawAuditor.years_experience,
              hourly_rate_min: rawAuditor.hourly_rate_min,
              hourly_rate_max: rawAuditor.hourly_rate_max,
              verification_status: rawAuditor.verification_status,
              availability_status: rawAuditor.availability_status,
              blockchain_expertise: rawAuditor.blockchain_expertise || [],
              specialization_tags: rawAuditor.specialization_tags || [],
              total_audits_completed: rawAuditor.total_audits_completed || 0,
              success_rate: rawAuditor.success_rate || 1.0,
              extended_profiles: extendedProfile
            };

            const service: MarketplaceService = {
              id: auditorProfile.user_id,
              title: `Security Audit by ${extendedProfile.full_name || 'Expert Auditor'}`,
              description: `Professional security audit with ${auditorProfile.years_experience} years of experience`,
              category: 'Smart Contract Audit',
              price_range: {
                min: auditorProfile.hourly_rate_min || 100,
                max: auditorProfile.hourly_rate_max || 500,
                currency: 'USD'
              },
              provider: auditorProfile,
              rating: auditorProfile.success_rate * 5 || 4.8,
              completed_jobs: auditorProfile.total_audits_completed || 0,
              tags: auditorProfile.specialization_tags || []
            };

            transformedServices.push(service);
          }
        }
      }

      // If no valid data, add some mock services for demo
      if (transformedServices.length === 0) {
        const mockServices: MarketplaceService[] = [
          {
            id: 'mock-1',
            title: 'Smart Contract Security Audit',
            description: 'Comprehensive security audit for smart contracts',
            category: 'Smart Contract Audit',
            price_range: { min: 150, max: 300, currency: 'USD' },
            provider: {
              user_id: 'mock-auditor-1',
              years_experience: 5,
              hourly_rate_min: 150,
              hourly_rate_max: 300,
              verification_status: 'verified',
              availability_status: 'available',
              blockchain_expertise: ['Ethereum', 'Polygon'],
              specialization_tags: ['DeFi', 'Smart Contracts'],
              total_audits_completed: 25,
              success_rate: 0.96,
              extended_profiles: {
                full_name: 'Expert Security Auditor',
                verification_status: 'verified'
              }
            },
            rating: 4.8,
            completed_jobs: 25,
            tags: ['DeFi', 'Smart Contracts']
          }
        ];
        transformedServices.push(...mockServices);
      }

      setServices(transformedServices);
      setFilteredServices(transformedServices);
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while loading data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = services;

    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    if (selectedBlockchain !== 'all') {
      filtered = filtered.filter(service =>
        service.provider.blockchain_expertise?.includes(selectedBlockchain)
      );
    }

    setFilteredServices(filtered);
  }, [searchTerm, selectedCategory, selectedBlockchain, services]);

  return (
    <StandardLayout
      title="Enhanced Security Marketplace"
      description="Advanced marketplace for Web3 security services with AI-powered matching"
    >
      <div className="container py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Enhanced Experience</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Enhanced Security Marketplace
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced platform connecting projects with top-tier security experts. 
            Powered by AI matching and comprehensive verification systems.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-2 text-primary">{stat.icon}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-muted/50 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search services, skills, or auditors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedBlockchain} onValueChange={setSelectedBlockchain}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Blockchain" />
              </SelectTrigger>
              <SelectContent>
                {blockchains.map(blockchain => (
                  <SelectItem key={blockchain} value={blockchain}>
                    {blockchain === 'all' ? 'All Blockchains' : blockchain}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading security services...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredServices.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline">{service.category}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{service.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          ${service.price_range.min}-${service.price_range.max}/hr
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{service.completed_jobs} completed</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.slice(0, 3).map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full" asChild>
                      <Link to="/request-audit">Request Audit</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Secure Your Project?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Get matched with the perfect security expert for your project using our AI-powered 
            matching system. Start your security audit today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/request-audit">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary">
                Start Security Audit
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button size="lg" variant="outline">
                Browse All Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
}

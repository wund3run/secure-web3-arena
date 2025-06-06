
import React, { useState, useEffect } from "react";
import { StandardizedLayout } from "@/components/layout/StandardizedLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Users, Star, TrendingUp, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Types for the marketplace data
interface ExtendedProfile {
  full_name: string;
  verification_status: string;
  bio?: string;
  avatar_url?: string;
}

interface AuditorProfile {
  id: string;
  user_id: string;
  years_experience: number;
  hourly_rate_min?: number;
  hourly_rate_max?: number;
  verification_status: string;
  blockchain_expertise: string[];
  audit_types: string[];
  total_audits_completed: number;
  average_completion_time_days?: number;
  business_name?: string;
  extended_profiles: ExtendedProfile;
}

interface MarketplaceService {
  id: string;
  title: string;
  description: string;
  category: string;
  price_range: { min: number; max: number; currency: string };
  provider: AuditorProfile;
  rating: number;
  completed_jobs: number;
  tags: string[];
}

export default function EnhancedMarketplace() {
  const [services, setServices] = useState<MarketplaceService[]>([]);
  const [auditors, setAuditors] = useState<AuditorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBlockchain, setSelectedBlockchain] = useState("all");

  const stats = [
    { label: "Security Experts", value: "500+", icon: <Users className="h-5 w-5" /> },
    { label: "Projects Secured", value: "2,000+", icon: <Shield className="h-5 w-5" /> },
    { label: "Average Rating", value: "4.9", icon: <Star className="h-5 w-5" /> },
    { label: "Success Rate", value: "99.8%", icon: <TrendingUp className="h-5 w-5" /> }
  ];

  useEffect(() => {
    fetchMarketplaceData();
  }, []);

  const fetchMarketplaceData = async () => {
    try {
      setLoading(true);

      // Fetch auditors with basic error handling
      const { data: auditorsData, error: auditorsError } = await supabase
        .from('auditor_profiles')
        .select(`
          *,
          extended_profiles(full_name, verification_status, bio, avatar_url)
        `);

      if (auditorsError) {
        console.error('Error fetching auditors:', auditorsError);
        // Use mock data as fallback
        setAuditors(getMockAuditors());
      } else if (auditorsData) {
        // Transform the data to handle potential query errors
        const transformedAuditors: AuditorProfile[] = auditorsData
          .filter(auditor => auditor.extended_profiles && typeof auditor.extended_profiles === 'object')
          .map(auditor => ({
            ...auditor,
            extended_profiles: {
              full_name: (auditor.extended_profiles as any)?.full_name || 'Anonymous Auditor',
              verification_status: (auditor.extended_profiles as any)?.verification_status || 'pending',
              bio: (auditor.extended_profiles as any)?.bio,
              avatar_url: (auditor.extended_profiles as any)?.avatar_url
            }
          }));
        
        setAuditors(transformedAuditors);
      }

      // Fetch services with error handling
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*');

      if (servicesError) {
        console.error('Error fetching services:', servicesError);
        setServices(getMockServices());
      } else if (servicesData) {
        // Transform services data to match our interface
        const transformedServices: MarketplaceService[] = servicesData.map(service => ({
          id: service.id,
          title: service.title,
          description: service.description,
          category: service.category,
          price_range: service.price_range || { min: 1000, max: 5000, currency: 'USD' },
          provider: auditors[0] || getMockAuditors()[0], // Use first auditor or mock
          rating: service.average_rating || 4.5,
          completed_jobs: service.review_count || 0,
          tags: service.tags || []
        }));
        
        setServices(transformedServices);
      }

    } catch (error) {
      console.error('Error in fetchMarketplaceData:', error);
      toast.error('Failed to load marketplace data');
      // Use mock data as complete fallback
      setAuditors(getMockAuditors());
      setServices(getMockServices());
    } finally {
      setLoading(false);
    }
  };

  const getMockAuditors = (): AuditorProfile[] => [
    {
      id: "1",
      user_id: "user1",
      years_experience: 5,
      hourly_rate_min: 100,
      hourly_rate_max: 200,
      verification_status: "verified",
      blockchain_expertise: ["Ethereum", "Solana"],
      audit_types: ["Smart Contract", "DeFi"],
      total_audits_completed: 50,
      average_completion_time_days: 14,
      business_name: "Security Pro Labs",
      extended_profiles: {
        full_name: "Alex Johnson",
        verification_status: "verified",
        bio: "Experienced blockchain security auditor"
      }
    }
  ];

  const getMockServices = (): MarketplaceService[] => [
    {
      id: "1",
      title: "Smart Contract Security Audit",
      description: "Comprehensive security audit for smart contracts",
      category: "Security Audit",
      price_range: { min: 2000, max: 5000, currency: "USD" },
      provider: getMockAuditors()[0],
      rating: 4.8,
      completed_jobs: 25,
      tags: ["Smart Contract", "Security", "Ethereum"]
    }
  ];

  // Filter services based on search and filters
  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    const matchesBlockchain = selectedBlockchain === "all" || 
                             service.provider.blockchain_expertise.includes(selectedBlockchain);
    
    return matchesSearch && matchesCategory && matchesBlockchain;
  });

  if (loading) {
    return (
      <StandardizedLayout
        title="Enhanced Security Marketplace - Loading"
        description="Loading marketplace data..."
      >
        <div className="container py-12">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading marketplace...</p>
            </div>
          </div>
        </div>
      </StandardizedLayout>
    );
  }

  return (
    <StandardizedLayout
      title="Enhanced Security Marketplace"
      description="Connect with verified Web3 security experts for comprehensive audit services"
      keywords="web3 security, smart contract audit, blockchain security experts"
    >
      <div className="container py-12 space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <Badge variant="secondary" className="mb-4">Verified Experts</Badge>
          <h1 className="text-4xl md:text-5xl font-bold">
            Enhanced Security Marketplace
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with verified Web3 security experts for comprehensive audit services. 
            Advanced matching, real-time collaboration, and guaranteed results.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-2 text-primary">{stat.icon}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Security Audit">Security Audit</SelectItem>
              <SelectItem value="Code Review">Code Review</SelectItem>
              <SelectItem value="Penetration Testing">Penetration Testing</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedBlockchain} onValueChange={setSelectedBlockchain}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Blockchain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Blockchains</SelectItem>
              <SelectItem value="Ethereum">Ethereum</SelectItem>
              <SelectItem value="Solana">Solana</SelectItem>
              <SelectItem value="Polygon">Polygon</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <CardDescription className="mt-2">{service.description}</CardDescription>
                  </div>
                  <Badge variant="secondary">{service.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Provider Info */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{service.provider.extended_profiles.full_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {service.provider.years_experience} years experience
                    </p>
                  </div>
                </div>

                {/* Rating and Jobs */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{service.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({service.completed_jobs} jobs)
                    </span>
                  </div>
                  <Badge variant="outline">
                    {service.provider.extended_profiles.verification_status}
                  </Badge>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {service.tags.slice(0, 3).map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-lg font-bold text-primary">
                      ${service.price_range.min} - ${service.price_range.max}
                    </p>
                    <p className="text-sm text-muted-foreground">{service.price_range.currency}</p>
                  </div>
                  <Button asChild>
                    <Link to="/enhanced-request-audit">
                      Get Quote
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No services found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find more services.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Secure Your Project?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of projects that trust our security experts. Get started with a comprehensive 
            security audit today and protect your blockchain assets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/enhanced-request-audit">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary">
                Request Security Audit
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </StandardizedLayout>
  );
}

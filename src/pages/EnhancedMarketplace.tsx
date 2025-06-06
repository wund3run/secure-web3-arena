import React, { useState, useEffect } from "react";
import { StandardizedLayout } from "@/components/layout/StandardizedLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Shield, Star, Filter, Search, Users, Award, CheckCircle } from "lucide-react";
import { useMarketplaceServices } from "@/hooks/useMarketplaceServices";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Type definitions for better type safety
interface ExtendedProfile {
  full_name: string;
  verification_status: string;
}

interface AuditorProfile {
  id: string;
  user_id: string;
  extended_profiles: ExtendedProfile;
  services: any[];
  auditor_reviews: any[];
  years_experience: number;
  hourly_rate_min: number | null;
  hourly_rate_max: number | null;
  total_audits_completed: number;
  average_completion_time_days: number | null;
  success_rate: number;
  blockchain_expertise: string[];
  audit_types: string[];
  specialization_tags: string[];
  verification_status: string;
  availability_status: string;
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
  const [auditors, setAuditors] = useState<AuditorProfile[]>([]);
  const [services, setServices] = useState<MarketplaceService[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [minRating, setMinRating] = useState(0);

  // Function to safely parse price_range from database
  const parsePriceRange = (priceRangeData: any) => {
    if (!priceRangeData) {
      return { min: 0, max: 5000, currency: "USD" };
    }

    // If it's already an object with the right structure
    if (typeof priceRangeData === 'object' && priceRangeData.min !== undefined) {
      return {
        min: Number(priceRangeData.min) || 0,
        max: Number(priceRangeData.max) || 5000,
        currency: priceRangeData.currency || "USD"
      };
    }

    // If it's a string, try to parse it
    if (typeof priceRangeData === 'string') {
      try {
        const parsed = JSON.parse(priceRangeData);
        return {
          min: Number(parsed.min) || 0,
          max: Number(parsed.max) || 5000,
          currency: parsed.currency || "USD"
        };
      } catch {
        return { min: 0, max: 5000, currency: "USD" };
      }
    }

    // If it's a number, use it as max
    if (typeof priceRangeData === 'number') {
      return { min: 0, max: priceRangeData, currency: "USD" };
    }

    // Default fallback
    return { min: 0, max: 5000, currency: "USD" };
  };

  const fetchAuditors = async () => {
    try {
      setLoading(true);
      
      // First, let's get auditor profiles with basic info
      const { data: auditorData, error: auditorError } = await supabase
        .from('auditor_profiles')
        .select(`
          *,
          extended_profiles!inner(full_name, verification_status)
        `);

      if (auditorError) {
        console.error('Error fetching auditors:', auditorError);
        // Provide fallback data
        setAuditors([]);
        setServices([]);
        return;
      }

      // Transform and filter valid auditor data
      const validAuditors = (auditorData || [])
        .filter(auditor => auditor.extended_profiles && typeof auditor.extended_profiles === 'object')
        .map(auditor => ({
          ...auditor,
          extended_profiles: {
            full_name: auditor.extended_profiles?.full_name || 'Unknown Auditor',
            verification_status: auditor.extended_profiles?.verification_status || 'pending'
          },
          services: [],
          auditor_reviews: []
        }));

      setAuditors(validAuditors);

      // Transform auditors to services format
      const transformedServices: MarketplaceService[] = validAuditors.map(auditor => ({
        id: auditor.id,
        title: `Security Audit by ${auditor.extended_profiles.full_name}`,
        description: `Professional blockchain security audit with ${auditor.years_experience || 0} years of experience`,
        category: auditor.audit_types?.[0] || 'Smart Contract Audit',
        price_range: {
          min: auditor.hourly_rate_min || 100,
          max: auditor.hourly_rate_max || 500,
          currency: 'USD'
        },
        provider: auditor,
        rating: auditor.success_rate || 4.5,
        completed_jobs: auditor.total_audits_completed || 0,
        tags: auditor.specialization_tags || []
      }));

      setServices(transformedServices);

    } catch (error) {
      console.error('Error in fetchAuditors:', error);
      toast.error('Failed to load marketplace data');
      setAuditors([]);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditors();
  }, []);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    const matchesPrice = service.price_range.min >= priceRange[0] && service.price_range.max <= priceRange[1];
    const matchesRating = service.rating >= minRating;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  const ServiceCard = ({ service }: { service: MarketplaceService }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{service.title}</CardTitle>
            <CardDescription className="mt-2">{service.description}</CardDescription>
          </div>
          <Badge variant={service.provider.extended_profiles.verification_status === 'verified' ? 'default' : 'secondary'}>
            {service.provider.extended_profiles.verification_status === 'verified' ? (
              <><CheckCircle className="w-3 h-3 mr-1" /> Verified</>
            ) : (
              'Pending'
            )}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-medium">{service.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">({service.completed_jobs} reviews)</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">
                ${service.price_range.min} - ${service.price_range.max}
              </div>
              <div className="text-sm text-muted-foreground">per hour</div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {service.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Award className="w-4 h-4" />
                <span>{service.provider.years_experience || 0}y exp</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{service.completed_jobs} jobs</span>
              </div>
            </div>
            <Button>View Profile</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
      description="Find verified Web3 security experts with advanced filtering and AI-powered matching"
    >
      <div className="container py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Shield className="w-4 h-4 mr-2" />
            Enhanced Marketplace
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find Expert Security Auditors
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with verified blockchain security professionals using our advanced matching system
          </p>
        </div>

        {/* Search and Filters */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="md:col-span-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search auditors, skills, or blockchain expertise..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Smart Contract Audit">Smart Contract</SelectItem>
              <SelectItem value="DeFi Protocol">DeFi Protocol</SelectItem>
              <SelectItem value="NFT Platform">NFT Platform</SelectItem>
            </SelectContent>
          </Select>

          <div className="space-y-2">
            <label className="text-sm font-medium">Price Range ($/hour)</label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={10000}
              min={0}
              step={50}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Minimum Rating</label>
            <Slider
              value={[minRating]}
              onValueChange={(value) => setMinRating(value[0])}
              max={5}
              min={0}
              step={0.5}
              className="w-full"
            />
            <div className="text-xs text-muted-foreground">
              {minRating}+ stars
            </div>
          </div>

          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Advanced Filters
          </Button>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            {loading ? 'Loading...' : `${filteredServices.length} security experts found`}
          </p>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-full mt-2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                    <div className="h-3 bg-muted rounded w-full"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

        {!loading && filteredServices.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No auditors found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search criteria
            </p>
          </div>
        )}
      </div>
    </StandardizedLayout>
  );
}

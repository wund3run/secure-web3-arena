
import React from "react";
import { StandardizedLayout } from "@/components/layout/StandardizedLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Code, Bug, Users, Star, TrendingUp, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SEOOptimization } from "@/components/seo/SEOOptimization";

export default function EnhancedMarketplace() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [priceRange, setPriceRange] = React.useState("all");

  // Fetch auditor profiles with error handling
  const { data: auditorProfiles = [], isLoading: auditorsLoading } = useQuery({
    queryKey: ['auditor-profiles'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('auditor_profiles')
          .select(`
            *,
            extended_profiles(
              full_name,
              display_name,
              avatar_url,
              verification_status
            )
          `);
        
        if (error) {
          console.warn('Error fetching auditor profiles:', error);
          return [];
        }
        return data || [];
      } catch (err) {
        console.warn('Failed to fetch auditor profiles:', err);
        return [];
      }
    },
  });

  // Fetch services with error handling
  const { data: services = [], isLoading: servicesLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*');
        
        if (error) {
          console.warn('Error fetching services:', error);
          return [];
        }
        return data || [];
      } catch (err) {
        console.warn('Failed to fetch services:', err);
        return [];
      }
    },
  });

  // Fetch reviews with error handling
  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ['auditor-reviews'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('auditor_reviews')
          .select('*');
        
        if (error) {
          console.warn('Error fetching reviews:', error);
          return [];
        }
        return data || [];
      } catch (err) {
        console.warn('Failed to fetch reviews:', err);
        return [];
      }
    },
  });

  // Combine data safely with fallbacks
  const marketplaceItems = React.useMemo(() => {
    if (!Array.isArray(auditorProfiles)) return [];
    
    return auditorProfiles.map(profile => {
      // Safe access to extended profile data
      const extendedProfile = profile.extended_profiles || {};
      const fullName = extendedProfile.full_name || 'Anonymous Auditor';
      
      // Safe access to services data
      const auditorServices = Array.isArray(services) 
        ? services.filter(service => service.provider_id === profile.user_id) 
        : [];
      
      // Safe access to reviews data
      const auditorReviews = Array.isArray(reviews) 
        ? reviews.filter(review => review.auditor_id === profile.user_id) 
        : [];
      
      const avgRating = auditorReviews.length > 0 
        ? auditorReviews.reduce((sum, review) => sum + (review.rating || 0), 0) / auditorReviews.length 
        : 0;
      
      const reviewCount = auditorReviews.length;

      return {
        id: profile.id,
        name: fullName,
        title: profile.business_name || `${fullName} - Security Auditor`,
        description: `${profile.years_experience || 0}+ years experience in Web3 security auditing`,
        category: profile.audit_types?.[0] || 'smart-contract-audit',
        price: profile.hourly_rate_min ? `$${profile.hourly_rate_min}-${profile.hourly_rate_max || profile.hourly_rate_min}/hr` : 'Contact for pricing',
        rating: avgRating,
        reviewCount: reviewCount,
        completedAudits: profile.total_audits_completed || 0,
        expertise: profile.blockchain_expertise || ['Ethereum'],
        responseTime: `${profile.response_time_hours || 24} hours`,
        availability: profile.availability_status || 'available',
        verified: extendedProfile.verification_status === 'verified'
      };
    });
  }, [auditorProfiles, services, reviews]);

  // Filter items based on search and filters
  const filteredItems = React.useMemo(() => {
    return marketplaceItems.filter(item => {
      const matchesSearch = searchTerm === "" || 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [marketplaceItems, searchTerm, selectedCategory]);

  const stats = [
    { label: "Security Experts", value: `${marketplaceItems.length}+`, icon: <Users className="h-5 w-5" /> },
    { label: "Projects Secured", value: "2,000+", icon: <Shield className="h-5 w-5" /> },
    { label: "Average Rating", value: "4.9", icon: <Star className="h-5 w-5" /> },
    { label: "Success Rate", value: "99.8%", icon: <TrendingUp className="h-5 w-5" /> }
  ];

  const categories = [
    { value: "all", label: "All Services" },
    { value: "smart-contract-audit", label: "Smart Contract Audits" },
    { value: "code-review", label: "Code Reviews" },
    { value: "penetration-testing", label: "Penetration Testing" },
    { value: "consulting", label: "Security Consulting" }
  ];

  const isLoading = auditorsLoading || servicesLoading || reviewsLoading;

  return (
    <StandardizedLayout
      title="Enhanced Security Marketplace | Web3 Audit Services"
      description="Discover verified Web3 security experts for comprehensive blockchain audits. Advanced matching and real-time collaboration tools."
      keywords="web3 security marketplace, smart contract audit, blockchain security experts"
      showAuthAwareNavigation={true}
    >
      <SEOOptimization 
        type="website"
        title="Enhanced Security Marketplace | Web3 Audit Services"
        description="Discover verified Web3 security experts for comprehensive blockchain audits. Advanced matching and real-time collaboration tools."
        imageUrl="/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png"
      />

      <div className="container py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Enhanced Experience</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Enhanced Security Marketplace
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced marketplace with AI-powered matching, real-time collaboration, 
            and comprehensive security services for your Web3 projects.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search auditors, services, or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full md:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
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

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading marketplace...</p>
          </div>
        )}

        {/* Marketplace Items Grid */}
        {!isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          {item.verified && (
                            <Badge variant="default" className="text-xs">Verified</Badge>
                          )}
                        </div>
                        <CardDescription className="text-sm">{item.title}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{item.rating.toFixed(1)}</span>
                          <span className="text-xs text-muted-foreground">({item.reviewCount})</span>
                        </div>
                        <div className="text-xs text-muted-foreground">{item.completedAudits} audits</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      
                      <div className="flex flex-wrap gap-1">
                        {item.expertise.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                        ))}
                        {item.expertise.length > 3 && (
                          <Badge variant="secondary" className="text-xs">+{item.expertise.length - 3}</Badge>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Response: {item.responseTime}</span>
                        <Badge 
                          variant={item.availability === 'available' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {item.availability}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-primary">{item.price}</span>
                        <Button size="sm" asChild>
                          <Link to="/request-audit">Hire Now</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground mb-4">No auditors found matching your criteria.</p>
                <Button variant="outline" onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Secure Your Project?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of projects that trust our verified security experts. 
            Get started with AI-powered matching and find the perfect auditor for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/enhanced-request-audit">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary">
                Start Enhanced Audit Request
              </Button>
            </Link>
            <Link to="/enhanced-auth">
              <Button size="lg" variant="outline">
                Join as Security Expert
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </StandardizedLayout>
  );
}

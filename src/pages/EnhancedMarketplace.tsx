
import React, { useState, useEffect } from "react";
import { StandardizedLayout } from "@/components/layout/StandardizedLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Code, Bug, Users, Star, TrendingUp, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Type definitions for safe data access
interface ExtendedProfile {
  full_name?: string;
  verification_status?: string;
  avatar_url?: string;
}

interface AuditorProfile {
  user_id: string;
  years_experience?: number;
  hourly_rate_min?: number;
  hourly_rate_max?: number;
  blockchain_expertise?: string[];
  audit_types?: string[];
  verification_status?: string;
  extended_profiles?: ExtendedProfile;
  services?: any[];
  auditor_reviews?: any[];
}

export default function EnhancedMarketplace() {
  const [auditors, setAuditors] = useState<AuditorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBlockchain, setSelectedBlockchain] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState("all");

  useEffect(() => {
    fetchAuditors();
  }, []);

  const fetchAuditors = async () => {
    try {
      setLoading(true);
      const { data: auditorsData, error } = await supabase
        .from('auditor_profiles')
        .select(`
          *,
          extended_profiles (
            full_name,
            avatar_url,
            verification_status
          ),
          services (
            id,
            title,
            category,
            average_rating
          ),
          auditor_reviews (
            rating,
            review_text
          )
        `);

      if (error) {
        console.error('Error fetching auditors:', error);
        // Create mock data as fallback
        const mockAuditors: AuditorProfile[] = [
          {
            user_id: '1',
            years_experience: 5,
            hourly_rate_min: 100,
            hourly_rate_max: 200,
            blockchain_expertise: ['Ethereum', 'Solana'],
            audit_types: ['Smart Contract', 'DeFi'],
            verification_status: 'verified',
            extended_profiles: {
              full_name: 'John Doe',
              verification_status: 'verified',
              avatar_url: undefined
            },
            services: [],
            auditor_reviews: []
          },
          {
            user_id: '2',
            years_experience: 3,
            hourly_rate_min: 80,
            hourly_rate_max: 150,
            blockchain_expertise: ['Ethereum', 'Polygon'],
            audit_types: ['Smart Contract', 'NFT'],
            verification_status: 'verified',
            extended_profiles: {
              full_name: 'Jane Smith',
              verification_status: 'verified',
              avatar_url: undefined
            },
            services: [],
            auditor_reviews: []
          }
        ];
        setAuditors(mockAuditors);
        toast.error('Failed to load auditors data, showing sample data');
        return;
      }

      // Process the data safely
      const processedAuditors: AuditorProfile[] = (auditorsData || []).map(auditor => ({
        ...auditor,
        extended_profiles: auditor.extended_profiles || { full_name: 'Anonymous Auditor', verification_status: 'pending' },
        services: Array.isArray(auditor.services) ? auditor.services : [],
        auditor_reviews: Array.isArray(auditor.auditor_reviews) ? auditor.auditor_reviews : []
      }));

      setAuditors(processedAuditors);
    } catch (err) {
      console.error('Unexpected error:', err);
      toast.error('Failed to load marketplace data');
    } finally {
      setLoading(false);
    }
  };

  const filteredAuditors = auditors.filter(auditor => {
    const profile = auditor.extended_profiles || { full_name: 'Anonymous Auditor' };
    const matchesSearch = !searchTerm || 
      (profile.full_name || 'Anonymous Auditor').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (auditor.blockchain_expertise || []).some(blockchain => 
        blockchain.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesBlockchain = selectedBlockchain === "all" || 
      (auditor.blockchain_expertise || []).includes(selectedBlockchain);
    
    const matchesExperience = selectedExperience === "all" || 
      (selectedExperience === "junior" && (auditor.years_experience || 0) < 3) ||
      (selectedExperience === "mid" && (auditor.years_experience || 0) >= 3 && (auditor.years_experience || 0) < 7) ||
      (selectedExperience === "senior" && (auditor.years_experience || 0) >= 7);

    return matchesSearch && matchesBlockchain && matchesExperience;
  });

  const calculateAverageRating = (reviews: any[]) => {
    if (!Array.isArray(reviews) || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    return reviews.length > 0 ? (total / reviews.length).toFixed(1) : '0';
  };

  const getTotalServices = (services: any[]) => {
    return Array.isArray(services) ? services.length : 0;
  };

  const stats = [
    { label: "Security Experts", value: "500+", icon: <Users className="h-5 w-5" /> },
    { label: "Projects Secured", value: "2,000+", icon: <Shield className="h-5 w-5" /> },
    { label: "Average Rating", value: "4.9", icon: <Star className="h-5 w-5" /> },
    { label: "Success Rate", value: "99.8%", icon: <TrendingUp className="h-5 w-5" /> }
  ];

  if (loading) {
    return (
      <StandardizedLayout
        title="Enhanced Marketplace - Loading"
        description="Loading marketplace data..."
      >
        <div className="container py-12">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading marketplace...</p>
          </div>
        </div>
      </StandardizedLayout>
    );
  }

  return (
    <StandardizedLayout
      title="Enhanced Security Marketplace"
      description="Advanced marketplace with AI-powered matching for Web3 security services"
    >
      <div className="container py-12">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">AI-Powered Matching</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Enhanced Security Marketplace
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find the perfect security expert for your Web3 project using our advanced AI matching system.
            Get personalized recommendations based on your specific needs.
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
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search auditors by name or blockchain..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedBlockchain} onValueChange={setSelectedBlockchain}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Blockchain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Blockchains</SelectItem>
              <SelectItem value="Ethereum">Ethereum</SelectItem>
              <SelectItem value="Solana">Solana</SelectItem>
              <SelectItem value="Polygon">Polygon</SelectItem>
              <SelectItem value="BSC">BSC</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedExperience} onValueChange={setSelectedExperience}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Experience</SelectItem>
              <SelectItem value="junior">Junior (0-3 years)</SelectItem>
              <SelectItem value="mid">Mid-level (3-7 years)</SelectItem>
              <SelectItem value="senior">Senior (7+ years)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Auditors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredAuditors.map((auditor) => {
            const profile = auditor.extended_profiles || { full_name: 'Anonymous Auditor', verification_status: 'pending' };
            return (
              <Card key={auditor.user_id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold">
                      {(profile.full_name || 'A').charAt(0)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{profile.full_name || 'Anonymous Auditor'}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant={profile.verification_status === 'verified' ? 'default' : 'secondary'} className="text-xs">
                          {profile.verification_status === 'verified' ? 'Verified' : 'Pending'}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {auditor.years_experience || 0} years exp.
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Expertise:</p>
                      <div className="flex flex-wrap gap-1">
                        {(auditor.blockchain_expertise || []).slice(0, 3).map((blockchain, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {blockchain}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">
                            {calculateAverageRating(auditor.auditor_reviews || [])}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {getTotalServices(auditor.services || [])} services
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          ${auditor.hourly_rate_min || 50}-${auditor.hourly_rate_max || 150}/hr
                        </p>
                      </div>
                    </div>

                    <Button className="w-full" asChild>
                      <Link to={`/auditor/${auditor.user_id}`}>View Profile</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredAuditors.length === 0 && !loading && (
          <div className="text-center py-12">
            <Shield className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No auditors found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or browse all available auditors.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Request a comprehensive security audit from our verified experts and protect your blockchain project.
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

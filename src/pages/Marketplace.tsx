
import React from "react";
import { StandardizedLayout } from "@/components/layout/StandardizedLayout";
import { MarketplaceSEO } from "@/components/seo/SEOOptimization";
import { EnhancedLoadingState } from "@/components/ui/enhanced-loading-states";
import { InteractiveCard } from "@/components/ui/interactive-elements";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Shield, Code, Award, MessageSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// Mock data for demonstration
const mockAuditors = [
  {
    id: "1",
    name: "Alex Chen",
    title: "Senior Smart Contract Auditor",
    rating: 4.9,
    reviews: 127,
    expertise: ["Solidity", "DeFi", "Layer 2"],
    priceRange: "$2,000 - $10,000",
    avatar: "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png",
    verified: true,
    completedAudits: 45
  },
  {
    id: "2", 
    name: "Sarah Williams",
    title: "Blockchain Security Expert",
    rating: 4.8,
    reviews: 89,
    expertise: ["Rust", "Solana", "Security"],
    priceRange: "$1,500 - $8,000",
    avatar: "/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png",
    verified: true,
    completedAudits: 32
  }
];

const Marketplace = () => {
  const { data: auditors, isLoading, error } = useQuery({
    queryKey: ['marketplace-auditors'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockAuditors;
    },
    staleTime: 5 * 60 * 1000
  });

  const helpItems = [
    {
      title: "How to Choose an Auditor",
      description: "Tips for selecting the right security expert",
      type: "guide" as const,
      content: "Look for verified badges, relevant expertise, and good ratings from previous clients.",
      links: [
        { text: "Auditor Guide", url: "/resources/choosing-auditor" }
      ]
    },
    {
      title: "Pricing Information",
      description: "Understanding audit costs and pricing models",
      type: "tip" as const,
      content: "Audit prices vary based on complexity, timeline, and auditor expertise.",
      links: [
        { text: "Pricing Guide", url: "/pricing" }
      ]
    }
  ];

  if (error) {
    return (
      <StandardizedLayout
        title="Marketplace Error"
        description="Unable to load marketplace data"
        helpItems={helpItems}
        pageType="marketplace"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive mb-4">Unable to Load Marketplace</h1>
            <p className="text-muted-foreground mb-4">Please try again later.</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </div>
      </StandardizedLayout>
    );
  }

  return (
    <>
      <MarketplaceSEO 
        title="Security Auditor Marketplace"
        description="Browse verified blockchain security experts and smart contract auditors. Find the perfect match for your Web3 project security needs."
      />
      
      <StandardizedLayout
        title="Security Auditor Marketplace"
        description="Browse verified blockchain security experts and smart contract auditors"
        keywords={['security auditors', 'blockchain experts', 'smart contract review', 'web3 marketplace']}
        helpItems={helpItems}
        pageType="marketplace"
      >
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-gradient">
              Find Security Experts
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with verified security auditors and blockchain experts for your Web3 project
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center hover-lift">
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle>150+ Auditors</CardTitle>
                <CardDescription>Verified security experts</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center hover-lift">
              <CardHeader>
                <Code className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle>500+ Audits</CardTitle>
                <CardDescription>Completed successfully</CardDescription>
              </CardHeader>
            </Card>
            <Card className="text-center hover-lift">
              <CardHeader>
                <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle>99% Success</CardTitle>
                <CardDescription>Client satisfaction rate</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Auditors Grid */}
          {isLoading ? (
            <EnhancedLoadingState variant="dashboard" message="Loading security experts..." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {auditors?.map((auditor, index) => (
                <InteractiveCard 
                  key={auditor.id} 
                  hover 
                  clickable
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={auditor.avatar} alt={auditor.name} />
                          <AvatarFallback>{auditor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <CardTitle className="text-lg">{auditor.name}</CardTitle>
                            {auditor.verified && (
                              <Badge variant="secondary" className="text-xs">
                                <Shield className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <CardDescription>{auditor.title}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Rating */}
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium ml-1">{auditor.rating}</span>
                      </div>
                      <span className="text-muted-foreground text-sm">
                        ({auditor.reviews} reviews)
                      </span>
                    </div>

                    {/* Expertise */}
                    <div className="flex flex-wrap gap-1">
                      {auditor.expertise.map(skill => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {auditor.completedAudits} audits completed
                      </span>
                      <span className="font-medium">{auditor.priceRange}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-2">
                      <Button className="flex-1" size="sm">
                        View Profile
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </InteractiveCard>
              ))}
            </div>
          )}
        </div>
      </StandardizedLayout>
    </>
  );
};

export default Marketplace;

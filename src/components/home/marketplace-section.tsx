
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Star, Shield, Clock, CheckCircle } from 'lucide-react';
import { ResponsiveLayout } from '@/components/layout/responsive-layout';
import { ResponsiveGrid } from '@/components/ui/responsive-grid';
import { EnhancedCard } from '@/components/ui/enhanced-card';

export function MarketplaceSection() {
  const featuredServices = [
    {
      id: 1,
      title: "Smart Contract Security Audit",
      description: "Comprehensive security review for DeFi protocols and smart contracts",
      provider: "SecureCode Labs",
      rating: 4.9,
      reviews: 127,
      price: "From $5,000",
      duration: "5-7 days",
      verified: true,
      featured: true
    },
    {
      id: 2,
      title: "Multi-Chain Security Assessment",
      description: "Cross-chain security analysis for complex DeFi applications",
      provider: "BlockSafe Auditors",
      rating: 4.8,
      reviews: 89,
      price: "From $8,000",
      duration: "7-10 days",
      verified: true,
      featured: false
    },
    {
      id: 3,
      title: "NFT Collection Security Review",
      description: "Specialized security audit for NFT smart contracts and marketplaces",
      provider: "CryptoGuard Pro",
      rating: 4.9,
      reviews: 156,
      price: "From $3,500",
      duration: "3-5 days",
      verified: true,
      featured: true
    }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <ResponsiveLayout>
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-4">
            Featured Security Services
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover top-rated security experts ready to audit your smart contracts and protect your Web3 project.
          </p>
        </div>

        <ResponsiveGrid 
          cols={{ default: 1, md: 2, lg: 3 }} 
          gap="lg" 
          className="mb-8 md:mb-12"
        >
          {featuredServices.map((service) => (
            <EnhancedCard
              key={service.id}
              title={service.title}
              description={service.description}
              featured={service.featured}
              badge={service.featured ? "Featured" : undefined}
              variant="interactive"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{service.provider}</span>
                  {service.verified && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{service.rating}</span>
                    <span className="text-muted-foreground">({service.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{service.duration}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-semibold">{service.price}</span>
                  <Button size="sm" asChild>
                    <Link to={`/marketplace/${service.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </EnhancedCard>
          ))}
        </ResponsiveGrid>

        <div className="text-center">
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <Link to="/marketplace">
              <Shield className="mr-2 h-5 w-5" />
              Browse All Services
            </Link>
          </Button>
        </div>
      </ResponsiveLayout>
    </section>
  );
}

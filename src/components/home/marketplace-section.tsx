
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Star, Shield, Clock, CheckCircle } from 'lucide-react';

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
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Featured Security Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover top-rated security experts ready to audit your smart contracts and protect your Web3 project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredServices.map((service) => (
            <Card key={service.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              {service.featured && (
                <Badge className="absolute top-4 right-4 bg-primary">
                  Featured
                </Badge>
              )}
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {service.description}
                    </CardDescription>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-sm font-medium">{service.provider}</span>
                  {service.verified && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{service.rating}</span>
                      <span className="text-sm text-muted-foreground">({service.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{service.duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">{service.price}</span>
                    <Button size="sm" asChild>
                      <Link to={`/marketplace/${service.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" variant="outline">
            <Link to="/marketplace">
              <Shield className="mr-2 h-5 w-5" />
              Browse All Services
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

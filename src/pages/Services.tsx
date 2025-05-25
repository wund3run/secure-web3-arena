
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Star, Clock, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Smart Contract Security Audit",
      description: "Comprehensive security analysis of your smart contracts",
      price: "Starting at $5,000",
      duration: "5-7 days",
      rating: 4.9,
      provider: "SecureChain Labs",
      category: "Smart Contract"
    },
    {
      id: 2,
      title: "DeFi Protocol Review",
      description: "In-depth security assessment for DeFi protocols",
      price: "Starting at $12,000",
      duration: "10-14 days",
      rating: 4.8,
      provider: "CryptoAudit Pro",
      category: "DeFi"
    },
    {
      id: 3,
      title: "NFT Contract Audit",
      description: "Specialized audit for NFT marketplace and contracts",
      price: "Starting at $3,500",
      duration: "3-5 days",
      rating: 4.7,
      provider: "BlockSec",
      category: "NFT"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Security Services | Hawkly</title>
        <meta name="description" content="Browse professional Web3 security audit services on Hawkly" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Shield className="h-10 w-10 text-primary" />
              <h1 className="text-4xl font-bold">Security Services</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional Web3 security audits by verified experts
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {services.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg mb-2">{service.title}</CardTitle>
                      <Badge variant="outline">{service.category}</Badge>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{service.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{service.price}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{service.duration}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    by {service.provider}
                  </p>
                  
                  <Button className="w-full">
                    Request Audit
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">
                  Need a Custom Security Solution?
                </h2>
                <p className="text-muted-foreground mb-6">
                  Can't find what you're looking for? Contact us for a custom security audit tailored to your specific needs.
                </p>
                <Button size="lg">
                  Contact Security Experts
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;

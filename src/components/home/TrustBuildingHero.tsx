
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, Star, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TrustBuildingHero() {
  const trustedCompanies = [
    { name: "Ethereum Foundation", logo: "🔷" },
    { name: "Polygon", logo: "🟣" },
    { name: "Chainlink", logo: "🔗" },
    { name: "Uniswap", logo: "🦄" },
    { name: "Aave", logo: "👻" }
  ];

  const trustMetrics = [
    { icon: <Shield className="h-5 w-5" />, value: "500+", label: "Security Experts" },
    { icon: <CheckCircle className="h-5 w-5" />, value: "2,500+", label: "Audits Completed" },
    { icon: <Star className="h-5 w-5" />, value: "4.9/5", label: "Client Satisfaction" },
    { icon: <Users className="h-5 w-5" />, value: "$350M+", label: "Assets Protected" }
  ];

  return (
    <section className="relative bg-gradient-to-b from-background via-background to-muted/20 py-16 md:py-24 lg:py-32">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-grid-hawkly opacity-30" />
      
      <div className="container-modern relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Trust badge */}
          <Badge className="mb-6 bg-hawkly-primary/10 text-hawkly-primary border-hawkly-primary/20 px-4 py-2">
            <Shield className="h-4 w-4 mr-2" />
            Web3 Security Leader
          </Badge>

          {/* Main headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="block text-foreground">Secure Your Web3 Future</span>
            <span className="block text-hawkly-gradient mt-2">Through Expert Audits</span>
          </h1>

          {/* Value proposition */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            The ultimate platform for Web3 security. Transform your project's safety through verified expert audits, 
            guiding you to uncover vulnerabilities worth fixing and solutions worth building.
          </p>

          {/* Primary CTA */}
          <div className="mb-12">
            <Button asChild size="lg" className="btn-primary px-8 py-6 text-lg font-semibold shadow-hawkly">
              <Link to="/request-audit">
                <Shield className="mr-2 h-5 w-5" />
                Get Your Security Audit
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mb-12">
            <p className="text-sm text-muted-foreground mb-4">Trusted by leading Web3 teams</p>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              {trustedCompanies.map((company, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="text-2xl">{company.logo}</span>
                  <span className="font-medium">{company.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {trustMetrics.map((metric, index) => (
              <div 
                key={index}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="flex justify-center mb-3 text-hawkly-primary">
                  {metric.icon}
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Secondary CTA */}
          <div className="mt-12">
            <Button asChild variant="outline" size="lg" className="border-hawkly-primary/30 text-hawkly-primary hover:bg-hawkly-primary/10">
              <Link to="/marketplace">
                Browse Security Experts
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

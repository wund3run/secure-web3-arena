
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Play, CheckCircle, Zap, Users, Star } from 'lucide-react';

const HERO_STATS = [
  { icon: Users, value: "500+", label: "Expert Auditors" },
  { icon: Shield, value: "$350M+", label: "Assets Protected" },
  { icon: Star, value: "4.9/5", label: "Client Rating" }
];

export function SimplifiedHero() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-primary/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container px-4 md:px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Enhanced Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-3 rounded-full border border-primary/20 mb-8 shadow-sm">
            <Shield className="h-5 w-5 text-primary animate-pulse" />
            <span className="text-sm font-semibold">Trusted by 500+ Web3 Projects Worldwide</span>
            <div className="flex -space-x-1 ml-2">
              {[1,2,3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-primary/20 border-2 border-background"></div>
              ))}
            </div>
          </div>

          {/* Enhanced Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            <span className="block text-foreground">Secure Your Web3 Project</span>
            <span className="block bg-gradient-to-r from-primary via-purple-600 to-secondary bg-clip-text text-transparent">
              In Under 2 Hours
            </span>
          </h1>

          {/* Enhanced Value Proposition */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            The world's fastest Web3 security marketplace. Get matched with expert auditors instantly, 
            pay securely through smart contracts, and protect your project before launch.
          </p>

          {/* Primary CTAs with enhanced styling */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button asChild size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg hover:shadow-xl transition-all group">
              <Link to="/request-audit" className="flex items-center">
                <Shield className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform" />
                Get Security Audit 
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 border-2 hover:bg-muted/50 transition-all group">
              <Link to="#demo" className="flex items-center">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                See How It Works
              </Link>
            </Button>
          </div>

          {/* Enhanced Risk-Free Guarantee */}
          <div className="bg-card/80 backdrop-blur-sm border-2 border-primary/10 rounded-xl p-6 mb-8 max-w-4xl mx-auto shadow-lg">
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2 group">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover:scale-110 transition-transform" />
                <span className="font-medium">30-day satisfaction guarantee</span>
              </div>
              <div className="flex items-center gap-2 group">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Smart contract escrow protection</span>
              </div>
              <div className="flex items-center gap-2 group">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Free security consultation</span>
              </div>
              <div className="flex items-center gap-2 group">
                <CheckCircle className="h-5 w-5 text-green-500 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Pay only when satisfied</span>
              </div>
            </div>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {HERO_STATS.map((stat, index) => (
              <div key={index} className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-lg p-4 hover:shadow-md transition-all group">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Enhanced Pricing Transparency */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 border border-primary/20">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary text-lg">Starting from $2,500</span> • 
              <span className="mx-2">•</span>
              <span className="font-medium">Instant matching</span> • 
              <span className="mx-2">•</span>
              <span className="font-medium">Transparent pricing</span> •
              <span className="mx-2">•</span>
              <span className="font-medium">Secure payments</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

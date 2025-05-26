
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Play, CheckCircle } from 'lucide-react';

export function SimplifiedHero() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-6">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Trusted by 500+ Web3 Projects</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Secure Your Web3 Project with{" "}
            <span className="text-primary">Expert Auditors</span>
          </h1>

          {/* Simple Value Proposition */}
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get matched with verified security experts in minutes. Protect your smart contracts 
            from vulnerabilities before you launch.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/request-audit" className="flex items-center">
                Get Security Audit <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link to="#demo" className="flex items-center">
                <Play className="mr-2 h-5 w-5" />
                See How It Works
              </Link>
            </Button>
          </div>

          {/* Enhanced Risk-Free Guarantee */}
          <div className="bg-muted/20 border rounded-lg p-6 mb-8 max-w-3xl mx-auto">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>30-day satisfaction guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Secure escrow payments</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Free initial consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>No upfront payments</span>
              </div>
            </div>
          </div>

          {/* Pricing Transparency */}
          <p className="text-sm text-muted-foreground">
            Starting from <span className="font-semibold text-primary">$2,500</span> • 
            Get instant quote • Pay only when satisfied
          </p>
        </div>
      </div>
    </section>
  );
}

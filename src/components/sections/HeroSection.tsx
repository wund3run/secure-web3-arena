
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Secure Your Web3 Future with 
            <span className="text-primary"> Expert Audits</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with verified security experts for comprehensive smart contract audits. 
            Protect your project with advanced tools and real-time collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/request-audit">
                Get Security Audit
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/marketplace">
                Browse Experts
              </Link>
            </Button>
          </div>
          <div className="flex items-center justify-center gap-8 mt-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-blue-500" />
              <span>Real-time Collaboration</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

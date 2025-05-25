
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Users, CheckCircle } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      
      <div className="relative mx-auto max-w-7xl">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="inline-flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Trusted by 500+ Web3 Projects
                </Badge>
                
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Secure Your{' '}
                  <span className="text-primary">Smart Contracts</span>{' '}
                  with Expert Audits
                </h1>
                
                <p className="text-lg text-muted-foreground sm:text-xl">
                  Connect with top security professionals for comprehensive Web3 audits. 
                  Protect your blockchain assets with thorough security reviews and expert guidance.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-lg h-12 px-8">
                  <Link to="/request-audit">
                    <Shield className="mr-2 h-5 w-5" />
                    Request Security Audit
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="text-lg h-12 px-8">
                  <Link to="/marketplace">
                    <Users className="mr-2 h-5 w-5" />
                    Browse Security Experts
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Verified Auditors</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Secure Escrow</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Quality Assured</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 lg:col-span-6 lg:mt-0">
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/10 p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-4 h-full">
                  <div className="space-y-4">
                    <div className="h-20 rounded-lg bg-background shadow-lg p-4 flex items-center justify-center">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <div className="h-32 rounded-lg bg-background shadow-lg p-4">
                      <div className="h-2 bg-primary/20 rounded mb-2"></div>
                      <div className="h-2 bg-primary/40 rounded mb-2"></div>
                      <div className="h-2 bg-primary rounded mb-2"></div>
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="h-32 rounded-lg bg-background shadow-lg p-4">
                      <div className="h-2 bg-secondary/20 rounded mb-2"></div>
                      <div className="h-2 bg-secondary/40 rounded mb-2"></div>
                      <div className="h-2 bg-secondary rounded mb-2"></div>
                    </div>
                    <div className="h-20 rounded-lg bg-background shadow-lg p-4 flex items-center justify-center">
                      <Users className="h-8 w-8 text-secondary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

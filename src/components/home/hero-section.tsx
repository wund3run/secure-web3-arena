
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Users, CheckCircle } from 'lucide-react';
import { ResponsiveLayout } from '@/components/layout/responsive-layout';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 py-12 md:py-20 lg:py-24">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      
      <ResponsiveLayout>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <Badge variant="secondary" className="inline-flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Trusted by 500+ Web3 Projects
                </Badge>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground">
                  Secure Your{' '}
                  <span className="text-primary">Smart Contracts</span>{' '}
                  with Expert Audits
                </h1>
                
                <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                  Connect with top security professionals for comprehensive Web3 audits. 
                  Protect your blockchain assets with thorough security reviews and expert guidance.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="text-base md:text-lg h-12 px-6 md:px-8">
                  <Link to="/request-audit">
                    <Shield className="mr-2 h-5 w-5" />
                    Request Security Audit
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="text-base md:text-lg h-12 px-6 md:px-8">
                  <Link to="/marketplace">
                    <Users className="mr-2 h-5 w-5" />
                    Browse Security Experts
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Verified Auditors</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Secure Escrow</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium">Quality Assured</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative max-w-md mx-auto lg:max-w-none">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/10 p-6 md:p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-3 md:gap-4 h-full">
                  <div className="space-y-3 md:space-y-4">
                    <div className="h-16 md:h-20 rounded-lg bg-background shadow-lg p-3 md:p-4 flex items-center justify-center">
                      <Shield className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                    </div>
                    <div className="h-24 md:h-32 rounded-lg bg-background shadow-lg p-3 md:p-4">
                      <div className="h-1.5 md:h-2 bg-primary/20 rounded mb-2"></div>
                      <div className="h-1.5 md:h-2 bg-primary/40 rounded mb-2"></div>
                      <div className="h-1.5 md:h-2 bg-primary rounded mb-2"></div>
                    </div>
                  </div>
                  <div className="space-y-3 md:space-y-4 pt-6 md:pt-8">
                    <div className="h-24 md:h-32 rounded-lg bg-background shadow-lg p-3 md:p-4">
                      <div className="h-1.5 md:h-2 bg-secondary/20 rounded mb-2"></div>
                      <div className="h-1.5 md:h-2 bg-secondary/40 rounded mb-2"></div>
                      <div className="h-1.5 md:h-2 bg-secondary rounded mb-2"></div>
                    </div>
                    <div className="h-16 md:h-20 rounded-lg bg-background shadow-lg p-3 md:p-4 flex items-center justify-center">
                      <Users className="h-6 w-6 md:h-8 md:w-8 text-secondary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ResponsiveLayout>
    </section>
  );
}

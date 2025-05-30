
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, Star, Users, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';

export function HeroSection() {
  const { user } = useAuth();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 pt-16 pb-24">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="inline-flex items-center gap-2">
                <Shield className="h-3 w-3" />
                Trusted by 500+ Projects
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Premier Web3 
                <span className="text-primary"> Security</span> Marketplace
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Connect with expert auditors, manage security audits, and protect your blockchain projects with confidence.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {!user ? (
                <>
                  <Button asChild size="lg" className="text-lg px-8">
                    <Link to="/auth">Get Started</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-lg px-8">
                    <Link to="/marketplace">Browse Auditors</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild size="lg" className="text-lg px-8">
                    <Link to="/request-audit">Request Audit</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="text-lg px-8">
                    <Link to="/marketplace">Find Auditors</Link>
                  </Button>
                </>
              )}
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="font-semibold">4.9/5</span>
                <span className="text-muted-foreground">Average Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-semibold">500+</span>
                <span className="text-muted-foreground">Expert Auditors</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-card border rounded-2xl p-8 shadow-2xl">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Security Audit Progress</h3>
                  <Badge variant="secondary">In Progress</Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Initial Code Review</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Vulnerability Assessment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full border-2 border-primary border-dashed"></div>
                    <span>Security Testing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30"></div>
                    <span>Final Report</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Progress</span>
                    <span>65%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-[65%]"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

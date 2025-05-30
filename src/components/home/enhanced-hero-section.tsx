
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Shield, Users, CheckCircle, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export function EnhancedHeroSection() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Trust Badge */}
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                <Shield className="w-3 h-3 mr-1" />
                Trusted by 500+ Projects
              </Badge>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-muted-foreground ml-1">4.9/5</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Secure Your
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block">
                  Web3 Project
                </span>
                with Expert Audits
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Connect with verified security auditors. Get comprehensive smart contract audits. 
                Launch with confidence in the Web3 ecosystem.
              </p>
            </div>

            {/* Value Props */}
            <div className="space-y-3">
              {[
                'AI-powered auditor matching in under 24 hours',
                'Vetted professionals with proven track records',
                'Transparent pricing and milestone-based payments'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/request-audit">
                  Request Security Audit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/marketplace">
                  Browse Auditors
                </Link>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold">2,500+</div>
                <div className="text-sm text-muted-foreground">Audits Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">$50M+</div>
                <div className="text-sm text-muted-foreground">Value Protected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24h</div>
                <div className="text-sm text-muted-foreground">Avg. Response Time</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="relative z-10 bg-card border rounded-2xl p-6 shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">Security Audit Progress</div>
                      <div className="text-sm text-muted-foreground">DeFi Protocol</div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">In Progress</Badge>
                </div>
                
                <div className="space-y-3">
                  {[
                    { task: 'Initial Code Review', status: 'completed', progress: 100 },
                    { task: 'Vulnerability Assessment', status: 'in-progress', progress: 75 },
                    { task: 'Security Testing', status: 'pending', progress: 0 },
                    { task: 'Final Report', status: 'pending', progress: 0 }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.task}</span>
                        <span className="text-xs text-muted-foreground">{item.progress}%</span>
                      </div>
                      <div className="w-full bg-muted h-2 rounded-full">
                        <div 
                          className={`h-2 rounded-full transition-all ${
                            item.status === 'completed' ? 'bg-green-500' : 
                            item.status === 'in-progress' ? 'bg-blue-500' : 'bg-muted'
                          }`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

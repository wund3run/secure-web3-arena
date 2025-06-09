
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Shield, Users, Zap, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';

export function EnhancedHero() {
  const { user } = useAuth();

  const stats = [
    { label: 'Security Experts', value: '500+', icon: Users },
    { label: 'Audits Completed', value: '2,500+', icon: Shield },
    { label: 'Vulnerabilities Found', value: '10,000+', icon: Zap }
  ];

  const features = [
    'AI-Powered Expert Matching',
    'Real-time Collaboration Tools',
    'Comprehensive Security Reports',
    'Industry-Leading Standards'
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:60px_60px]" />
      <div className="relative container mx-auto px-4 py-20 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="w-fit">
                <Shield className="h-3 w-3 mr-1" />
                Trusted by 1000+ Projects
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Secure Your{' '}
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Web3 Project
                </span>{' '}
                with Expert Audits
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Connect with verified security experts for comprehensive smart contract audits. 
                Fast, secure, and affordable blockchain security solutions.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="group">
                <Link to={user ? "/request-audit" : "/auth"}>
                  {user ? "Request Security Audit" : "Get Started Free"}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <Link to="/marketplace">
                  Browse Security Experts
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <stat.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div className="h-8 bg-muted rounded-md" />
                  <div className="h-6 bg-muted/60 rounded-md w-3/4" />
                </div>
                <div className="space-y-3">
                  <div className="h-8 bg-muted rounded-md" />
                  <div className="h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="h-6 bg-muted/60 rounded-md w-2/3" />
                </div>
              </div>
              <div className="mt-6 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <span className="text-white font-medium">Secure & Verified</span>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-green-500 rounded-full animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500 rounded-full animate-pulse delay-1000" />
          </div>
        </div>
      </div>
    </section>
  );
}

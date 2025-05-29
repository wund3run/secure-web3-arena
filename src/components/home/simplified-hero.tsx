
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Play, CheckCircle, Zap, Users, Star, Clock, Award, FileCheck } from 'lucide-react';

const HERO_STATS = [
  { icon: Users, value: "500+", label: "Expert Auditors", subtext: "Verified professionals" },
  { icon: Shield, value: "$350M+", label: "Assets Protected", subtext: "Secured to date" },
  { icon: Star, value: "4.9/5", label: "Client Rating", subtext: "Average satisfaction" }
];

const TRUST_LOGOS = [
  "Ethereum", "Solana", "Polygon", "Avalanche", "BNB Chain"
];

export function SimplifiedHero() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-primary/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container px-4 md:px-6 relative">
        <div className="max-w-5xl mx-auto text-center">
          {/* Enhanced Trust Badge with Social Proof */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/10 to-secondary/10 px-8 py-4 rounded-full border border-primary/20 mb-10 shadow-lg">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary animate-pulse" />
              <span className="text-sm font-semibold">Trusted by 500+ Web3 Projects</span>
            </div>
            <div className="h-4 w-px bg-primary/30"></div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-secondary" />
              <span className="text-sm font-medium text-secondary">12,800+ Vulnerabilities Found</span>
            </div>
          </div>

          {/* Enhanced Main Headline with Urgency */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-tight">
            <span className="block text-foreground">Secure Your Web3 Project</span>
            <span className="block bg-gradient-to-r from-primary via-purple-600 to-secondary bg-clip-text text-transparent">
              In Under 2 Hours
            </span>
          </h1>

          {/* Enhanced Value Proposition with Risk Focus */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-4xl mx-auto leading-relaxed">
            Don't risk your users' funds. Get matched with expert auditors instantly, 
            secure smart contract escrow, and protect your project before launch.
          </p>
          
          {/* Risk Urgency Indicator */}
          <div className="flex items-center justify-center gap-2 mb-10 text-orange-600">
            <Clock className="h-5 w-5" />
            <span className="text-lg font-semibold">Every day unaudited = Higher risk of exploits</span>
          </div>

          {/* Enhanced Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button asChild size="lg" className="text-xl px-10 py-8 bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-2xl hover:shadow-3xl transition-all group relative overflow-hidden">
              <Link to="/request-audit" className="flex items-center">
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <Shield className="mr-3 h-7 w-7 group-hover:rotate-12 transition-transform" />
                Get Security Audit Now
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-xl px-10 py-8 border-2 hover:bg-muted/50 transition-all group">
              <Link to="#demo" className="flex items-center">
                <Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                See How It Works (2 min)
              </Link>
            </Button>
          </div>

          {/* Enhanced Risk-Free Guarantee with More Benefits */}
          <div className="bg-card/90 backdrop-blur-sm border-2 border-primary/20 rounded-2xl p-8 mb-10 max-w-5xl mx-auto shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
              <div className="flex items-center gap-3 group">
                <CheckCircle className="h-6 w-6 text-green-500 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="font-semibold">30-Day Guarantee</div>
                  <div className="text-muted-foreground text-xs">100% satisfaction or refund</div>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <FileCheck className="h-6 w-6 text-green-500 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="font-semibold">Smart Escrow</div>
                  <div className="text-muted-foreground text-xs">Secure blockchain payments</div>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <Users className="h-6 w-6 text-green-500 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="font-semibold">Expert Auditors</div>
                  <div className="text-muted-foreground text-xs">Verified professionals only</div>
                </div>
              </div>
              <div className="flex items-center gap-3 group">
                <Zap className="h-6 w-6 text-green-500 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="font-semibold">Instant Matching</div>
                  <div className="text-muted-foreground text-xs">AI-powered in minutes</div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Hero Stats with More Detail */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {HERO_STATS.map((stat, index) => (
              <div key={index} className="bg-card/70 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all group hover:border-primary/30">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <stat.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-lg font-medium text-foreground mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.subtext}</div>
              </div>
            ))}
          </div>

          {/* Blockchain Ecosystem Support */}
          <div className="mb-10">
            <p className="text-sm text-muted-foreground mb-4 font-medium">Supporting all major blockchain ecosystems:</p>
            <div className="flex flex-wrap justify-center gap-4">
              {TRUST_LOGOS.map((chain, index) => (
                <div 
                  key={chain} 
                  className="px-4 py-2 bg-muted/60 rounded-full text-sm font-medium hover:bg-muted/80 transition-colors"
                >
                  {chain}
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Pricing with Urgency */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <p className="text-2xl font-bold text-primary mb-1">Starting from $2,500</p>
                <p className="text-sm text-muted-foreground">
                  Transparent pricing • Instant matching • Secure payments • Expert auditors
                </p>
              </div>
              <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
                🔥 Limited time: Free security consultation included
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

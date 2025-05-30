
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Play, CheckCircle, Clock, Users, Zap } from 'lucide-react';

const TRUST_STATS = [
  { icon: Users, value: "500+", label: "Web3 Projects" },
  { icon: Shield, value: "12,800+", label: "Vulnerabilities Found" }
];

const FEATURES = [
  { icon: CheckCircle, text: "30-Day Guarantee", subtext: "100% satisfaction or refund" },
  { icon: Shield, text: "Smart Escrow", subtext: "Secure blockchain payments" },
  { icon: Users, text: "Expert Auditors", subtext: "Verified professionals only" },
  { icon: Zap, text: "Instant Matching", subtext: "AI-powered in minutes" }
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
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-6 bg-gradient-to-r from-primary/10 to-secondary/10 px-8 py-4 rounded-full border border-primary/20 mb-8 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary/60"></div>
              <span className="text-sm font-medium">Trusted by 500+ Web3 Projects</span>
            </div>
            <div className="w-px h-4 bg-border"></div>
            <div className="flex items-center gap-2 text-cyan-600">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">12,800+ Vulnerabilities Found</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
            <span className="block text-foreground">Secure Your Web3 Project</span>
            <span className="block bg-gradient-to-r from-primary via-purple-600 to-secondary bg-clip-text text-transparent">
              In Under 2 Hours
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Don't risk your users' funds. Get matched with expert auditors instantly, secure smart contract escrow, and protect your project before launch.
          </p>

          {/* Warning Message */}
          <div className="flex items-center justify-center gap-2 text-orange-600 mb-8">
            <Clock className="h-5 w-5" />
            <span className="font-medium">Every day unaudited = Higher risk of exploits</span>
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button asChild size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg hover:shadow-xl transition-all group">
              <Link to="/request-audit" className="flex items-center">
                <Shield className="mr-2 h-6 w-6 group-hover:rotate-12 transition-transform" />
                Get Security Audit Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 border-2 hover:bg-muted/50 transition-all group">
              <Link to="#demo" className="flex items-center">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                See How It Works (2 min)
              </Link>
            </Button>
          </div>

          {/* Features Grid */}
          <div className="bg-card/80 backdrop-blur-sm border-2 border-primary/10 rounded-xl p-8 mb-8 max-w-4xl mx-auto shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{feature.text}</h3>
                  <p className="text-xs text-muted-foreground">{feature.subtext}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg px-4 py-2 inline-block mb-2">
                <span className="text-lg font-bold text-primary">Starting from $2,500</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Transparent pricing • Instant matching • Secure payments • Expert auditors
              </p>
            </div>
            <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-lg border border-orange-200">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Limited time: Free security consultation included</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

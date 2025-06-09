
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Users, Zap, CheckCircle, Star, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

export function VibrantHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced gradient background */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-brand-secondary/15 to-brand-accent/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-brand-accent/10 to-brand-primary/10 rounded-full blur-2xl animate-pulse delay-500" />
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Cpath d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Enhanced announcement badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full brand-card border border-white/20 mb-8 animate-fade-in">
            <Star className="h-5 w-5 text-yellow-400 animate-pulse" />
            <span className="text-white font-medium">
              🚀 AI-Powered Security Matching • Trusted by 500+ Projects
            </span>
            <Star className="h-5 w-5 text-yellow-400 animate-pulse" />
          </div>
          
          {/* Enhanced headline with gradient text */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight text-white">
            <span className="block">Secure Your</span>
            <span className="block gradient-text text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary via-white to-brand-primary animate-pulse">
              Web3 Future
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl font-medium mt-4 text-gray-200">
              with Expert Guardians
            </span>
          </h1>
          
          {/* Enhanced subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            The <span className="text-brand-secondary font-semibold">intelligent marketplace</span> connecting 
            blockchain innovators with <span className="text-brand-primary font-semibold">verified security experts</span>. 
            Protect your digital assets with confidence.
          </p>

          {/* Enhanced CTAs with brand styling */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button asChild size="lg" className="h-16 px-10 text-lg brand-button-primary rounded-xl font-semibold group">
              <Link to="/marketplace" className="flex items-center gap-3">
                <Shield className="h-6 w-6" />
                Find Security Experts
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button asChild size="lg" className="h-16 px-10 text-lg bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 rounded-xl font-semibold transition-all duration-300">
              <Link to="/request-audit">
                Get Instant Quote
              </Link>
            </Button>
          </div>

          {/* Enhanced stats with colorful cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
            {[
              { 
                number: "500+", 
                label: "Security Experts", 
                icon: Users,
                gradient: "from-brand-primary to-brand-primary-light",
                glow: "shadow-[0_0_30px_rgba(138,115,226,0.3)]"
              },
              { 
                number: "$350M+", 
                label: "Assets Protected", 
                icon: Shield,
                gradient: "from-brand-secondary to-brand-secondary-light",
                glow: "shadow-[0_0_30px_rgba(51,195,240,0.3)]"
              },
              { 
                number: "2,500+", 
                label: "Audits Completed", 
                icon: CheckCircle,
                gradient: "from-green-500 to-green-400",
                glow: "shadow-[0_0_30px_rgba(34,197,94,0.3)]"
              },
              { 
                number: "24h", 
                label: "Response Time", 
                icon: Zap,
                gradient: "from-brand-accent to-brand-accent-light",
                glow: "shadow-[0_0_30px_rgba(255,87,34,0.3)]"
              }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={index} 
                  className={`relative p-6 rounded-2xl bg-gradient-to-br ${stat.gradient} backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-2 hover:scale-105 group ${stat.glow} hover:shadow-2xl`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl" />
                  <div className="relative z-10 text-center">
                    <IconComponent className="h-8 w-8 mx-auto mb-3 text-white group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <div className="text-sm text-white/90 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Enhanced trust badges */}
          <div className="flex flex-wrap justify-center items-center gap-4 opacity-80">
            {[
              { icon: Shield, text: "SOC 2 Certified" },
              { icon: Award, text: "ISO 27001 Verified" },
              { icon: CheckCircle, text: "24/7 Support" }
            ].map((badge, index) => {
              const IconComponent = badge.icon;
              return (
                <Badge 
                  key={index}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 transition-all duration-300"
                >
                  <IconComponent className="h-4 w-4 mr-2" />
                  {badge.text}
                </Badge>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

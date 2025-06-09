
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Shield, Users, Zap, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

export function EnhancedHero() {
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const features = [
    { icon: Shield, text: "500+ Verified Security Experts" },
    { icon: Zap, text: "24h Average Response Time" },
    { icon: Users, text: "$350M+ Assets Protected" },
    { icon: CheckCircle, text: "2,500+ Audits Completed" }
  ];

  // Rotate features every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  // Get the current icon component
  const CurrentIcon = features[currentFeature].icon;

  return (
    <section className="relative pt-20 pb-24 overflow-hidden">
      {/* Enhanced background with animated elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/5" />
      <div className="absolute inset-0 bg-grid-primary/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-pulse delay-1000" />
      
      <div className="container-modern relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Announcement badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              🎉 Now with AI-powered auditor matching
            </span>
          </div>
          
          {/* Main headline with enhanced typography */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-foreground">
              Next-Generation
            </span>
            <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
              Web3 Security
            </span>
            <span className="block text-foreground text-3xl md:text-4xl lg:text-5xl font-medium mt-2">
              Marketplace
            </span>
          </h1>
          
          {/* Enhanced subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
            The <span className="font-semibold text-foreground">intelligent marketplace</span> that matches blockchain projects with 
            <span className="font-semibold text-foreground"> verified security experts</span> using AI-powered algorithms.
          </p>

          {/* Interactive feature showcase */}
          <div className="mb-10">
            <div className="flex items-center justify-center gap-2 text-lg mb-4">
              <CurrentIcon className="h-6 w-6 text-primary" />
              <span className="font-medium text-foreground animate-fade-in">
                {features[currentFeature].text}
              </span>
            </div>
            
            {/* Feature indicators */}
            <div className="flex justify-center gap-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFeature(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentFeature ? 'bg-primary w-8' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Enhanced CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button asChild size="lg" className="h-14 px-8 text-lg bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:scale-105 transition-all duration-300 group">
              <Link to="/marketplace" className="flex items-center gap-2">
                Find Security Experts
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg border-2 border-primary/30 hover:bg-primary/5 hover:border-primary/50 transition-all duration-300">
              <Link to="/request-audit">
                Request Free Quote
              </Link>
            </Button>
          </div>

          {/* Social proof with enhanced visual design */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: "500+", label: "Verified Experts", color: "from-primary to-primary/70" },
              { number: "$350M+", label: "Assets Protected", color: "from-secondary to-secondary/70" },
              { number: "2,500+", label: "Audits Completed", color: "from-green-500 to-green-400" },
              { number: "24h", label: "Avg Response", color: "from-orange-500 to-orange-400" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group"
              >
                <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex justify-center items-center gap-6 opacity-60">
            <Badge variant="outline" className="px-4 py-2">
              SOC 2 Compliant
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              ISO 27001 Certified
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              24/7 Support
            </Badge>
          </div>
        </div>
      </div>

      {/* Add gradient animation */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

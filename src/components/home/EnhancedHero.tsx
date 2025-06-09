
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Shield, Users, Zap, CheckCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

export function EnhancedHero() {
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const features = [
    { icon: Shield, text: "500+ Verified Security Experts", color: "text-brand-blue" },
    { icon: Zap, text: "24h Average Response Time", color: "text-brand-orange" },
    { icon: Users, text: "$350M+ Assets Protected", color: "text-brand-cyan" },
    { icon: CheckCircle, text: "2,500+ Audits Completed", color: "text-brand-purple" }
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
      {/* Brand-enhanced background with Hawkly-inspired elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/5" />
      <div className="absolute inset-0 bg-grid-primary/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      
      {/* Floating elements inspired by the hawk logo */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-accent/10 rounded-full blur-lg animate-pulse delay-500" />
      
      <div className="container-modern relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Brand-enhanced announcement badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-8 animate-fade-in hawk-shadow">
            <Eye className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-brand-gradient">
              🦅 Sharp-eyed AI-powered auditor matching
            </span>
          </div>
          
          {/* Brand-aligned headline with hawk metaphors */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-foreground">
              Vigilant Web3
            </span>
            <span className="block text-brand-gradient bg-[length:200%_200%] animate-[gradient_3s_ease-in-out_infinite]">
              Security Guardians
            </span>
            <span className="block text-foreground text-3xl md:text-4xl lg:text-5xl font-medium mt-2">
              at Your Service
            </span>
          </h1>
          
          {/* Enhanced subtitle with hawk-inspired language */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
            Where <span className="font-semibold text-foreground">sharp-eyed security experts</span> meet 
            <span className="font-semibold text-foreground"> blockchain innovation</span>. 
            Our AI-powered platform connects your project with the perfect guardian for your digital assets.
          </p>

          {/* Interactive feature showcase with brand colors */}
          <div className="mb-10">
            <div className="flex items-center justify-center gap-3 text-lg mb-4">
              <CurrentIcon className={`h-6 w-6 ${features[currentFeature].color || 'text-primary'}`} />
              <span className="font-medium text-foreground animate-fade-in">
                {features[currentFeature].text}
              </span>
            </div>
            
            {/* Feature indicators with brand styling */}
            <div className="flex justify-center gap-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFeature(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentFeature 
                      ? 'bg-primary w-8 hawk-glow' 
                      : 'bg-muted-foreground/30 hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Brand-enhanced CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button asChild size="lg" className="h-14 px-8 text-lg gradient-primary hover:hawk-shadow-lg hover:-translate-y-0.5 transition-all duration-300 group">
              <Link to="/marketplace" className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Find Your Guardian
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg border-2 border-primary/30 hover:bg-primary/5 hover:border-primary/50 hover:hawk-shadow transition-all duration-300">
              <Link to="/request-audit">
                Request Protection Quote
              </Link>
            </Button>
          </div>

          {/* Brand-enhanced social proof */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: "500+", label: "Expert Guardians", gradient: "from-primary to-primary/70" },
              { number: "$350M+", label: "Assets Protected", gradient: "from-secondary to-secondary/70" },
              { number: "2,500+", label: "Audits Completed", gradient: "from-green-500 to-green-400" },
              { number: "24h", label: "Swift Response", gradient: "from-accent to-accent/70" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hawk-shadow hover:hawk-shadow-lg animate-hawk-hover group"
              >
                <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Brand-enhanced trust badges */}
          <div className="mt-12 flex justify-center items-center gap-6 opacity-60">
            <Badge variant="outline" className="px-4 py-2 border-primary/20">
              <Shield className="h-3 w-3 mr-1" />
              SOC 2 Guardian
            </Badge>
            <Badge variant="outline" className="px-4 py-2 border-primary/20">
              <CheckCircle className="h-3 w-3 mr-1" />
              ISO 27001 Certified
            </Badge>
            <Badge variant="outline" className="px-4 py-2 border-primary/20">
              <Eye className="h-3 w-3 mr-1" />
              24/7 Vigilance
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}


import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Users, Zap, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

export function EnhancedHero() {
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const features = [
    { icon: Shield, text: "500+ Verified Security Experts", color: "text-white" },
    { icon: Zap, text: "24h Average Response Time", color: "text-white" },
    { icon: Users, text: "$350M+ Assets Protected", color: "text-white" },
    { icon: CheckCircle, text: "2,500+ Audits Completed", color: "text-white" }
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
    <section className="hero-brand relative z-10">
      {/* Enhanced background with animated elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-brand-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-brand-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/8 rounded-full blur-2xl animate-brand-pulse" />
      </div>
      
      <div className="container-modern relative z-10">
        <div className="text-center max-w-5xl mx-auto stagger-animation">
          {/* Enhanced announcement badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 animate-brand-entrance">
            <Shield className="h-5 w-5 text-white animate-brand-pulse" />
            <span className="text-white font-medium">
              🦅 AI-Powered Security Guardian Network
            </span>
          </div>
          
          {/* Vibrant headline with animated gradient text */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
            <span className="block animate-fade-in-up">
              Vigilant Web3
            </span>
            <span className="block gradient-text text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-200 animate-gradient-text">
              Security Guardians
            </span>
            <span className="block text-3xl md:text-4xl lg:text-5xl font-medium mt-2 text-white/90 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              at Your Service
            </span>
          </h1>
          
          {/* Enhanced subtitle */}
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Where <span className="font-semibold text-white">sharp-eyed security experts</span> meet 
            <span className="font-semibold text-white"> blockchain innovation</span>. 
            Our AI-powered platform connects your project with the perfect guardian for your digital assets.
          </p>

          {/* Interactive feature showcase */}
          <div className="mb-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-center gap-3 text-lg mb-4">
              <CurrentIcon className="h-6 w-6 text-white animate-brand-pulse" />
              <span className="font-medium text-white animate-fade-in-scale">
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
                    index === currentFeature 
                      ? 'bg-white w-8 brand-glow' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Enhanced CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <Button asChild size="lg" className="btn-brand-primary h-14 px-8 text-lg font-semibold group button-brand-effect brand-hover-lift">
              <Link to="/marketplace" className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Find Your Guardian
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button asChild size="lg" className="h-14 px-8 text-lg bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 font-semibold brand-hover-lift">
              <Link to="/request-audit">
                Request Protection Quote
              </Link>
            </Button>
          </div>

          {/* Enhanced stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {[
              { number: "500+", label: "Expert Guardians", icon: Users },
              { number: "$350M+", label: "Assets Protected", icon: Shield },
              { number: "2,500+", label: "Audits Completed", icon: CheckCircle },
              { number: "24h", label: "Swift Response", icon: Zap }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={index} 
                  className="card-enhanced bg-white/10 backdrop-blur-sm border-white/20 hover:border-white/40 p-6 rounded-xl text-center group animate-hover-lift"
                  style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                >
                  <IconComponent className="h-8 w-8 mx-auto mb-3 text-white group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-sm text-white/80 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Enhanced trust badges */}
          <div className="flex justify-center items-center gap-6 opacity-80 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <Badge className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 transition-all duration-300">
              <Shield className="h-3 w-3 mr-1" />
              SOC 2 Guardian
            </Badge>
            <Badge className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 transition-all duration-300">
              <CheckCircle className="h-3 w-3 mr-1" />
              ISO 27001 Certified
            </Badge>
            <Badge className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 transition-all duration-300">
              <Zap className="h-3 w-3 mr-1" />
              24/7 Vigilance
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}

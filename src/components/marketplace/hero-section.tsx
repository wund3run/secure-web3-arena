
import React from "react";
import { Button } from "@/components/ui/button";
import { Shield, Award, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MarketplaceHeroProps {
  onShowOnboarding: () => void;
}

export function MarketplaceHero({ onShowOnboarding }: MarketplaceHeroProps) {
  const stats = [
    { icon: <Shield className="h-5 w-5" />, label: "Audits Completed", value: "1,250+" },
    { icon: <Award className="h-5 w-5" />, label: "Verified Experts", value: "300+" },
    { icon: <Star className="h-5 w-5" />, label: "Client Satisfaction", value: "4.9/5" }
  ];

  return (
    <div className="w-full rounded-xl overflow-hidden relative mb-8 shadow-lg" role="banner">
      <div className="bg-gradient-to-r from-primary/90 to-secondary/90 h-auto py-16 w-full relative">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"
          aria-hidden="true"
          role="presentation"
        ></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
            <Shield className="h-4 w-4 mr-2" />
            Web3 Security
          </Badge>
          
          {/* Bold, prominent headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">
            Find Your Perfect Security Expert
          </h1>
          
          {/* Concise value proposition */}
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-8">
            Browse profiles of verified auditors specialized in your blockchain ecosystem
          </p>
          
          {/* Social proof - Key stats */}
          <div className="flex flex-wrap md:flex-row items-center gap-8 mb-10">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/10 px-5 py-3 rounded-lg backdrop-blur-sm">
                <div className="p-2 bg-white/20 rounded-full">
                  {React.cloneElement(stat.icon, { className: "h-5 w-5 text-white" })}
                </div>
                <div>
                  <div className="text-white text-xl font-bold">{stat.value}</div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Single, focused CTA button */}
          <Button 
            size="lg"
            variant="default" 
            className="bg-white text-primary hover:bg-white/90 focus:ring-2 focus:ring-white focus:outline-none text-lg py-6 px-8 shadow-lg"
            onClick={onShowOnboarding}
            aria-label="Find matching security experts for your project"
          >
            <Shield className="mr-2 h-5 w-5" aria-hidden="true" />
            Find Your Security Match
          </Button>
        </div>
      </div>
    </div>
  );
}

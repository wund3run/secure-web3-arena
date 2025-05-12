
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
    <div className="w-full rounded-xl overflow-hidden relative mb-6" role="banner">
      <div className="bg-gradient-to-r from-primary/80 to-secondary/80 h-auto py-12 md:h-64 w-full relative">
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"
          aria-hidden="true"
          role="presentation"
        ></div>
        
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
          <Badge className="mb-3 w-fit bg-white/20 text-white border-white/30 backdrop-blur-sm">
            <Shield className="h-3.5 w-3.5 mr-1" />
            Web3 Security
          </Badge>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3">Web3 Security Marketplace</h1>
          
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-6">
            Connect with expert security providers to protect your blockchain projects from vulnerabilities and attacks
          </p>
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-6">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="p-1.5 bg-white/20 rounded-full backdrop-blur-sm">
                  {React.cloneElement(stat.icon, { className: "h-4 w-4 text-white" })}
                </div>
                <div>
                  <div className="text-white text-lg font-bold">{stat.value}</div>
                  <div className="text-white/70 text-xs">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            variant="default" 
            className="bg-white text-primary hover:bg-white/90 w-fit focus:ring-2 focus:ring-white focus:outline-none"
            onClick={onShowOnboarding}
            aria-label="Start guided marketplace onboarding"
          >
            <Shield className="mr-2 h-4 w-4" aria-hidden="true" />
            Start Guided Onboarding
          </Button>
        </div>
      </div>
    </div>
  );
}

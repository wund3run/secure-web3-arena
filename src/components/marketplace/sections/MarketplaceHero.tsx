
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

interface MarketplaceHeroProps {
  onShowOnboarding: () => void;
}

export function MarketplaceHero({ onShowOnboarding }: MarketplaceHeroProps) {
  return (
    <div className="w-full rounded-xl overflow-hidden relative mb-6">
      <div className="bg-gradient-to-r from-primary/80 to-secondary/80 h-64 w-full relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Web3 Security Marketplace</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-6">
            Connect with expert security providers to protect your blockchain projects from vulnerabilities and attacks
          </p>
          <Button 
            variant="default" 
            className="bg-white text-primary hover:bg-white/90 w-fit"
            onClick={onShowOnboarding}
          >
            <Shield className="mr-2 h-4 w-4" />
            Start Guided Onboarding
          </Button>
        </div>
      </div>
    </div>
  );
}


import { Trophy, Shield, Award, ArrowRight, Check, User, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BadgeAward } from "@/components/ui/badge-award";

export function EnhancedHeroHeader() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-primary/5 to-secondary/5 pt-16 pb-20">
      {/* Decorative elements with reduced opacity */}
      <div className="absolute top-20 right-10 opacity-10">
        <Shield className="w-40 h-40 text-primary animate-float" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Platform headline - Large, bold headline that clearly communicates value */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-center mb-6">
          <span className="block text-foreground">Secure Your</span>
          <span className="block text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Web3 Projects</span>
        </h1>
        
        <p className="mt-6 text-xl md:text-2xl text-center text-muted-foreground max-w-3xl mx-auto">
          Connect with expert auditors to protect your blockchain applications from critical vulnerabilities
        </p>
        
        {/* Primary CTA - Clear, high-contrast call to action */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/request-audit">
            <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8 py-6 shadow-lg">
              <Shield className="mr-2 h-6 w-6" />
              Request Security Audit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/marketplace">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6">
              Explore Security Services
            </Button>
          </Link>
        </div>

        {/* Social proof - Compelling stats to build trust */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-card/80 backdrop-blur-sm p-6 rounded-xl border border-border/30 shadow-sm text-center">
            <div className="flex justify-center mb-3">
              <Trophy className="h-10 w-10 text-web3-orange" />
            </div>
            <h3 className="text-3xl font-bold">500+</h3>
            <p className="text-muted-foreground">Security Experts</p>
          </div>
          
          <div className="bg-card/80 backdrop-blur-sm p-6 rounded-xl border border-border/30 shadow-sm text-center">
            <div className="flex justify-center mb-3">
              <Shield className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-3xl font-bold">$350M+</h3>
            <p className="text-muted-foreground">Assets Protected</p>
          </div>
          
          <div className="bg-card/80 backdrop-blur-sm p-6 rounded-xl border border-border/30 shadow-sm text-center">
            <div className="flex justify-center mb-3">
              <Award className="h-10 w-10 text-web3-purple" />
            </div>
            <h3 className="text-3xl font-bold">12,800+</h3>
            <p className="text-muted-foreground">Vulnerabilities Found</p>
          </div>
        </div>
      </div>
    </div>
  );
}

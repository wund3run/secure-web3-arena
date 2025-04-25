import { Trophy, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BadgeAward } from "@/components/ui/badge-award";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-primary/5 to-secondary/5">
      {/* Decorative elements with reduced opacity */}
      <div className="absolute top-20 right-10 opacity-10">
        <Shield className="w-40 h-40 text-web3-purple animate-float" />
      </div>
      <div className="absolute bottom-10 left-10 opacity-5">
        <Trophy className="w-32 h-32 text-web3-teal animate-float" style={{ animationDelay: "2s" }} />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block text-foreground">Secure Your</span>
              <span className="block text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Web3 Assets</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-3xl">
              Connect with top security experts in the decentralized marketplace. 
              Protect your smart contracts, DApps, and blockchain assets with 
              verified auditors and earn rewards in our gamified ecosystem.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <Button size="lg" className="text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Find Security Experts
              </Button>
              <Button size="lg" variant="outline" className="text-lg border-primary text-primary hover:bg-primary/10">
                Become an Auditor
              </Button>
            </div>
            
            <div className="mt-12 flex items-center gap-x-6">
              <div className="flex items-center gap-x-2">
                <Shield className="h-6 w-6 text-web3-teal" />
                <BadgeAward variant="verified">Verified Auditors</BadgeAward>
              </div>
              <div className="flex items-center gap-x-2">
                <Trophy className="h-6 w-6 text-web3-orange" />
                <BadgeAward variant="expert">Reward System</BadgeAward>
              </div>
              <div className="flex items-center gap-x-2">
                <Award className="h-6 w-6 text-web3-purple" />
                <BadgeAward variant="elite">Reputation Badges</BadgeAward>
              </div>
            </div>
          </div>
          
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-5 flex justify-center items-center">
            <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-primary/10 shadow-xl animate-float">
              <div className="flex justify-center mb-4">
                <Shield className="h-16 w-16 text-primary animate-pulse-glow" />
              </div>
              <h3 className="text-2xl font-bold text-center text-foreground mb-6">Security Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Active Auditors</span>
                  <span className="font-semibold text-white">500+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Secured Projects</span>
                  <span className="font-semibold text-white">2,500+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Vulnerabilities Found</span>
                  <span className="font-semibold text-white">12,800+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Saved Assets Value</span>
                  <span className="font-semibold text-white">$350M+</span>
                </div>
              </div>
              <div className="mt-6">
                <Link to="/stats">
                  <Button variant="link" className="text-secondary w-full hover:underline">
                    View detailed statistics →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white pointer-events-none" />
    </div>
  );
}

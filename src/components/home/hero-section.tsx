
import { Trophy, Shield, Award, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BadgeAward } from "@/components/ui/badge-award";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-primary/5 to-secondary/5 pt-8 pb-16">
      {/* Decorative elements with reduced opacity */}
      <div className="absolute top-20 right-10 opacity-10">
        <Shield className="w-40 h-40 text-web3-purple animate-float" />
      </div>
      <div className="absolute bottom-10 left-10 opacity-5">
        <Trophy className="w-32 h-32 text-web3-teal animate-float" style={{ animationDelay: "2s" }} />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="flex items-center mb-6">
              <div className="relative flex items-center justify-center mr-3">
                <Shield className="h-14 w-14 text-primary" />
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rotate-45 rounded-sm opacity-70"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 bg-secondary rounded-full animate-pulse-glow"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-4xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Hawkly</span>
                <span className="text-lg text-muted-foreground leading-tight">Web3 Security Marketplace</span>
              </div>
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              <span className="block text-foreground mb-2">Security First for</span>
              <span className="block text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Web3 Projects</span>
            </h1>
            
            <div className="mt-6 space-y-6">
              <div className="bg-card/80 backdrop-blur-sm p-4 rounded-lg border border-border/30">
                <h2 className="text-xl font-semibold mb-3 flex items-center">
                  <Shield className="h-5 w-5 text-primary mr-2" />
                  For Project Owners
                </h2>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 mr-2">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground">Connect with verified security experts</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 mr-2">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground">Get comprehensive smart contract audits</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 mr-2">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground">Protect your DApps and blockchain assets</span>
                  </li>
                </ul>
              </div>

              <div className="bg-card/80 backdrop-blur-sm p-4 rounded-lg border border-border/30">
                <h2 className="text-xl font-semibold mb-3 flex items-center">
                  <Trophy className="h-5 w-5 text-web3-orange mr-2" />
                  For Security Experts
                </h2>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-web3-orange/10 flex items-center justify-center mt-0.5 mr-2">
                      <Check className="h-3 w-3 text-web3-orange" />
                    </div>
                    <span className="text-muted-foreground">Monetize your security expertise</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-web3-orange/10 flex items-center justify-center mt-0.5 mr-2">
                      <Check className="h-3 w-3 text-web3-orange" />
                    </div>
                    <span className="text-muted-foreground">Build reputation with our badge system</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-web3-orange/10 flex items-center justify-center mt-0.5 mr-2">
                      <Check className="h-3 w-3 text-web3-orange" />
                    </div>
                    <span className="text-muted-foreground">Earn rewards in our gamified ecosystem</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <Link to="/marketplace">
                <Button size="lg" className="text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90 w-full sm:w-auto">
                  Find Security Experts
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/audits">
                <Button size="lg" variant="outline" className="text-lg border-primary text-primary hover:bg-primary/10 w-full sm:w-auto">
                  Become an Auditor
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
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
            <div className="glass-card rounded-2xl p-6 shadow-xl animate-float">
              <div className="flex justify-center mb-4">
                <div className="relative flex items-center justify-center">
                  <Shield className="h-16 w-16 text-primary" />
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary rotate-45 rounded-sm opacity-70"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 bg-secondary rounded-full animate-pulse-glow"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center text-foreground mb-6">Security Dashboard</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-2 bg-background/60 rounded-lg hover-lift">
                  <span className="text-muted-foreground">Active Auditors</span>
                  <span className="font-semibold text-foreground">500+</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-background/60 rounded-lg hover-lift">
                  <span className="text-muted-foreground">Secured Projects</span>
                  <span className="font-semibold text-foreground">2,500+</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-background/60 rounded-lg hover-lift">
                  <span className="text-muted-foreground">Vulnerabilities Found</span>
                  <span className="font-semibold text-foreground">12,800+</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-background/60 rounded-lg hover-lift">
                  <span className="text-muted-foreground">Saved Assets Value</span>
                  <span className="font-semibold text-foreground">$350M+</span>
                </div>
              </div>
              <div className="mt-6">
                <Link to="/stats">
                  <Button variant="link" className="text-secondary w-full hover:underline">
                    View detailed statistics <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

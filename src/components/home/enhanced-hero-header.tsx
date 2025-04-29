
import { Trophy, Shield, Award, ArrowRight, Check, User, FileCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BadgeAward } from "@/components/ui/badge-award";

export function EnhancedHeroHeader() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-primary/5 to-secondary/5 pt-10 pb-20">
      {/* Decorative elements with reduced opacity */}
      <div className="absolute top-20 right-10 opacity-10">
        <Shield className="w-40 h-40 text-primary animate-float" />
      </div>
      <div className="absolute bottom-10 left-10 opacity-5">
        <Trophy className="w-32 h-32 text-web3-teal animate-float" style={{ animationDelay: "2s" }} />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Announcement banner */}
        <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-lg p-3 mb-8 shadow-sm">
          <div className="flex items-center justify-center text-sm">
            <Zap className="h-4 w-4 text-secondary mr-2" />
            <span className="font-medium">New: Automated vulnerability detection now available</span>
            <Link to="/marketplace" className="ml-3 text-primary hover:text-primary/80 font-semibold flex items-center">
              Learn more <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </div>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="flex items-center mb-6">
              <div className="relative flex items-center justify-center mr-3">
                <Shield className="h-16 w-16 text-primary" />
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rotate-45 rounded-sm opacity-70"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-5 h-5 bg-secondary rounded-full animate-pulse-glow"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-5xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Hawkly</span>
                <span className="text-lg text-muted-foreground leading-tight">Securing the Future of Web3</span>
              </div>
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              <span className="block text-foreground mb-2">The Premier Platform for</span>
              <span className="block text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Web3 Security Solutions</span>
            </h1>
            
            <p className="mt-3 text-xl text-muted-foreground max-w-3xl">
              Connect with top security experts to protect your blockchain assets and build a safer Web3 ecosystem together.
            </p>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card/80 backdrop-blur-sm p-5 rounded-lg border border-border/30 shadow-sm hover-lift transition-all duration-300">
                <h2 className="text-xl font-semibold mb-3 flex items-center">
                  <FileCheck className="h-6 w-6 text-primary mr-2" />
                  For Project Owners
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 mr-2">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground">Connect with 500+ verified security experts</span>
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
                    <span className="text-muted-foreground">Protect your DApps worth millions</span>
                  </li>
                </ul>
                <div className="mt-4">
                  <Link to="/marketplace">
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                      Find Security Experts
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="bg-card/80 backdrop-blur-sm p-5 rounded-lg border border-border/30 shadow-sm hover-lift transition-all duration-300">
                <h2 className="text-xl font-semibold mb-3 flex items-center">
                  <User className="h-6 w-6 text-web3-orange mr-2" />
                  For Security Experts
                </h2>
                <ul className="space-y-3">
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
                    <span className="text-muted-foreground">Join elite Web3 security community</span>
                  </li>
                </ul>
                <div className="mt-4">
                  <Link to="/audits">
                    <Button variant="outline" className="w-full border-web3-orange text-web3-orange hover:bg-web3-orange/10">
                      Become an Auditor
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <div className="flex items-center gap-x-2">
                <Shield className="h-6 w-6 text-web3-teal" />
                <BadgeAward variant="verified">500+ Verified Auditors</BadgeAward>
              </div>
              <div className="flex items-center gap-x-2">
                <Trophy className="h-6 w-6 text-web3-orange" />
                <BadgeAward variant="expert">$350M+ Protected</BadgeAward>
              </div>
              <div className="flex items-center gap-x-2">
                <Award className="h-6 w-6 text-web3-purple" />
                <BadgeAward variant="elite">12,800+ Vulnerabilities Found</BadgeAward>
              </div>
            </div>
          </div>
          
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-5 flex justify-center items-center">
            <div className="glass-card rounded-2xl p-8 shadow-xl animate-float w-full max-w-md">
              <div className="flex justify-center mb-6">
                <div className="relative flex items-center justify-center">
                  <Shield className="h-16 w-16 text-primary" />
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary rotate-45 rounded-sm opacity-70"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 bg-secondary rounded-full animate-pulse-glow"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center text-foreground mb-6">Security Dashboard</h3>
              <div className="space-y-5">
                <div className="flex justify-between items-center p-4 bg-background/60 rounded-lg hover-lift">
                  <span className="text-muted-foreground font-medium">Active Auditors</span>
                  <span className="font-semibold text-foreground text-lg">500+</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-background/60 rounded-lg hover-lift">
                  <span className="text-muted-foreground font-medium">Secured Projects</span>
                  <span className="font-semibold text-foreground text-lg">2,500+</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-background/60 rounded-lg hover-lift">
                  <span className="text-muted-foreground font-medium">Vulnerabilities Found</span>
                  <span className="font-semibold text-foreground text-lg">12,800+</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-background/60 rounded-lg hover-lift">
                  <span className="text-muted-foreground font-medium">Saved Assets Value</span>
                  <span className="font-semibold text-foreground text-lg">$350M+</span>
                </div>
              </div>
              <div className="mt-8">
                <Link to="/stats">
                  <Button variant="default" className="text-secondary w-full bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30">
                    View detailed statistics <ArrowRight className="ml-2 h-4 w-4" />
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

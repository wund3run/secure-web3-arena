
import { Shield, Star, Users, BadgeCheck, ArrowRight, FileCode, LockKeyhole, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function MarketplaceHeader() {
  return (
    <div className="mb-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center bg-primary/10 px-4 py-2 rounded-full text-primary mb-4">
          <Shield className="h-5 w-5 mr-2" />
          <span className="font-medium">Top-rated Web3 Security Services</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4 flex items-center justify-center gap-2">
          Web3 Security Marketplace
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="outline" className="text-xs border-amber-300 text-amber-700 bg-amber-50">
                  BETA
                </Badge>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-xs max-w-[250px]">
                  Our platform is in beta. We're continuously improving, but some features may not work as expected.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </h2>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          Connect with verified security experts to protect your blockchain projects from vulnerabilities like reentrancy attacks, oracle manipulation, and access control exploits
        </p>
      </div>
      
      <div className="text-sm bg-amber-50 border border-amber-100 rounded-lg p-3 mb-8 flex items-start">
        <AlertCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
        <p className="text-amber-800">
          <span className="font-medium">Beta Platform Notice:</span> Hawkly is currently in beta testing. While we work to improve our platform, some features may be limited or contain bugs. We appreciate your feedback and patience.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* For Project Owners */}
        <div className="glass-card p-6 rounded-lg hover-lift border border-border/40 bg-gradient-to-br from-card to-card/80">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full mr-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">For Project Owners</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <BadgeCheck className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
              <span>Get comprehensive smart contract audits with in-depth security analysis</span>
            </li>
            <li className="flex items-start">
              <BadgeCheck className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
              <span>Identify critical vulnerabilities before deployment to production</span>
            </li>
            <li className="flex items-start">
              <BadgeCheck className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
              <span>Access top security talent with proven expertise in Solidity, Rust and Move</span>
            </li>
          </ul>
          <div className="mt-6">
            <Link to="/marketplace">
              <Button className="w-full group bg-primary hover:bg-primary/90">
                Find Web3 Security Services
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* For Security Experts */}
        <div className="glass-card p-6 rounded-lg hover-lift border border-border/40 bg-gradient-to-br from-card to-card/80">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-secondary/10 rounded-full mr-4">
              <Users className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-xl font-bold">For Security Experts</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <BadgeCheck className="h-5 w-5 text-secondary mr-2 flex-shrink-0 mt-0.5" />
              <span>Monetize your blockchain security expertise and technical skills</span>
            </li>
            <li className="flex items-start">
              <BadgeCheck className="h-5 w-5 text-secondary mr-2 flex-shrink-0 mt-0.5" />
              <span>Build your reputation with transparent auditor reviews and verifications</span>
            </li>
            <li className="flex items-start">
              <BadgeCheck className="h-5 w-5 text-secondary mr-2 flex-shrink-0 mt-0.5" />
              <span>Earn rewards through our gamified ecosystem and security challenges</span>
            </li>
          </ul>
          <div className="mt-6">
            <Link to="/audits">
              <Button variant="outline" className="w-full group border-secondary text-secondary hover:bg-secondary/10">
                Become a Web3 Auditor
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Key Benefits Section with improved descriptions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center p-3 bg-muted/60 rounded-lg">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <FileCode className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-sm">Smart Contract Audits</h4>
            <p className="text-xs text-muted-foreground">Find vulnerabilities in Solidity, Rust & Move</p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-muted/60 rounded-lg">
          <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center mr-3">
            <LockKeyhole className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <h4 className="font-medium text-sm">Security Assessments</h4>
            <p className="text-xs text-muted-foreground">Protect against reentrancy & flash loan attacks</p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-muted/60 rounded-lg">
          <div className="h-10 w-10 rounded-full bg-web3-orange/10 flex items-center justify-center mr-3">
            <Shield className="h-5 w-5 text-web3-orange" />
          </div>
          <div>
            <h4 className="font-medium text-sm">DApp Security</h4>
            <p className="text-xs text-muted-foreground">Front-end to smart contract protection</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center mt-6 text-sm text-muted-foreground bg-muted/40 rounded-lg p-3">
        <Star className="h-4 w-4 fill-web3-orange text-web3-orange mr-2" />
        <span><span className="font-medium">500+ verified blockchain auditors</span> and <span className="font-medium">2,500+ secured Web3 projects</span> in our marketplace</span>
      </div>
    </div>
  );
}

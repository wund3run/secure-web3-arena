import { Shield, Star, Users, BadgeCheck, ArrowRight, FileCode, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BetaWarning } from "@/components/ui/beta-warning";
import { HawklyLogo } from "@/components/layout/hawkly-logo";

export function MarketplaceHeader() {
  return (
    <div className="mb-10">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <HawklyLogo variant="full" />
        </div>
        <div className="inline-flex items-center justify-center bg-[#8A73E2]/10 px-4 py-2 rounded-full text-[#8A73E2] mb-4">
          <Shield className="h-5 w-5 mr-2" />
          <span className="font-medium">Web3 Security Services</span>
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
              <TooltipContent side="top" className="max-w-[250px]">
                <p className="text-xs">
                  Our platform is in beta. We're continuously improving and welcome your feedback.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </h2>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          Connect with security experts to protect your blockchain projects from vulnerabilities and exploits
        </p>
      </div>
      
      <BetaWarning 
        variant="subtle" 
        showIcon={true} 
        title="Beta Platform Notice" 
        size="sm"
        className="mb-8"
      >
        <p className="text-sm">
          Hawkly is currently in beta testing. Your feedback helps us improve our platform.
        </p>
      </BetaWarning>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* For Project Owners */}
        <div className="glass-card p-6 rounded-lg hover-lift border border-border/40 bg-gradient-to-br from-card to-card/80 transition-all duration-300">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full mr-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">For Project Owners</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <BadgeCheck className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
              <span>Get comprehensive smart contract audits with in-depth analysis</span>
            </li>
            <li className="flex items-start">
              <BadgeCheck className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
              <span>Identify critical vulnerabilities before deployment</span>
            </li>
            <li className="flex items-start">
              <BadgeCheck className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
              <span>Access top security talent with proven expertise</span>
            </li>
          </ul>
          <div className="mt-6">
            <Link to="/marketplace">
              <Button className="w-full group bg-primary hover:bg-primary/90 transition-all">
                Find Web3 Security Services
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* For Security Experts */}
        <div className="glass-card p-6 rounded-lg hover-lift border border-border/40 bg-gradient-to-br from-card to-card/80 transition-all duration-300">
          <div className="flex items-center mb-4">
            <div className="p-3 bg-secondary/10 rounded-full mr-4">
              <Users className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-xl font-bold">For Security Experts</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <BadgeCheck className="h-5 w-5 text-secondary mr-2 flex-shrink-0 mt-0.5" />
              <span>Monetize your blockchain security expertise</span>
            </li>
            <li className="flex items-start">
              <BadgeCheck className="h-5 w-5 text-secondary mr-2 flex-shrink-0 mt-0.5" />
              <span>Build your reputation with transparent reviews</span>
            </li>
            <li className="flex items-start">
              <BadgeCheck className="h-5 w-5 text-secondary mr-2 flex-shrink-0 mt-0.5" />
              <span>Earn rewards through our security ecosystem</span>
            </li>
          </ul>
          <div className="mt-6">
            <Link to="/audits">
              <Button variant="outline" className="w-full group border-secondary text-secondary hover:bg-secondary/10 transition-all">
                Become a Web3 Auditor
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Key Benefits Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center p-3 bg-muted/60 rounded-lg hover:bg-muted/80 transition-all">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <FileCode className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-sm">Smart Contract Audits</h4>
            <p className="text-xs text-muted-foreground">Find vulnerabilities in blockchain code</p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-muted/60 rounded-lg hover:bg-muted/80 transition-all">
          <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center mr-3">
            <LockKeyhole className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <h4 className="font-medium text-sm">Security Assessments</h4>
            <p className="text-xs text-muted-foreground">Protect against common attack vectors</p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-muted/60 rounded-lg hover:bg-muted/80 transition-all">
          <div className="h-10 w-10 rounded-full bg-web3-orange/10 flex items-center justify-center mr-3">
            <Shield className="h-5 w-5 text-web3-orange" />
          </div>
          <div>
            <h4 className="font-medium text-sm">DApp Security</h4>
            <p className="text-xs text-muted-foreground">Complete application protection</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center mt-6 text-sm text-muted-foreground bg-muted/40 rounded-lg p-3 hover:bg-muted/60 transition-all">
        <Star className="h-4 w-4 fill-web3-orange text-web3-orange mr-2" />
        <span><span className="font-medium">Join</span> our growing community of security experts and projects</span>
      </div>
    </div>
  );
}

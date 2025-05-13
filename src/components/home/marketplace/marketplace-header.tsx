
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
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <HawklyLogo variant="full" />
        </div>
        
        {/* Clear section headline */}
        <h2 className="text-4xl font-extrabold text-foreground mb-4 flex items-center justify-center gap-2">
          Security Expert Marketplace
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
        
        {/* Concise value proposition - One clear message */}
        <p className="mt-2 text-xl text-muted-foreground max-w-2xl mx-auto">
          Find expert security auditors to protect your blockchain projects
        </p>
      </div>
      
      {/* Key user paths - Clear visual distinction between paths */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        {/* For Project Owners - Primary user path */}
        <div className="glass-card p-8 rounded-lg hover-lift border border-primary/20 bg-gradient-to-br from-card to-primary/5 transition-all duration-300 shadow-md">
          <div className="flex items-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full mr-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">For Project Owners</h3>
          </div>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <BadgeCheck className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-lg">Get comprehensive smart contract audits</span>
            </li>
            <li className="flex items-start">
              <BadgeCheck className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-lg">Identify critical vulnerabilities before deployment</span>
            </li>
            <li className="flex items-start">
              <BadgeCheck className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-lg">Access top security talent with proven expertise</span>
            </li>
          </ul>
          
          {/* Primary CTA for this user path */}
          <Link to="/marketplace">
            <Button className="w-full text-lg py-6 group bg-primary hover:bg-primary/90 transition-all">
              View Security Services
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        
        {/* For Security Experts - Secondary user path */}
        <div className="glass-card p-8 rounded-lg hover-lift border border-secondary/20 bg-gradient-to-br from-card to-secondary/5 transition-all duration-300 shadow-md">
          <div className="flex items-center mb-6">
            <div className="p-4 bg-secondary/10 rounded-full mr-4">
              <Users className="h-8 w-8 text-secondary" />
            </div>
            <h3 className="text-2xl font-bold">For Security Experts</h3>
          </div>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <BadgeCheck className="h-5 w-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-lg">Monetize your blockchain security expertise</span>
            </li>
            <li className="flex items-start">
              <BadgeCheck className="h-5 w-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-lg">Build your reputation with transparent reviews</span>
            </li>
            <li className="flex items-start">
              <BadgeCheck className="h-5 w-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-lg">Earn rewards through our security ecosystem</span>
            </li>
          </ul>
          
          {/* Secondary CTA */}
          <Link to="/audits">
            <Button variant="outline" className="w-full text-lg py-6 group border-secondary text-secondary hover:bg-secondary/10 transition-all">
              Become a Certified Auditor
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Key features highlight - Visual distinction with icons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="flex items-center p-5 bg-muted/60 rounded-lg hover:bg-muted/80 transition-all">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
            <FileCode className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-base">Code Audit Services</h4>
            <p className="text-sm text-muted-foreground">Find vulnerabilities in blockchain code</p>
          </div>
        </div>
        
        <div className="flex items-center p-5 bg-muted/60 rounded-lg hover:bg-muted/80 transition-all">
          <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mr-4">
            <LockKeyhole className="h-6 w-6 text-secondary" />
          </div>
          <div>
            <h4 className="font-semibold text-base">Security Assessments</h4>
            <p className="text-sm text-muted-foreground">Protect against common attack vectors</p>
          </div>
        </div>
        
        <div className="flex items-center p-5 bg-muted/60 rounded-lg hover:bg-muted/80 transition-all">
          <div className="h-12 w-12 rounded-full bg-web3-orange/10 flex items-center justify-center mr-4">
            <Shield className="h-6 w-6 text-web3-orange" />
          </div>
          <div>
            <h4 className="font-semibold text-base">DApp Protection</h4>
            <p className="text-sm text-muted-foreground">Complete application security</p>
          </div>
        </div>
      </div>
    </div>
  );
}

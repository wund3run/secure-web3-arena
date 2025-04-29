
import { Shield, Star, Users, BadgeCheck, ArrowRight, FileCode, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function MarketplaceHeader() {
  return (
    <div className="mb-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center bg-primary/10 px-4 py-2 rounded-full text-primary mb-4">
          <Shield className="h-5 w-5 mr-2" />
          <span className="font-medium">Top-rated Security Services</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
          Web3 Security Marketplace
        </h2>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          Connect with verified security experts to protect your blockchain projects from vulnerabilities
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
              <span>Get comprehensive smart contract audits</span>
            </li>
            <li className="flex items-start">
              <BadgeCheck className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
              <span>Find vulnerabilities before they're exploited</span>
            </li>
            <li className="flex items-start">
              <BadgeCheck className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
              <span>Access top security talent with proven expertise</span>
            </li>
          </ul>
          <div className="mt-6">
            <Link to="/marketplace">
              <Button className="w-full group bg-primary hover:bg-primary/90">
                Find Security Services
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
              <span>Monetize your security expertise</span>
            </li>
            <li className="flex items-start">
              <BadgeCheck className="h-5 w-5 text-secondary mr-2 flex-shrink-0 mt-0.5" />
              <span>Build your reputation with transparent reviews</span>
            </li>
            <li className="flex items-start">
              <BadgeCheck className="h-5 w-5 text-secondary mr-2 flex-shrink-0 mt-0.5" />
              <span>Earn rewards through our gamified ecosystem</span>
            </li>
          </ul>
          <div className="mt-6">
            <Link to="/audits">
              <Button variant="outline" className="w-full group border-secondary text-secondary hover:bg-secondary/10">
                Become an Auditor
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Key Benefits Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center p-3 bg-muted/60 rounded-lg">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <FileCode className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-sm">Smart Contract Audits</h4>
            <p className="text-xs text-muted-foreground">In-depth code analysis</p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-muted/60 rounded-lg">
          <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center mr-3">
            <LockKeyhole className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <h4 className="font-medium text-sm">Security Assessments</h4>
            <p className="text-xs text-muted-foreground">Comprehensive protection</p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-muted/60 rounded-lg">
          <div className="h-10 w-10 rounded-full bg-web3-orange/10 flex items-center justify-center mr-3">
            <Shield className="h-5 w-5 text-web3-orange" />
          </div>
          <div>
            <h4 className="font-medium text-sm">DApp Security</h4>
            <p className="text-xs text-muted-foreground">End-to-end protection</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center mt-6 text-sm text-muted-foreground bg-muted/40 rounded-lg p-3">
        <Star className="h-4 w-4 fill-web3-orange text-web3-orange mr-2" />
        <span><span className="font-medium">500+ verified auditors</span> and <span className="font-medium">2,500+ secured projects</span> in our marketplace</span>
      </div>
    </div>
  );
}

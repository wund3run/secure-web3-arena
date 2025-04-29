
import { Shield, Check, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function MarketplaceEnhancedHeader() {
  return (
    <div className="bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center py-1 px-3 rounded-full bg-primary/10 text-primary mb-4">
              <Shield className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Web3 Security Marketplace</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-6">
              Find Expert Security <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Auditors</span> for Your Web3 Project
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Connect with skilled security professionals for comprehensive audits, vulnerability assessments, and ongoing protection for your blockchain applications.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 rounded-full bg-primary/10 mr-3">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm">Verified auditors with proven expertise in Web3 security</span>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 rounded-full bg-primary/10 mr-3">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm">Transparent pricing and comprehensive security reports</span>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 rounded-full bg-primary/10 mr-3">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm">Specialized services for different blockchain ecosystems</span>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 group">
                Post Security Request
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Link to="/auditors">
                <Button variant="outline" size="lg" className="group">
                  Explore Auditors
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-3xl opacity-20"></div>
            <div className="relative bg-gradient-to-r from-card to-card/80 border border-border/50 rounded-xl p-8 shadow-xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-background/60 backdrop-blur-sm rounded-lg p-6 border border-border/50">
                  <div className="flex items-start mb-4">
                    <div className="p-2 bg-primary/10 rounded-lg mr-4">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Project Owners</h3>
                      <p className="text-xs text-muted-foreground">Secure your blockchain projects</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Check className="h-3 w-3 text-primary mr-2 flex-shrink-0" />
                      <span className="text-xs">Get comprehensive audits</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-3 w-3 text-primary mr-2 flex-shrink-0" />
                      <span className="text-xs">Find vulnerabilities early</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-3 w-3 text-primary mr-2 flex-shrink-0" />
                      <span className="text-xs">Enhance user trust</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-background/60 backdrop-blur-sm rounded-lg p-6 border border-border/50">
                  <div className="flex items-start mb-4">
                    <div className="p-2 bg-secondary/10 rounded-lg mr-4">
                      <Star className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Security Experts</h3>
                      <p className="text-xs text-muted-foreground">Monetize your expertise</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Check className="h-3 w-3 text-secondary mr-2 flex-shrink-0" />
                      <span className="text-xs">Find new clients</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-3 w-3 text-secondary mr-2 flex-shrink-0" />
                      <span className="text-xs">Build your reputation</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-3 w-3 text-secondary mr-2 flex-shrink-0" />
                      <span className="text-xs">Earn competitive rates</span>
                    </li>
                  </ul>
                </div>
                <div className="col-span-2 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex -space-x-3 mr-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-8 w-8 rounded-full bg-background border-2 border-card flex items-center justify-center text-xs font-medium">
                          {i}
                        </div>
                      ))}
                      <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-medium">
                        +
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium">500+ Verified Auditors</p>
                      <p className="text-xs text-muted-foreground">Ready to help secure your project</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border/40">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">2500+</p>
              <p className="text-sm text-muted-foreground">Projects Secured</p>
            </div>
            <div>
              <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">500+</p>
              <p className="text-sm text-muted-foreground">Verified Auditors</p>
            </div>
            <div>
              <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">$800M+</p>
              <p className="text-sm text-muted-foreground">Value Protected</p>
            </div>
            <div>
              <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">10+</p>
              <p className="text-sm text-muted-foreground">Blockchain Ecosystems</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

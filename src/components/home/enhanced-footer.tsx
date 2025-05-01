
import { Shield, Twitter, Github, MessageSquare, Globe, ArrowRight, Mail, Map, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BetaWarning } from "@/components/ui/beta-warning";

export function EnhancedFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-card to-card/90 border-t border-border/40">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Call-to-action section */}
        <div className="mb-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Ready to secure your Web3 project?</h3>
              <p className="text-lg text-muted-foreground mb-2">
                Join Hawkly today and connect with top security experts who can help protect your blockchain assets.
              </p>
              
              {/* Security stats moved from dashboard to footer */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="flex justify-between items-center p-2 bg-background/60 rounded-lg">
                  <span className="text-muted-foreground text-sm">Verified Auditors</span>
                  <span className="font-semibold text-foreground">500+</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-background/60 rounded-lg">
                  <span className="text-muted-foreground text-sm">Secured Projects</span>
                  <span className="font-semibold text-foreground">2,500+</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-background/60 rounded-lg">
                  <span className="text-muted-foreground text-sm">Issues Found</span>
                  <span className="font-semibold text-foreground">12,800+</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-background/60 rounded-lg">
                  <span className="text-muted-foreground text-sm">Assets Protected</span>
                  <span className="font-semibold text-foreground">$350M+</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-4 items-center lg:items-end justify-center">
              <Link to="/marketplace" className="w-full sm:w-auto">
                <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 w-full">
                  Find Security Experts
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/audits" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 w-full">
                  Become an Auditor
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">Hawkly</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              The leading Web3 security marketplace connecting projects with top security experts.
              Protecting blockchain assets through expert audits and continuous security monitoring.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Github">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Discord">
                <MessageSquare className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Website">
                <Globe className="h-5 w-5" />
              </a>
            </div>
            
            <div className="mt-6 space-y-2">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                <span className="text-sm text-muted-foreground">contact@example.com</span>
              </div>
              <div className="flex items-start">
                <Map className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                <span className="text-sm text-muted-foreground">Global</span>
              </div>
            </div>
            
            <div className="mt-6">
              <BetaWarning 
                variant="subtle"
                size="sm"
                showIcon={true}
                title="Platform Status"
              >
                <p className="text-xs">
                  Hawkly is currently in beta. We welcome your feedback to improve the platform.
                </p>
              </BetaWarning>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Marketplace</h3>
            <ul className="mt-4 space-y-3">
              <li><Link to="/marketplace" className="text-sm text-muted-foreground hover:text-primary transition-colors">Browse Services</Link></li>
              <li><Link to="/auditors" className="text-sm text-muted-foreground hover:text-primary transition-colors">Find Auditors</Link></li>
              <li><Link to="/listings" className="text-sm text-muted-foreground hover:text-primary transition-colors">Create Listing</Link></li>
              <li><Link to="/requests" className="text-sm text-muted-foreground hover:text-primary transition-colors">Security Requests</Link></li>
              <li><Link to="/stats" className="text-sm text-muted-foreground hover:text-primary transition-colors">Platform Statistics</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Community</h3>
            <ul className="mt-4 space-y-3">
              <li><Link to="/leaderboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">Leaderboard</Link></li>
              <li><Link to="/achievements" className="text-sm text-muted-foreground hover:text-primary transition-colors">Achievements</Link></li>
              <li><Link to="/events" className="text-sm text-muted-foreground hover:text-primary transition-colors">Security Events</Link></li>
              <li><Link to="/forum" className="text-sm text-muted-foreground hover:text-primary transition-colors">Community Forum</Link></li>
              <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Security Blog</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h3>
            <ul className="mt-4 space-y-3">
              <li><Link to="/docs" className="text-sm text-muted-foreground hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link to="/audits" className="text-sm text-muted-foreground hover:text-primary transition-colors">Audit Methodology</Link></li>
              <li><Link to="/security-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Security Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground">
              &copy; {currentYear} Hawkly Security Marketplace. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-4 md:gap-6">
              <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">Terms</Link>
              <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
              <Link to="/security-policy" className="text-xs text-muted-foreground hover:text-primary transition-colors">Security</Link>
              <Link to="/contact" className="text-xs text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

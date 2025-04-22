
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/40">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">SecureBlock</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              The leading decentralized Web3 security marketplace with integrated gamification.
              Connect with top security experts and protect your blockchain assets.
            </p>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Marketplace</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/marketplace" className="text-sm text-muted-foreground hover:text-primary">Browse Services</Link></li>
              <li><Link to="/auditors" className="text-sm text-muted-foreground hover:text-primary">Find Auditors</Link></li>
              <li><Link to="/listings" className="text-sm text-muted-foreground hover:text-primary">Create Listing</Link></li>
              <li><Link to="/requests" className="text-sm text-muted-foreground hover:text-primary">Security Requests</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Community</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/leaderboard" className="text-sm text-muted-foreground hover:text-primary">Leaderboard</Link></li>
              <li><Link to="/achievements" className="text-sm text-muted-foreground hover:text-primary">Achievements</Link></li>
              <li><Link to="/events" className="text-sm text-muted-foreground hover:text-primary">Security Events</Link></li>
              <li><Link to="/forum" className="text-sm text-muted-foreground hover:text-primary">Community Forum</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/docs" className="text-sm text-muted-foreground hover:text-primary">Documentation</Link></li>
              <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-primary">Security Blog</Link></li>
              <li><Link to="/vulnerabilities" className="text-sm text-muted-foreground hover:text-primary">Vulnerability Database</Link></li>
              <li><Link to="/faqs" className="text-sm text-muted-foreground hover:text-primary">FAQs</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} SecureBlock. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary">Terms of Service</Link>
              <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary">Privacy Policy</Link>
              <Link to="/contact" className="text-xs text-muted-foreground hover:text-primary">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

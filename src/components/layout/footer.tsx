
import { Shield, Twitter, Github, MessageSquare, Globe, AlertCircle, Info, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/40">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Beta disclaimer banner */}
        <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-sm text-amber-800">Beta Platform Notice</h4>
              <p className="text-xs text-amber-700 mt-1">
                Hawkly is currently in beta. While we continuously improve the platform, some features may not be fully operational or may contain bugs. 
                We appreciate your feedback during this phase. Please review our 
                <Link to="/terms" className="text-primary underline hover:text-primary/80 mx-1">Terms of Service</Link>
                and
                <Link to="/security-policy" className="text-primary underline hover:text-primary/80 mx-1">Security Policy</Link>
                for limitations and capabilities.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">Hawkly</span>
              <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">BETA</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              The leading Web3 security marketplace connecting projects with top security experts.
              Protecting blockchain assets through expert audits and continuous security monitoring.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="https://twitter.com" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://github.com" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://discord.com" className="text-muted-foreground hover:text-primary">
                <MessageSquare className="h-5 w-5" />
                <span className="sr-only">Discord</span>
              </a>
              <a href="https://hawkly.io" className="text-muted-foreground hover:text-primary">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Website</span>
              </a>
            </div>
            
            {/* Added contact email */}
            <div className="mt-4 flex items-center">
              <Mail className="h-5 w-5 text-muted-foreground mr-2" />
              <a href="mailto:join@hawkly.com" className="text-sm text-muted-foreground hover:text-primary">join@hawkly.com</a>
            </div>
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
              <li><Link to="/leaderboard" className="text-sm font-medium text-primary hover:text-primary/80">Leaderboard</Link></li>
              <li><Link to="/achievements" className="text-sm text-muted-foreground hover:text-primary">Achievements</Link></li>
              <li><Link to="/events" className="text-sm text-muted-foreground hover:text-primary">Security Events</Link></li>
              <li><Link to="/forum" className="text-sm text-muted-foreground hover:text-primary">Community Forum</Link></li>
              <li><Link to="/stats" className="text-sm text-muted-foreground hover:text-primary">Platform Statistics</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/docs" className="text-sm text-muted-foreground hover:text-primary">Documentation</Link></li>
              <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-primary">Security Blog</Link></li>
              <li><Link to="/vulnerabilities" className="text-sm text-muted-foreground hover:text-primary">Vulnerability Database</Link></li>
              <li><Link to="/faqs" className="text-sm text-muted-foreground hover:text-primary">FAQs</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact Support</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Hawkly Security Marketplace. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0 flex flex-wrap gap-4 md:gap-6">
              <Link to="/terms" className="text-xs text-muted-foreground hover:text-primary">Terms of Service</Link>
              <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary">Privacy Policy</Link>
              <Link to="/security-policy" className="text-xs text-muted-foreground hover:text-primary">Security Policy</Link>
              <Link to="/contact" className="text-xs text-muted-foreground hover:text-primary">Contact Us</Link>
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground/70 text-center">
            <div className="flex items-center justify-center">
              <Info className="h-3 w-3 mr-1" />
              <span>Disclaimer: Hawkly provides a platform for security services but does not guarantee complete protection.</span>
            </div>
            <div>Use of our services is subject to our terms and applicable blockchain security limitations.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}

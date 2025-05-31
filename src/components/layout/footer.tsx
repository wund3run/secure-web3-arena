import { Shield, Twitter, Github, MessageSquare, Globe, AlertCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { routeExists, getFallbackRoute } from "@/utils/navigation";

export function Footer() {
  const handleNavigation = (path: string) => {
    return routeExists(path) ? path : getFallbackRoute(path);
  };

  return (
    <footer className="bg-background border-t border-border/40 pt-12 pb-6" role="contentinfo">
      {/* Beta Platform Notice */}
      <div className="container mb-10">
        <div className="p-6 bg-amber-50 rounded-lg border border-amber-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-medium text-amber-800">Beta Platform Notice</h2>
              <p className="mt-1 text-amber-700">
                Hawkly is currently in beta. While we continuously improve the platform, some features may not be fully operational or may contain bugs. 
                We appreciate your feedback during this phase. Please review our {" "}
                <Link to="/terms" className="text-primary underline hover:text-primary/80">Terms of Service</Link>{" "}
                and {" "}
                <Link to="/security-policy" className="text-primary underline hover:text-primary/80">Security Policy</Link>{" "}
                for limitations and capabilities.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and description column */}
          <div className="col-span-1">
            <div className="flex justify-center md:justify-start mb-6">
              <img 
                src="/lovable-uploads/315b0088-3d48-449e-bd7e-5e51c332a1e6.png" 
                alt="Hawkly Logo"
                className="h-28 w-auto object-contain bg-transparent"
                style={{ backgroundColor: 'transparent' }}
              />
            </div>
            <p className="mt-4 text-muted-foreground">
              The leading Web3 security marketplace connecting projects with top security experts. 
              Protecting blockchain assets through expert audits and continuous security monitoring.
            </p>
            
            {/* Social links */}
            <div className="flex items-center space-x-4 mt-6">
              <a href="https://twitter.com/hawkly" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://github.com/hawkly" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://discord.gg/hawkly" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="text-muted-foreground hover:text-foreground">
                <MessageSquare className="h-5 w-5" />
              </a>
              <a href="https://hawkly.com" target="_blank" rel="noopener noreferrer" aria-label="Website" className="text-muted-foreground hover:text-foreground">
                <Globe className="h-5 w-5" />
              </a>
            </div>
            
            {/* Email */}
            <div className="mt-6 flex items-center">
              <Mail className="h-5 w-5 text-muted-foreground mr-2" />
              <a href="mailto:join@hawkly.com" className="text-muted-foreground hover:text-foreground">
                join@hawkly.com
              </a>
            </div>
          </div>
          
          {/* Marketplace column */}
          <div className="col-span-1">
            <h3 className="font-medium mb-4 text-lg">MARKETPLACE</h3>
            <ul className="space-y-3">
              <li><Link to="/marketplace" className="text-muted-foreground hover:text-foreground">Browse Services</Link></li>
              <li><Link to="/audits" className="text-muted-foreground hover:text-foreground">Find Auditors</Link></li>
              <li><Link to="/submit-service" className="text-muted-foreground hover:text-foreground">Create Listing</Link></li>
              <li><Link to="/request-audit" className="text-muted-foreground hover:text-foreground">Security Requests</Link></li>
            </ul>
          </div>
          
          {/* Community column */}
          <div className="col-span-1">
            <h3 className="font-medium mb-4 text-lg">COMMUNITY</h3>
            <ul className="space-y-3">
              <li><Link to="/leaderboard" className="text-muted-foreground hover:text-foreground">Leaderboard</Link></li>
              <li><Link to="/achievements" className="text-muted-foreground hover:text-foreground">Achievements</Link></li>
              <li><Link to="/events" className="text-muted-foreground hover:text-foreground">Security Events</Link></li>
              <li><Link to="/forum" className="text-muted-foreground hover:text-foreground">Community Forum</Link></li>
              <li><Link to="/challenges" className="text-muted-foreground hover:text-foreground">Security Challenges</Link></li>
            </ul>
          </div>
          
          {/* Resources column */}
          <div className="col-span-1">
            <h3 className="font-medium mb-4 text-lg">RESOURCES</h3>
            <ul className="space-y-3">
              <li><Link to="/docs" className="text-muted-foreground hover:text-foreground">Documentation</Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-foreground">Security Blog</Link></li>
              <li><Link to="/vulnerabilities" className="text-muted-foreground hover:text-foreground">Vulnerability Database</Link></li>
              <li><Link to="/audit-guidelines" className="text-muted-foreground hover:text-foreground">Security Guidelines</Link></li>
              <li><Link to="/resources" className="text-muted-foreground hover:text-foreground">Resource Center</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Hawkly. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link to="/security-policy" className="text-sm text-muted-foreground hover:text-foreground">
                Security Policy
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

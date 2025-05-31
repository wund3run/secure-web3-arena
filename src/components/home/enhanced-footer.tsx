
import React from 'react';
import { Link } from 'react-router-dom';

export function EnhancedFooter() {
  return (
    <footer className="bg-background border-t py-12" role="contentinfo" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="container grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" aria-label="Hawkly Home page" className="inline-block mb-4">
            <img 
              src="/lovable-uploads/d96077a4-3ebd-4779-9a3e-a504ff6822f1.png" 
              alt="Hawkly Logo"
              className="h-20 w-auto object-contain bg-transparent"
              style={{ backgroundColor: 'transparent' }}
            />
          </Link>
          <p className="text-muted-foreground text-sm mb-4">
            The premier Web3 security marketplace connecting projects with expert auditors.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>500+</strong> verified security experts • <strong>$350M+</strong> protected
          </p>
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Marketplace</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/marketplace" className="text-muted-foreground hover:text-foreground transition-colors">Browse Services</Link></li>
            <li><Link to="/request-audit" className="text-muted-foreground hover:text-foreground transition-colors">Request Audit</Link></li>
            <li><Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
            <li><Link to="/service-provider-onboarding" className="text-muted-foreground hover:text-foreground transition-colors">Become a Provider</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/audit-guidelines" className="text-muted-foreground hover:text-foreground transition-colors">Audit Guidelines</Link></li>
            <li><Link to="/docs" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</Link></li>
            <li><Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
            <li><Link to="/vulnerabilities" className="text-muted-foreground hover:text-foreground transition-colors">Vulnerability Database</Link></li>
            <li><Link to="/security-insights" className="text-muted-foreground hover:text-foreground transition-colors">Security Insights</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Community</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/forum" className="text-muted-foreground hover:text-foreground transition-colors">Forum</Link></li>
            <li><Link to="/events" className="text-muted-foreground hover:text-foreground transition-colors">Events</Link></li>
            <li><Link to="/challenges" className="text-muted-foreground hover:text-foreground transition-colors">Challenges</Link></li>
            <li><Link to="/leaderboard" className="text-muted-foreground hover:text-foreground transition-colors">Leaderboard</Link></li>
            <li><Link to="/achievements" className="text-muted-foreground hover:text-foreground transition-colors">Achievements</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms</Link></li>
            <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link></li>
            <li><Link to="/security-policy" className="text-muted-foreground hover:text-foreground transition-colors">Security Policy</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container mt-8 pt-8 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Hawkly. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://twitter.com/hawkly" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Hawkly Twitter">
              Twitter
            </a>
            <a href="https://github.com/hawkly" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Hawkly GitHub">
              GitHub
            </a>
            <a href="https://discord.gg/hawkly" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Hawkly Discord">
              Discord
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

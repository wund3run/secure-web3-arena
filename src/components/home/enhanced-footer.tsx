
import React from 'react';
import { Link } from 'react-router-dom';

export function EnhancedFooter() {
  return (
    <footer className="bg-background border-t py-12" role="contentinfo" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 px-4">
        <div className="col-span-1 md:col-span-2 lg:col-span-1">
          <Link to="/" aria-label="Hawkly Home page" className="inline-block mb-4">
            <img 
              src="/lovable-uploads/d96077a4-3ebd-4779-9a3e-a504ff6822f1.png" 
              alt="Hawkly Logo"
              className="h-16 w-auto object-contain bg-transparent"
              style={{ backgroundColor: 'transparent' }}
            />
          </Link>
          <p className="text-muted-foreground text-sm mb-4">
            The premier Web3 security marketplace connecting projects with expert auditors. 
            Securing the future of blockchain technology since 2024.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>500+</strong> verified experts • <strong>$350M+</strong> protected • <strong>2,500+</strong> audits
          </p>
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Marketplace</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/marketplace" className="text-muted-foreground hover:text-foreground transition-colors">Browse Services</Link></li>
            <li><Link to="/request-audit" className="text-muted-foreground hover:text-foreground transition-colors">Request Audit</Link></li>
            <li><Link to="/auth" className="text-muted-foreground hover:text-foreground transition-colors">Join Platform</Link></li>
            <li><Link to="/audit-guidelines" className="text-muted-foreground hover:text-foreground transition-colors">Guidelines</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/audit-guidelines" className="text-muted-foreground hover:text-foreground transition-colors">Audit Guidelines</Link></li>
            <li><Link to="/support" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Community</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Discord</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Twitter</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">GitHub</a></li>
            <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms</Link></li>
            <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container mt-8 pt-8 border-t px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; 2025 Hawkly Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-4">
            <a 
              href="https://twitter.com/hawkly" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-foreground transition-colors text-sm" 
              aria-label="Hawkly on Twitter"
            >
              Twitter
            </a>
            <a 
              href="https://github.com/hawkly" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-foreground transition-colors text-sm" 
              aria-label="Hawkly on GitHub"
            >
              GitHub
            </a>
            <a 
              href="https://discord.gg/hawkly" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-foreground transition-colors text-sm" 
              aria-label="Hawkly Discord Community"
            >
              Discord
            </a>
            <a 
              href="https://linkedin.com/company/hawkly" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-foreground transition-colors text-sm" 
              aria-label="Hawkly on LinkedIn"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

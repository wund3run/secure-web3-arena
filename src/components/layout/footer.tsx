
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Twitter, Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Hawkly</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              The premier Web3 security marketplace connecting projects with top-tier auditors.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Platform</h3>
            <div className="space-y-2 text-sm">
              <Link to="/marketplace" className="block text-muted-foreground hover:text-foreground">
                Browse Auditors
              </Link>
              <Link to="/audit-request" className="block text-muted-foreground hover:text-foreground">
                Request Audit
              </Link>
              <Link to="/audits" className="block text-muted-foreground hover:text-foreground">
                View Audits
              </Link>
              <Link to="/dashboard" className="block text-muted-foreground hover:text-foreground">
                Dashboard
              </Link>
            </div>
          </div>

          {/* Resources Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Resources</h3>
            <div className="space-y-2 text-sm">
              <Link to="/docs" className="block text-muted-foreground hover:text-foreground">
                Documentation
              </Link>
              <Link to="/guides" className="block text-muted-foreground hover:text-foreground">
                Security Guides
              </Link>
              <Link to="/support" className="block text-muted-foreground hover:text-foreground">
                Support
              </Link>
              <Link to="/faq" className="block text-muted-foreground hover:text-foreground">
                FAQ
              </Link>
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Legal</h3>
            <div className="space-y-2 text-sm">
              <Link to="/terms" className="block text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link to="/privacy" className="block text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link to="/security-policy" className="block text-muted-foreground hover:text-foreground">
                Security Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Hawkly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

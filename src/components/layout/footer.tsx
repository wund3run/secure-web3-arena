
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Shield, Eye, Zap, Users, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png" 
                alt="Hawkly"
                className="h-8 w-8"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-brand-blue via-brand-purple to-brand-cyan bg-clip-text text-transparent">
                Hawkly
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Sharp-eyed security guardians protecting your Web3 assets with vigilant auditing and expert protection services.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="brand" className="text-xs">
                <Shield className="h-3 w-3 mr-1" />
                SOC 2 Guardian
              </Badge>
              <Badge variant="outline" className="text-xs border-brand-cyan/30 text-brand-cyan">
                <Eye className="h-3 w-3 mr-1" />
                24/7 Vigilant
              </Badge>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Services</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/security-audits" className="text-muted-foreground hover:text-brand-blue transition-colors duration-200">
                  Security Audits
                </Link>
              </li>
              <li>
                <Link to="/code-reviews" className="text-muted-foreground hover:text-brand-purple transition-colors duration-200">
                  Code Reviews
                </Link>
              </li>
              <li>
                <Link to="/penetration-testing" className="text-muted-foreground hover:text-brand-cyan transition-colors duration-200">
                  Penetration Testing
                </Link>
              </li>
              <li>
                <Link to="/consulting" className="text-muted-foreground hover:text-brand-orange transition-colors duration-200">
                  Security Consulting
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-muted-foreground hover:text-brand-blue transition-colors duration-200">
                  Find Guardians
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-brand-blue transition-colors duration-200">
                  Security Guides
                </Link>
              </li>
              <li>
                <Link to="/vulnerabilities" className="text-muted-foreground hover:text-brand-purple transition-colors duration-200">
                  Vulnerability Database
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-muted-foreground hover:text-brand-cyan transition-colors duration-200">
                  Guardian Community
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-brand-orange transition-colors duration-200">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-muted-foreground hover:text-brand-blue transition-colors duration-200">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-brand-blue transition-colors duration-200">
                  About Hawkly
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-muted-foreground hover:text-brand-purple transition-colors duration-200">
                  Join Our Flight
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-brand-cyan transition-colors duration-200">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-brand-orange transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social & Legal */}
        <div className="border-t border-border/40 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Connect with the guardians:</span>
              <div className="flex space-x-3">
                <a href="#" className="p-2 rounded-full hover:bg-brand-blue/10 hover:text-brand-blue transition-all duration-200">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="p-2 rounded-full hover:bg-brand-purple/10 hover:text-brand-purple transition-all duration-200">
                  <Github className="h-4 w-4" />
                </a>
                <a href="#" className="p-2 rounded-full hover:bg-brand-cyan/10 hover:text-brand-cyan transition-all duration-200">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="#" className="p-2 rounded-full hover:bg-brand-orange/10 hover:text-brand-orange transition-all duration-200">
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-brand-blue transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-brand-purple transition-colors duration-200">
                Terms of Service
              </Link>
              <span>&copy; {currentYear} Hawkly. All rights protected.</span>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 pt-6 border-t border-border/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Shield className="h-3 w-3 text-brand-blue" />
                  <span>500+ Expert Guardians</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3 text-brand-purple" />
                  <span>$350M+ Assets Protected</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="h-3 w-3 text-brand-cyan" />
                  <span>24h Response Time</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-3 w-3 text-brand-orange" />
                  <span>2,500+ Audits Completed</span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                Vigilantly secured by Web3 security guardians worldwide
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

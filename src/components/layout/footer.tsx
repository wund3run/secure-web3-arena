import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Shield, Eye, Zap, Users, Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white py-12" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-4">
            {/* Replace with your logo component */}
            <div className="font-bold text-2xl">Hawkly</div>
            <p className="text-gray-300 text-sm max-w-md">
              The leading Web3 security marketplace connecting projects with verified security experts. 
              Securing the future of blockchain technology.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="accent" className="text-xs">
                <Shield className="h-3 w-3 mr-1" />
                SOC 2 Type II Certified
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
                <Link to="/services/security-audits" className="text-muted-foreground hover:text-brand-blue transition-colors duration-200">
                  Security Audits
                </Link>
              </li>
              <li>
                <Link to="/services/code-reviews" className="text-muted-foreground hover:text-brand-purple transition-colors duration-200">
                  Code Reviews
                </Link>
              </li>
              <li>
                <Link to="/services/penetration-testing" className="text-muted-foreground hover:text-brand-cyan transition-colors duration-200">
                  Penetration Testing
                </Link>
              </li>
              <li>
                <Link to="/services/consulting" className="text-muted-foreground hover:text-brand-orange transition-colors duration-200">
                  Security Consulting
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-muted-foreground hover:text-brand-blue transition-colors duration-200">
                  Find Guardians
                </Link>
              </li>
              <li>
                <Link to="/tools/ai-security-suite" className="text-muted-foreground hover:text-brand-purple transition-colors duration-200 flex items-center">
                  AI Security Suite
                  <Badge variant="accent" className="ml-2 text-[10px]">New</Badge>
                </Link>
              </li>
            </ul>
          </div>
          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/resources/security-guides" className="text-muted-foreground hover:text-brand-blue transition-colors duration-200">
                  Security Guides
                </Link>
              </li>
              <li>
                <Link to="/resources/vulnerability-database" className="text-muted-foreground hover:text-brand-purple transition-colors duration-200">
                  Vulnerability Database
                </Link>
              </li>
              <li>
                <Link to="/community/research" className="text-muted-foreground hover:text-brand-cyan transition-colors duration-200 flex items-center">
                  Security Research
                  <Badge variant="accent" className="ml-2 text-[10px]">New</Badge>
                </Link>
              </li>
              <li>
                <Link to="/community/forum" className="text-muted-foreground hover:text-brand-orange transition-colors duration-200">
                  Guardian Community
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-muted-foreground hover:text-brand-blue transition-colors duration-200">
                  Support Center
                </Link>
              </li>
              <li>
                <Link to="/status" className="text-muted-foreground hover:text-brand-purple transition-colors duration-200">
                  System Status
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
                <Link to="/business/careers" className="text-muted-foreground hover:text-brand-purple transition-colors duration-200">
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
              <li>
                <a 
                  href="https://hawkly.blog" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-brand-blue transition-colors duration-200 flex items-center"
                >
                  Blog <ExternalLink className="h-3 w-3 ml-1" />
                </a>
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
                <a href="https://twitter.com/hawkly" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-brand-blue/10 hover:text-brand-blue transition-all duration-200">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="https://github.com/hawkly" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-brand-purple/10 hover:text-brand-purple transition-all duration-200">
                  <Github className="h-4 w-4" />
                </a>
                <a href="https://linkedin.com/company/hawkly" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-brand-cyan/10 hover:text-brand-cyan transition-all duration-200">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="mailto:support@hawkly.com" className="p-2 rounded-full hover:bg-brand-orange/10 hover:text-brand-orange transition-all duration-200">
                  <Mail className="h-4 w-4" />
                </a>
              </div>
            </div>
            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link to="/legal/privacy" className="hover:text-brand-blue transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/legal/terms" className="hover:text-brand-purple transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/legal/compliance" className="hover:text-brand-cyan transition-colors duration-200">
                Compliance
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
                  <span>750+ Expert Guardians</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3 text-brand-purple" />
                  <span>$1.2B+ Assets Protected</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="h-3 w-3 text-brand-cyan" />
                  <span>4h Avg Response Time</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-3 w-3 text-brand-orange" />
                  <span>5,000+ Audits Completed</span>
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

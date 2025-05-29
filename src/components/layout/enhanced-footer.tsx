
import React from 'react';
import { Link } from 'react-router-dom';
import { HawklyLogo } from './hawkly-logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Twitter, 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone,
  Shield,
  Users,
  FileText,
  Zap
} from 'lucide-react';

export function EnhancedFooter() {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    platform: {
      title: 'Platform',
      links: [
        { label: 'Security Marketplace', href: '/marketplace' },
        { label: 'Request Audit', href: '/request-audit' },
        { label: 'Find Auditors', href: '/marketplace' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'How It Works', href: '/docs' }
      ]
    },
    auditors: {
      title: 'For Auditors',
      links: [
        { label: 'Join as Auditor', href: '/service-provider-onboarding' },
        { label: 'Auditor Guidelines', href: '/audit-guidelines' },
        { label: 'Verification Process', href: '/docs' },
        { label: 'Earnings Calculator', href: '/pricing' },
        { label: 'Success Stories', href: '/blog' }
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '/docs' },
        { label: 'Security Blog', href: '/blog' },
        { label: 'Web3 Security Guide', href: '/web3-security' },
        { label: 'Vulnerability Database', href: '/vulnerabilities' },
        { label: 'Community Forum', href: '/forum' }
      ]
    },
    company: {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Support Center', href: '/support' },
        { label: 'Security Policy', href: '/security-policy' },
        { label: 'Bug Bounty', href: '/security-policy' }
      ]
    }
  };

  const legalLinks = [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Security Policy', href: '/security-policy' },
    { label: 'Cookie Policy', href: '/privacy' }
  ];

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/hawkly', label: 'Twitter' },
    { icon: Github, href: 'https://github.com/hawkly', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/company/hawkly', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-background border-t">
      {/* Newsletter Section */}
      <div className="border-b">
        <div className="container py-12">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h3 className="text-2xl font-bold">Stay Updated on Web3 Security</h3>
            <p className="text-muted-foreground">
              Get the latest security insights, vulnerability alerts, and platform updates delivered to your inbox.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input placeholder="Enter your email" type="email" />
              <Button>Subscribe</Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Join 5,000+ security professionals. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <HawklyLogo asLink={false} />
            <p className="text-muted-foreground">
              The leading Web3 security marketplace connecting projects with verified auditors. 
              Secure your smart contracts with confidence.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>hello@hawkly.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <Button key={social.label} variant="ghost" size="icon" asChild>
                  <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key} className="space-y-3">
              <h4 className="font-semibold">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      to={link.href} 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {legalLinks.map((link, index) => (
              <React.Fragment key={link.href}>
                <Link to={link.href} className="hover:text-foreground transition-colors">
                  {link.label}
                </Link>
                {index < legalLinks.length - 1 && <span>•</span>}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                SOC 2 Compliant
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                99.9% Uptime
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground">
              © {currentYear} Hawkly. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="border-t bg-muted/30">
        <div className="container py-4">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-3 w-3" />
            <span>
              All communications are encrypted • Platform audited by top security firms • 
              <Link to="/security-policy" className="underline hover:text-foreground ml-1">
                View our security practices
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

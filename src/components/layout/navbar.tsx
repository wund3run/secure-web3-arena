import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SmartNavigation } from './navigation/SmartNavigation';
import { RoleBasedAuthButtons } from './navigation/role-based-auth-buttons';
import { MobileNavigation } from './navigation/MobileNavigation';

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Marketplace', href: '/marketplace' },
  { name: 'Community', href: '/community' },
  { name: 'Analytics', href: '/analytics' },
  { name: 'Gamification', href: '/gamification' },
  { 
    name: 'Tools', 
    href: '/tools',
    subItems: [
      { name: 'Security Insights', href: '/tools/security-insights' },
      { name: 'Platform Reports', href: '/tools/platform-reports' },
      { name: 'Vulnerability Scanner', href: '/tools/vulnerability-scanner' }
    ]
  },
  { 
    name: 'Resources', 
    href: '/resources',
    subItems: [
      { name: 'Knowledge Base', href: '/resources/knowledge-base' },
      { name: 'Tutorials', href: '/resources/tutorials' }
    ]
  }
];

export function Navbar() {
  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
              <img
                className="h-10 w-10 object-contain"
                src="/lovable-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png"
                alt="Hawkly Logo"
              />
              <span className="text-xl font-bold text-hawkly-gradient">
                Hawkly
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <SmartNavigation />
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <RoleBasedAuthButtons />
            
            {/* Mobile Menu */}
            <div className="md:hidden">
              <MobileNavigation />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

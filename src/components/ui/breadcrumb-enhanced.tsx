
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

const pathToLabel: Record<string, string> = {
  'marketplace': 'Marketplace',
  'request-audit': 'Request Audit',
  'audit-guidelines': 'Security Guidelines',
  'service-provider-onboarding': 'Become an Auditor',
  'docs': 'Documentation',
  'knowledge-base': 'Knowledge Base',
  'tutorials': 'Tutorials',
  'templates': 'Templates',
  'community': 'Community',
  'forum': 'Forum',
  'blog': 'Blog',
  'events': 'Events',
  'leaderboard': 'Leaderboard',
  'achievements': 'Achievements',
  'dashboard': 'Dashboard',
  'audits': 'My Audits',
  'escrow': 'Escrow',
  'support': 'Support Center',
  'faq': 'FAQ',
  'contact': 'Contact',
  'pricing': 'Pricing',
  'stats': 'Statistics',
  'ai-tools': 'AI Tools',
  'security-insights': 'Security Insights',
  'web3-security': 'Web3 Security',
  'auth': 'Authentication',
  'admin': 'Admin',
  'terms': 'Terms of Service',
  'privacy': 'Privacy Policy',
  'security-policy': 'Security Policy'
};

export function BreadcrumbEnhanced() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  // Don't show breadcrumbs on home page or if only one level deep
  if (pathSegments.length <= 1) {
    return null;
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' }
  ];

  // Build breadcrumb items from path segments
  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;
    
    breadcrumbItems.push({
      label: pathToLabel[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
      href: isLast ? undefined : currentPath,
      current: isLast
    });
  });

  return (
    <nav 
      aria-label="Breadcrumb navigation"
      className="border-b bg-muted/30"
    >
      <div className="container py-3">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" aria-hidden="true" />
              )}
              
              {item.current ? (
                <span 
                  className="font-medium text-foreground"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href!}
                  className={cn(
                    "text-muted-foreground hover:text-foreground transition-colors",
                    index === 0 && "flex items-center gap-1"
                  )}
                >
                  {index === 0 && <Home className="h-4 w-4" />}
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

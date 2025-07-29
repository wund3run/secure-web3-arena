
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
  icon?: React.ElementType;
  isActive?: boolean;
}

const routeLabels: Record<string, string> = {
  '': 'Home',
  'dashboard': 'Dashboard',
  'marketplace': 'Marketplace',
  'audits': 'Audits',
  'audit': 'Audit Details',
  'request-audit': 'Request Audit',
  'profile': 'Profile',
  'settings': 'Settings',
  'admin': 'Admin',
  'security-audits': 'Security Audits',
  'code-reviews': 'Code Reviews',
  'consulting': 'Consulting',
  'ai-tools': 'AI Tools',
  'vulnerabilities': 'Vulnerabilities',
  'resources': 'Resources',
  'community': 'Community',
  'forum': 'Forum',
  'faq': 'FAQ',
  'support': 'Support'
};

export const EnhancedBreadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/', icon: Home }
  ];

  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    breadcrumbs.push({
      label,
      href: currentPath,
      isActive: index === pathSegments.length - 1
    });
  });

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="flex items-center space-x-1 text-sm text-muted-foreground py-2 px-4 bg-muted/30 rounded-lg mb-4"
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.href}>
          {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
          {breadcrumb.isActive ? (
            <span className="font-medium text-foreground flex items-center gap-1">
              {breadcrumb.icon && <breadcrumb.icon className="h-4 w-4" />}
              {breadcrumb.label}
            </span>
          ) : (
            <Link
              to={breadcrumb.href}
              className={cn(
                "hover:text-foreground transition-colors flex items-center gap-1 hover:underline",
                index === 0 && "flex items-center"
              )}
            >
              {breadcrumb.icon && <breadcrumb.icon className="h-4 w-4" />}
              {breadcrumb.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

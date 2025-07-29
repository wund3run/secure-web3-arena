
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbConfig {
  [key: string]: {
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
  };
}

const breadcrumbConfig: BreadcrumbConfig = {
  '/': { label: 'Home', icon: Home },
  '/dashboard': { label: 'Dashboard' },
  '/dashboard/auditor': { label: 'Auditor Dashboard' },
  '/dashboard/project': { label: 'Project Dashboard' },
  '/marketplace': { label: 'Marketplace' },
  '/audits': { label: 'Audits' },
  '/request-audit': { label: 'Request Audit' },
  '/profile': { label: 'Profile' },
  '/settings': { label: 'Settings' },
  '/auth': { label: 'Authentication' },
  '/community': { label: 'Community' },
};

export function EnhancedBreadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  
  // Don't show breadcrumbs on home page or if only one level deep
  if (pathSegments.length <= 1) {
    return null;
  }

  const breadcrumbs = [];
  let currentPath = '';

  // Always start with home
  breadcrumbs.push({
    label: 'Home',
    path: '/',
    icon: Home,
    isLast: false
  });

  // Build breadcrumbs from path segments
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const config = breadcrumbConfig[currentPath];
    
    if (config) {
      breadcrumbs.push({
        label: config.label,
        path: currentPath,
        icon: config.icon,
        isLast: index === pathSegments.length - 1
      });
    }
  });

  return (
    <div className="modern-container py-4">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.path}>
              <BreadcrumbItem>
                {crumb.isLast ? (
                  <BreadcrumbPage className="flex items-center gap-2 font-medium text-foreground">
                    {crumb.icon && <crumb.icon className="h-4 w-4" />}
                    {crumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link 
                      to={crumb.path} 
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {crumb.icon && <crumb.icon className="h-4 w-4" />}
                      {crumb.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!crumb.isLast && (
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
              )}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

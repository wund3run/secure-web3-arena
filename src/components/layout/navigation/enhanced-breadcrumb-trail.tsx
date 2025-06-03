
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { useAuth } from "@/contexts/auth";

export function EnhancedBreadcrumbTrail() {
  const location = useLocation();
  const { user } = useAuth();
  const pathSegments = location.pathname.split('/').filter(segment => segment);
  
  // Don't show breadcrumbs on home page or for non-authenticated users on certain pages
  if (location.pathname === '/' || (!user && pathSegments.length <= 1)) {
    return null;
  }
  
  // Create readable names for path segments with better mapping
  const getReadableName = (segment: string): string => {
    if (segment.match(/^[a-f0-9-]{24,36}$/)) {
      return "Details";
    }
    
    const nameMap: Record<string, string> = {
      "marketplace": "Marketplace",
      "audits": "Audits",
      "audit": "Audit",
      "service": "Service",
      "dashboard": "Dashboard",
      "request-audit": "Request Audit",
      "resources": "Resources",
      "docs": "Documentation",
      "blog": "Blog",
      "contact": "Contact",
      "admin": "Administration",
      "pricing-inr": "Pricing",
      "faq": "FAQ",
      "auditor": "Auditor",
      "project": "Project",
      "security-audits": "Security Audits",
      "code-reviews": "Code Reviews",
      "penetration-testing": "Penetration Testing",
      "consulting": "Consulting",
      "community": "Community",
      "profile": "Profile",
      "settings": "Settings",
      "security-settings": "Security Settings"
    };
    
    return nameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
  };
  
  return (
    <nav aria-label="Breadcrumb" className="container py-3 text-sm border-b bg-muted/30">
      <ol className="flex items-center space-x-1 overflow-x-auto">
        <li>
          <Link 
            to={user ? "/dashboard" : "/"} 
            className="text-muted-foreground hover:text-foreground flex items-center transition-colors"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">{user ? "Dashboard" : "Home"}</span>
          </Link>
        </li>
        
        {pathSegments.map((segment, index) => {
          const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const isLast = index === pathSegments.length - 1;
          
          return (
            <li key={segment} className="flex items-center whitespace-nowrap">
              <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
              
              {!isLast ? (
                <Link 
                  to={url} 
                  className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
                >
                  {getReadableName(segment)}
                </Link>
              ) : (
                <span className="font-medium text-foreground">
                  {getReadableName(segment)}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

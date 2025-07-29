
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export function BreadcrumbTrail() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment);
  
  // Skip breadcrumbs for top-level pages
  if (pathSegments.length <= 1 && !location.pathname.includes('dashboard')) {
    return null;
  }
  
  // Create readable names for path segments
  const getReadableName = (segment: string): string => {
    // Handle IDs
    if (segment.match(/^[a-f0-9-]{24,36}$/)) {
      return "Details";
    }
    
    // Handle common routes
    switch(segment) {
      case "marketplace": return "Marketplace";
      case "audits": return "Audits";
      case "audit": return "Audit";
      case "service": return "Service";
      case "dashboard": return "Dashboard";
      case "request-audit": return "Request Audit";
      case "resources": return "Resources";
      case "docs": return "Documentation";
      case "blog": return "Blog";
      case "contact": return "Contact";
      case "admin": return "Administration";
      case "pricing": return "Pricing";
      case "faq": return "FAQ";
      case "auditor": return "Auditor";
      case "project": return "Project";
      default: return segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    }
  };
  
  return (
    <nav aria-label="Breadcrumb" className="container py-2 text-sm">
      <ol className="flex items-center space-x-1">
        <li>
          <Link 
            to="/" 
            className="text-muted-foreground hover:text-foreground flex items-center"
          >
            <Home className="h-3 w-3" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        
        {pathSegments.map((segment, index) => {
          const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const isLast = index === pathSegments.length - 1;
          
          return (
            <li key={segment} className="flex items-center">
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              
              {!isLast ? (
                <Link 
                  to={url} 
                  className="ml-1 text-muted-foreground hover:text-foreground"
                >
                  {getReadableName(segment)}
                </Link>
              ) : (
                <span className="ml-1 font-medium text-foreground">
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

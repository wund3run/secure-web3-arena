
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { extractRoutesFromApp } from "../navigation";
import { navigationLinks } from "@/components/layout/navigation/navigation-links.ts";

type ValidationIssue = {
  type: 'route' | 'link' | 'ui' | 'responsive' | 'styling' | 'interactive';
  severity: 'high' | 'medium' | 'low';
  description: string;
  location: string;
  suggestion?: string;
};

export function usePlatformValidator() {
  const [issues, setIssues] = useState<ValidationIssue[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const location = useLocation();

  const validateRoutes = () => {
    const definedRoutes = extractRoutesFromApp();
    const navigationIssues: ValidationIssue[] = [];
    
    // Validate all navigation links
    const checkLinks = (links: typeof navigationLinks.marketplace, section: string) => {
      links.forEach(link => {
        const path = link.href.split('?')[0]; // Remove query parameters
        if (!definedRoutes.includes(path) && path !== '/') {
          navigationIssues.push({
            type: 'route',
            severity: 'high',
            description: `Navigation link "${link.title}" points to undefined route: ${link.href}`,
            location: `Navigation ${section} section`,
            suggestion: `Add the route to App.tsx or update the link to an existing route`
          });
        }
      });
    };
    
    checkLinks(navigationLinks.marketplace, 'marketplace');
    checkLinks(navigationLinks.audits, 'audits');
    checkLinks(navigationLinks.resources, 'resources');
    
    return navigationIssues;
  };

  const validateResponsiveDesign = () => {
    // Simple check for viewport meta tag
    const hasViewportMeta = document.querySelector('meta[name="viewport"]') !== null;
    
    const responsiveIssues: ValidationIssue[] = [];
    
    if (!hasViewportMeta) {
      responsiveIssues.push({
        type: 'responsive',
        severity: 'high',
        description: 'Missing viewport meta tag for responsive design',
        location: 'HTML head',
        suggestion: 'Add <meta name="viewport" content="width=device-width, initial-scale=1.0">'
      });
    }
    
    return responsiveIssues;
  };

  const validateCurrentPage = () => {
    const pageIssues: ValidationIssue[] = [];
    
    // Check for broken links on the current page
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      if (link.getAttribute('href') === '#' || link.getAttribute('href') === '') {
        pageIssues.push({
          type: 'link',
          severity: 'medium',
          description: 'Link with no destination or placeholder href="#"',
          location: `${location.pathname}: ${link.textContent || 'unnamed link'}`,
          suggestion: 'Update with valid href or add onClick handler'
        });
      }
    });
    
    // Check for buttons without handlers - FIX: Use proper type casting for button elements
    const buttons = document.querySelectorAll('button:not([type="submit"])');
    buttons.forEach(button => {
      // Type cast to HTMLButtonElement to access onClick property correctly
      const buttonElement = button as HTMLButtonElement;
      if (!buttonElement.onclick && !button.getAttribute('data-test-has-handler')) {
        pageIssues.push({
          type: 'interactive',
          severity: 'medium',
          description: 'Button may be missing click handler',
          location: `${location.pathname}: ${button.textContent || 'unnamed button'}`,
          suggestion: 'Add onClick handler or verify button functionality'
        });
      }
    });
    
    return pageIssues;
  };

  const validateConsistency = () => {
    const consistencyIssues: ValidationIssue[] = [];
    
    // Check for inconsistent heading hierarchy
    const h1Count = document.querySelectorAll('h1').length;
    
    if (h1Count === 0) {
      consistencyIssues.push({
        type: 'styling',
        severity: 'medium',
        description: 'Page missing main heading (h1)',
        location: location.pathname,
        suggestion: 'Add a primary h1 heading for accessibility and SEO'
      });
    } else if (h1Count > 1) {
      consistencyIssues.push({
        type: 'styling',
        severity: 'low',
        description: 'Multiple h1 headings on page',
        location: location.pathname,
        suggestion: 'Use only one h1 per page for proper document structure'
      });
    }
    
    return consistencyIssues;
  };

  const runValidation = () => {
    setIsValidating(true);
    
    // Combine all validation checks
    const allIssues = [
      ...validateRoutes(),
      ...validateResponsiveDesign(),
      ...validateCurrentPage(),
      ...validateConsistency()
    ];
    
    setIssues(allIssues);
    setIsValidating(false);
    return allIssues;
  };

  useEffect(() => {
    // Re-validate when route changes
    const timer = setTimeout(() => {
      runValidation();
    }, 500); // Delay to ensure page is rendered
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return {
    issues,
    isValidating,
    runValidation,
    validateRoutes,
    validateResponsiveDesign,
    validateCurrentPage,
    validateConsistency
  };
}

export function PlatformValidatorWidget({ onClose }: { onClose?: () => void }) {
  const { issues, isValidating, runValidation } = usePlatformValidator();
  const [isOpen, setIsOpen] = useState(true);
  
  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 bg-card border shadow-lg rounded-lg overflow-hidden max-h-[80vh]">
      <div className="p-4 bg-muted flex justify-between items-center border-b">
        <h3 className="font-medium">Platform Validator</h3>
        <button onClick={handleClose} className="text-muted-foreground hover:text-foreground">
          ✕
        </button>
      </div>
      <div className="p-4 overflow-y-auto max-h-[calc(80vh-4rem)]">
        <div className="flex justify-between mb-4">
          <div>
            <span className="font-medium">Issues found: </span>
            <span className={issues.length > 0 ? 'text-red-500' : 'text-green-500'}>
              {issues.length}
            </span>
          </div>
          <button
            onClick={runValidation}
            disabled={isValidating}
            className="text-sm bg-primary text-primary-foreground px-2 py-1 rounded hover:bg-primary/90"
          >
            {isValidating ? 'Scanning...' : 'Scan Again'}
          </button>
        </div>
        
        {issues.length > 0 ? (
          <ul className="space-y-3">
            {issues.map((issue, i) => (
              <li key={i} className="text-xs border-l-4 pl-2 py-1" 
                  style={{ borderColor: issue.severity === 'high' ? 'red' : issue.severity === 'medium' ? 'orange' : 'yellow' }}>
                <div className="font-medium">{issue.description}</div>
                <div className="text-muted-foreground">Location: {issue.location}</div>
                {issue.suggestion && (
                  <div className="mt-1 text-blue-500">Tip: {issue.suggestion}</div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-green-500 text-center py-2">No issues detected on this page! 🎉</p>
        )}
      </div>
    </div>
  );
}

export default PlatformValidatorWidget;

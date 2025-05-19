
import { ValidationIssue } from "../types";
import { extractRoutesFromApp, routeExists } from "../../navigation";
import { navigationLinks } from "@/components/layout/navigation/navigation-links.ts";

/**
 * Validates all routes in the application
 * @returns Array of validation issues related to routes
 */
export const validateRoutes = (): ValidationIssue[] => {
  const routeIssues: ValidationIssue[] = [];
  const availableRoutes = extractRoutesFromApp();
  
  // Helper function to check links from a navigation section
  const checkNavigationLinks = (links: any[], section: string) => {
    links.forEach(link => {
      const href = link.href;
      if (!routeExists(href)) {
        routeIssues.push({
          type: 'navigation',
          severity: 'high',
          description: `Invalid route "${href}" in ${section} navigation`,
          location: `${section}: ${link.title}`,
          suggestion: `Create the page or update the link to an existing route`
        });
      }
    });
  };
  
  // Check main navigation links
  checkNavigationLinks(navigationLinks.marketplace, 'Marketplace');
  checkNavigationLinks(navigationLinks.audits, 'Audits');
  checkNavigationLinks(navigationLinks.resources, 'Resources');
  
  // Check for duplicate routes
  const routeMap = new Map();
  availableRoutes.forEach(route => {
    if (routeMap.has(route)) {
      routeIssues.push({
        type: 'navigation',
        severity: 'medium',
        description: `Duplicate route "${route}" found in routing configuration`,
        location: `App routing`,
        suggestion: `Remove duplicate route entry`
      });
    } else {
      routeMap.set(route, true);
    }
  });
  
  // Check for missing content on pages
  // This is a simplified check - would need to be expanded based on actual page structure
  document.querySelectorAll('main').forEach(main => {
    if (main.children.length === 0 || (main.children.length === 1 && main.textContent?.trim() === '')) {
      routeIssues.push({
        type: 'content',
        severity: 'high',
        description: `Empty or nearly empty page content detected`,
        location: `Current page`,
        suggestion: `Add meaningful content to the page`
      });
    }
  });
  
  return routeIssues;
};


import { extractRoutesFromApp } from "../../navigation";
import { ValidationIssue } from "../types";

/**
 * Validates that all navigation links point to existing routes
 */
export const validateRoutes = (): ValidationIssue[] => {
  const definedRoutes = extractRoutesFromApp();
  const navigationIssues: ValidationIssue[] = [];
  
  // Import navigation links directly to avoid circular dependency
  const { navigationLinks } = require("@/components/layout/navigation/navigation-links.ts");
  
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

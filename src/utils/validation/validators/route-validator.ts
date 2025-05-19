
import { ValidationIssue } from "../types";
import { routeExists, getFallbackRoute } from "../../navigation";
import { navigationLinks } from "../../../components/layout/navigation/navigation-links";

/**
 * Validates routes and navigation links across the platform
 */
export const validateRoutes = (): ValidationIssue[] => {
  const routeIssues: ValidationIssue[] = [];
  
  // Validate all navigation links in the platform header
  Object.entries(navigationLinks).forEach(([section, links]) => {
    links.forEach(link => {
      if (!routeExists(link.href)) {
        const fallback = getFallbackRoute(link.href);
        
        if (fallback !== link.href) {
          routeIssues.push({
            type: 'navigation',
            severity: 'high',
            description: `Navigation link "${link.title}" points to non-existent route: ${link.href}`,
            location: `navigation-links.ts (${section})`,
            suggestion: `Update href to a valid route like "${fallback}"`
          });
        }
      }
    });
  });
  
  // Check for duplicate routes with slightly different paths
  const allRoutes = Object.values(navigationLinks).flat().map(link => link.href);
  const normalizedRoutes = new Map();
  
  allRoutes.forEach(route => {
    const normalized = route.toLowerCase().replace(/\/$/, "");
    if (normalizedRoutes.has(normalized) && normalizedRoutes.get(normalized) !== route) {
      routeIssues.push({
        type: 'navigation',
        severity: 'medium',
        description: `Duplicate routes with different casing or trailing slashes: "${route}" and "${normalizedRoutes.get(normalized)}"`,
        location: 'navigation-links.ts',
        suggestion: 'Standardize route paths to avoid confusion'
      });
    } else {
      normalizedRoutes.set(normalized, route);
    }
  });
  
  // Check for missing important sections
  const requiredSections = ['privacy', 'terms', 'contact', 'support'];
  requiredSections.forEach(section => {
    const hasSection = allRoutes.some(route => 
      route.includes(`/${section}`) || 
      route.includes(`-${section}`)
    );
    
    if (!hasSection) {
      routeIssues.push({
        type: 'content',
        severity: 'medium',
        description: `Missing important section: ${section}`,
        location: 'Site navigation',
        suggestion: `Add a /${section} route or ensure it's accessible from navigation`
      });
    }
  });
  
  return routeIssues;
};

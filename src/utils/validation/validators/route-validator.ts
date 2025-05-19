
import { ValidationIssue } from "../types";
import { navigationLinks } from '@/components/layout/navigation/navigation-links';

/**
 * Validates routes and navigation across the platform
 */
export const validateRoutes = (): ValidationIssue[] => {
  const routeIssues: ValidationIssue[] = [];
  
  // Get all routes defined in navigation links
  const allRoutes = [
    ...navigationLinks.marketplace.map(item => item.href),
    ...navigationLinks.audits.map(item => item.href),
    ...navigationLinks.resources.map(item => item.href)
  ];
  
  // Check for duplicate routes
  const uniqueRoutes = new Set(allRoutes);
  if (uniqueRoutes.size !== allRoutes.length) {
    // Find the duplicates
    const seen = new Set();
    const duplicates = allRoutes.filter(route => {
      if (seen.has(route)) return true;
      seen.add(route);
      return false;
    });
    
    duplicates.forEach(route => {
      routeIssues.push({
        type: 'navigation',
        severity: 'medium',
        description: 'Duplicate route found in navigation',
        location: route,
        suggestion: 'Consolidate duplicate routes or use consistent naming'
      });
    });
  }
  
  // Check for query parameters in primary navigation (except for specific cases)
  allRoutes.forEach(route => {
    if (route.includes('?') && !route.endsWith('compare=true')) {
      routeIssues.push({
        type: 'navigation',
        severity: 'low',
        description: 'Query parameter in main navigation link',
        location: route,
        suggestion: 'Consider using clean URLs for primary navigation'
      });
    }
  });
  
  // Check descriptions length (should be concise)
  [...navigationLinks.marketplace, ...navigationLinks.audits, ...navigationLinks.resources].forEach(item => {
    if (item.description && item.description.length > 60) {
      routeIssues.push({
        type: 'content',
        severity: 'low',
        description: 'Navigation description may be too long',
        location: `${item.title}: ${item.description}`,
        suggestion: 'Keep navigation descriptions concise (under 60 characters)'
      });
    }
  });
  
  return routeIssues;
};

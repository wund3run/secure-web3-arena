
/**
 * Navigation utility functions
 */

/**
 * Extract routes from the application
 * This would ideally be generated from your router configuration
 * For now, we'll just return a static array of known routes
 */
export const extractRoutesFromApp = (): string[] => {
  return [
    "/",
    "/auth",
    "/dashboard",
    "/dashboard/auditor",
    "/dashboard/project",
    "/dashboard/settings",
    "/dashboard/analytics",
    "/marketplace",
    "/services/new",
    "/audits/find",
    "/audits/types",
    "/audits/reports",
    "/request-audit",
    "/pricing",
    "/docs",
    "/blog",
    "/platform-report",
    "/forum",
    "/resources",
    "/terms",
    "/privacy",
    "/audit-guidelines",
    "/security-policy",
    "/contact"
  ];
};

/**
 * Check if a route exists in the application
 */
export const routeExists = (path: string): boolean => {
  const validRoutes = extractRoutesFromApp();
  
  // Direct match
  if (validRoutes.includes(path)) {
    return true;
  }
  
  // Check for dynamic routes
  return validRoutes.some(route => {
    if (!route.includes(':')) return false;
    
    const routeParts = route.split('/');
    const pathParts = path.split('/');
    
    if (routeParts.length !== pathParts.length) return false;
    
    return routeParts.every((part, index) => {
      if (part.startsWith(':')) return true; // Dynamic part
      return part === pathParts[index];
    });
  });
};

/**
 * Get a fallback route if a route doesn't exist
 */
export const getFallbackRoute = (path: string): string => {
  // Try to find a similar route - strip trailing slashes
  const normalizedPath = path.endsWith('/') ? path.slice(0, -1) : path;
  const routes = extractRoutesFromApp();
  
  // Check if normalized path exists
  if (routes.includes(normalizedPath)) {
    return normalizedPath;
  }
  
  // Try to find a parent path
  const pathParts = normalizedPath.split('/');
  while (pathParts.length > 1) {
    pathParts.pop();
    const parentPath = pathParts.join('/') || '/';
    if (routes.includes(parentPath)) {
      return parentPath;
    }
  }
  
  // Default fallback is home
  return '/';
};

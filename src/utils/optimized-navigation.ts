
/**
 * Optimized navigation utilities with caching for better performance
 * Consolidated routes to remove duplicates and improve maintainability
 */

// Cache for route validation results
const routeValidationCache = new Map<string, boolean>();
const fallbackRouteCache = new Map<string, string>();

// Memoized route patterns for better performance
const DYNAMIC_ROUTE_PATTERNS = [
  /^\/dashboard(\/.*)?$/,
  /^\/admin(\/.*)?$/,
  /^\/audit\/[^/]+$/,
  /^\/service\/[^/]+$/,
  /^\/provider\/[^/]+$/
];

// Core routes that always exist - consolidated and cleaned up
const CORE_ROUTES = new Set([
  '/',
  '/auth',
  '/marketplace',
  '/request-audit',
  '/audits',
  '/community',
  '/service-provider-onboarding',
  '/submit-service',
  '/escrow',
  '/dashboard',
  '/admin',
  '/system-health',
  '/contact',
  '/support',
  '/faq',
  '/ai-tools',
  '/docs',
  '/pricing',
  '/resources',
  '/templates',
  '/vulnerabilities',
  '/security-insights',
  '/forum',
  '/events',
  '/challenges',
  '/leaderboard',
  '/achievements',
  '/terms',
  '/privacy',
  '/security-policy',
  '/about',
  '/careers',
  '/code-reviews',
  '/penetration-testing',
  '/consulting',
  '/vulnerability-scanner',
  '/security-audits',
  '/web3-security',
  '/web-security',
  '/platform-integration',
  '/security-compliance',
  '/performance-optimization',
  '/platform-optimization',
  '/analytics',
  '/database-tools',
  '/user-experience'
]);

// Simplified route mappings - removed duplicates
const ROUTE_MAPPINGS: Record<string, string> = {
  '/dashboard': '/auth',
  '/profile': '/dashboard',
  '/settings': '/dashboard',
  '/admin': '/dashboard',
  '/auditor': '/service-provider-onboarding',
  '/audit': '/audits',
  '/security': '/marketplace',
  '/help': '/support',
  '/documentation': '/docs',
  '/guide': '/docs',
  '/api': '/docs',
  '/tools': '/ai-tools',
  '/cost': '/pricing',
  '/price': '/pricing',
  '/contact-us': '/contact',
  '/reach-out': '/contact',
  '/questions': '/faq',
  '/template': '/templates',
  '/resource': '/resources',
  '/enhanced-marketplace': '/marketplace',
  '/enhanced-auth': '/auth',
  '/enhanced-request-audit': '/request-audit',
  '/legacy-marketplace': '/marketplace',
  '/legacy-auth': '/auth',
  '/legacy-request-audit': '/request-audit'
};

export function getFallbackRoute(attemptedPath: string): string {
  // Check cache first
  if (fallbackRouteCache.has(attemptedPath)) {
    return fallbackRouteCache.get(attemptedPath)!;
  }

  // Check for exact matches
  if (ROUTE_MAPPINGS[attemptedPath]) {
    const result = ROUTE_MAPPINGS[attemptedPath];
    fallbackRouteCache.set(attemptedPath, result);
    return result;
  }

  // Check for partial matches (optimized)
  for (const [pattern, suggestion] of Object.entries(ROUTE_MAPPINGS)) {
    if (attemptedPath.includes(pattern) || pattern.includes(attemptedPath.slice(1))) {
      fallbackRouteCache.set(attemptedPath, suggestion);
      return suggestion;
    }
  }

  // Default fallback
  const defaultRoute = '/';
  fallbackRouteCache.set(attemptedPath, defaultRoute);
  return defaultRoute;
}

export function routeExists(route: string): boolean {
  // Check cache first
  if (routeValidationCache.has(route)) {
    return routeValidationCache.get(route)!;
  }

  // Check core routes first (fastest lookup)
  if (CORE_ROUTES.has(route)) {
    routeValidationCache.set(route, true);
    return true;
  }

  // Check dynamic routes
  const exists = DYNAMIC_ROUTE_PATTERNS.some(pattern => pattern.test(route));
  routeValidationCache.set(route, exists);
  return exists;
}

export function isValidNavigationPath(path: string): boolean {
  // Skip external links and anchors
  if (path.startsWith('http') || path.startsWith('#') || path === '') {
    return true;
  }

  return routeExists(path);
}

// Clear cache when needed (for development)
export function clearNavigationCache(): void {
  routeValidationCache.clear();
  fallbackRouteCache.clear();
}

// Preload critical routes for better performance
export function preloadCriticalRoutes(): void {
  const criticalRoutes = ['/', '/marketplace', '/audits', '/dashboard', '/contact'];
  criticalRoutes.forEach(route => {
    routeValidationCache.set(route, true);
  });
}

// Call preload on module initialization
preloadCriticalRoutes();


/**
 * Utility functions for navigation and route handling
 */

export function getFallbackRoute(attemptedPath: string): string {
  // Common route mappings for user-friendly suggestions
  const routeMappings: Record<string, string> = {
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
    '/resource': '/resources'
  };

  // Check for exact matches first
  if (routeMappings[attemptedPath]) {
    return routeMappings[attemptedPath];
  }

  // Check for partial matches
  for (const [pattern, suggestion] of Object.entries(routeMappings)) {
    if (attemptedPath.includes(pattern) || pattern.includes(attemptedPath.slice(1))) {
      return suggestion;
    }
  }

  // Default fallback
  return '/';
}

export function getPageMetadata(path: string) {
  const metadata: Record<string, { title: string; description: string }> = {
    '/': {
      title: 'Web3 Security Marketplace',
      description: 'Connect with top security auditors and protect your blockchain project.'
    },
    '/marketplace': {
      title: 'Security Marketplace',
      description: 'Find verified security auditors for your Web3 project.'
    },
    '/audits': {
      title: 'Security Audits',
      description: 'Browse completed and ongoing security audits.'
    },
    '/docs': {
      title: 'Documentation',
      description: 'Comprehensive guides and API documentation.'
    },
    '/pricing': {
      title: 'Pricing',
      description: 'Transparent pricing for Web3 security services.'
    },
    '/contact': {
      title: 'Contact Us',
      description: 'Get in touch with our security experts.'
    },
    '/support': {
      title: 'Support Center',
      description: 'Find help and support resources.'
    }
  };

  return metadata[path] || {
    title: 'Hawkly',
    description: 'Web3 Security Marketplace'
  };
}

/**
 * Extract all routes from the App.tsx routing configuration
 * @returns Array of route paths defined in the application
 */
export function extractRoutesFromApp(): string[] {
  // Define all the routes that exist in the App.tsx file
  const routes = [
    '/',
    '/auth',
    '/marketplace',
    '/audits',
    '/community',
    '/service-provider-onboarding',
    '/request-audit',
    '/submit-service',
    '/escrow',
    '/dashboard',
    '/dashboard/*',
    '/admin',
    '/admin/*',
    '/system-health',
    '/contact',
    '/support',
    '/faq',
    '/ai-tools',
    '/docs',
    '/pricing',
    '/resources',
    '/templates'
  ];

  return routes;
}

/**
 * Check if a route exists in the application
 * @param route - The route path to check
 * @returns Boolean indicating if the route exists
 */
export function routeExists(route: string): boolean {
  const validRoutes = extractRoutesFromApp();
  
  // Check for exact match
  if (validRoutes.includes(route)) {
    return true;
  }

  // Check for dynamic routes (routes ending with /*)
  const dynamicRoutes = validRoutes.filter(r => r.endsWith('/*'));
  for (const dynamicRoute of dynamicRoutes) {
    const baseRoute = dynamicRoute.replace('/*', '');
    if (route.startsWith(baseRoute)) {
      return true;
    }
  }

  // Check for common route patterns
  const routePatterns = [
    /^\/dashboard(\/.*)?$/,
    /^\/admin(\/.*)?$/,
    /^\/audit\/[^/]+$/,
    /^\/service\/[^/]+$/,
    /^\/provider\/[^/]+$/
  ];

  return routePatterns.some(pattern => pattern.test(route));
}

/**
 * Validate if a navigation path is accessible
 * @param path - The navigation path to validate
 * @returns Boolean indicating if the path is valid
 */
export function isValidNavigationPath(path: string): boolean {
  // Skip external links and anchors
  if (path.startsWith('http') || path.startsWith('#') || path === '') {
    return true;
  }

  return routeExists(path);
}

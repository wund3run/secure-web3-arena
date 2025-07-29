
/**
 * Utility functions for navigation and route handling
 */

export function getFallbackRoute(attemptedPath: string): string {
  // Enhanced route mappings including competitive positioning and distribution strategy
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
    '/resource': '/resources',
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
    '/enhanced-marketplace': {
      title: 'Enhanced Security Marketplace',
      description: 'Advanced marketplace with AI-powered matching for Web3 security services.'
    },
    '/request-audit': {
      title: 'Request Security Audit',
      description: 'Request a comprehensive security audit for your Web3 project.'
    },
    '/enhanced-request-audit': {
      title: 'Enhanced Audit Request',
      description: 'Advanced audit request form with step-by-step guidance.'
    },
    '/auth': {
      title: 'Sign In | Sign Up',
      description: 'Access your Hawkly account or create a new one.'
    },
    '/enhanced-auth': {
      title: 'Enhanced Authentication',
      description: 'Secure sign in and registration for Web3 security professionals.'
    },
    '/audits': {
      title: 'Security Audits',
      description: 'Browse completed and ongoing security audits.'
    },
    '/dashboard': {
      title: 'Dashboard',
      description: 'Your personalized security dashboard.'
    },
    '/dashboard/auditor': {
      title: 'Auditor Dashboard',
      description: 'Manage your audit projects and client communications.'
    },
    '/dashboard/project': {
      title: 'Project Dashboard',
      description: 'Track your project security audits and reports.'
    },
    '/code-reviews': {
      title: 'Code Reviews',
      description: 'Professional code review services for Web3 projects.'
    },
    '/penetration-testing': {
      title: 'Penetration Testing',
      description: 'Comprehensive penetration testing for blockchain applications.'
    },
    '/consulting': {
      title: 'Security Consulting',
      description: 'Expert Web3 security consulting and advisory services.'
    },
    '/pricing': {
      title: 'Pricing',
      description: 'Transparent pricing for Web3 security services.'
    },
    '/contact': {
      title: 'Contact Us',
      description: 'Get in touch with our security experts.'
    },
    '/about': {
      title: 'About Hawkly',
      description: 'Learn about our mission to secure the Web3 ecosystem.'
    },
    '/careers': {
      title: 'Careers',
      description: 'Join our team of Web3 security professionals.'
    },
    '/terms': {
      title: 'Terms of Service',
      description: 'Terms and conditions for using Hawkly.'
    },
    '/privacy': {
      title: 'Privacy Policy',
      description: 'Privacy policy for the Hawkly platform.'
    },
    '/support': {
      title: 'Support Center',
      description: 'Find help and support resources.'
    },
    '/faq': {
      title: 'Frequently Asked Questions',
      description: 'Common questions about Hawkly and Web3 security.'
    },
    '/resources': {
      title: 'Security Resources',
      description: 'Educational resources and guides for Web3 security.'
    },
    '/community': {
      title: 'Security Community',
      description: 'Join our community of Web3 security professionals.'
    },
    '/forum': {
      title: 'Security Forum',
      description: 'Community discussions about Web3 security and best practices.'
    },
    '/events': {
      title: 'Security Events',
      description: 'Upcoming and past Web3 security events and workshops.'
    },
    '/leaderboard': {
      title: 'Security Leaderboard',
      description: 'Top-performing security auditors and projects.'
    },
    '/vulnerabilities': {
      title: 'Vulnerability Database',
      description: 'Comprehensive database of Web3 security vulnerabilities.'
    },
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
    '/enhanced-auth',
    '/marketplace',
    '/enhanced-marketplace',
    '/request-audit',
    '/enhanced-request-audit',
    '/service-provider-onboarding',
    '/pricing',
    '/audits',
    '/audit/:id',
    '/dashboard',
    '/dashboard/auditor',
    '/dashboard/project',
    '/profile',
    '/settings',
    '/code-reviews',
    '/penetration-testing',
    '/consulting',
    '/ai-tools',
    '/vulnerability-scanner',
    '/security-audits',
    '/web3-security',
    '/vulnerabilities',
    '/web-security',
    '/resources',
    '/faq',
    '/support',
    '/community',
    '/forum',
    '/events',
    '/leaderboard',
    '/submit-service',
    '/security-policy',
    '/about',
    '/contact',
    '/careers',
    '/terms',
    '/privacy',
    // Alias routes
    '/security-insights',
    '/security-guides',
    '/knowledge-base',
    '/docs',
    '/tutorials',
    '/templates'
  ];

  return routes;
}

export function routeExists(route: string): boolean {
  const validRoutes = extractRoutesFromApp();
  
  // Check for exact matches first
  if (validRoutes.includes(route)) {
    return true;
  }
  
  // Check for dynamic route patterns
  const dynamicRoutes = validRoutes.filter(r => r.includes(':'));
  for (const dynamicRoute of dynamicRoutes) {
    const pattern = dynamicRoute.replace(/:[^/]+/g, '[^/]+');
    const regex = new RegExp(`^${pattern}$`);
    if (regex.test(route)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Check if a navigation path should be considered valid
 */
export function isValidNavigationPath(path: string): boolean {
  // Skip external links and anchors
  if (path.startsWith('http') || path.startsWith('#') || path === '') {
    return true;
  }

  return routeExists(path);
}

/**
 * Get the current route category for styling purposes
 */
export function getRouteCategory(path: string): string {
  if (path.startsWith('/admin')) return 'admin';
  if (path.startsWith('/dashboard')) return 'dashboard';
  if (path.startsWith('/audit')) return 'audit';
  if (['/marketplace', '/enhanced-marketplace', '/request-audit', '/enhanced-request-audit', '/service-provider-onboarding', '/pricing'].includes(path)) return 'marketplace';
  if (['/resources', '/faq', '/support', '/security-audits', '/web3-security', '/vulnerabilities', '/web-security'].includes(path)) return 'resources';
  if (['/forum', '/events', '/community', '/leaderboard'].includes(path)) return 'community';
  if (['/ai-tools', '/vulnerability-scanner', '/code-reviews', '/penetration-testing', '/consulting'].includes(path)) return 'tools';
  if (['/about', '/contact', '/careers', '/terms', '/privacy'].includes(path)) return 'company';
  return 'general';
}

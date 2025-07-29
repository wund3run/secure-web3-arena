
/**
 * Centralized route validation and management system
 * Ensures all routes are properly configured and accessible
 */

import { NavigationLink } from '@/components/layout/navigation/navigation-links';
import { navigationLinks } from '@/components/layout/navigation/navigation-links';

export interface RouteInfo {
  path: string;
  component: string;
  requiresAuth?: boolean;
  allowedRoles?: string[];
  isPublic?: boolean;
  category: 'core' | 'service' | 'resource' | 'community' | 'tools' | 'business' | 'support' | 'user';
}

// Comprehensive route registry - all routes from App.tsx mapped and categorized
export const ROUTE_REGISTRY: RouteInfo[] = [
  // Core Routes
  { path: '/', component: 'Index', isPublic: true, category: 'core' },
  { path: '/auth', component: 'Auth', isPublic: true, category: 'core' },
  { path: '/dashboard', component: 'Dashboard', requiresAuth: true, category: 'core' },
  { path: '/marketplace', component: 'Marketplace', isPublic: true, category: 'core' },
  { path: '/request-audit', component: 'RequestAudit', requiresAuth: true, category: 'core' },
  { path: '/pricing', component: 'Pricing', isPublic: true, category: 'core' },
  { path: '/pricing-inr', component: 'PricingINR', isPublic: true, category: 'core' },
  { path: '/pricing-calculator', component: 'PricingCalculator', isPublic: true, category: 'core' },
  { path: '/contact', component: 'Contact', isPublic: true, category: 'core' },
  { path: '/about', component: 'About', isPublic: true, category: 'core' },
  { path: '/privacy', component: 'Privacy', isPublic: true, category: 'core' },
  { path: '/terms', component: 'Terms', isPublic: true, category: 'core' },

  // Service Routes
  { path: '/security-audits', component: 'SecurityAudits', isPublic: true, category: 'service' },
  { path: '/code-reviews', component: 'CodeReviews', isPublic: true, category: 'service' },
  { path: '/penetration-testing', component: 'PenetrationTesting', isPublic: true, category: 'service' },
  { path: '/consulting', component: 'Consulting', isPublic: true, category: 'service' },

  // Resource Routes
  { path: '/security-guides', component: 'SecurityGuides', isPublic: true, category: 'resource' },
  { path: '/knowledge-base', component: 'KnowledgeBase', isPublic: true, category: 'resource' },
  { path: '/tutorials', component: 'Tutorials', isPublic: true, category: 'resource' },
  { path: '/templates', component: 'Templates', isPublic: true, category: 'resource' },
  { path: '/audit-guidelines', component: 'AuditGuidelines', isPublic: true, category: 'resource' },
  { path: '/vulnerabilities', component: 'VulnerabilityDatabase', isPublic: true, category: 'resource' },

  // Community Routes
  { path: '/forum', component: 'Forum', isPublic: true, category: 'community' },
  { path: '/events', component: 'Events', isPublic: true, category: 'community' },
  { path: '/challenges', component: 'Challenges', isPublic: true, category: 'community' },
  { path: '/leaderboard', component: 'Leaderboard', isPublic: true, category: 'community' },

  // Tools Routes
  { path: '/ai-tools', component: 'AITools', isPublic: true, category: 'tools' },
  { path: '/security-insights', component: 'SecurityInsights', requiresAuth: true, category: 'tools' },
  { path: '/vulnerability-scanner', component: 'VulnerabilityScanner', requiresAuth: true, category: 'tools' },
  { path: '/platform-reports', component: 'PlatformReports', requiresAuth: true, allowedRoles: ['admin', 'auditor'], category: 'tools' },
  { path: '/files', component: 'FileManagement', requiresAuth: true, category: 'tools' },

  // Business Routes
  { path: '/business/contact', component: 'ContactPage', isPublic: true, category: 'business' },
  { path: '/careers', component: 'Careers', isPublic: true, category: 'business' },
  { path: '/business/pricing', component: 'BusinessPricing', isPublic: true, category: 'business' },
  { path: '/partners', component: 'Partners', isPublic: true, category: 'business' },

  // Support Routes
  { path: '/faq', component: 'FAQ', isPublic: true, category: 'support' },
  { path: '/support', component: 'Support', isPublic: true, category: 'support' },
  { path: '/documentation', component: 'Documentation', isPublic: true, category: 'support' },

  // User Routes
  { path: '/profile', component: 'Profile', requiresAuth: true, category: 'user' },
  { path: '/settings', component: 'Settings', requiresAuth: true, category: 'user' },

  // Service Provider
  { path: '/service-provider-onboarding', component: 'ServiceProviderOnboarding', requiresAuth: true, allowedRoles: ['auditor'], category: 'service' }
];

export class RouteValidator {
  /**
   * Validates if a route exists in our registry
   */
  static isValidRoute(path: string): boolean {
    return ROUTE_REGISTRY.some(route => route.path === path);
  }

  /**
   * Gets route information for a given path
   */
  static getRouteInfo(path: string): RouteInfo | null {
    return ROUTE_REGISTRY.find(route => route.path === path) || null;
  }

  /**
   * Validates navigation links against route registry
   */
  static validateNavigationLinks(): { valid: NavigationLink[], invalid: NavigationLink[] } {
    const valid: NavigationLink[] = [];
    const invalid: NavigationLink[] = [];

    const checkLink = (link: NavigationLink) => {
      if (this.isValidRoute(link.href)) {
        valid.push(link);
      } else {
        invalid.push(link);
      }

      // Check children recursively
      if (link.children) {
        link.children.forEach(checkLink);
      }
    };

    navigationLinks.forEach(checkLink);
    return { valid, invalid };
  }

  /**
   * Gets routes by category for better organization
   */
  static getRoutesByCategory(category: RouteInfo['category']): RouteInfo[] {
    return ROUTE_REGISTRY.filter(route => route.category === category);
  }

  /**
   * Gets public routes that don't require authentication
   */
  static getPublicRoutes(): RouteInfo[] {
    return ROUTE_REGISTRY.filter(route => route.isPublic === true);
  }

  /**
   * Gets protected routes that require authentication
   */
  static getProtectedRoutes(): RouteInfo[] {
    return ROUTE_REGISTRY.filter(route => route.requiresAuth === true);
  }

  /**
   * Validates route access for a user with specific roles
   */
  static canAccessRoute(path: string, userRoles: string[] = []): boolean {
    const route = this.getRouteInfo(path);
    if (!route) return false;

    // Public routes are always accessible
    if (route.isPublic) return true;

    // If route requires auth but no roles specified, any authenticated user can access
    if (route.requiresAuth && !route.allowedRoles) return true;

    // Check if user has required roles
    if (route.allowedRoles && route.allowedRoles.length > 0) {
      return route.allowedRoles.some(role => userRoles.includes(role));
    }

    return true;
  }

  /**
   * Generates a health report of all routes
   */
  static generateRouteHealthReport(): {
    totalRoutes: number;
    publicRoutes: number;
    protectedRoutes: number;
    categoryCounts: Record<string, number>;
    navigationHealth: { valid: number; invalid: number };
  } {
    const { valid, invalid } = this.validateNavigationLinks();
    
    const categoryCounts = ROUTE_REGISTRY.reduce((acc, route) => {
      acc[route.category] = (acc[route.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalRoutes: ROUTE_REGISTRY.length,
      publicRoutes: this.getPublicRoutes().length,
      protectedRoutes: this.getProtectedRoutes().length,
      categoryCounts,
      navigationHealth: {
        valid: valid.length,
        invalid: invalid.length
      }
    };
  }
}

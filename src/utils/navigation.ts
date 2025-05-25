
import { Route } from "react-router-dom";
import App from "@/App";

/**
 * Utility to check if a route exists in the application
 * @param path The path to check
 * @returns boolean indicating if the route exists
 */
export const routeExists = (path: string): boolean => {
  // Extract all routes from App.tsx
  const routes = extractRoutesFromApp();
  return routes.includes(path);
};

/**
 * Extract all available routes from App component
 * @returns Array of route paths
 */
export const extractRoutesFromApp = (): string[] => {
  // Updated list with duplicate /dashboard/:type removed
  return [
    "/",
    "/marketplace",
    "/service/:id",
    "/auth",
    "/auth/callback",
    "/auth/2fa",
    "/dashboard",
    "/request-audit",
    "/request-audit/:serviceId",
    "/contact",
    "/audit/:id",
    "/audits",
    "/contact-provider/:id",
    "/pricing",
    "/stats",
    "/resources",
    "/ai-tools",
    "/support",
    "/leaderboard",
    "/achievements",
    "/community",
    "/application-submitted",
    "/audit-guidelines",
    "/service-provider-onboarding",
    "/submit-service",
    "/escrow",
    "/security-insights",
    "/admin",
    "/admin/login",
    "/admin/dashboard",
    "/terms",
    "/privacy",
    "/security-policy",
    "/docs",
    "/blog",
    "/forum",
    "/events",
    "/challenges",
    "/vulnerabilities",
    "/web3-security",
    "/faq",
    "/knowledge-base",
    "/templates",
    "/guides",
    "/tutorials",
    "/roadmap",
    "/platform-report"
  ];
};

/**
 * Get a fallback route if the provided route doesn't exist
 * @param path The path to check
 * @returns A valid route path
 */
export const getFallbackRoute = (path: string): string => {
  if (routeExists(path)) {
    return path;
  }
  
  // Enhanced mapping for common patterns
  const fallbacks: Record<string, string> = {
    "/security-insights": "/web3-security",
    "/learning": "/resources",
    "/documentation": "/docs",
    "/education": "/resources",
    "/help": "/support",
    "/news": "/blog",
    "/learn": "/resources",
    "/providers": "/marketplace",
    "/security": "/web3-security",
    "/articles": "/blog",
    "/guides": "/guides",
    "/faq": "/faq",
    "/knowledge-base": "/knowledge-base",
    "/kb": "/knowledge-base",
    "/knowledge": "/knowledge-base",
    "/templates": "/templates",
    "/template": "/templates",
    "/tutorials": "/tutorials",
    "/tutorial": "/tutorials",
    "/video": "/tutorials",
    "/videos": "/tutorials",
    "/product-roadmap": "/roadmap",
    "/future": "/roadmap",
    "/upcoming": "/roadmap",
    "/plan": "/roadmap"
  };
  
  return fallbacks[path] || "/";
};

/**
 * Get the type/category of a route for analytics purposes
 * @param path The path to analyze
 * @returns The route category
 */
export const getRouteType = (path: string): string => {
  if (path.includes('/admin')) return 'admin';
  if (path.includes('/auth')) return 'auth';
  if (path.includes('/marketplace') || path === '/') return 'marketplace';
  if (path.includes('/audit')) return 'audit';
  if (path.includes('/dashboard')) return 'dashboard';
  if (path.includes('/roadmap')) return 'planning';
  if (['/resources', '/docs', '/blog', '/web3-security', '/guides', '/tutorials', '/knowledge-base', '/faq', '/templates'].includes(path)) return 'educational';
  
  return 'general';
};

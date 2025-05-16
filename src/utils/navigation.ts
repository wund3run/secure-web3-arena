
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
const extractRoutesFromApp = (): string[] => {
  // This is a static list of all available routes in the application
  // Extracted from App.tsx
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
    "/admin",
    "/admin/login",
    "/terms",
    "/privacy",
    "/security-policy",
    "/docs",
    "/blog",
    "/forum",
    "/events",
    "/challenges",
    "/vulnerabilities",
    "/web3-security"
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
  
  // Simple mapping for common patterns
  const fallbacks: Record<string, string> = {
    "/security-insights": "/web3-security",
    "/learning": "/resources",
    "/tutorials": "/blog",
    "/documentation": "/docs",
    "/education": "/resources"
  };
  
  return fallbacks[path] || "/resources";
};

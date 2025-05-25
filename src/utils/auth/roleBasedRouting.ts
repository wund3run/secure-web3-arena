import { User } from "@supabase/supabase-js";
import { getUserRole } from "./roleAccess";

export type UserRole = "general" | "auditor" | "project_owner" | "admin";

// Define allowed routes for each role
export const ROLE_ROUTES: Record<UserRole, string[]> = {
  general: [
    "/",
    "/web3-security",
    "/resources",
    "/guides",
    "/tutorials",
    "/knowledge-base",
    "/community",
    "/forum",
    "/events",
    "/challenges",
    "/templates",
    "/faq",
    "/security-policy",
    "/docs",
    "/audits",
    "/security-insights",
    "/marketplace",
    "/support",
    "/contact",
    "/auth",
    "/service-provider-onboarding"
  ],
  auditor: [
    "/",
    "/marketplace",
    "/audits",
    "/community",
    "/dashboard",
    "/dashboard/auditor",
    "/dashboard/analytics",
    "/submit-service",
    "/audit/:id",
    "/security-insights",
    "/ai-tools",
    "/escrow",
    "/achievements",
    "/leaderboard",
    "/contact-provider",
    "/audit-guidelines"
  ],
  project_owner: [
    "/",
    "/marketplace",
    "/audits",
    "/community",
    "/dashboard",
    "/dashboard/project",
    "/dashboard/analytics",
    "/request-audit",
    "/calendar",
    "/audit/:id",
    "/contact-provider/:id",
    "/security-insights",
    "/escrow",
    "/pricing"
  ],
  admin: [
    "/",
    "/admin",
    "/admin/dashboard",
    "/admin/users",
    "/admin/providers",
    "/admin/audits",
    "/admin/reports",
    "/admin/services",
    "/admin/disputes",
    "/admin/security",
    "/admin/finance",
    "/admin/settings",
    "/escrow",
    "/marketplace",
    "/audits",
    "/community"
  ]
};

// Default redirect paths for each role
export const ROLE_DASHBOARDS: Record<UserRole, string> = {
  general: "/",
  auditor: "/dashboard/auditor",
  project_owner: "/dashboard/project",
  admin: "/admin/dashboard"
};

// Restricted actions for each role
export const ROLE_RESTRICTIONS: Record<UserRole, string[]> = {
  general: [
    "create_audit_request",
    "submit_audit_service",
    "access_admin_panel",
    "manage_users",
    "approve_services"
  ],
  auditor: [
    "create_audit_request",
    "access_admin_panel",
    "manage_users",
    "approve_services"
  ],
  project_owner: [
    "submit_audit_service",
    "access_admin_panel",
    "manage_users",
    "approve_services"
  ],
  admin: [] // Admin has no restrictions
};

/**
 * Check if a user has access to a specific route
 */
export const hasRouteAccess = (
  user: User | null,
  route: string,
  userProfile?: any
): boolean => {
  if (!user) {
    // Non-authenticated users can only access general routes
    return ROLE_ROUTES.general.includes(route) || route.startsWith('/auth');
  }

  const role = getUserRole(user, userProfile) as UserRole;
  const allowedRoutes = ROLE_ROUTES[role];
  
  // Check exact match or pattern match (for dynamic routes)
  return allowedRoutes.some(allowedRoute => {
    if (allowedRoute === route) return true;
    
    // Handle dynamic routes (e.g., /audit/:id)
    if (allowedRoute.includes(':')) {
      const pattern = allowedRoute.replace(/:[^/]+/g, '[^/]+');
      const regex = new RegExp(`^${pattern}$`);
      return regex.test(route);
    }
    
    return false;
  });
};

/**
 * Check if a user can perform a specific action
 */
export const canPerformAction = (
  user: User | null,
  action: string,
  userProfile?: any
): boolean => {
  if (!user) return false;

  const role = getUserRole(user, userProfile) as UserRole;
  const restrictions = ROLE_RESTRICTIONS[role];
  
  return !restrictions.includes(action);
};

/**
 * Get the appropriate dashboard for a user's role
 */
export const getUserDashboard = (
  user: User | null,
  userProfile?: any
): string => {
  if (!user) return "/";

  const role = getUserRole(user, userProfile) as UserRole;
  return ROLE_DASHBOARDS[role];
};

/**
 * Get navigation items filtered by user role
 */
export const getFilteredNavigation = (
  user: User | null,
  navigationItems: any[],
  userProfile?: any
): any[] => {
  if (!user) {
    // Return general navigation for non-authenticated users
    return navigationItems.filter(item => 
      hasRouteAccess(user, item.href, userProfile)
    );
  }

  const role = getUserRole(user, userProfile) as UserRole;
  
  return navigationItems.filter(item => {
    // Check if user has access to main route
    if (!hasRouteAccess(user, item.href, userProfile)) {
      return false;
    }
    
    // Check children routes if they exist
    if (item.children) {
      item.children = item.children.filter((child: any) => 
        hasRouteAccess(user, child.href, userProfile)
      );
      // Keep parent if it has accessible children
      return item.children.length > 0;
    }
    
    return true;
  });
};


import { User } from '@supabase/supabase-js';

export type UserRole = 'general' | 'auditor' | 'project_owner' | 'admin';

export interface UserProfile {
  id: string;
  user_type?: string;
  role?: string;
  [key: string]: any;
}

// Route access control mapping
const ROUTE_ACCESS: Record<string, UserRole[]> = {
  '/': ['general', 'auditor', 'project_owner', 'admin'],
  '/marketplace': ['general', 'auditor', 'project_owner', 'admin'],
  '/auth': ['general'], // Only for non-authenticated users
  '/dashboard': ['auditor', 'project_owner', 'admin'],
  '/dashboard/auditor': ['auditor', 'admin'],
  '/dashboard/project': ['project_owner', 'admin'],
  '/admin': ['admin'],
  '/admin/*': ['admin'],
  '/request-audit': ['project_owner', 'admin'],
  '/service-provider-onboarding': ['auditor', 'admin'],
  '/escrow': ['auditor', 'project_owner', 'admin'],
  '/audits': ['auditor', 'project_owner', 'admin'],
  '/audit/*': ['auditor', 'project_owner', 'admin'],
};

export function getUserRole(user: User | null, userProfile: UserProfile | null): UserRole {
  if (!user) return 'general';
  
  // Check profile for explicit role
  if (userProfile?.role) {
    return userProfile.role as UserRole;
  }
  
  // Fallback to user_type
  if (userProfile?.user_type) {
    return userProfile.user_type as UserRole;
  }
  
  // Default role
  return 'general';
}

export function hasRouteAccess(
  user: User | null, 
  path: string, 
  userProfile: UserProfile | null
): boolean {
  const userRole = getUserRole(user, userProfile);
  
  // Check exact path match first
  if (ROUTE_ACCESS[path]) {
    return ROUTE_ACCESS[path].includes(userRole);
  }
  
  // Check wildcard patterns
  for (const [routePattern, allowedRoles] of Object.entries(ROUTE_ACCESS)) {
    if (routePattern.endsWith('/*')) {
      const baseRoute = routePattern.slice(0, -2);
      if (path.startsWith(baseRoute)) {
        return allowedRoles.includes(userRole);
      }
    }
  }
  
  // Default: allow general access for unspecified routes
  return true;
}

export function canPerformAction(
  user: User | null, 
  action: string, 
  userProfile: UserProfile | null
): boolean {
  const userRole = getUserRole(user, userProfile);
  
  const ACTION_PERMISSIONS: Record<string, UserRole[]> = {
    'create_audit_request': ['project_owner', 'admin'],
    'accept_audit': ['auditor', 'admin'],
    'manage_users': ['admin'],
    'view_all_audits': ['admin'],
    'create_escrow': ['project_owner', 'admin'],
    'release_payment': ['project_owner', 'admin'],
    'submit_findings': ['auditor', 'admin'],
  };
  
  return ACTION_PERMISSIONS[action]?.includes(userRole) || false;
}

export function getUserDashboard(user: User | null, userProfile: UserProfile | null): string {
  const userRole = getUserRole(user, userProfile);
  
  switch (userRole) {
    case 'admin':
      return '/admin/dashboard';
    case 'auditor':
      return '/dashboard/auditor';
    case 'project_owner':
      return '/dashboard/project';
    default:
      return '/';
  }
}

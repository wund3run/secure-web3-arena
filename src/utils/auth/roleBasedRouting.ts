
import { User, UserProfile } from '@/contexts/auth/types';

// Define user roles and permissions
export type UserRole = 'general' | 'auditor' | 'project_owner' | 'admin';

export interface RoutePermission {
  path: string;
  allowedRoles: UserRole[];
  requiresAuth: boolean;
}

export interface NavigationItem {
  title: string;
  href: string;
  description?: string;
  children?: NavigationItem[];
}

// Define route permissions
export const routePermissions: RoutePermission[] = [
  { path: '/', allowedRoles: ['general', 'auditor', 'project_owner', 'admin'], requiresAuth: false },
  { path: '/marketplace', allowedRoles: ['general', 'auditor', 'project_owner', 'admin'], requiresAuth: false },
  { path: '/audits', allowedRoles: ['auditor', 'project_owner', 'admin'], requiresAuth: true },
  { path: '/request-audit', allowedRoles: ['project_owner', 'admin'], requiresAuth: true },
  { path: '/service-provider-onboarding', allowedRoles: ['auditor', 'admin'], requiresAuth: true },
  { path: '/dashboard', allowedRoles: ['auditor', 'project_owner', 'admin'], requiresAuth: true },
  { path: '/tutorials', allowedRoles: ['general', 'auditor', 'project_owner', 'admin'], requiresAuth: false },
  { path: '/admin/dashboard', allowedRoles: ['admin'], requiresAuth: true },
  { path: '/advanced-features', allowedRoles: ['auditor', 'project_owner', 'admin'], requiresAuth: true },
];

// Get user role from profile
export function getUserRole(user: User | null, userProfile: UserProfile | null): UserRole {
  if (!user) return 'general';
  
  // Check if admin (you can implement your own admin logic here)
  if (user.email?.endsWith('@hawkly.admin')) return 'admin';
  
  // Return role from profile
  if (userProfile?.user_type === 'admin') return 'admin';
  if (userProfile?.user_type === 'auditor') return 'auditor';
  if (userProfile?.user_type === 'project_owner') return 'project_owner';
  
  return 'general';
}

// Check if user has access to route
export function hasRouteAccess(user: User | null, path: string, userProfile: UserProfile | null): boolean {
  const permission = routePermissions.find(p => p.path === path);
  
  if (!permission) {
    // Allow access to undefined routes for flexibility
    return true;
  }
  
  if (permission.requiresAuth && !user) {
    return false;
  }
  
  const userRole = getUserRole(user, userProfile);
  return permission.allowedRoles.includes(userRole);
}

// Filter navigation items based on user role
export function getFilteredNavigation(user: User | null, navigationItems: NavigationItem[], userProfile: UserProfile | null): NavigationItem[] {
  const userRole = getUserRole(user, userProfile);
  
  return navigationItems.filter(item => {
    // For now, show all navigation items
    // You can implement role-based filtering here if needed
    return true;
  });
}

// Check if user can perform specific action
export function canPerformAction(user: User | null, action: string, userProfile: UserProfile | null): boolean {
  const userRole = getUserRole(user, userProfile);
  
  // Define action permissions
  const actionPermissions: Record<string, UserRole[]> = {
    'create_audit_request': ['project_owner', 'admin'],
    'accept_audit_request': ['auditor', 'admin'],
    'manage_escrow': ['auditor', 'project_owner', 'admin'],
    'resolve_disputes': ['admin'],
    'access_admin_features': ['admin'],
    'view_analytics': ['auditor', 'project_owner', 'admin'],
    'manage_profile': ['auditor', 'project_owner', 'admin'],
    'submit_audit_service': ['auditor', 'admin'],
    'access_admin_panel': ['admin'],
  };
  
  const allowedRoles = actionPermissions[action] || [];
  return allowedRoles.includes(userRole);
}

// Get dashboard URL based on user role
export function getUserDashboard(user: User | null, userProfile: UserProfile | null): string {
  const userRole = getUserRole(user, userProfile);
  
  switch (userRole) {
    case 'admin':
      return '/admin/dashboard';
    case 'auditor':
    case 'project_owner':
      return '/dashboard';
    default:
      return '/';
  }
}

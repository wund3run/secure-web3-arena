
import { User } from '@supabase/supabase-js';
import { UserProfile } from '@/contexts/auth/types';

export interface RouteConfig {
  path: string;
  allowedRoles: ('auditor' | 'project_owner' | 'admin' | 'general' | 'visitor')[];
  requiresAuth: boolean;
}

export interface NavigationItem {
  title: string;
  href: string;
  description?: string;
  children?: NavigationItem[];
  allowedRoles?: ('auditor' | 'project_owner' | 'admin' | 'general' | 'visitor')[];
}

const routes: RouteConfig[] = [
  { path: '/', allowedRoles: ['auditor', 'project_owner', 'admin', 'general', 'visitor'], requiresAuth: false },
  { path: '/auth', allowedRoles: ['visitor'], requiresAuth: false },
  { path: '/marketplace', allowedRoles: ['auditor', 'project_owner', 'admin', 'general'], requiresAuth: false },
  { path: '/request-audit', allowedRoles: ['project_owner', 'admin'], requiresAuth: false },
  { path: '/dashboard', allowedRoles: ['auditor', 'project_owner', 'admin'], requiresAuth: true },
  { path: '/profile', allowedRoles: ['auditor', 'project_owner', 'admin'], requiresAuth: true },
  { path: '/settings', allowedRoles: ['auditor', 'project_owner', 'admin'], requiresAuth: true },
  { path: '/audits', allowedRoles: ['auditor', 'project_owner', 'admin'], requiresAuth: true },
  { path: '/admin', allowedRoles: ['admin'], requiresAuth: true },
];

export const hasRouteAccess = (
  user: User | null,
  pathname: string,
  userProfile?: UserProfile | null
): boolean => {
  const route = routes.find(r => pathname.startsWith(r.path));
  if (!route) return true; // Allow access to unknown routes by default

  // Check if authentication is required
  if (route.requiresAuth && !user) {
    return false;
  }

  // Get user role
  const userRole = getUserRole(user, userProfile);

  // Check if user role is allowed for this route
  return route.allowedRoles.includes(userRole);
};

export const getUserRole = (
  user: User | null,
  userProfile?: UserProfile | null
): 'auditor' | 'project_owner' | 'admin' | 'general' | 'visitor' => {
  if (!user) return 'visitor';
  
  // Check userProfile first
  if (userProfile?.user_type) {
    return userProfile.user_type;
  }
  
  // Fall back to user metadata
  return user.user_metadata?.user_type || 'general';
};

export const getUserDashboard = (
  user: User | null,
  userProfile?: UserProfile | null
): string => {
  const role = getUserRole(user, userProfile);
  
  switch (role) {
    case 'admin':
      return '/admin';
    case 'auditor':
      return '/dashboard';
    case 'project_owner':
      return '/dashboard';
    default:
      return '/dashboard';
  }
};

export const canPerformAction = (
  user: User | null,
  action: string,
  userProfile?: UserProfile | null
): boolean => {
  const role = getUserRole(user, userProfile);
  
  const permissions: Record<string, string[]> = {
    'create_audit_request': ['project_owner', 'admin'],
    'review_audit': ['auditor', 'admin'],
    'manage_users': ['admin'],
    'view_marketplace': ['auditor', 'project_owner', 'admin', 'general'],
    'access_dashboard': ['auditor', 'project_owner', 'admin'],
  };
  
  return permissions[action]?.includes(role) || false;
};

export const getFilteredNavigation = (
  user: User | null,
  navigationItems: NavigationItem[],
  userProfile?: UserProfile | null
): NavigationItem[] => {
  const userRole = getUserRole(user, userProfile);
  
  return navigationItems.filter(item => {
    // If no role restrictions, show to everyone
    if (!item.allowedRoles) return true;
    
    // Check if user role is allowed
    return item.allowedRoles.includes(userRole);
  }).map(item => {
    // Filter children if they exist
    if (item.children) {
      return {
        ...item,
        children: item.children.filter(child => {
          if (!child.allowedRoles) return true;
          return child.allowedRoles.includes(userRole);
        })
      };
    }
    return item;
  });
};

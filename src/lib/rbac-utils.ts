import { UserRole } from '@/contexts/RBACContext';

/**
 * Helper functions for working with RBAC throughout the application
 */

/**
 * Gets the display name for a user role
 */
export function getRoleDisplayName(role: UserRole): string {
  const roleMap: Record<UserRole, string> = {
    admin: 'Administrator',
    auditor: 'Security Auditor',
    projectOwner: 'Project Owner',
    serviceProvider: 'Service Provider',
    guest: 'Guest User'
  };
  
  return roleMap[role] || role;
}

/**
 * Gets the color for a user role
 */
export function getRoleColor(role: UserRole): string {
  const colorMap: Record<UserRole, string> = {
    admin: 'text-red-500',
    auditor: 'text-blue-500',
    projectOwner: 'text-green-500',
    serviceProvider: 'text-purple-500',
    guest: 'text-gray-500'
  };
  
  return colorMap[role] || 'text-gray-500';
}

/**
 * Gets the badge color for a user role
 */
export function getRoleBadgeColor(role: UserRole): string {
  const colorMap: Record<UserRole, string> = {
    admin: 'bg-red-600 text-white',
    auditor: 'bg-blue-600 text-white',
    projectOwner: 'bg-green-600 text-white',
    serviceProvider: 'bg-purple-600 text-white',
    guest: 'bg-gray-600 text-white'
  };
  
  return colorMap[role] || 'bg-gray-600 text-white';
}

/**
 * Gets the description for a user role
 */
export function getRoleDescription(role: UserRole): string {
  const descriptionMap: Record<UserRole, string> = {
    admin: 'Full access to all platform features and admin functions',
    auditor: 'Security auditor with specialized access to audit tools and marketplace',
    projectOwner: 'Can create and manage projects, request audits, and access project analytics',
    serviceProvider: 'Service provider with access to provider tools and marketplace',
    guest: 'Limited access to public features'
  };
  
  return descriptionMap[role] || 'Unknown role';
}

/**
 * Returns the list of permissions typically assigned to a role
 * Useful for showing what permissions a role typically has
 */
export function getTypicalRolePermissions(role: UserRole): string[] {
  const permissionsMap: Record<UserRole, string[]> = {
    admin: [
      'admin.access',
      'admin.dashboard.view',
      'admin.users.manage',
      'admin.settings.manage',
      'analytics.basic.view',
      'analytics.dashboard.view',
      'analytics.live.view',
      'security.insights.view',
      'security.compliance.manage',
      'enterprise.access'
    ],
    auditor: [
      'analytics.basic.view',
      'security.insights.view',
      'audit.tools.access',
      'audit.reports.create',
      'audit.metrics.view'
    ],
    projectOwner: [
      'enterprise.access',
      'project.create',
      'project.manage',
      'project.analytics.view',
      'audit.request'
    ],
    serviceProvider: [
      'provider.access',
      'services.manage',
      'analytics.basic.view',
      'marketplace.access'
    ],
    guest: [
      'public.access'
    ]
  };
  
  return permissionsMap[role] || [];
}

/**
 * Checks if a user has sufficient permissions for a specific feature
 */
export function canAccessFeature(userPermissions: string[], requiredPermission: string): boolean {
  // Special case: admin.* permission grants access to all admin features
  if (requiredPermission.startsWith('admin.') && userPermissions.includes('admin.*')) {
    return true;
  }
  
  return userPermissions.includes(requiredPermission);
}

/**
 * Gets access level description (e.g. for tooltips)
 */
export function getAccessLevelDescription(requiredRole: UserRole | UserRole[]): string {
  if (Array.isArray(requiredRole)) {
    if (requiredRole.length === 0) return 'No access';
    
    if (requiredRole.includes('admin')) {
      if (requiredRole.length === 1) return 'Admin only';
      if (requiredRole.includes('auditor')) {
        if (requiredRole.length === 2) return 'Admin and Auditors only';
        return 'Admin, Auditors, and others';
      }
    }
    
    if (requiredRole.includes('auditor')) {
      if (requiredRole.length === 1) return 'Auditors only';
      return 'Auditors and others';
    }
    
    return 'Restricted access';
  }
  
  // Single role requirement
  return `${getRoleDisplayName(requiredRole)} only`;
}

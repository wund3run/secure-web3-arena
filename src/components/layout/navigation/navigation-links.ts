
import { User } from '@supabase/supabase-js';

export interface NavigationLink {
  href: string;
  label: string;
  description: string;
  requiresAuth?: boolean;
  allowedRoles?: string[];
  children?: NavigationLink[];
}

export const navigationLinks: NavigationLink[] = [
  {
    href: "/",
    label: "Home",
    description: "Return to the main page"
  },
  {
    href: "/marketplace",
    label: "Marketplace",
    description: "Browse security services and auditors"
  },
  {
    href: "/request-audit",
    label: "Request Audit",
    description: "Submit your project for security audit"
  },
  {
    href: "/security-monitoring",
    label: "Security Monitoring",
    description: "Continuous security monitoring and threat detection",
    requiresAuth: true
  },
  {
    href: "/enterprise-control",
    label: "Enterprise Control",
    description: "Advanced enterprise features and compliance",
    requiresAuth: true,
    allowedRoles: ["admin", "project_owner"]
  },
  {
    href: "/audits",
    label: "Audits",
    description: "View audit reports and findings"
  },
  {
    href: "/pricing",
    label: "Pricing",
    description: "View pricing plans and features"
  },
  {
    href: "/resources",
    label: "Resources",
    description: "Documentation, guides, and tutorials"
  },
  {
    href: "/community",
    label: "Community",
    description: "Forums, events, and discussions"
  },
  {
    href: "/contact",
    label: "Contact",
    description: "Get in touch with our team"
  }
];

export const dashboardLinks: NavigationLink[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    description: "Main dashboard overview"
  },
  {
    href: "/dashboard/auditor",
    label: "Auditor Dashboard",
    description: "Auditor-specific dashboard",
    allowedRoles: ["auditor", "admin"]
  },
  {
    href: "/dashboard/project",
    label: "Project Dashboard",
    description: "Project owner dashboard",
    allowedRoles: ["project_owner", "admin"]
  },
  {
    href: "/escrow",
    label: "Escrow Management",
    description: "Manage escrow contracts and payments",
    requiresAuth: true
  },
  {
    href: "/messages",
    label: "Messages",
    description: "Communication center",
    requiresAuth: true
  },
  {
    href: "/settings",
    label: "Settings",
    description: "Account and security settings",
    requiresAuth: true
  }
];

export const adminLinks: NavigationLink[] = [
  {
    href: "/admin",
    label: "Admin Panel",
    description: "Platform administration",
    allowedRoles: ["admin"]
  },
  {
    href: "/admin/users",
    label: "User Management",
    description: "Manage platform users",
    allowedRoles: ["admin"]
  },
  {
    href: "/admin/audits",
    label: "Audit Management",
    description: "Oversee all audits",
    allowedRoles: ["admin"]
  },
  {
    href: "/admin/reports",
    label: "Reports",
    description: "Platform analytics and reports",
    allowedRoles: ["admin"]
  }
];

// Helper function to filter links based on user permissions
export const getFilteredLinks = (
  links: NavigationLink[], 
  user: any, 
  userType: string
): NavigationLink[] => {
  return links.filter(link => {
    // If link doesn't require auth, show it
    if (!link.requiresAuth) return true;
    
    // If user is not authenticated but link requires auth, hide it
    if (!user && link.requiresAuth) return false;
    
    // If link has role restrictions, check user role
    if (link.allowedRoles && link.allowedRoles.length > 0) {
      return link.allowedRoles.includes(userType);
    }
    
    // If user is authenticated and no specific roles required, show it
    return true;
  });
};

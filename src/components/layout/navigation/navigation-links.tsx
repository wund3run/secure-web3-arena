
// Define the NavigationLinkItem interface and export it
export interface NavigationLinkItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
}

// Export the navigation structure interface
export interface NavigationLinksStructure {
  marketplace: NavigationLinkItem[];
  audits: NavigationLinkItem[];
  resources: NavigationLinkItem[];
  dashboards: NavigationLinkItem[];
}

// Define navigation links with improved descriptions and organization
export const navigationLinks: NavigationLinksStructure = {
  marketplace: [
    {
      title: "Browse Services",
      href: "/marketplace",
      description: "Explore available security services and auditors"
    },
    {
      title: "Request Audit",
      href: "/request-audit",
      description: "Submit your project for security review"
    },
    {
      title: "Add Service",
      href: "/services/new",
      description: "List your security service on our marketplace"
    },
    {
      title: "Pricing",
      href: "/pricing",
      description: "View pricing plans and subscription options"
    }
  ],
  audits: [
    {
      title: "Find Auditors",
      href: "/audits/find",
      description: "Search for qualified security auditors"
    },
    {
      title: "Audit Types",
      href: "/audits/types",
      description: "Learn about different audit methodologies"
    },
    {
      title: "Security Guidelines",
      href: "/audit-guidelines",
      description: "Best practices for secure development"
    },
    {
      title: "Recent Reports",
      href: "/audits/reports",
      description: "View recently completed security audits",
      badge: "New"
    }
  ],
  resources: [
    {
      title: "Documentation",
      href: "/docs",
      description: "Comprehensive guides and references"
    },
    {
      title: "Security Blog",
      href: "/blog",
      description: "Latest articles on Web3 security"
    },
    {
      title: "Platform Audit",
      href: "/platform-report",
      description: "UI/UX audit report of our platform"
    },
    {
      title: "Forum",
      href: "/forum",
      description: "Community discussions on security topics"
    },
    {
      title: "Resource Center",
      href: "/resources",
      description: "Comprehensive security resources"
    }
  ],
  dashboards: [
    {
      title: "Auditor Overview",
      href: "/dashboard/auditor",
      description: "Access your auditor dashboard"
    },
    {
      title: "Project Overview",
      href: "/dashboard/project",
      description: "Access your project dashboard"
    },
    {
      title: "Profile Settings",
      href: "/dashboard/settings",
      description: "Manage your account preferences"
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      description: "View performance metrics and insights"
    }
  ]
};

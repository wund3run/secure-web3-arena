
export interface NavigationLink {
  title: string;
  href: string;
  description?: string;
  children?: NavigationLink[];
  requiresAuth?: boolean; // New property to indicate if authentication is required
}

export const navigationLinks: NavigationLink[] = [
  {
    title: "Services",
    href: "/marketplace",
    requiresAuth: true, // Only show to authenticated users
    children: [
      {
        title: "Security Audits",
        href: "/marketplace",
        description: "Comprehensive smart contract security reviews"
      },
      {
        title: "Code Reviews",
        href: "/marketplace",
        description: "Expert code analysis and feedback"
      },
      {
        title: "Penetration Testing",
        href: "/marketplace",
        description: "Advanced security vulnerability testing"
      },
      {
        title: "Consulting",
        href: "/marketplace",
        description: "Strategic security guidance and planning"
      }
    ]
  },
  {
    title: "Resources",
    href: "/resources",
    requiresAuth: true, // Only show to authenticated users
    children: [
      {
        title: "Security Guides",
        href: "/guides",
        description: "Best practices and security guidelines"
      },
      {
        title: "Knowledge Base",
        href: "/knowledge-base",
        description: "Comprehensive security documentation"
      },
      {
        title: "Tutorials",
        href: "/tutorials",
        description: "Step-by-step security tutorials"
      },
      {
        title: "Templates",
        href: "/templates",
        description: "Ready-to-use security templates"
      }
    ]
  },
  {
    title: "Tools",
    href: "/security-insights",
    requiresAuth: true, // Only show to authenticated users
    children: [
      {
        title: "Security Insights",
        href: "/security-insights",
        description: "Real-time vulnerability analysis"
      },
      {
        title: "AI Tools",
        href: "/ai-tools",
        description: "AI-powered security analysis tools"
      },
      {
        title: "Vulnerability Scanner",
        href: "/vulnerabilities",
        description: "Automated security scanning"
      },
      {
        title: "Platform Reports",
        href: "/platform-report",
        description: "Comprehensive security reports"
      }
    ]
  },
  {
    title: "Community",
    href: "/community",
    requiresAuth: true, // Only show to authenticated users
    children: [
      {
        title: "Forum",
        href: "/forum",
        description: "Community discussions and support"
      },
      {
        title: "Events",
        href: "/events",
        description: "Security events and workshops"
      },
      {
        title: "Challenges",
        href: "/challenges",
        description: "Security challenges and competitions"
      },
      {
        title: "Leaderboard",
        href: "/leaderboard",
        description: "Top security experts rankings"
      }
    ]
  }
];


export interface NavigationLink {
  title: string;
  href: string;
  description?: string;
  children?: NavigationLink[];
  requiresAuth?: boolean;
  isPublic?: boolean; // Explicitly public, shown to all users
}

export const navigationLinks: NavigationLink[] = [
  {
    title: "Services",
    href: "/marketplace",
    isPublic: true,
    children: [
      {
        title: "Browse Services",
        href: "/marketplace",
        description: "Find security experts for your project",
        isPublic: true
      },
      {
        title: "Request Audit",
        href: "/request-audit",
        description: "Submit your project for security review",
        isPublic: true
      },
      {
        title: "Security Audits",
        href: "/security-audits",
        description: "Comprehensive smart contract security reviews",
        requiresAuth: true
      },
      {
        title: "Code Reviews",
        href: "/code-reviews",
        description: "Expert code analysis and feedback",
        requiresAuth: true
      },
      {
        title: "Penetration Testing",
        href: "/penetration-testing",
        description: "Advanced security vulnerability testing",
        requiresAuth: true
      },
      {
        title: "Consulting",
        href: "/consulting",
        description: "Strategic security guidance and planning",
        requiresAuth: true
      }
    ]
  },
  {
    title: "Resources",
    href: "/resources",
    isPublic: true,
    children: [
      {
        title: "Security Guides",
        href: "/resources",
        description: "Best practices and security guidelines",
        isPublic: true
      },
      {
        title: "Knowledge Base",
        href: "/knowledge-base",
        description: "Comprehensive security documentation",
        isPublic: true
      },
      {
        title: "Audit Reports",
        href: "/audits",
        description: "Browse completed security audits",
        isPublic: true
      },
      {
        title: "Tutorials",
        href: "/tutorials",
        description: "Step-by-step security tutorials",
        isPublic: true
      },
      {
        title: "Templates",
        href: "/templates",
        description: "Ready-to-use security templates",
        requiresAuth: true
      }
    ]
  },
  {
    title: "Tools",
    href: "/security-monitoring",
    requiresAuth: true,
    children: [
      {
        title: "Security Monitoring",
        href: "/security-monitoring",
        description: "Continuous security monitoring dashboard",
        requiresAuth: true
      },
      {
        title: "Enterprise Control",
        href: "/enterprise-control",
        description: "Enterprise security management center",
        requiresAuth: true
      },
      {
        title: "AI Tools",
        href: "/ai-tools",
        description: "AI-powered security analysis tools",
        requiresAuth: true
      },
      {
        title: "Vulnerability Scanner",
        href: "/vulnerability-scanner",
        description: "Automated security scanning",
        requiresAuth: true
      }
    ]
  },
  {
    title: "Community",
    href: "/community",
    isPublic: true,
    children: [
      {
        title: "Join Community",
        href: "/community",
        description: "Connect with security experts",
        isPublic: true
      },
      {
        title: "Forum",
        href: "/forum",
        description: "Community discussions and support",
        isPublic: true
      },
      {
        title: "Events",
        href: "/events",
        description: "Security events and workshops",
        isPublic: true
      },
      {
        title: "Challenges",
        href: "/challenges",
        description: "Security challenges and competitions",
        requiresAuth: true
      },
      {
        title: "Leaderboard",
        href: "/leaderboard",
        description: "Top security experts rankings",
        isPublic: true
      }
    ]
  },
  {
    title: "Pricing",
    href: "/pricing",
    isPublic: true
  }
];


export const navigationLinks = [
  {
    label: "Services",
    href: "/marketplace",
    children: [
      {
        label: "Browse Services",
        href: "/marketplace",
        description: "Find security experts for your project"
      },
      {
        label: "Security Audits",
        href: "/security-audits",
        description: "Comprehensive smart contract audits"
      },
      {
        label: "Code Reviews",
        href: "/code-reviews",
        description: "Expert code analysis and review"
      },
      {
        label: "Penetration Testing",
        href: "/penetration-testing",
        description: "Advanced security testing"
      },
      {
        label: "Security Consulting",
        href: "/consulting",
        description: "Strategic security guidance"
      },
      {
        label: "Request Audit",
        href: "/request-audit",
        description: "Submit your project for review"
      }
    ]
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      {
        label: "Security Guides",
        href: "/resources",
        description: "Best practices and tutorials"
      },
      {
        label: "Vulnerability Database",
        href: "/vulnerabilities",
        description: "Known security issues and fixes"
      },
      {
        label: "Audit Reports",
        href: "/audits",
        description: "Browse completed security audits",
        requiresAuth: true
      },
      {
        label: "Documentation",
        href: "/docs",
        description: "Platform guides and API docs"
      },
      {
        label: "FAQ",
        href: "/faq",
        description: "Frequently asked questions"
      },
      {
        label: "Support",
        href: "/support",
        description: "Get help from our team"
      }
    ]
  },
  {
    label: "Tools",
    href: "/security-monitoring",
    children: [
      {
        label: "Security Monitoring",
        href: "/security-monitoring",
        description: "Real-time security monitoring dashboard",
        requiresAuth: true
      },
      {
        label: "Enterprise Control",
        href: "/enterprise-control",
        description: "Enterprise security management center",
        requiresAuth: true
      }
    ]
  },
  {
    label: "Community",
    href: "/community",
    children: [
      {
        label: "Join Community",
        href: "/community",
        description: "Connect with security experts"
      },
      {
        label: "Forum",
        href: "/forum",
        description: "Discuss security topics"
      },
      {
        label: "Events",
        href: "/events",
        description: "Security meetups and workshops"
      },
      {
        label: "Leaderboard",
        href: "/leaderboard",
        description: "Top security contributors"
      },
      {
        label: "Careers",
        href: "/careers",
        description: "Join the Hawkly team"
      }
    ]
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    requiresAuth: true
  },
  {
    label: "My Audits",
    href: "/audits",
    requiresAuth: true
  }
];

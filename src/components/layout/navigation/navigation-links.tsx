
export const navigationLinks = [
  {
    title: "Services",
    href: "/marketplace",
    children: [
      {
        title: "Browse Services",
        href: "/marketplace",
        description: "Find security experts for your project"
      },
      {
        title: "Security Audits",
        href: "/security-audits",
        description: "Comprehensive smart contract audits"
      },
      {
        title: "Code Reviews",
        href: "/code-reviews",
        description: "Expert code analysis and review"
      },
      {
        title: "Penetration Testing",
        href: "/penetration-testing",
        description: "Advanced security testing"
      },
      {
        title: "Security Consulting",
        href: "/consulting",
        description: "Strategic security guidance"
      },
      {
        title: "Request Audit",
        href: "/request-audit",
        description: "Submit your project for review"
      }
    ]
  },
  {
    title: "Resources",
    href: "/resources",
    children: [
      {
        title: "Security Guides",
        href: "/resources",
        description: "Best practices and tutorials"
      },
      {
        title: "Vulnerability Database",
        href: "/vulnerabilities",
        description: "Known security issues and fixes"
      },
      {
        title: "Audit Reports",
        href: "/audits",
        description: "Browse completed security audits",
        requiresAuth: true
      },
      {
        title: "FAQ",
        href: "/faq",
        description: "Frequently asked questions"
      },
      {
        title: "Support",
        href: "/support",
        description: "Get help from our team"
      }
    ]
  },
  {
    title: "Community",
    href: "/community",
    children: [
      {
        title: "Join Community",
        href: "/community",
        description: "Connect with security experts"
      },
      {
        title: "Web3 Security",
        href: "/web3-security",
        description: "Learn about Web3 security"
      },
      {
        title: "AI Tools",
        href: "/ai-tools",
        description: "AI-powered security tools"
      },
      {
        title: "Careers",
        href: "/careers",
        description: "Join the Hawkly team"
      }
    ]
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    requiresAuth: true
  },
  {
    title: "My Audits",
    href: "/audits",
    requiresAuth: true
  }
];

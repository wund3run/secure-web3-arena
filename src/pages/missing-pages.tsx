import React from 'react';
import { PlaceholderPage } from './placeholder-template';
import { 
  FileText, 
  Book, 
  Package,
  Truck,
  RefreshCw,
  MessageSquare,
  Calendar,
  Target,
  Trophy,
  Newspaper,
  Award,
  BarChart3,
  Monitor,
  DollarSign,
  UserCheck,
  FileCheck,
  Settings,
  Users,
  Brain,
  Lock,
  User,
  Code,
  Gavel,
  Shield
} from 'lucide-react';

// Tutorial and Template Pages
export const Tutorials = () => {
  return (
    <PlaceholderPage
      title="Security Tutorials"
      description="Step-by-step tutorials for Web3 security, smart contract development, and vulnerability prevention."
      icon={<Book className="h-6 w-6" />}
      features={[
        "Interactive tutorials",
        "Code walkthroughs",
        "Best practice guides",
        "Security patterns"
      ]}
    />
  );
};

export const Templates = () => {
  return (
    <PlaceholderPage
      title="Security Templates"
      description="Ready-to-use templates for security audits, smart contracts, and development best practices."
      icon={<Package className="h-6 w-6" />}
      features={[
        "Audit checklists",
        "Smart contract templates",
        "Security frameworks",
        "Testing templates"
      ]}
    />
  );
};

// Legal Pages
export const Terms = () => {
  return (
    <PlaceholderPage
      title="Terms of Service"
      description="Review our terms of service, user agreements, and platform policies for using Hawkly's security marketplace."
      icon={<FileText className="h-6 w-6" />}
      features={[
        "Service terms",
        "User agreements",
        "Platform policies",
        "Usage guidelines"
      ]}
    />
  );
};

export const Privacy = () => {
  return (
    <PlaceholderPage
      title="Privacy Policy"
      description="Learn how we protect your data, handle user information, and maintain privacy across our security platform."
      icon={<Shield className="h-6 w-6" />}
      features={[
        "Data protection",
        "Privacy controls",
        "Information handling",
        "Security measures"
      ]}
    />
  );
};

export const SecurityPolicy = () => {
  return (
    <PlaceholderPage
      title="Security Policy"
      description="Our comprehensive security policy covering platform security, data protection, and vulnerability disclosure."
      icon={<Lock className="h-6 w-6" />}
      features={[
        "Platform security",
        "Vulnerability disclosure",
        "Security standards",
        "Incident response"
      ]}
    />
  );
};

export const AuditGuidelines = () => {
  return (
    <PlaceholderPage
      title="Audit Guidelines"
      description="Comprehensive guidelines for security auditors, including standards, processes, and best practices for Web3 audits."
      icon={<FileCheck className="h-6 w-6" />}
      features={[
        "Audit standards",
        "Process guidelines",
        "Quality assurance",
        "Best practices"
      ]}
    />
  );
};

// Shipping and Delivery (for services)
export const ShippingDelivery = () => {
  return (
    <PlaceholderPage
      title="Service Delivery"
      description="Information about our audit delivery process, timelines, and what to expect from our security services."
      icon={<Truck className="h-6 w-6" />}
      features={[
        "Delivery timelines",
        "Report formats",
        "Communication process",
        "Quality assurance"
      ]}
    />
  );
};

// Cancellation and Refund Policy
export const CancellationRefund = () => {
  return (
    <PlaceholderPage
      title="Cancellation & Refund Policy"
      description="Review our policies for audit cancellations, refunds, and service modifications."
      icon={<RefreshCw className="h-6 w-6" />}
      features={[
        "Cancellation terms",
        "Refund conditions",
        "Service modifications",
        "Policy exceptions"
      ]}
    />
  );
};

// Community Pages
export const Forum = () => {
  return (
    <PlaceholderPage
      title="Security Forum"
      description="Connect with other security professionals, share insights, and discuss the latest Web3 security trends."
      icon={<MessageSquare className="h-6 w-6" />}
      features={[
        "Discussion threads",
        "Expert insights",
        "Community Q&A",
        "Security news"
      ]}
    />
  );
};

export const Events = () => {
  return (
    <PlaceholderPage
      title="Security Events"
      description="Join webinars, workshops, and conferences focused on Web3 security and blockchain development."
      icon={<Calendar className="h-6 w-6" />}
      features={[
        "Live webinars",
        "Workshop recordings",
        "Conference updates",
        "Expert sessions"
      ]}
    />
  );
};

export const Challenges = () => {
  return (
    <PlaceholderPage
      title="Security Challenges"
      description="Test your skills with security challenges, CTF competitions, and vulnerability hunting exercises."
      icon={<Target className="h-6 w-6" />}
      features={[
        "CTF competitions",
        "Skill assessments",
        "Bug bounties",
        "Learning challenges"
      ]}
    />
  );
};

export const Leaderboard = () => {
  return (
    <PlaceholderPage
      title="Security Leaderboard"
      description="Track top performers in security audits, bug bounties, and community contributions."
      icon={<Trophy className="h-6 w-6" />}
      features={[
        "Auditor rankings",
        "Bug bounty scores",
        "Community points",
        "Achievement levels"
      ]}
    />
  );
};

export const Blog = () => {
  return (
    <PlaceholderPage
      title="Security Blog"
      description="Stay updated with the latest security insights, research findings, and industry analysis."
      icon={<Newspaper className="h-6 w-6" />}
      features={[
        "Security research",
        "Industry insights",
        "Case studies",
        "Expert opinions"
      ]}
    />
  );
};

export const Achievements = () => {
  return (
    <PlaceholderPage
      title="Achievements"
      description="Track your progress and earn badges for completing audits, finding vulnerabilities, and contributing to security."
      icon={<Award className="h-6 w-6" />}
      features={[
        "Achievement badges",
        "Progress tracking",
        "Skill certifications",
        "Recognition system"
      ]}
    />
  );
};

// Platform and Analysis Pages
export const SecurityInsights = () => {
  return (
    <PlaceholderPage
      title="Security Insights"
      description="Advanced analytics and insights about Web3 security trends, vulnerability patterns, and threat intelligence."
      icon={<Brain className="h-6 w-6" />}
      features={[
        "Threat intelligence",
        "Vulnerability trends",
        "Risk analytics",
        "Security metrics"
      ]}
    />
  );
};

export const Vulnerabilities = () => {
  return (
    <PlaceholderPage
      title="Vulnerability Database"
      description="Comprehensive database of known vulnerabilities, exploits, and security patterns in Web3 applications."
      icon={<Lock className="h-6 w-6" />}
      features={[
        "CVE database",
        "Exploit patterns",
        "Security advisories",
        "Mitigation guides"
      ]}
    />
  );
};

export const PlatformReport = () => {
  return (
    <PlaceholderPage
      title="Platform Analytics"
      description="Comprehensive analytics and reporting dashboard for platform performance and security metrics."
      icon={<BarChart3 className="h-6 w-6" />}
      features={[
        "Security metrics",
        "Platform analytics",
        "Performance reports",
        "Trend analysis"
      ]}
    />
  );
};

// Admin Pages
export const AdminDashboard = () => {
  return (
    <PlaceholderPage
      title="Admin Dashboard"
      description="Administrative dashboard for platform management, user oversight, and system monitoring."
      icon={<Monitor className="h-6 w-6" />}
      features={[
        "User management",
        "System monitoring",
        "Audit oversight",
        "Platform analytics"
      ]}
    />
  );
};

export const AdminUsers = () => {
  return (
    <PlaceholderPage
      title="User Management"
      description="Manage user accounts, permissions, and access controls for the security platform."
      icon={<User className="h-6 w-6" />}
      features={[
        "User accounts",
        "Permission management",
        "Access controls",
        "Account verification"
      ]}
    />
  );
};

export const AdminAudits = () => {
  return (
    <PlaceholderPage
      title="Audit Management"
      description="Oversee audit processes, quality assurance, and audit lifecycle management."
      icon={<FileCheck className="h-6 w-6" />}
      features={[
        "Audit oversight",
        "Quality control",
        "Process management",
        "Status tracking"
      ]}
    />
  );
};

export const AdminFinance = () => {
  return (
    <PlaceholderPage
      title="Financial Management"
      description="Manage payments, escrow, billing, and financial transactions on the platform."
      icon={<DollarSign className="h-6 w-6" />}
      features={[
        "Payment processing",
        "Escrow management",
        "Financial reporting",
        "Transaction monitoring"
      ]}
    />
  );
};

export const AdminReports = () => {
  return (
    <PlaceholderPage
      title="Report Management"
      description="Generate and manage platform reports, analytics, and compliance documentation."
      icon={<FileText className="h-6 w-6" />}
      features={[
        "Custom reports",
        "Analytics dashboard",
        "Compliance docs",
        "Data exports"
      ]}
    />
  );
};

export const AdminDisputes = () => {
  return (
    <PlaceholderPage
      title="Dispute Resolution"
      description="Manage disputes, arbitration processes, and conflict resolution between users."
      icon={<Gavel className="h-6 w-6" />}
      features={[
        "Dispute tracking",
        "Arbitration tools",
        "Resolution process",
        "Communication logs"
      ]}
    />
  );
};

export const AdminSecurity = () => {
  return (
    <PlaceholderPage
      title="Security Management"
      description="Monitor platform security, manage security policies, and oversee threat detection."
      icon={<Lock className="h-6 w-6" />}
      features={[
        "Security monitoring",
        "Threat detection",
        "Policy management",
        "Incident response"
      ]}
    />
  );
};

export const AdminServices = () => {
  return (
    <PlaceholderPage
      title="Service Management"
      description="Manage audit services, service providers, and service quality standards."
      icon={<Settings className="h-6 w-6" />}
      features={[
        "Service catalog",
        "Provider management",
        "Quality standards",
        "Service approval"
      ]}
    />
  );
};

export const AdminSettings = () => {
  return (
    <PlaceholderPage
      title="Platform Settings"
      description="Configure platform settings, system parameters, and administrative preferences."
      icon={<Settings className="h-6 w-6" />}
      features={[
        "System configuration",
        "Platform settings",
        "Admin preferences",
        "Feature toggles"
      ]}
    />
  );
};

export const AdminProviders = () => {
  return (
    <PlaceholderPage
      title="Provider Management"
      description="Manage security service providers, their credentials, and performance metrics."
      icon={<UserCheck className="h-6 w-6" />}
      features={[
        "Provider profiles",
        "Credential verification",
        "Performance tracking",
        "Provider analytics"
      ]}
    />
  );
};

// Additional Pages
export const ContactProvider = () => {
  return (
    <PlaceholderPage
      title="Contact Provider"
      description="Direct communication with security service providers for project discussions and consultations."
      icon={<MessageSquare className="h-6 w-6" />}
      features={[
        "Direct messaging",
        "Video consultations",
        "File sharing",
        "Project discussions"
      ]}
    />
  );
};

export const AuditorDashboard = () => {
  return (
    <PlaceholderPage
      title="Auditor Dashboard"
      description="Specialized dashboard for security auditors to manage their audits, clients, and performance."
      icon={<Monitor className="h-6 w-6" />}
      features={[
        "Audit management",
        "Client communication",
        "Performance metrics",
        "Scheduling tools"
      ]}
    />
  );
};

export const ProjectDashboard = () => {
  return (
    <PlaceholderPage
      title="Project Dashboard"
      description="Manage your security projects, track audit progress, and coordinate with security teams."
      icon={<BarChart3 className="h-6 w-6" />}
      features={[
        "Project tracking",
        "Progress monitoring",
        "Team coordination",
        "Milestone management"
      ]}
    />
  );
};

export const UserDashboard = () => {
  return (
    <PlaceholderPage
      title="User Dashboard"
      description="Personal dashboard for managing your account, projects, and security audit activities."
      icon={<User className="h-6 w-6" />}
      features={[
        "Account management",
        "Project overview",
        "Activity tracking",
        "Notification center"
      ]}
    />
  );
};

export const SubmitService = () => {
  return (
    <PlaceholderPage
      title="Submit Service"
      description="Submit your security service for review and approval to join the Hawkly marketplace."
      icon={<Code className="h-6 w-6" />}
      features={[
        "Service submission",
        "Review process",
        "Approval workflow",
        "Provider onboarding"
      ]}
    />
  );
};

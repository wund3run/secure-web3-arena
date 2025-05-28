
import React from 'react';
import { PlaceholderPage } from './placeholder-template';
import { 
  HelpCircle, 
  MessageSquare, 
  BookOpen, 
  Users, 
  Calendar as CalendarIcon,
  Trophy,
  Settings,
  UserCheck,
  FileText,
  AlertTriangle,
  Shield,
  DollarSign,
  BarChart3,
  Headphones,
  User,
  Star,
  Contact,
  BookMarked,
  Target,
  Lightbulb,
  Wrench
} from 'lucide-react';

// FAQ Page
export const FAQ = () => {
  return (
    <PlaceholderPage
      title="Frequently Asked Questions"
      description="Find answers to common questions about Hawkly's Web3 security audit platform, pricing, and services."
      icon={HelpCircle}
    />
  );
};

// Blog Page
export const Blog = () => {
  return (
    <PlaceholderPage
      title="Security Blog"
      description="Latest insights, research, and best practices in Web3 security from our expert auditors."
      icon={BookOpen}
    />
  );
};

// Docs Page
export const Docs = () => {
  return (
    <PlaceholderPage
      title="Documentation"
      description="Comprehensive guides, API documentation, and technical resources for developers and auditors."
      icon={BookMarked}
    />
  );
};

// Forum Page
export const Forum = () => {
  return (
    <PlaceholderPage
      title="Community Forum"
      description="Connect with other Web3 developers and security professionals. Share knowledge and get help."
      icon={MessageSquare}
    />
  );
};

// Events Page
export const Events = () => {
  return (
    <PlaceholderPage
      title="Security Events"
      description="Upcoming conferences, workshops, and training sessions for Web3 security professionals."
      icon={CalendarIcon}
    />
  );
};

// Challenges Page
export const Challenges = () => {
  return (
    <PlaceholderPage
      title="Security Challenges"
      description="Test your skills with real-world security scenarios and capture-the-flag competitions."
      icon={Target}
    />
  );
};

// Leaderboard Page
export const Leaderboard = () => {
  return (
    <PlaceholderPage
      title="Auditor Leaderboard"
      description="Top-performing security auditors ranked by expertise, successful audits, and community contributions."
      icon={Trophy}
    />
  );
};

// Achievements Page
export const Achievements = () => {
  return (
    <PlaceholderPage
      title="Achievements"
      description="Track your progress and unlock badges for completing audits, contributing to the community, and security milestones."
      icon={Star}
    />
  );
};

// Support Page
export const Support = () => {
  return (
    <PlaceholderPage
      title="Customer Support"
      description="Get help with technical issues, billing questions, or general platform support from our team."
      icon={Headphones}
    />
  );
};

// Templates Page
export const Templates = () => {
  return (
    <PlaceholderPage
      title="Audit Templates"
      description="Pre-built templates and checklists for different types of smart contract audits and security assessments."
      icon={FileText}
    />
  );
};

// Tutorials Page
export const Tutorials = () => {
  return (
    <PlaceholderPage
      title="Security Tutorials"
      description="Step-by-step guides for conducting security audits, using audit tools, and implementing best practices."
      icon={Lightbulb}
    />
  );
};

// User Dashboard Page
export const UserDashboard = () => {
  return (
    <PlaceholderPage
      title="User Dashboard"
      description="Your personalized dashboard with project overview, audit status, and account management."
      icon={User}
    />
  );
};

// Platform Report Page
export const PlatformReport = () => {
  return (
    <PlaceholderPage
      title="Platform Analytics"
      description="Comprehensive reports on platform security metrics, audit statistics, and threat intelligence."
      icon={BarChart3}
    />
  );
};

// Security Policy Page
export const SecurityPolicy = () => {
  return (
    <PlaceholderPage
      title="Security Policy"
      description="Our comprehensive security policies, incident response procedures, and compliance standards."
      icon={Shield}
    />
  );
};

// Project Dashboard Page
export const ProjectDashboard = () => {
  return (
    <PlaceholderPage
      title="Project Dashboard"
      description="Manage your security audit projects, track progress, and collaborate with auditors."
      icon={FileText}
    />
  );
};

// Security Insights Page
export const SecurityInsights = () => {
  return (
    <PlaceholderPage
      title="Security Insights"
      description="Advanced analytics and insights from security audits, vulnerability trends, and threat intelligence."
      icon={AlertTriangle}
    />
  );
};

// Submit Service Page
export const SubmitService = () => {
  return (
    <PlaceholderPage
      title="Submit Service"
      description="Auditors can submit their security services and expertise to be featured on the platform."
      icon={UserCheck}
    />
  );
};

// Contact Provider Page
export const ContactProvider = () => {
  return (
    <PlaceholderPage
      title="Contact Service Provider"
      description="Get in touch with security auditors and service providers for your specific needs."
      icon={Contact}
    />
  );
};

// Auditor Dashboard Page
export const AuditorDashboard = () => {
  return (
    <PlaceholderPage
      title="Auditor Dashboard"
      description="Manage your audit assignments, track earnings, and view client feedback and ratings."
      icon={UserCheck}
    />
  );
};

// Audit Guidelines Page
export const AuditGuidelines = () => {
  return (
    <PlaceholderPage
      title="Audit Guidelines"
      description="Comprehensive guidelines and standards for conducting thorough Web3 security audits."
      icon={BookMarked}
    />
  );
};

// Admin Pages
export const AdminDashboard = () => {
  return (
    <PlaceholderPage
      title="Admin Dashboard"
      description="Administrative control panel for managing platform operations, users, and security."
      icon={Settings}
    />
  );
};

export const AdminUsers = () => {
  return (
    <PlaceholderPage
      title="User Management"
      description="Manage user accounts, permissions, and access controls for the platform."
      icon={Users}
    />
  );
};

export const AdminProviders = () => {
  return (
    <PlaceholderPage
      title="Provider Management"
      description="Oversee security service providers, their certifications, and performance metrics."
      icon={UserCheck}
    />
  );
};

export const AdminAudits = () => {
  return (
    <PlaceholderPage
      title="Audit Management"
      description="Monitor ongoing audits, review quality standards, and manage audit workflows."
      icon={FileText}
    />
  );
};

export const AdminReports = () => {
  return (
    <PlaceholderPage
      title="Platform Reports"
      description="Generate comprehensive reports on platform performance, security metrics, and user analytics."
      icon={BarChart3}
    />
  );
};

export const AdminServices = () => {
  return (
    <PlaceholderPage
      title="Service Management"
      description="Manage available security services, pricing models, and service categories."
      icon={Wrench}
    />
  );
};

export const AdminDisputes = () => {
  return (
    <PlaceholderPage
      title="Dispute Resolution"
      description="Handle disputes between clients and auditors, manage arbitration processes."
      icon={AlertTriangle}
    />
  );
};

export const AdminSecurity = () => {
  return (
    <PlaceholderPage
      title="Security Administration"
      description="Monitor platform security, manage threat detection, and oversee compliance measures."
      icon={Shield}
    />
  );
};

export const AdminFinance = () => {
  return (
    <PlaceholderPage
      title="Financial Management"
      description="Oversee payments, escrow transactions, and financial reporting for the platform."
      icon={DollarSign}
    />
  );
};

export const AdminSettings = () => {
  return (
    <PlaceholderPage
      title="Platform Settings"
      description="Configure platform-wide settings, integrations, and administrative preferences."
      icon={Settings}
    />
  );
};

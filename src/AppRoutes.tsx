import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Shield, MessageCircle, BarChart3, Users, HelpCircle, Briefcase, Settings, Lock, User, Zap, FileText, Award, Bell, CalendarIcon, BookOpen, Activity, Database, LayoutGrid } from 'lucide-react';
import Index from '@/pages/Index';
import Home from '@/pages/Home';
import Auth from '@/pages/Auth';
import AuthCallback from '@/pages/AuthCallback';
import Dashboard from '@/pages/Dashboard';
import Marketplace from '@/pages/Marketplace';

// Enhanced UI Components
import EnhancedLandingPage from '@/components/landing/EnhancedLandingPage';
import RealTimeDashboard from '@/components/dashboard/RealTimeDashboard';
import EnhancedAuditorMarketplace from '@/components/marketplace/EnhancedAuditorMarketplace';
import EnhancedOnboardingFlow from '@/components/onboarding/EnhancedOnboardingFlow';
import EnhancedAuditResults from '@/components/audit/EnhancedAuditResults';
import ProjectDetails from '@/pages/ProjectDetails';
import RequestAudit from '@/pages/RequestAudit';
import AuditGuidelines from '@/pages/AuditGuidelines';
import Support from '@/pages/Support';
import Contact from '@/pages/Contact';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import AIToolsPage from '@/pages/tools/AIToolsPage';
import NotFound from '@/pages/NotFound';
import Onboarding from '@/pages/Onboarding';
import ProfileCompletion from '@/pages/ProfileCompletion';

// Admin Pages
import AdminDashboard from '@/pages/AdminDashboard';

// Role-based Access Control
import { RBACProvider, RequireAuth, UnauthorizedPage } from '@/contexts/RBACContext';
import AuthPage from '@/pages/AuthPage';

// Admin Analytics
import { AdminAnalyticsDashboard } from '@/components/admin/AdminAnalyticsDashboard';
import AdminAudits from '@/pages/AdminAudits';
import AdminDisputes from '@/pages/AdminDisputes';
import AdminFinance from '@/pages/AdminFinance';
import AdminProviders from '@/pages/AdminProviders';
import AdminReports from '@/pages/AdminReports';
import AdminSecurity from '@/pages/AdminSecurity';
import AdminServices from '@/pages/AdminServices';
import AdminSettings from '@/pages/AdminSettings';
import AdminUsers from '@/pages/AdminUsers';
import AdminLogin from '@/pages/admin/AdminLogin';

// AI & Advanced Features
import AIAnalysisPage from '@/pages/AIAnalysisPage';
import AIMatching from '@/pages/AIMatching';
import AIMatchingHub from '@/pages/AIMatchingHub';
import AIMatchingV2 from '@/pages/AIMatchingV2';
import EnhancedAIFeaturesPage from '@/pages/EnhancedAIFeaturesPage';
import EnhancedAITools from '@/pages/EnhancedAITools';
import IntelligentAuditWorkspacePage from '@/pages/IntelligentAuditWorkspacePage';
import SmartLearningPage from '@/pages/SmartLearningPage';

// Security & Compliance
import { AccessibilityTestingPage } from '@/pages/AccessibilityTestingPage';
import ComprehensiveSecurity from '@/pages/ComprehensiveSecurity';
import SecurityCompliance from '@/pages/SecurityCompliance';
import SecurityInsights from '@/pages/SecurityInsights';
import SecurityMonitoringPage from '@/pages/SecurityMonitoringPage';
import SecurityPolicy from '@/pages/SecurityPolicy';
import SecuritySettings from '@/pages/SecuritySettings';
import Vulnerabilities from '@/pages/Vulnerabilities';
import VulnerabilityScanner from '@/pages/VulnerabilityScanner';
import Web3Security from '@/pages/Web3Security';

// User Authentication & Profile
import Profile from '@/pages/Profile';
import ProfilePage from '@/pages/ProfilePage';
import ResetPassword from '@/pages/ResetPassword';
import TwoFactorAuth from '@/pages/TwoFactorAuth';
import TwoFactorSetup from '@/pages/TwoFactorSetup';

// Analytics & Dashboards
import Analytics from '@/pages/Analytics';
import LiveDashboard from '@/pages/LiveDashboard';
import ProductionDashboard from '@/pages/ProductionDashboard';
import DashboardAuditor from '@/pages/DashboardAuditor';
import DashboardPage from '@/pages/DashboardPage';
import DashboardProject from '@/pages/DashboardProject';
import EnhancedDashboardPage from '@/pages/EnhancedDashboardPage';
import Phase3Dashboard from '@/pages/Phase3Dashboard';
import Phase4DashboardPage from '@/pages/Phase4DashboardPage';
import TestingDashboard from '@/pages/TestingDashboard';
import UserDashboard from '@/pages/UserDashboard';

// Community & User Experience
import Achievements from '@/pages/Achievements';
import Blog from '@/pages/Blog';
import Calendar from '@/pages/Calendar';
import Challenges from '@/pages/Challenges';
import Community from '@/pages/Community';
import Events from '@/pages/Events';
import GamificationDemo from '@/pages/GamificationDemo';
import Leaderboard from '@/pages/Leaderboard';
import MessagingPage from '@/pages/MessagingPage';
import NotificationCenter from '@/pages/NotificationCenter';

// Business & Enterprise
import CompetitiveAdvantages from '@/pages/CompetitiveAdvantages';
import ForAuditors from '@/pages/ForAuditors';
import ForDevelopers from '@/pages/ForDevelopers';
import ForEnterprises from '@/pages/ForEnterprises';
import ForProjectOwners from '@/pages/ForProjectOwners';
import PricingCalculator from '@/pages/PricingCalculator';
import EnterpriseControlPage from '@/pages/EnterpriseControlPage';

// Tools & Utilities
import DatabaseTools from '@/pages/DatabaseTools';
import FileManagement from '@/pages/FileManagement';
import IntegrationsPage from '@/pages/IntegrationsPage';
import PlatformIntegration from '@/pages/PlatformIntegration';
import PlatformOptimization from '@/pages/PlatformOptimization';
import PerformanceOptimization from '@/pages/PerformanceOptimization';
import Templates from '@/pages/Templates';
import WorkspacePage from '@/pages/WorkspacePage';

// Content & Documentation
import Docs from '@/pages/Docs';
import FAQ from '@/pages/FAQ';
import Guides from '@/pages/Guides';
import KnowledgeBase from '@/pages/KnowledgeBase';
import Roadmap from '@/pages/Roadmap';

// Service Pages
import SecurityAudits from '@/pages/SecurityAudits';
import CodeReviews from '@/pages/CodeReviews';
import PenetrationTesting from '@/pages/PenetrationTesting';
import Consulting from '@/pages/Consulting';

// Resource Pages
import Resources from '@/pages/Resources';
import SecurityGuides from '@/pages/SecurityGuides';
import Tutorials from '@/pages/Tutorials';
import Documentation from '@/pages/Documentation';

// Business Pages
import About from '@/pages/About';
import Pricing from '@/pages/Pricing';
import Careers from '@/pages/Careers';

// Platform Pages  
import { PlaceholderPage } from '@/pages/placeholder-template';

// Auditor Journey Pages
import AuditorSignUp from '@/pages/AuditorSignUp';
import EmailVerification from '@/pages/auditor/EmailVerification';
import AuditorOnboarding from '@/pages/AuditorOnboarding';
import AuditorDashboard from '@/pages/auditor/AuditorDashboard';
import AuditDetails from '@/pages/AuditDetails';

// Project Owner Journey Pages
import SubmitProject from '@/pages/SubmitProject';
import ProjectDashboard from '@/pages/ProjectDashboard';

// Service Provider Pages
import ServiceProviderOnboarding from '@/pages/onboarding/ServiceProviderOnboarding';

export default function AppRoutes() {
  return (
    <RBACProvider>
      <Routes>
        {/* Public Routes - No Authentication Required */}
        <Route path="/" element={<EnhancedLandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/support" element={<Support />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        
        {/* Protected Routes - Require Authentication */}
        <Route path="/dashboard" element={<RequireAuth><RealTimeDashboard /></RequireAuth>} />
        <Route path="/marketplace" element={<RequireAuth><EnhancedAuditorMarketplace /></RequireAuth>} />
        <Route path="/project/:id" element={<RequireAuth><ProjectDetails /></RequireAuth>} />
        <Route path="/request-audit" element={<RequireAuth><RequestAudit /></RequireAuth>} />
        <Route path="/ai-tools" element={<RequireAuth><AIToolsPage /></RequireAuth>} />
      
      {/* Enhanced Audit Results */}
      <Route path="/audit-results/:id" element={<EnhancedAuditResults />} />
      
      {/* Legacy Index route for backward compatibility */}
      <Route path="/legacy" element={<Index />} />
      
      {/* Service Pages */}
      <Route path="/security-audits" element={<SecurityAudits />} />
      <Route path="/code-reviews" element={<CodeReviews />} />
      <Route path="/penetration-testing" element={<PenetrationTesting />} />
      <Route path="/consulting" element={<Consulting />} />
      
      {/* Resource Pages */}
      <Route path="/resources" element={<Resources />} />
      <Route path="/audit-guidelines" element={<AuditGuidelines />} />
      <Route path="/security-guides" element={<SecurityGuides />} />
      <Route path="/tutorials" element={<Tutorials />} />
      <Route path="/documentation" element={<Documentation />} />
      
      {/* Business Pages */}
      <Route path="/about" element={<About />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/careers" element={<Careers />} />
      
      {/* Platform Pages */}
      <Route path="/features" element={<PlaceholderPage title="Platform Features" description="Comprehensive platform capabilities and tools" icon={<Shield className="h-8 w-8" />} />} />
      <Route path="/escrow" element={<PlaceholderPage title="Escrow System" description="Secure milestone-based payment system" icon={<Shield className="h-8 w-8" />} />} />
      <Route path="/collaboration" element={<PlaceholderPage title="Collaboration Tools" description="Real-time collaboration and communication" icon={<Users className="h-8 w-8" />} />} />
      <Route path="/analytics" element={<RequireAuth requiredRole={["admin", "auditor"]}><PlaceholderPage title="Analytics Dashboard" description="Advanced insights and performance metrics" icon={<BarChart3 className="h-8 w-8" />} /></RequireAuth>} />
      <Route path="/audits" element={<PlaceholderPage title="My Audits" description="Manage and track your security audits" icon={<Shield className="h-8 w-8" />} />} />
      <Route path="/messages" element={<PlaceholderPage title="Messages" description="Communication center for all your projects" icon={<MessageCircle className="h-8 w-8" />} />} />
      <Route path="/faq" element={<PlaceholderPage title="FAQ" description="Frequently asked questions and answers" icon={<HelpCircle className="h-8 w-8" />} />} />
      
      {/* Enhanced Onboarding Routes */}
      <Route path="/onboarding" element={<EnhancedOnboardingFlow />} />
      <Route path="/profile-completion" element={<ProfileCompletion />} />
      <Route path="/service-provider-onboarding" element={<ServiceProviderOnboarding />} />
      
      {/* Auditor Journey Routes */}
      <Route path="/auditor/signup" element={<AuditorSignUp />} />
      <Route path="/auditor/email-verification" element={<EmailVerification />} />
      <Route path="/auditor/onboarding" element={<RequireAuth><AuditorOnboarding /></RequireAuth>} />
      <Route path="/auditor/dashboard" element={<RequireAuth requiredRole={["auditor", "admin"]}><AuditorDashboard /></RequireAuth>} />
      <Route path="/audit/:id" element={<AuditDetails />} />
      
      {/* Project Owner Journey Routes */}
      <Route path="/submit-project" element={<SubmitProject />} />
      <Route path="/project-dashboard" element={<ProjectDashboard />} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<RequireAuth requiredRole="admin"><AdminDashboard /></RequireAuth>} />
      <Route path="/admin/dashboard" element={<RequireAuth requiredRole="admin"><AdminDashboard /></RequireAuth>} />
      <Route path="/admin/analytics" element={<RequireAuth requiredRole="admin"><AdminAnalyticsDashboard /></RequireAuth>} />
      <Route path="/admin/audits" element={<RequireAuth requiredRole="admin"><AdminAudits /></RequireAuth>} />
      <Route path="/admin/disputes" element={<RequireAuth requiredRole="admin"><AdminDisputes /></RequireAuth>} />
      <Route path="/admin/finance" element={<RequireAuth requiredRole="admin"><AdminFinance /></RequireAuth>} />
      <Route path="/admin/providers" element={<RequireAuth requiredRole="admin"><AdminProviders /></RequireAuth>} />
      <Route path="/admin/reports" element={<RequireAuth requiredRole="admin"><AdminReports /></RequireAuth>} />
      <Route path="/admin/security" element={<RequireAuth requiredRole="admin"><AdminSecurity /></RequireAuth>} />
      <Route path="/admin/services" element={<RequireAuth requiredRole="admin"><AdminServices /></RequireAuth>} />
      <Route path="/admin/settings" element={<RequireAuth requiredRole="admin"><AdminSettings /></RequireAuth>} />
      <Route path="/admin/users" element={<RequireAuth requiredRole="admin"><AdminUsers /></RequireAuth>} />
      
      {/* AI & Advanced Features Routes */}
      <Route path="/ai/analysis" element={<AIAnalysisPage />} />
      <Route path="/ai/matching" element={<AIMatching />} />
      <Route path="/ai/matching-hub" element={<AIMatchingHub />} />
      <Route path="/ai/matching-v2" element={<AIMatchingV2 />} />
      <Route path="/ai/features" element={<EnhancedAIFeaturesPage />} />
      <Route path="/ai/tools" element={<EnhancedAITools />} />
      <Route path="/ai/workspace" element={<IntelligentAuditWorkspacePage />} />
      <Route path="/ai/learning" element={<SmartLearningPage />} />
      
      {/* Security & Compliance Routes */}
      <Route path="/security" element={<ComprehensiveSecurity />} />
      <Route path="/security/accessibility" element={<AccessibilityTestingPage />} />
      <Route path="/security/compliance" element={<SecurityCompliance />} />
      <Route path="/security/insights" element={<SecurityInsights />} />
      <Route path="/security/monitoring" element={<SecurityMonitoringPage />} />
      <Route path="/security/policy" element={<SecurityPolicy />} />
      <Route path="/security/settings" element={<SecuritySettings />} />
      <Route path="/security/vulnerabilities" element={<Vulnerabilities />} />
      <Route path="/security/scanner" element={<VulnerabilityScanner />} />
      <Route path="/security/web3" element={<Web3Security />} />
      
      {/* Profile & Authentication Routes */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/edit" element={<ProfilePage />} />
      <Route path="/profile/reset-password" element={<ResetPassword />} />
      <Route path="/profile/2fa" element={<TwoFactorAuth />} />
      <Route path="/profile/2fa/setup" element={<TwoFactorSetup />} />
      
      {/* Analytics Routes */}
      <Route path="/analytics/dashboard" element={<RequireAuth requiredRole={["admin", "auditor"]}><Analytics /></RequireAuth>} />
      <Route path="/analytics/live" element={<RequireAuth requiredRole="admin"><LiveDashboard /></RequireAuth>} />
      <Route path="/analytics/production" element={<RequireAuth requiredRole="admin"><ProductionDashboard /></RequireAuth>} />
      <Route path="/analytics/auditor" element={<RequireAuth requiredRole={["admin", "auditor"]}><DashboardAuditor /></RequireAuth>} />
      <Route path="/analytics/overview" element={<RequireAuth requiredRole={["admin", "auditor"]}><DashboardPage /></RequireAuth>} />
      <Route path="/analytics/project" element={<RequireAuth><DashboardProject /></RequireAuth>} />
      <Route path="/analytics/enhanced" element={<RequireAuth requiredRole={["admin", "auditor"]}><EnhancedDashboardPage /></RequireAuth>} />
      <Route path="/analytics/phase3" element={<RequireAuth requiredRole="admin"><Phase3Dashboard /></RequireAuth>} />
      <Route path="/analytics/phase4" element={<RequireAuth requiredRole="admin"><Phase4DashboardPage /></RequireAuth>} />
      <Route path="/analytics/testing" element={<RequireAuth requiredRole="admin"><TestingDashboard /></RequireAuth>} />
      <Route path="/analytics/user" element={<RequireAuth requiredRole="admin"><UserDashboard /></RequireAuth>} />
      
      {/* Community & User Experience Routes */}
      <Route path="/community" element={<Community />} />
      <Route path="/community/achievements" element={<Achievements />} />
      <Route path="/community/blog" element={<Blog />} />
      <Route path="/community/calendar" element={<Calendar />} />
      <Route path="/community/challenges" element={<Challenges />} />
      <Route path="/community/events" element={<Events />} />
      <Route path="/community/gamification" element={<GamificationDemo />} />
      <Route path="/community/leaderboard" element={<Leaderboard />} />
      <Route path="/community/messaging" element={<MessagingPage />} />
      <Route path="/community/notifications" element={<NotificationCenter />} />
      
      {/* Business & Enterprise Routes */}
      <Route path="/enterprise" element={<ForEnterprises />} />
      <Route path="/enterprise/controls" element={<EnterpriseControlPage />} />
      <Route path="/enterprise/advantages" element={<CompetitiveAdvantages />} />
      <Route path="/for-auditors" element={<ForAuditors />} />
      <Route path="/for-developers" element={<ForDevelopers />} />
      <Route path="/for-project-owners" element={<ForProjectOwners />} />
      <Route path="/pricing-calculator" element={<PricingCalculator />} />
      
      {/* Tools & Utilities Routes */}
      <Route path="/tools/database" element={<DatabaseTools />} />
      <Route path="/tools/files" element={<FileManagement />} />
      <Route path="/tools/integrations" element={<IntegrationsPage />} />
      <Route path="/tools/platform-integration" element={<PlatformIntegration />} />
      <Route path="/tools/optimization" element={<PlatformOptimization />} />
      <Route path="/tools/performance" element={<PerformanceOptimization />} />
      <Route path="/tools/templates" element={<Templates />} />
      <Route path="/tools/workspace" element={<WorkspacePage />} />
      
      {/* Documentation & Resources */}
      <Route path="/docs" element={<Docs />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/guides" element={<Guides />} />
      <Route path="/knowledge-base" element={<KnowledgeBase />} />
      <Route path="/roadmap" element={<RequireAuth><Roadmap /></RequireAuth>} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
    </RBACProvider>
  );
}

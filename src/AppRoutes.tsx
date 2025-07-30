import { Routes, Route } from 'react-router-dom';
import AuthCallback from '@/pages/AuthCallback';

// Enhanced UI Components
import NewLandingPage from '@/components/landing/NewLandingPage';
import RealTimeDashboard from '@/components/dashboard/RealTimeDashboard';
import EnhancedAuditorMarketplace from '@/components/marketplace/EnhancedAuditorMarketplace';
import EnhancedOnboardingFlow from '@/components/onboarding/EnhancedOnboardingFlow';
import EnhancedAuditResults from '@/components/audit/EnhancedAuditResults';
import ProjectDetails from '@/pages/ProjectDetails';
import RequestAudit from '@/pages/RequestAudit';
import Support from '@/pages/Support';
import Contact from '@/pages/Contact';
import AIToolsPage from '@/pages/tools/AIToolsPage';
import NotFound from '@/pages/NotFound';
import ProfileCompletion from '@/pages/ProfileCompletion';

// Admin Pages
import { AdminDashboard } from '@/components/admin/AdminDashboard';

// Role-based Access Control
import { RBACProvider, RequireAuth, UnauthorizedPage } from '@/contexts/RBACContext';
import AuthPage from '@/pages/AuthPage';
import { Achievements } from '@/pages/community/AchievementsPage';
import AdminAudits from '@/pages/admin/AdminAudits';
import AdminDisputes from '@/pages/admin/AdminDisputes';
import AdminFinance from '@/pages/admin/AdminFinance';
import AdminProviders from '@/pages/admin/AdminProviders';
import AdminReports from '@/pages/admin/AdminReports';
import AdminSecurity from '@/pages/admin/AdminSecurity';
import AdminServices from '@/pages/admin/AdminServices';
import AdminSettings from '@/pages/admin/AdminSettings';
import AdminUsers from '@/pages/admin/AdminUsers';
import { default as AuditGuidelines } from '@/pages/resources/AuditGuidelines';
import ChallengesPage from '@/pages/community/ChallengesPage';
import Consulting from '@/pages/services/Consulting';
import { default as Events } from '@/pages/community/EventsPage';
import { default as Leaderboard } from '@/pages/community/LeaderboardPage';
import PenetrationTesting from '@/pages/services/PenetrationTesting';
import Privacy from '@/pages/legal/Privacy';
import SecurityGuides from '@/pages/resources/SecurityGuides';
import SecurityPolicy from '@/pages/security/SecurityPolicy';
import SubmitService from '@/pages/services/SubmitService';
import Terms from '@/pages/legal/Terms';
import Tutorials from '@/pages/resources/Tutorials';

// Admin Analytics
import { AdminAnalyticsDashboard } from '@/components/admin/AdminAnalyticsDashboard';

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
import SecuritySettings from '@/pages/SecuritySettings';
import Vulnerabilities from '@/pages/Vulnerabilities';
import VulnerabilityScanner from '@/pages/VulnerabilityScanner';

// User Authentication & Profile
import Profile from '@/pages/Profile';
import ProfilePage from '@/pages/ProfilePage';
import ProfileSettings from '@/pages/ProfileSettings';
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
import Blog from '@/pages/Blog';
import Calendar from '@/pages/Calendar';
import Community from '@/pages/Community';
import GamificationDemo from '@/pages/GamificationDemo';
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
import WorkspacePage from '@/pages/WorkspacePage';

// Content & Documentation
import Docs from '@/pages/Docs';
// FAQ is now imported from enhanced-pages
import Guides from '@/pages/Guides';
import Roadmap from '@/pages/Roadmap';

// Service Pages
import SecurityAudits from '@/pages/SecurityAudits';
import CodeReviews from '@/pages/CodeReviews';

// Resource Pages
import Resources from '@/pages/Resources';
import Documentation from '@/pages/Documentation';

// Business Pages
import About from '@/pages/About';
import Pricing from '@/pages/Pricing';
import Careers from '@/pages/Careers';

// Enhanced Pages
import { Features, Escrow, Collaboration, AnalyticsDashboard, MyAudits, Messages, FAQ } from '@/pages/enhanced-pages';

// Auditor Journey Pages
import AuditorSignUp from '@/pages/AuditorSignUp';
import EmailVerification from '@/pages/auditor/EmailVerification';
import AuditorOnboarding from '@/pages/AuditorOnboarding';
import AuditorDashboard from '@/pages/auditor/AuditorDashboard';
import AuditDetails from '@/pages/AuditDetails';

// Project Owner Journey Pages
import SubmitProject from '@/pages/SubmitProject';
import ProjectDashboard from '@/pages/ProjectDashboard';
import MyAuditsDashboard from '@/pages/MyAuditsDashboard';
import ApprovalCenter from '@/pages/ApprovalCenter';

// Service Provider Pages
import ServiceProviderOnboarding from '@/pages/onboarding/ServiceProviderOnboarding';

export default function AppRoutes() {
  return (
    <RBACProvider>
      <Routes>
        {/* Public Routes - No Authentication Required */}
        <Route path="/" element={<NewLandingPage />} />
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
        <Route path="/my-audits" element={<RequireAuth><MyAuditsDashboard /></RequireAuth>} />
        <Route path="/approval-center" element={<RequireAuth><ApprovalCenter /></RequireAuth>} />
      
      {/* Enhanced Audit Results */}
      <Route path="/audit-results/:id" element={<EnhancedAuditResults />} />
      
      {/* Legacy Index route now uses EnhancedLandingPage for full UI overhaul compliance */}
      <Route path="/legacy" element={<NewLandingPage />} />
      
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
      <Route path="/features" element={<Features />} />
      <Route path="/escrow" element={<Escrow />} />
      <Route path="/collaboration" element={<Collaboration />} />
      <Route path="/analytics" element={<RequireAuth requiredRole={["admin", "auditor"]}><AnalyticsDashboard /></RequireAuth>} />
      <Route path="/audits" element={<MyAudits />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/faq" element={<FAQ />} />      {/* Enhanced Onboarding Routes */}
      <Route path="/onboarding" element={<EnhancedOnboardingFlow />} />
      <Route path="/profile-completion" element={<ProfileCompletion />} />
            {/* Service Provider Pages */}
      <Route path="/service-provider-onboarding" element={<ServiceProviderOnboarding />} />
      <Route path="/service-provider/dashboard" element={<RequireAuth requiredRole={["serviceProvider"]}><SubmitService /></RequireAuth>} />
      <Route path="/service-provider/services" element={<RequireAuth requiredRole={["serviceProvider"]}><AdminServices /></RequireAuth>} />
      <Route path="/service-provider/analytics" element={<RequireAuth requiredRole={["serviceProvider"]}><Analytics /></RequireAuth>} />
      
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
      
      {/* Profile & Authentication Routes */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/edit" element={<ProfilePage />} />
      <Route path="/profile/settings" element={<RequireAuth><ProfileSettings /></RequireAuth>} />
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
      <Route path="/community/challenges" element={<ChallengesPage />} />
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
      <Route path="/tools/workspace" element={<WorkspacePage />} />
      
      {/* Documentation & Resources */}
      <Route path="/docs" element={<Docs />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/guides" element={<Guides />} />
      <Route path="/roadmap" element={<RequireAuth><Roadmap /></RequireAuth>} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
    </RBACProvider>
  );
}

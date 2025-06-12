
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RouteErrorBoundary } from '@/components/error-handling/RouteErrorBoundary';
import LoadingState from '@/components/ui/loading-state';

// Lazy load all page components for better performance
const Index = React.lazy(() => import('@/pages/Index'));
const Auth = React.lazy(() => import('@/pages/Auth'));
const Dashboard = React.lazy(() => import('@/pages/Dashboard'));
const Marketplace = React.lazy(() => import('@/pages/Marketplace'));
const RequestAudit = React.lazy(() => import('@/pages/RequestAudit'));
const Pricing = React.lazy(() => import('@/pages/PricingINR'));
const Contact = React.lazy(() => import('@/pages/Contact'));
const About = React.lazy(() => import('@/pages/About'));
const Privacy = React.lazy(() => import('@/pages/Privacy'));
const Terms = React.lazy(() => import('@/pages/Terms'));
const Enhanced404 = React.lazy(() => import('@/pages/Enhanced404'));
const PricingCalculator = React.lazy(() => import('@/pages/PricingCalculator'));

// Service pages
const SecurityAudits = React.lazy(() => import('@/pages/services/SecurityAudits'));
const CodeReviews = React.lazy(() => import('@/pages/services/CodeReviews'));
const PenetrationTesting = React.lazy(() => import('@/pages/services/PenetrationTesting'));
const Consulting = React.lazy(() => import('@/pages/services/Consulting'));

// Resource pages
const SecurityGuides = React.lazy(() => import('@/pages/resources/SecurityGuides'));
const KnowledgeBase = React.lazy(() => import('@/pages/resources/KnowledgeBase'));
const Tutorials = React.lazy(() => import('@/pages/resources/Tutorials'));
const Templates = React.lazy(() => import('@/pages/resources/Templates'));
const AuditGuidelines = React.lazy(() => import('@/pages/resources/AuditGuidelines'));
const VulnerabilityDatabase = React.lazy(() => import('@/pages/resources/VulnerabilityDatabase'));

// Community pages
const Forum = React.lazy(() => import('@/pages/community/Forum'));
const Events = React.lazy(() => import('@/pages/community/Events'));
const Challenges = React.lazy(() => import('@/pages/community/Challenges'));
const Leaderboard = React.lazy(() => import('@/pages/community/Leaderboard'));

// Tools pages
const AITools = React.lazy(() => import('@/pages/tools/AITools'));
const SecurityInsights = React.lazy(() => import('@/pages/tools/SecurityInsights'));
const VulnerabilityScanner = React.lazy(() => import('@/pages/tools/VulnerabilityScanner'));
const PlatformReports = React.lazy(() => import('@/pages/tools/PlatformReports'));
const FileManagement = React.lazy(() => import('@/pages/tools/FileManagement'));

// Business pages
const ContactPage = React.lazy(() => import('@/pages/business/ContactPage'));
const Careers = React.lazy(() => import('@/pages/business/Careers'));
const BusinessPricing = React.lazy(() => import('@/pages/business/BusinessPricing'));
const Partners = React.lazy(() => import('@/pages/business/Partners'));

// Support pages
const FAQ = React.lazy(() => import('@/pages/support/FAQ'));
const Support = React.lazy(() => import('@/pages/support/Support'));
const Documentation = React.lazy(() => import('@/pages/support/Documentation'));

// User pages
const Profile = React.lazy(() => import('@/pages/user/Profile'));
const Settings = React.lazy(() => import('@/pages/user/Settings'));

// Service Provider
const ServiceProviderOnboarding = React.lazy(() => import('@/pages/ServiceProviderOnboarding'));

// New Core Pages
const Analytics = React.lazy(() => import('@/pages/Analytics'));
const AIAnalysisPage = React.lazy(() => import('@/pages/AIAnalysisPage'));
const AIMatchingHub = React.lazy(() => import('@/pages/AIMatchingHub'));
const AdvancedFeaturesHub = React.lazy(() => import('@/pages/AdvancedFeaturesHub'));
const AuditDetails = React.lazy(() => import('@/pages/AuditDetails'));
const Calendar = React.lazy(() => import('@/pages/Calendar'));
const Collaboration = React.lazy(() => import('@/pages/Collaboration'));
const Escrow = React.lazy(() => import('@/pages/Escrow'));
const IntegrationsPage = React.lazy(() => import('@/pages/IntegrationsPage'));
const LaunchReadiness = React.lazy(() => import('@/pages/LaunchReadiness'));

// Admin Pages
const AdminDashboard = React.lazy(() => import('@/pages/admin/AdminDashboard'));
const AdminDisputes = React.lazy(() => import('@/pages/admin/AdminDisputes'));
const AdminFinance = React.lazy(() => import('@/pages/admin/AdminFinance'));
const AdminProviders = React.lazy(() => import('@/pages/admin/AdminProviders'));
const AdminReports = React.lazy(() => import('@/pages/admin/AdminReports'));
const AdminSecurity = React.lazy(() => import('@/pages/admin/AdminSecurity'));
const AdminServices = React.lazy(() => import('@/pages/admin/AdminServices'));
const AdminSettings = React.lazy(() => import('@/pages/admin/AdminSettings'));
const AdminUsers = React.lazy(() => import('@/pages/admin/AdminUsers'));

// Enhanced User Experience Pages
const AuditorDashboard = React.lazy(() => import('@/pages/auditor/AuditorDashboard'));
const AuditorOnboarding = React.lazy(() => import('@/pages/auditor/AuditorOnboarding'));
const DashboardProject = React.lazy(() => import('@/pages/projects/DashboardProject'));
const EnhancedAuth = React.lazy(() => import('@/pages/auth/EnhancedAuth'));
const EnhancedMarketplace = React.lazy(() => import('@/pages/marketplace/EnhancedMarketplace'));
const EnhancedRequestAudit = React.lazy(() => import('@/pages/request-audit/EnhancedRequestAudit'));
const Onboarding = React.lazy(() => import('@/pages/onboarding/Onboarding'));
const ProfileCompletion = React.lazy(() => import('@/pages/profile/ProfileCompletion'));

// Specialized Tools & Features
const AIMatchingV2 = React.lazy(() => import('@/pages/tools/AIMatchingV2'));
const CompetitiveAdvantages = React.lazy(() => import('@/pages/tools/CompetitiveAdvantages'));
const ComprehensiveSecurity = React.lazy(() => import('@/pages/tools/ComprehensiveSecurity'));
const DatabaseTools = React.lazy(() => import('@/pages/tools/DatabaseTools'));
const DistributionStrategy = React.lazy(() => import('@/pages/tools/DistributionStrategy'));
const EnterpriseControlPage = React.lazy(() => import('@/pages/tools/EnterpriseControlPage'));
const FinalProductionReadiness = React.lazy(() => import('@/pages/tools/FinalProductionReadiness'));
const PerformanceOptimization = React.lazy(() => import('@/pages/tools/PerformanceOptimization'));
const PlatformAnalysisPage = React.lazy(() => import('@/pages/tools/PlatformAnalysisPage'));
const SecurityMonitoringPage = React.lazy(() => import('@/pages/tools/SecurityMonitoringPage'));

const RouteWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <RouteErrorBoundary>
    <Suspense fallback={<LoadingState message="Loading page..." />}>
      {children}
    </Suspense>
  </RouteErrorBoundary>
);

export function StabilizedRouter() {
  return (
    <Routes>
      {/* Core Routes */}
      <Route path="/" element={<RouteWrapper><Index /></RouteWrapper>} />
      <Route path="/auth" element={<RouteWrapper><Auth /></RouteWrapper>} />
      <Route path="/dashboard" element={<RouteWrapper><Dashboard /></RouteWrapper>} />
      <Route path="/marketplace" element={<RouteWrapper><Marketplace /></RouteWrapper>} />
      <Route path="/request-audit" element={<RouteWrapper><RequestAudit /></RouteWrapper>} />
      <Route path="/pricing" element={<RouteWrapper><PricingINR /></RouteWrapper>} />
      <Route path="/pricing-inr" element={<RouteWrapper><PricingINR /></RouteWrapper>} />
      <Route path="/pricing-calculator" element={<RouteWrapper><PricingCalculator /></RouteWrapper>} />
      <Route path="/contact" element={<RouteWrapper><Contact /></RouteWrapper>} />
      <Route path="/about" element={<RouteWrapper><About /></RouteWrapper>} />
      <Route path="/privacy" element={<RouteWrapper><Privacy /></RouteWrapper>} />
      <Route path="/terms" element={<RouteWrapper><Terms /></RouteWrapper>} />
      <Route path="/analytics" element={<RouteWrapper><Analytics /></RouteWrapper>} />
      <Route path="/ai-analysis" element={<RouteWrapper><AIAnalysisPage /></RouteWrapper>} />
      <Route path="/ai-matching" element={<RouteWrapper><AIMatchingHub /></RouteWrapper>} />
      <Route path="/advanced-features" element={<RouteWrapper><AdvancedFeaturesHub /></RouteWrapper>} />
      <Route path="/audits/:id" element={<RouteWrapper><AuditDetails /></RouteWrapper>} />
      <Route path="/calendar" element={<RouteWrapper><Calendar /></RouteWrapper>} />
      <Route path="/collaboration" element={<RouteWrapper><Collaboration /></RouteWrapper>} />
      <Route path="/escrow" element={<RouteWrapper><Escrow /></RouteWrapper>} />
      <Route path="/integrations" element={<RouteWrapper><IntegrationsPage /></RouteWrapper>} />
      <Route path="/launch-readiness" element={<RouteWrapper><LaunchReadiness /></RouteWrapper>} />

      {/* Service Routes */}
      <Route path="/security-audits" element={<RouteWrapper><SecurityAudits /></RouteWrapper>} />
      <Route path="/code-reviews" element={<RouteWrapper><CodeReviews /></RouteWrapper>} />
      <Route path="/penetration-testing" element={<RouteWrapper><PenetrationTesting /></RouteWrapper>} />
      <Route path="/consulting" element={<RouteWrapper><Consulting /></RouteWrapper>} />

      {/* Resource Routes */}
      <Route path="/security-guides" element={<RouteWrapper><SecurityGuides /></RouteWrapper>} />
      <Route path="/knowledge-base" element={<RouteWrapper><KnowledgeBase /></RouteWrapper>} />
      <Route path="/tutorials" element={<RouteWrapper><Tutorials /></RouteWrapper>} />
      <Route path="/templates" element={<RouteWrapper><Templates /></RouteWrapper>} />
      <Route path="/audit-guidelines" element={<RouteWrapper><AuditGuidelines /></RouteWrapper>} />
      <Route path="/vulnerabilities" element={<RouteWrapper><VulnerabilityDatabase /></RouteWrapper>} />

      {/* Community Routes */}
      <Route path="/forum" element={<RouteWrapper><Forum /></RouteWrapper>} />
      <Route path="/events" element={<RouteWrapper><Events /></RouteWrapper>} />
      <Route path="/challenges" element={<RouteWrapper><Challenges /></RouteWrapper>} />
      <Route path="/leaderboard" element={<RouteWrapper><Leaderboard /></RouteWrapper>} />

      {/* Tools Routes */}
      <Route path="/ai-tools" element={<RouteWrapper><AITools /></RouteWrapper>} />
      <Route path="/security-insights" element={<RouteWrapper><SecurityInsights /></RouteWrapper>} />
      <Route path="/vulnerability-scanner" element={<RouteWrapper><VulnerabilityScanner /></RouteWrapper>} />
      <Route path="/platform-reports" element={<RouteWrapper><PlatformReports /></RouteWrapper>} />
      <Route path="/files" element={<RouteWrapper><FileManagement /></RouteWrapper>} />

      {/* Business Routes */}
      <Route path="/business/contact" element={<RouteWrapper><ContactPage /></RouteWrapper>} />
      <Route path="/careers" element={<RouteWrapper><Careers /></RouteWrapper>} />
      <Route path="/business/pricing" element={<RouteWrapper><BusinessPricing /></RouteWrapper>} />
      <Route path="/partners" element={<RouteWrapper><Partners /></RouteWrapper>} />

      {/* Support Routes */}
      <Route path="/faq" element={<RouteWrapper><FAQ /></RouteWrapper>} />
      <Route path="/support" element={<RouteWrapper><Support /></RouteWrapper>} />
      <Route path="/documentation" element={<RouteWrapper><Documentation /></RouteWrapper>} />

      {/* User Routes */}
      <Route path="/profile" element={<RouteWrapper><Profile /></RouteWrapper>} />
      <Route path="/settings" element={<RouteWrapper><Settings /></RouteWrapper>} />

      {/* Service Provider */}
      <Route path="/service-provider-onboarding" element={<RouteWrapper><ServiceProviderOnboarding /></RouteWrapper>} />

      {/* Admin Routes */}
      <Route path="/admin" element={<RouteWrapper><AdminDashboard /></RouteWrapper>} />
      <Route path="/admin/disputes" element={<RouteWrapper><AdminDisputes /></RouteWrapper>} />
      <Route path="/admin/finance" element={<RouteWrapper><AdminFinance /></RouteWrapper>} />
      <Route path="/admin/providers" element={<RouteWrapper><AdminProviders /></RouteWrapper>} />
      <Route path="/admin/reports" element={<RouteWrapper><AdminReports /></RouteWrapper>} />
      <Route path="/admin/security" element={<RouteWrapper><AdminSecurity /></RouteWrapper>} />
      <Route path="/admin/services" element={<RouteWrapper><AdminServices /></RouteWrapper>} />
      <Route path="/admin/settings" element={<RouteWrapper><AdminSettings /></RouteWrapper>} />
      <Route path="/admin/users" element={<RouteWrapper><AdminUsers /></RouteWrapper>} />

      {/* Enhanced 404 for unmatched routes */}
      <Route path="*" element={<RouteWrapper><Enhanced404 /></RouteWrapper>} />
    </Routes>
  );
}

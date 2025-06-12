import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RouteErrorBoundary } from '@/components/error-handling/RouteErrorBoundary';
import LoadingState from '@/components/ui/loading-state';

const Index = React.lazy(() => import('@/pages/Index'));
const Auth = React.lazy(() => import('@/pages/Auth'));
const Dashboard = React.lazy(() => import('@/pages/Dashboard'));
const Marketplace = React.lazy(() => import('@/pages/Marketplace'));
const RequestAudit = React.lazy(() => import('@/pages/RequestAudit'));
const Pricing = React.lazy(() => import('@/pages/Pricing'));
const Contact = React.lazy(() => import('@/pages/Contact'));
const About = React.lazy(() => import('@/pages/About'));
const Privacy = React.lazy(() => import('@/pages/Privacy'));
const Terms = React.lazy(() => import('@/pages/Terms'));
const Enhanced404 = React.lazy(() => import('@/pages/Enhanced404'));
const PricingCalculator = React.lazy(() => import('@/pages/PricingCalculator'));

// Services
const SecurityAudits = React.lazy(() => import('@/pages/services/SecurityAudits'));
const CodeReviews = React.lazy(() => import('@/pages/services/CodeReviews'));
const PenetrationTesting = React.lazy(() => import('@/pages/services/PenetrationTesting'));
const Consulting = React.lazy(() => import('@/pages/services/Consulting'));

// Resources
const SecurityGuides = React.lazy(() => import('@/pages/resources/SecurityGuides'));
const KnowledgeBase = React.lazy(() => import('@/pages/resources/KnowledgeBase'));
const Tutorials = React.lazy(() => import('@/pages/resources/Tutorials'));
const Templates = React.lazy(() => import('@/pages/resources/Templates'));
const AuditGuidelines = React.lazy(() => import('@/pages/resources/AuditGuidelines'));
const VulnerabilityDatabase = React.lazy(() => import('@/pages/resources/VulnerabilityDatabase'));

// Community
const Forum = React.lazy(() => import('@/pages/community/Forum'));
const Events = React.lazy(() => import('@/pages/community/Events'));
const Challenges = React.lazy(() => import('@/pages/community/Challenges'));
const Leaderboard = React.lazy(() => import('@/pages/community/Leaderboard'));

// Tools
const AITools = React.lazy(() => import('@/pages/tools/AITools'));
const SecurityInsights = React.lazy(() => import('@/pages/tools/SecurityInsights'));
const VulnerabilityScanner = React.lazy(() => import('@/pages/tools/VulnerabilityScanner'));
const PlatformReports = React.lazy(() => import('@/pages/tools/PlatformReports'));
const FileManagement = React.lazy(() => import('@/pages/tools/FileManagement'));

// Business
const ContactPage = React.lazy(() => import('@/pages/business/ContactPage'));
const Careers = React.lazy(() => import('@/pages/business/Careers'));
const BusinessPricing = React.lazy(() => import('@/pages/business/BusinessPricing'));
const Partners = React.lazy(() => import('@/pages/business/Partners'));

// Support
const FAQ = React.lazy(() => import('@/pages/support/FAQ'));
const Support = React.lazy(() => import('@/pages/support/Support'));
const Documentation = React.lazy(() => import('@/pages/support/Documentation'));

// User
const Profile = React.lazy(() => import('@/pages/user/Profile'));
const Settings = React.lazy(() => import('@/pages/user/Settings'));

// Other pages
const ServiceProviderOnboarding = React.lazy(() => import('@/pages/ServiceProviderOnboarding'));
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

// Admin pages
const AdminDashboard = React.lazy(() => import('@/pages/AdminDashboard'));
const AdminUsers = React.lazy(() => import('@/pages/AdminUsers'));
const AdminServices = React.lazy(() => import('@/pages/AdminServices'));
const AdminSettings = React.lazy(() => import('@/pages/AdminSettings'));
const AdminSecurity = React.lazy(() => import('@/pages/AdminSecurity'));
const AdminReports = React.lazy(() => import('@/pages/AdminReports'));
const AdminProviders = React.lazy(() => import('@/pages/AdminProviders'));
const AdminFinance = React.lazy(() => import('@/pages/AdminFinance'));

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
      {/* Main routes */}
      <Route path="/" element={<RouteWrapper><Index /></RouteWrapper>} />
      <Route path="/auth" element={<RouteWrapper><Auth /></RouteWrapper>} />
      <Route path="/dashboard" element={<RouteWrapper><Dashboard /></RouteWrapper>} />
      <Route path="/marketplace" element={<RouteWrapper><Marketplace /></RouteWrapper>} />
      <Route path="/request-audit" element={<RouteWrapper><RequestAudit /></RouteWrapper>} />
      <Route path="/pricinginr" element={<RouteWrapper><Pricing /></RouteWrapper>} />
      <Route path="/contact" element={<RouteWrapper><Contact /></RouteWrapper>} />
      <Route path="/about" element={<RouteWrapper><About /></RouteWrapper>} />
      <Route path="/privacy" element={<RouteWrapper><Privacy /></RouteWrapper>} />
      <Route path="/terms" element={<RouteWrapper><Terms /></RouteWrapper>} />
      <Route path="/pricing-calculator" element={<RouteWrapper><PricingCalculator /></RouteWrapper>} />

      {/* Services routes */}
      <Route path="/services/security-audits" element={<RouteWrapper><SecurityAudits /></RouteWrapper>} />
      <Route path="/services/code-reviews" element={<RouteWrapper><CodeReviews /></RouteWrapper>} />
      <Route path="/services/penetration-testing" element={<RouteWrapper><PenetrationTesting /></RouteWrapper>} />
      <Route path="/services/consulting" element={<RouteWrapper><Consulting /></RouteWrapper>} />

      {/* Resources routes */}
      <Route path="/resources/security-guides" element={<RouteWrapper><SecurityGuides /></RouteWrapper>} />
      <Route path="/resources/knowledge-base" element={<RouteWrapper><KnowledgeBase /></RouteWrapper>} />
      <Route path="/resources/tutorials" element={<RouteWrapper><Tutorials /></RouteWrapper>} />
      <Route path="/resources/templates" element={<RouteWrapper><Templates /></RouteWrapper>} />
      <Route path="/resources/audit-guidelines" element={<RouteWrapper><AuditGuidelines /></RouteWrapper>} />
      <Route path="/resources/vulnerability-database" element={<RouteWrapper><VulnerabilityDatabase /></RouteWrapper>} />

      {/* Community routes */}
      <Route path="/community/forum" element={<RouteWrapper><Forum /></RouteWrapper>} />
      <Route path="/community/events" element={<RouteWrapper><Events /></RouteWrapper>} />
      <Route path="/community/challenges" element={<RouteWrapper><Challenges /></RouteWrapper>} />
      <Route path="/community/leaderboard" element={<RouteWrapper><Leaderboard /></RouteWrapper>} />

      {/* Tools routes */}
      <Route path="/tools/ai-tools" element={<RouteWrapper><AITools /></RouteWrapper>} />
      <Route path="/tools/security-insights" element={<RouteWrapper><SecurityInsights /></RouteWrapper>} />
      <Route path="/tools/vulnerability-scanner" element={<RouteWrapper><VulnerabilityScanner /></RouteWrapper>} />
      <Route path="/tools/platform-reports" element={<RouteWrapper><PlatformReports /></RouteWrapper>} />
      <Route path="/tools/file-management" element={<RouteWrapper><FileManagement /></RouteWrapper>} />

      {/* Business routes */}
      <Route path="/business/contact" element={<RouteWrapper><ContactPage /></RouteWrapper>} />
      <Route path="/business/careers" element={<RouteWrapper><Careers /></RouteWrapper>} />
      <Route path="/business/pricing" element={<RouteWrapper><BusinessPricing /></RouteWrapper>} />
      <Route path="/business/partners" element={<RouteWrapper><Partners /></RouteWrapper>} />

      {/* Support routes */}
      <Route path="/support/faq" element={<RouteWrapper><FAQ /></RouteWrapper>} />
      <Route path="/support" element={<RouteWrapper><Support /></RouteWrapper>} />
      <Route path="/support/documentation" element={<RouteWrapper><Documentation /></RouteWrapper>} />

      {/* User routes */}
      <Route path="/user/profile" element={<RouteWrapper><Profile /></RouteWrapper>} />
      <Route path="/user/settings" element={<RouteWrapper><Settings /></RouteWrapper>} />

      {/* Other routes */}
      <Route path="/service-provider-onboarding" element={<RouteWrapper><ServiceProviderOnboarding /></RouteWrapper>} />
      <Route path="/analytics" element={<RouteWrapper><Analytics /></RouteWrapper>} />
      <Route path="/ai-analysis" element={<RouteWrapper><AIAnalysisPage /></RouteWrapper>} />
      <Route path="/ai-matching-hub" element={<RouteWrapper><AIMatchingHub /></RouteWrapper>} />
      <Route path="/advanced-features" element={<RouteWrapper><AdvancedFeaturesHub /></RouteWrapper>} />
      <Route path="/audit-details/:id" element={<RouteWrapper><AuditDetails /></RouteWrapper>} />
      <Route path="/calendar" element={<RouteWrapper><Calendar /></RouteWrapper>} />
      <Route path="/collaboration" element={<RouteWrapper><Collaboration /></RouteWrapper>} />
      <Route path="/escrow" element={<RouteWrapper><Escrow /></RouteWrapper>} />
      <Route path="/integrations" element={<RouteWrapper><IntegrationsPage /></RouteWrapper>} />
      <Route path="/launch-readiness" element={<RouteWrapper><LaunchReadiness /></RouteWrapper>} />

      {/* Admin routes */}
      <Route path="/admin" element={<RouteWrapper><AdminDashboard /></RouteWrapper>} />
      <Route path="/admin/users" element={<RouteWrapper><AdminUsers /></RouteWrapper>} />
      <Route path="/admin/services" element={<RouteWrapper><AdminServices /></RouteWrapper>} />
      <Route path="/admin/settings" element={<RouteWrapper><AdminSettings /></RouteWrapper>} />
      <Route path="/admin/security" element={<RouteWrapper><AdminSecurity /></RouteWrapper>} />
      <Route path="/admin/reports" element={<RouteWrapper><AdminReports /></RouteWrapper>} />
      <Route path="/admin/providers" element={<RouteWrapper><AdminProviders /></RouteWrapper>} />
      <Route path="/admin/finance" element={<RouteWrapper><AdminFinance /></RouteWrapper>} />

      {/* 404 route */}
      <Route path="*" element={<RouteWrapper><Enhanced404 /></RouteWrapper>} />
    </Routes>
  );
}

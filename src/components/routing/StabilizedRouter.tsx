
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RouteErrorBoundary } from '@/components/error-handling/RouteErrorBoundary';
import LoadingState from '@/components/ui/loading-state';

// Core Pages
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

// Service Pages
const SecurityAudits = React.lazy(() => import('@/pages/services/SecurityAudits'));
const CodeReviews = React.lazy(() => import('@/pages/services/CodeReviews'));
const PenetrationTesting = React.lazy(() => import('@/pages/services/PenetrationTesting'));
const Consulting = React.lazy(() => import('@/pages/services/Consulting'));

// Resource Pages
const SecurityGuides = React.lazy(() => import('@/pages/resources/SecurityGuides'));
const KnowledgeBase = React.lazy(() => import('@/pages/resources/KnowledgeBase'));
const Tutorials = React.lazy(() => import('@/pages/resources/Tutorials'));
const Templates = React.lazy(() => import('@/pages/resources/Templates'));
const AuditGuidelines = React.lazy(() => import('@/pages/resources/AuditGuidelines'));
const VulnerabilityDatabase = React.lazy(() => import('@/pages/resources/VulnerabilityDatabase'));

// Community Pages
const Forum = React.lazy(() => import('@/pages/community/Forum'));
const Events = React.lazy(() => import('@/pages/community/Events'));
const Challenges = React.lazy(() => import('@/pages/community/Challenges'));
const Leaderboard = React.lazy(() => import('@/pages/community/Leaderboard'));

// Tool Pages
const AITools = React.lazy(() => import('@/pages/tools/AITools'));
const SecurityInsights = React.lazy(() => import('@/pages/tools/SecurityInsights'));
const VulnerabilityScanner = React.lazy(() => import('@/pages/tools/VulnerabilityScanner'));
const PlatformReports = React.lazy(() => import('@/pages/tools/PlatformReports'));
const FileManagement = React.lazy(() => import('@/pages/tools/FileManagement'));

// Business Pages
const ContactPage = React.lazy(() => import('@/pages/business/ContactPage'));
const Careers = React.lazy(() => import('@/pages/business/Careers'));
const BusinessPricing = React.lazy(() => import('@/pages/business/BusinessPricing'));
const Partners = React.lazy(() => import('@/pages/business/Partners'));

// Support Pages
const FAQ = React.lazy(() => import('@/pages/support/FAQ'));
const Support = React.lazy(() => import('@/pages/support/Support'));
const Documentation = React.lazy(() => import('@/pages/support/Documentation'));

// User Pages
const Profile = React.lazy(() => import('@/pages/user/Profile'));
const Settings = React.lazy(() => import('@/pages/user/Settings'));

// Specialized Pages
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

// Admin Pages (existing ones that work)
const AdminDashboard = React.lazy(() => import('@/pages/AdminDashboard'));
const AdminFinance = React.lazy(() => import('@/pages/AdminFinance'));
const AIMatching = React.lazy(() => import('@/pages/AIMatching'));
const AIMatchingV2 = React.lazy(() => import('@/pages/AIMatchingV2'));
const SecurityMonitoringPage = React.lazy(() => import('@/pages/SecurityMonitoringPage'));

const RouteWrapper = ({ children }: { children: React.ReactNode }) => (
  <RouteErrorBoundary>
    <Suspense fallback={<LoadingState message="Loading page..." />}>
      {children}
    </Suspense>
  </RouteErrorBoundary>
);

function StabilizedRouter() {
  return (
    <Routes>
      {/* Core Routes */}
      <Route path="/" element={<RouteWrapper><Index /></RouteWrapper>} />
      <Route path="/auth" element={<RouteWrapper><Auth /></RouteWrapper>} />
      <Route path="/dashboard" element={<RouteWrapper><Dashboard /></RouteWrapper>} />
      <Route path="/marketplace" element={<RouteWrapper><Marketplace /></RouteWrapper>} />
      <Route path="/request-audit" element={<RouteWrapper><RequestAudit /></RouteWrapper>} />
      <Route path="/pricing" element={<RouteWrapper><Pricing /></RouteWrapper>} />
      <Route path="/contact" element={<RouteWrapper><Contact /></RouteWrapper>} />
      <Route path="/about" element={<RouteWrapper><About /></RouteWrapper>} />
      <Route path="/privacy" element={<RouteWrapper><Privacy /></RouteWrapper>} />
      <Route path="/terms" element={<RouteWrapper><Terms /></RouteWrapper>} />
      <Route path="/pricing-calculator" element={<RouteWrapper><PricingCalculator /></RouteWrapper>} />

      {/* Service Routes */}
      <Route path="/security-audits" element={<RouteWrapper><SecurityAudits /></RouteWrapper>} />
      <Route path="/code-reviews" element={<RouteWrapper><CodeReviews /></RouteWrapper>} />
      <Route path="/penetration-testing" element={<RouteWrapper><PenetrationTesting /></RouteWrapper>} />
      <Route path="/consulting" element={<RouteWrapper><Consulting /></RouteWrapper>} />

      {/* Resource Routes */}
      <Route path="/resources" element={<RouteWrapper><SecurityGuides /></RouteWrapper>} />
      <Route path="/knowledge-base" element={<RouteWrapper><KnowledgeBase /></RouteWrapper>} />
      <Route path="/tutorials" element={<RouteWrapper><Tutorials /></RouteWrapper>} />
      <Route path="/templates" element={<RouteWrapper><Templates /></RouteWrapper>} />
      <Route path="/audit-guidelines" element={<RouteWrapper><AuditGuidelines /></RouteWrapper>} />
      <Route path="/vulnerabilities" element={<RouteWrapper><VulnerabilityDatabase /></RouteWrapper>} />

      {/* Community Routes */}
      <Route path="/community" element={<RouteWrapper><Forum /></RouteWrapper>} />
      <Route path="/events" element={<RouteWrapper><Events /></RouteWrapper>} />
      <Route path="/challenges" element={<RouteWrapper><Challenges /></RouteWrapper>} />
      <Route path="/leaderboard" element={<RouteWrapper><Leaderboard /></RouteWrapper>} />

      {/* Tool Routes */}
      <Route path="/ai-tools" element={<RouteWrapper><AITools /></RouteWrapper>} />
      <Route path="/security-insights" element={<RouteWrapper><SecurityInsights /></RouteWrapper>} />
      <Route path="/vulnerability-scanner" element={<RouteWrapper><VulnerabilityScanner /></RouteWrapper>} />
      <Route path="/platform-reports" element={<RouteWrapper><PlatformReports /></RouteWrapper>} />
      <Route path="/file-management" element={<RouteWrapper><FileManagement /></RouteWrapper>} />

      {/* Business Routes */}
      <Route path="/contact-page" element={<RouteWrapper><ContactPage /></RouteWrapper>} />
      <Route path="/careers" element={<RouteWrapper><Careers /></RouteWrapper>} />
      <Route path="/business-pricing" element={<RouteWrapper><BusinessPricing /></RouteWrapper>} />
      <Route path="/partners" element={<RouteWrapper><Partners /></RouteWrapper>} />

      {/* Support Routes */}
      <Route path="/faq" element={<RouteWrapper><FAQ /></RouteWrapper>} />
      <Route path="/support" element={<RouteWrapper><Support /></RouteWrapper>} />
      <Route path="/documentation" element={<RouteWrapper><Documentation /></RouteWrapper>} />

      {/* User Routes */}
      <Route path="/profile" element={<RouteWrapper><Profile /></RouteWrapper>} />
      <Route path="/settings" element={<RouteWrapper><Settings /></RouteWrapper>} />

      {/* Specialized Routes */}
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

      {/* Admin Routes */}
      <Route path="/admin" element={<RouteWrapper><AdminDashboard /></RouteWrapper>} />
      <Route path="/admin/finance" element={<RouteWrapper><AdminFinance /></RouteWrapper>} />

      {/* AI Matching Routes */}
      <Route path="/ai-matching" element={<RouteWrapper><AIMatching /></RouteWrapper>} />
      <Route path="/ai-matching-v2" element={<RouteWrapper><AIMatchingV2 /></RouteWrapper>} />
      <Route path="/security-monitoring" element={<RouteWrapper><SecurityMonitoringPage /></RouteWrapper>} />

      {/* Audits route */}
      <Route path="/audits" element={<RouteWrapper><Dashboard /></RouteWrapper>} />

      {/* Catch-all route */}
      <Route path="*" element={<RouteWrapper><Enhanced404 /></RouteWrapper>} />
    </Routes>
  );
}

export default StabilizedRouter;

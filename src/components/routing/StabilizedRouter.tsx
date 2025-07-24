import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RouteErrorBoundary } from '@/components/error-handling/RouteErrorBoundary';
import LoadingState from '@/components/ui/loading-state';

// Main pages
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
const FAQ = React.lazy(() => import('@/pages/FAQ'));

// Services
const SecurityAudits = React.lazy(() => import('@/pages/SecurityAudits'));
const CodeReviews = React.lazy(() => import('@/pages/services/CodeReviewsPage'));
const PenetrationTesting = React.lazy(() => import('@/pages/services/PenetrationTestingPage'));
const Consulting = React.lazy(() => import('@/pages/services/ConsultingPage'));

// Resources
const Resources = React.lazy(() => import('@/pages/Resources'));
const SecurityGuides = React.lazy(() => import('@/pages/resources/SecurityGuides'));
const KnowledgeBase = React.lazy(() => import('@/pages/resources/KnowledgeBasePage'));
const Tutorials = React.lazy(() => import('@/pages/resources/TutorialsPage'));
const Templates = React.lazy(() => import('@/pages/resources/TemplatesPage'));
const AuditGuidelines = React.lazy(() => import('@/pages/resources/AuditGuidelines'));
const VulnerabilityDatabase = React.lazy(() => import('@/pages/resources/VulnerabilityDatabase'));

// Community
const Community = React.lazy(() => import('@/pages/Community'));
const Forum = React.lazy(() => import('@/pages/community/ForumPage'));
const Events = React.lazy(() => import('@/pages/community/EventsPage'));
const Challenges = React.lazy(() => import('@/pages/community/ChallengesPage'));
const Leaderboard = React.lazy(() => import('@/pages/community/LeaderboardPage'));
const Research = React.lazy(() => import('@/pages/community/ResearchPage'));

// Tools
const AITools = React.lazy(() => import('@/pages/tools/AIToolsPage'));
const SecurityInsights = React.lazy(() => import('@/pages/tools/SecurityInsightsPage'));
const VulnerabilityScanner = React.lazy(() => import('@/pages/tools/VulnerabilityScannerPage'));
const PlatformReports = React.lazy(() => import('@/pages/tools/PlatformReportsPage'));
const FileManagement = React.lazy(() => import('@/pages/FileManagement'));
const AISecuritySuite = React.lazy(() => import('@/pages/tools/AISecuritySuitePage'));

// Business
const ContactPage = React.lazy(() => import('@/pages/Contact'));
const CareersPage = React.lazy(() => import('@/pages/business/CareersPage'));
const BusinessPricing = React.lazy(() => import('@/pages/business/PricingPage'));
const PartnersPage = React.lazy(() => import('@/pages/business/Partners'));

// Support
const FAQPage = React.lazy(() => import('@/pages/support/FAQPage'));
const SupportPage = React.lazy(() => import('@/pages/support/SupportPage'));
const Documentation = React.lazy(() => import('@/pages/support/Documentation'));

// User
const Profile = React.lazy(() => import('@/pages/Profile'));
const Settings = React.lazy(() => import('@/pages/Settings'));

// Other pages
const ServiceProviderOnboarding = React.lazy(() => import('@/pages/ServiceProviderOnboarding'));
const Analytics = React.lazy(() => import('@/pages/Analytics'));
const AIAnalysisPage = React.lazy(() => import('@/pages/AIAnalysisPage'));
const AIMatchingHub = React.lazy(() => import('@/pages/AIMatchingHub'));
const AdvancedFeaturesHub = React.lazy(() => import('@/pages/AdvancedFeaturesHub'));
const AuditDetails = React.lazy(() => import('@/pages/AuditDetails'));
const Audits = React.lazy(() => import('@/pages/Audits'));
const Calendar = React.lazy(() => import('@/pages/Calendar'));
const Collaboration = React.lazy(() => import('@/pages/Collaboration'));
const Escrow = React.lazy(() => import('@/pages/Escrow'));
const IntegrationsPage = React.lazy(() => import('@/pages/IntegrationsPage'));
const LaunchReadiness = React.lazy(() => import('@/pages/LaunchReadiness'));
const Status = React.lazy(() => import('@/pages/Status'));
const Web3Security = React.lazy(() => import('@/pages/Web3Security'));

// Admin pages
const AdminDashboard = React.lazy(() => import('@/pages/AdminDashboard'));
const AdminUsers = React.lazy(() => import('@/pages/AdminUsers'));
const AdminServices = React.lazy(() => import('@/pages/AdminServices'));
const AdminSettings = React.lazy(() => import('@/pages/AdminSettings'));
const AdminSecurity = React.lazy(() => import('@/pages/AdminSecurity'));
const AdminReports = React.lazy(() => import('@/pages/AdminReports'));
const AdminProviders = React.lazy(() => import('@/pages/AdminProviders'));
const AdminFinance = React.lazy(() => import('@/pages/AdminFinance'));

// Enhanced Auditor Components
const CodeAnalysisEngine = React.lazy(() => import('@/components/automation/CodeAnalysisEngine'));
const CrossChainSecurityAnalyzer = React.lazy(() => import('@/components/automation/CrossChainSecurityAnalyzer'));
const AIAuditAssistant = React.lazy(() => import('@/components/automation/AIAuditAssistant'));
const IntegratedSecurityAnalyzer = React.lazy(() => import('@/components/automation/IntegratedSecurityAnalyzer'));
const EnterpriseDashboard = React.lazy(() => import('@/components/enterprise/EnterpriseDashboard'));
const EnhancedAuditorDashboard = React.lazy(() => import('@/components/dashboard/enhanced/EnhancedAuditorDashboard'));
const AdvancedFeaturesPage = React.lazy(() => import('@/pages/AdvancedFeaturesPage'));
const IntelligentAuditWorkspacePage = React.lazy(() => import('@/pages/IntelligentAuditWorkspacePage'));
const AuditorOpportunities = React.lazy(() => import('@/pages/AuditorOpportunities'));
const AuditPreparation = React.lazy(() => import('@/pages/AuditPreparation'));


const SmartLearningPage = React.lazy(() => import('@/pages/SmartLearningPage'));

const AdvancedProjectManagementPage = React.lazy(() => import('@/pages/AdvancedProjectManagementPage'));

const EnhancedAIFeaturesPage = React.lazy(() => import('@/pages/EnhancedAIFeaturesPage'));

const ProfessionalGrowthToolsPage = React.lazy(() => import('@/pages/ProfessionalGrowthToolsPage'));

const Phase4DashboardPage = React.lazy(() => import('@/pages/Phase4DashboardPage'));

const AuditDetailsPage = React.lazy(() => import('@/pages/AuditDetailsPage'));

// Debug
const DebugAuthPage = React.lazy(() => import('@/pages/DebugAuthPage'));

// Gamification
const GamificationDemo = React.lazy(() => import('@/pages/GamificationDemo'));

// Personalization
const PersonalizationSetupPage = React.lazy(() => import('@/pages/PersonalizationSetupPage'));

// Portfolio
const PortfolioCreate = React.lazy(() => import('@/pages/PortfolioCreate'));
const PortfolioView = React.lazy(() => import('@/pages/PortfolioView'));

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
      <Route path="/pricing" element={<RouteWrapper><Pricing /></RouteWrapper>} />
      <Route path="/contact" element={<RouteWrapper><Contact /></RouteWrapper>} />
      <Route path="/about" element={<RouteWrapper><About /></RouteWrapper>} />
      <Route path="/privacy" element={<RouteWrapper><Privacy /></RouteWrapper>} />
      <Route path="/terms" element={<RouteWrapper><Terms /></RouteWrapper>} />
      <Route path="/pricing-calculator" element={<RouteWrapper><PricingCalculator /></RouteWrapper>} />
      <Route path="/faq" element={<RouteWrapper><FAQ /></RouteWrapper>} />

      {/* Services routes */}
      <Route path="/services/security-audits" element={<RouteWrapper><SecurityAudits /></RouteWrapper>} />
      <Route path="/services/code-reviews" element={<RouteWrapper><CodeReviews /></RouteWrapper>} />
      <Route path="/services/penetration-testing" element={<RouteWrapper><PenetrationTesting /></RouteWrapper>} />
      <Route path="/services/consulting" element={<RouteWrapper><Consulting /></RouteWrapper>} />

      {/* Resources routes */}
      <Route path="/resources" element={<RouteWrapper><Resources /></RouteWrapper>} />
      <Route path="/resources/security-guides" element={<RouteWrapper><SecurityGuides /></RouteWrapper>} />
      <Route path="/resources/knowledge-base" element={<RouteWrapper><KnowledgeBase /></RouteWrapper>} />
      <Route path="/resources/tutorials" element={<RouteWrapper><Tutorials /></RouteWrapper>} />
      <Route path="/resources/templates" element={<RouteWrapper><Templates /></RouteWrapper>} />
      <Route path="/resources/audit-guidelines" element={<RouteWrapper><AuditGuidelines /></RouteWrapper>} />
      <Route path="/resources/vulnerability-database" element={<RouteWrapper><VulnerabilityDatabase /></RouteWrapper>} />

      {/* Community routes */}
      <Route path="/community" element={<RouteWrapper><Community /></RouteWrapper>} />
      <Route path="/community/forum" element={<RouteWrapper><Forum /></RouteWrapper>} />
      <Route path="/community/events" element={<RouteWrapper><Events /></RouteWrapper>} />
      <Route path="/community/challenges" element={<RouteWrapper><Challenges /></RouteWrapper>} />
      <Route path="/community/leaderboard" element={<RouteWrapper><Leaderboard /></RouteWrapper>} />
      <Route path="/community/research" element={<RouteWrapper><Research /></RouteWrapper>} />

      {/* Tools routes */}
      <Route path="/tools/ai-tools" element={<RouteWrapper><AITools /></RouteWrapper>} />
      <Route path="/tools/security-insights" element={<RouteWrapper><SecurityInsights /></RouteWrapper>} />
      <Route path="/tools/vulnerability-scanner" element={<RouteWrapper><VulnerabilityScanner /></RouteWrapper>} />
      <Route path="/tools/platform-reports" element={<RouteWrapper><PlatformReports /></RouteWrapper>} />
      <Route path="/tools/file-management" element={<RouteWrapper><FileManagement /></RouteWrapper>} />
      <Route path="/tools/ai-security-suite" element={<RouteWrapper><AISecuritySuite /></RouteWrapper>} />

      {/* Business routes */}
      <Route path="/business/contact" element={<RouteWrapper><Contact /></RouteWrapper>} />
      <Route path="/business/careers" element={<RouteWrapper><CareersPage /></RouteWrapper>} />
      <Route path="/business/pricing" element={<RouteWrapper><BusinessPricing /></RouteWrapper>} />
      <Route path="/business/partners" element={<RouteWrapper><PartnersPage /></RouteWrapper>} />

      {/* Support routes */}
      <Route path="/support/faq" element={<RouteWrapper><FAQPage /></RouteWrapper>} />
      <Route path="/support" element={<RouteWrapper><SupportPage /></RouteWrapper>} />
      <Route path="/support/documentation" element={<RouteWrapper><Documentation /></RouteWrapper>} />

      {/* User routes */}
      <Route path="/user/profile" element={<RouteWrapper><Profile /></RouteWrapper>} />
      <Route path="/user/settings" element={<RouteWrapper><Settings /></RouteWrapper>} />

      {/* Gamification routes */}
      <Route path="/gamification" element={<RouteWrapper><GamificationDemo /></RouteWrapper>} />
      <Route path="/gamification-demo" element={<RouteWrapper><GamificationDemo /></RouteWrapper>} />

      {/* Personalization routes */}
      <Route path="/personalization-setup" element={<RouteWrapper><PersonalizationSetupPage /></RouteWrapper>} />

      {/* Portfolio routes */}
      <Route path="/portfolio/create" element={<RouteWrapper><PortfolioCreate /></RouteWrapper>} />
      <Route path="/portfolio/:slug" element={<RouteWrapper><PortfolioView /></RouteWrapper>} />

      {/* Other routes */}
      <Route path="/service-provider-onboarding" element={<RouteWrapper><ServiceProviderOnboarding /></RouteWrapper>} />
      <Route path="/analytics" element={<RouteWrapper><Analytics /></RouteWrapper>} />
      <Route path="/ai-analysis" element={<RouteWrapper><AIAnalysisPage /></RouteWrapper>} />
      <Route path="/ai-matching-hub" element={<RouteWrapper><AIMatchingHub /></RouteWrapper>} />
      <Route path="/advanced-features" element={<RouteWrapper><AdvancedFeaturesHub /></RouteWrapper>} />
      <Route path="/audit-details/:id" element={<RouteWrapper><AuditDetails /></RouteWrapper>} />
      <Route path="/audits" element={<RouteWrapper><Audits /></RouteWrapper>} />
      <Route path="/calendar" element={<RouteWrapper><Calendar /></RouteWrapper>} />
      <Route path="/collaboration" element={<RouteWrapper><Collaboration /></RouteWrapper>} />
      <Route path="/escrow" element={<RouteWrapper><Escrow /></RouteWrapper>} />
      <Route path="/integrations" element={<RouteWrapper><IntegrationsPage /></RouteWrapper>} />
      <Route path="/launch-readiness" element={<RouteWrapper><LaunchReadiness /></RouteWrapper>} />
      <Route path="/status" element={<RouteWrapper><Status /></RouteWrapper>} />
      <Route path="/web3-security" element={<RouteWrapper><Web3Security /></RouteWrapper>} />

      {/* Service Redirects */}
      <Route path="/security-audits" element={<Navigate to="/services/security-audits" replace />} />
      <Route path="/code-reviews" element={<Navigate to="/services/code-reviews" replace />} />
      <Route path="/penetration-testing" element={<Navigate to="/services/penetration-testing" replace />} />
      <Route path="/consulting" element={<Navigate to="/services/consulting" replace />} />

      {/* Resource Redirects */}
      <Route path="/vulnerabilities" element={<Navigate to="/resources/vulnerability-database" replace />} />

      {/* Tool Redirects */}
      <Route path="/ai-tools" element={<Navigate to="/tools/ai-tools" replace />} />

      {/* Business Redirects */}
      <Route path="/careers" element={<Navigate to="/business/careers" replace />} />

      {/* Admin routes */}
      <Route path="/admin" element={<RouteWrapper><AdminDashboard /></RouteWrapper>} />
      <Route path="/admin/users" element={<RouteWrapper><AdminUsers /></RouteWrapper>} />
      <Route path="/admin/services" element={<RouteWrapper><AdminServices /></RouteWrapper>} />
      <Route path="/admin/settings" element={<RouteWrapper><AdminSettings /></RouteWrapper>} />
      <Route path="/admin/security" element={<RouteWrapper><AdminSecurity /></RouteWrapper>} />
      <Route path="/admin/reports" element={<RouteWrapper><AdminReports /></RouteWrapper>} />
      <Route path="/admin/providers" element={<RouteWrapper><AdminProviders /></RouteWrapper>} />
      <Route path="/admin/finance" element={<RouteWrapper><AdminFinance /></RouteWrapper>} />

      {/* Enhanced Auditor Routes */}
      <Route path="/auditor/enhanced-dashboard" element={<RouteWrapper><EnhancedAuditorDashboard /></RouteWrapper>} />
      <Route path="/auditor/opportunities" element={<RouteWrapper><AuditorOpportunities /></RouteWrapper>} />
      <Route path="/auditor/preparation" element={<RouteWrapper><AuditPreparation /></RouteWrapper>} />
      <Route path="/auditor/code-analysis" element={<RouteWrapper><CodeAnalysisEngine /></RouteWrapper>} />
      <Route path="/auditor/cross-chain-analysis" element={<RouteWrapper><CrossChainSecurityAnalyzer /></RouteWrapper>} />
      <Route path="/auditor/ai-assistant" element={<RouteWrapper><AIAuditAssistant /></RouteWrapper>} />
      <Route path="/auditor/security-analyzer" element={<RouteWrapper><IntegratedSecurityAnalyzer /></RouteWrapper>} />
      <Route path="/enterprise/dashboard" element={<RouteWrapper><EnterpriseDashboard /></RouteWrapper>} />
      <Route path="/advanced-features" element={<RouteWrapper><AdvancedFeaturesPage /></RouteWrapper>} />
      <Route path="/auditor/intelligent-workspace" element={<RouteWrapper><IntelligentAuditWorkspacePage /></RouteWrapper>} />

      {/* Smart Learning Page */}
      <Route path="/learning" element={<RouteWrapper><SmartLearningPage /></RouteWrapper>} />

      {/* Advanced Project Management */}
      <Route path="/project-management" element={<RouteWrapper><AdvancedProjectManagementPage /></RouteWrapper>} />

      {/* Enhanced AI Features */}
      <Route path="/ai-enhanced" element={<RouteWrapper><EnhancedAIFeaturesPage /></RouteWrapper>} />

      {/* Professional Growth Tools */}
      <Route path="/professional-growth" element={<RouteWrapper><ProfessionalGrowthToolsPage /></RouteWrapper>} />

      {/* Phase 4 Dashboard */}
      <Route path="/phase4" element={<RouteWrapper><Phase4DashboardPage /></RouteWrapper>} />

      {/* Audit Details */}
      <Route path="/audit-details/:id" element={<RouteWrapper><AuditDetailsPage /></RouteWrapper>} />

      {/* Debug routes */}
      <Route path="/debug/auth" element={<RouteWrapper><DebugAuthPage /></RouteWrapper>} />

      {/* 404 route */}
      <Route path="*" element={<RouteWrapper><Enhanced404 /></RouteWrapper>} />
    </Routes>
  );
}


import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/auth";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { AccessibilityProvider } from "@/components/accessibility/AccessibilityEnhancements";
import { EnhancedLoadingState } from "@/components/ui/enhanced-loading-states";

// Lazy load components for better performance
const IndexPageLayout = React.lazy(() => import("@/components/home/index-page-layout").then(m => ({ default: m.IndexPageLayout })));
const AuthPage = React.lazy(() => import("@/pages/AuthPage"));
const DashboardPage = React.lazy(() => import("@/pages/DashboardPage"));
const ProfilePage = React.lazy(() => import("@/pages/ProfilePage"));
const MarketplacePage = React.lazy(() => import("@/pages/MarketplacePage"));
const SecurityAuditsPage = React.lazy(() => import("@/pages/SecurityAuditsPage"));
const RequestAuditPage = React.lazy(() => import("@/pages/RequestAuditPage"));
const AuditsPage = React.lazy(() => import("@/pages/AuditsPage"));
const AccessibilityTestingPage = React.lazy(() => import("@/pages/AccessibilityTestingPage").then(m => ({ default: m.AccessibilityTestingPage })));

// Service pages
const CodeReviewsPage = React.lazy(() => import("@/pages/services/CodeReviewsPage"));
const PenetrationTestingPage = React.lazy(() => import("@/pages/services/PenetrationTestingPage"));
const ConsultingPage = React.lazy(() => import("@/pages/services/ConsultingPage"));

// Resource pages
const SecurityGuidesPage = React.lazy(() => import("@/pages/resources/SecurityGuidesPage"));
const KnowledgeBasePage = React.lazy(() => import("@/pages/resources/KnowledgeBasePage"));
const TutorialsPage = React.lazy(() => import("@/pages/resources/TutorialsPage"));
const TemplatesPage = React.lazy(() => import("@/pages/resources/TemplatesPage"));

// Tool pages
const SecurityInsightsPage = React.lazy(() => import("@/pages/tools/SecurityInsightsPage"));
const AIToolsPage = React.lazy(() => import("@/pages/tools/AIToolsPage"));
const VulnerabilityScannerPage = React.lazy(() => import("@/pages/tools/VulnerabilityScannerPage"));
const PlatformReportsPage = React.lazy(() => import("@/pages/tools/PlatformReportsPage"));

// Community pages
const ForumPage = React.lazy(() => import("@/pages/community/ForumPage"));
const EventsPage = React.lazy(() => import("@/pages/community/EventsPage"));
const ChallengesPage = React.lazy(() => import("@/pages/community/ChallengesPage"));
const LeaderboardPage = React.lazy(() => import("@/pages/community/LeaderboardPage"));

// Business pages
const AboutPage = React.lazy(() => import("@/pages/business/AboutPage"));
const CareersPage = React.lazy(() => import("@/pages/business/CareersPage"));
const PricingPage = React.lazy(() => import("@/pages/business/PricingPage"));
const ContactPage = React.lazy(() => import("@/pages/business/ContactPage"));

// Support pages
const FAQPage = React.lazy(() => import("@/pages/support/FAQPage"));
const SupportPage = React.lazy(() => import("@/pages/support/SupportPage"));
const TermsPage = React.lazy(() => import("@/pages/support/TermsPage"));
const PrivacyPage = React.lazy(() => import("@/pages/support/PrivacyPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AccessibilityProvider>
            <AuthProvider>
              <Router>
                <div className="min-h-screen bg-background text-foreground">
                  <Suspense fallback={
                    <EnhancedLoadingState 
                      variant="pulse" 
                      size="lg" 
                      message="Loading Hawkly..." 
                      fullScreen 
                    />
                  }>
                    <Routes>
                      {/* Core routes */}
                      <Route path="/" element={<IndexPageLayout />} />
                      <Route path="/auth" element={<AuthPage />} />
                      <Route path="/dashboard" element={<DashboardPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/marketplace" element={<MarketplacePage />} />
                      <Route path="/security-audits" element={<SecurityAuditsPage />} />
                      <Route path="/request-audit" element={<RequestAuditPage />} />
                      <Route path="/audits" element={<AuditsPage />} />
                      <Route path="/accessibility-testing" element={<AccessibilityTestingPage />} />
                      
                      {/* Service routes */}
                      <Route path="/services/code-reviews" element={<CodeReviewsPage />} />
                      <Route path="/services/penetration-testing" element={<PenetrationTestingPage />} />
                      <Route path="/services/consulting" element={<ConsultingPage />} />
                      
                      {/* Resource routes */}
                      <Route path="/resources/security-guides" element={<SecurityGuidesPage />} />
                      <Route path="/resources/knowledge-base" element={<KnowledgeBasePage />} />
                      <Route path="/resources/tutorials" element={<TutorialsPage />} />
                      <Route path="/resources/templates" element={<TemplatesPage />} />
                      
                      {/* Tool routes */}
                      <Route path="/tools/security-insights" element={<SecurityInsightsPage />} />
                      <Route path="/tools/ai-tools" element={<AIToolsPage />} />
                      <Route path="/tools/vulnerability-scanner" element={<VulnerabilityScannerPage />} />
                      <Route path="/tools/platform-reports" element={<PlatformReportsPage />} />
                      
                      {/* Community routes */}
                      <Route path="/community/forum" element={<ForumPage />} />
                      <Route path="/community/events" element={<EventsPage />} />
                      <Route path="/community/challenges" element={<ChallengesPage />} />
                      <Route path="/community/leaderboard" element={<LeaderboardPage />} />
                      
                      {/* Business routes */}
                      <Route path="/business/about" element={<AboutPage />} />
                      <Route path="/business/careers" element={<CareersPage />} />
                      <Route path="/business/pricing" element={<PricingPage />} />
                      <Route path="/business/contact" element={<ContactPage />} />
                      
                      {/* Support routes */}
                      <Route path="/support/faq" element={<FAQPage />} />
                      <Route path="/support/help" element={<SupportPage />} />
                      <Route path="/support/terms" element={<TermsPage />} />
                      <Route path="/support/privacy" element={<PrivacyPage />} />

                      {/* Legacy routes for backward compatibility */}
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/careers" element={<CareersPage />} />
                      <Route path="/pricing" element={<PricingPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/faq" element={<FAQPage />} />
                      <Route path="/support" element={<SupportPage />} />
                      <Route path="/terms" element={<TermsPage />} />
                      <Route path="/privacy" element={<PrivacyPage />} />
                      <Route path="/security-guides" element={<SecurityGuidesPage />} />
                      <Route path="/security-insights" element={<SecurityInsightsPage />} />
                      <Route path="/ai-tools" element={<AIToolsPage />} />
                      <Route path="/vulnerability-scanner" element={<VulnerabilityScannerPage />} />
                      <Route path="/platform-reports" element={<PlatformReportsPage />} />
                      <Route path="/events" element={<EventsPage />} />
                    </Routes>
                  </Suspense>
                  <Toaster />
                </div>
              </Router>
            </AuthProvider>
          </AccessibilityProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;

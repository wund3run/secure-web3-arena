
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/contexts/auth/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { EscrowProvider } from "@/contexts/EscrowContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ComprehensiveErrorBoundary } from "@/components/error/comprehensive-error-boundary";

// Core page imports
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import RequestAudit from "./pages/RequestAudit";
import Pricing from "./pages/Pricing";
import PricingINR from "./pages/PricingINR";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import ContactPage from "./pages/business/ContactPage";
import PricingCalculator from "./pages/PricingCalculator";

// Service pages
import SecurityAudits from "./pages/services/SecurityAudits";
import CodeReviews from "./pages/services/CodeReviews";
import PenetrationTesting from "./pages/services/PenetrationTesting";
import Consulting from "./pages/services/Consulting";

// Resource pages
import SecurityGuides from "./pages/resources/SecurityGuides";
import KnowledgeBase from "./pages/resources/KnowledgeBase";
import Tutorials from "./pages/resources/Tutorials";
import Templates from "./pages/resources/Templates";
import AuditGuidelines from "./pages/resources/AuditGuidelines";
import VulnerabilityDatabase from "./pages/resources/VulnerabilityDatabase";

// Community pages
import Forum from "./pages/community/Forum";
import Events from "./pages/community/Events";
import Challenges from "./pages/community/Challenges";
import Leaderboard from "./pages/community/Leaderboard";

// Tools pages
import AITools from "./pages/tools/AITools";
import SecurityInsights from "./pages/tools/SecurityInsights";
import VulnerabilityScanner from "./pages/tools/VulnerabilityScanner";
import PlatformReports from "./pages/tools/PlatformReports";
import FileManagement from "./pages/tools/FileManagement";

// Business pages
import Careers from "./pages/business/Careers";
import BusinessPricing from "./pages/business/BusinessPricing";
import Partners from "./pages/business/Partners";

// Support pages
import FAQ from "./pages/support/FAQ";
import Support from "./pages/support/Support";
import Documentation from "./pages/support/Documentation";

// Profile and Settings
import Profile from "./pages/user/Profile";
import Settings from "./pages/user/Settings";

// Service Provider
import ServiceProviderOnboarding from "./pages/ServiceProviderOnboarding";

const queryClient = new QueryClient();

function App() {
  return (
    <ComprehensiveErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <NotificationProvider>
              <AccessibilityProvider>
                <ThemeProvider storageKey="vite-ui-theme">
                  <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                      <EscrowProvider>
                        <Routes>
                          {/* Core Routes */}
                          <Route path="/" element={<Index />} />
                          <Route path="/auth" element={<Auth />} />
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/marketplace" element={<Marketplace />} />
                          <Route path="/request-audit" element={<RequestAudit />} />
                          <Route path="/pricing" element={<Pricing />} />
                          <Route path="/pricing-inr" element={<PricingINR />} />
                          <Route path="/pricing-calculator" element={<PricingCalculator />} />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/privacy" element={<Privacy />} />
                          <Route path="/terms" element={<Terms />} />

                          {/* Service Routes */}
                          <Route path="/security-audits" element={<SecurityAudits />} />
                          <Route path="/code-reviews" element={<CodeReviews />} />
                          <Route path="/penetration-testing" element={<PenetrationTesting />} />
                          <Route path="/consulting" element={<Consulting />} />

                          {/* Resource Routes */}
                          <Route path="/security-guides" element={<SecurityGuides />} />
                          <Route path="/knowledge-base" element={<KnowledgeBase />} />
                          <Route path="/tutorials" element={<Tutorials />} />
                          <Route path="/templates" element={<Templates />} />
                          <Route path="/audit-guidelines" element={<AuditGuidelines />} />
                          <Route path="/vulnerabilities" element={<VulnerabilityDatabase />} />

                          {/* Community Routes */}
                          <Route path="/forum" element={<Forum />} />
                          <Route path="/events" element={<Events />} />
                          <Route path="/challenges" element={<Challenges />} />
                          <Route path="/leaderboard" element={<Leaderboard />} />

                          {/* Tools Routes */}
                          <Route path="/ai-tools" element={<AITools />} />
                          <Route path="/security-insights" element={<SecurityInsights />} />
                          <Route path="/vulnerability-scanner" element={<VulnerabilityScanner />} />
                          <Route path="/platform-reports" element={<PlatformReports />} />
                          <Route path="/files" element={<FileManagement />} />

                          {/* Business Routes */}
                          <Route path="/business/contact" element={<ContactPage />} />
                          <Route path="/careers" element={<Careers />} />
                          <Route path="/business/pricing" element={<BusinessPricing />} />
                          <Route path="/partners" element={<Partners />} />

                          {/* Support Routes */}
                          <Route path="/faq" element={<FAQ />} />
                          <Route path="/support" element={<Support />} />
                          <Route path="/documentation" element={<Documentation />} />

                          {/* User Routes */}
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/settings" element={<Settings />} />

                          {/* Service Provider */}
                          <Route path="/service-provider-onboarding" element={<ServiceProviderOnboarding />} />

                          {/* Legacy redirects and fallback */}
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </EscrowProvider>
                    </BrowserRouter>
                  </TooltipProvider>
                </ThemeProvider>
              </AccessibilityProvider>
            </NotificationProvider>
          </AuthProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ComprehensiveErrorBoundary>
  );
}

export default App;

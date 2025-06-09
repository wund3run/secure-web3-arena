import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/auth";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { StandardizedLayout } from "@/components/layout/StandardizedLayout";
import { LoadingPage } from "@/components/ui/loading-page";
import { AppInitializer } from "@/components/app/AppInitializer";
import { GlobalComponents } from "@/components/app/GlobalComponents";
import { IndexPageLayout } from "@/components/home/index-page-layout";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DocumentationPage } from "@/components/docs/DocumentationPage";
import { SecurityPractices } from "@/components/security/SecurityPractices";
import { VulnerabilityScanner } from "@/components/security/VulnerabilityScanner";
import { ServiceProviderOnboarding } from "@/components/service-providers/ServiceProviderOnboarding";
import { PricingPage } from "@/components/pricing/PricingPage";
import { AboutUsPage } from "@/components/about/AboutUsPage";
import { ContactUsPage } from "@/components/contact/ContactUsPage";
import { CareersPage } from "@/components/careers/CareersPage";
import { TermsConditions } from "@/components/legal/TermsConditions";
import { PrivacyPolicy } from "@/components/legal/PrivacyPolicy";
import { NotFoundPage } from "@/components/errors/NotFoundPage";
import { UserProfile } from "@/components/profile/UserProfile";
import { SettingsPage } from "@/components/settings/SettingsPage";
import { Marketplace } from "@/pages/Marketplace";
import { RequestAudit } from "@/pages/RequestAudit";
import { Auth } from "@/pages/Auth";
import { Audits } from "@/pages/Audits";
import { Community } from "@/pages/Community";
import { Resources } from "@/pages/Resources";
import { Vulnerabilities } from "@/pages/Vulnerabilities";
import { AItools } from "@/pages/AItools";
import { SecurityAudits } from "@/pages/SecurityAudits";
import { CodeReviews } from "@/pages/CodeReviews";
import { PenetrationTesting } from "@/pages/PenetrationTesting";
import { Consulting } from "@/pages/Consulting";
import { FAQ } from "@/pages/FAQ";
import { Support } from "@/pages/Support";

// Add the new Audit Dashboard
const AuditDashboard = lazy(() => import("@/pages/AuditDashboard"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system" storageKey="hawkly-theme">
          <TooltipProvider>
            <BrowserRouter>
              <AuthProvider>
                <AppInitializer />
                <GlobalComponents />
                
                <div className="min-h-screen bg-background">
                  <Helmet>
                    <title>Hawkly | Leading Web3 Security Marketplace</title>
                    <meta name="description" content="Connect with verified Web3 security experts for smart contract audits. Fast, secure, affordable blockchain security solutions." />
                  </Helmet>
                  
                  <Suspense fallback={<LoadingPage />}>
                    <Routes>
                      <Route path="/" element={<IndexPageLayout />} />
                      <Route path="/dashboard" element={<DashboardLayout />} />
                      <Route path="/docs" element={<DocumentationPage />} />
                      <Route path="/security" element={<SecurityPractices />} />
                      <Route path="/vulnerability-scanner" element={<VulnerabilityScanner />} />
                      <Route path="/service-provider-onboarding" element={<ServiceProviderOnboarding />} />
                      <Route path="/pricing" element={<PricingPage />} />
                      <Route path="/about" element={<AboutUsPage />} />
                      <Route path="/contact" element={<ContactUsPage />} />
                      <Route path="/careers" element={<CareersPage />} />
                      <Route path="/terms" element={<TermsConditions />} />
                      <Route path="/privacy" element={<PrivacyPolicy />} />
                      <Route path="/profile" element={<UserProfile />} />
                      <Route path="/settings" element={<SettingsPage />} />
                      <Route path="/marketplace" element={<Marketplace />} />
                      <Route path="/request-audit" element={<RequestAudit />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/audits" element={<Audits />} />
                      <Route path="/community" element={<Community />} />
                      <Route path="/resources" element={<Resources />} />
                      <Route path="/vulnerabilities" element={<Vulnerabilities />} />
                      <Route path="/ai-tools" element={<AItools />} />
                      <Route path="/security-audits" element={<SecurityAudits />} />
                      <Route path="/code-reviews" element={<CodeReviews />} />
                      <Route path="/penetration-testing" element={<PenetrationTesting />} />
                      <Route path="/consulting" element={<Consulting />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/support" element={<Support />} />
                      <Route path="*" element={<NotFoundPage />} />
                      
                      {/* Add new Audit Dashboard route */}
                      <Route path="/audit-dashboard" element={<AuditDashboard />} />
                      
                      {/* Add 404 redirect */}
                      <Route path="/404" element={<NotFoundPage />} />
                      <Route path="*" element={<Navigate to="/404" replace />} />
                    </Routes>
                  </Suspense>
                </div>
                
                <Toaster position="top-right" />
              </AuthProvider>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

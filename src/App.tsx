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
                      <Route path="/" element={<IndexPageLayout />} />
                      <Route path="/auth" element={<AuthPage />} />
                      <Route path="/dashboard" element={<DashboardPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/marketplace" element={<MarketplacePage />} />
                      <Route path="/security-audits" element={<SecurityAuditsPage />} />
                      <Route path="/request-audit" element={<RequestAuditPage />} />
                      <Route path="/audits" element={<AuditsPage />} />
                      <Route path="/accessibility-testing" element={<AccessibilityTestingPage />} />
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

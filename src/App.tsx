import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/auth";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { ErrorProvider } from "@/contexts/ErrorContext";
import { ErrorBoundary } from "@/components/security/ErrorBoundary";
import { ToastHandler } from "@/components/ui/toast-handler";
import LoadingTrivia from "@/components/ui/loading-trivia";

// Core pages - Enhanced versions are now primary
const Index = React.lazy(() => import("@/pages/Index"));
const Dashboard = React.lazy(() => import("@/pages/Dashboard"));
const Marketplace = React.lazy(() => import("@/pages/EnhancedMarketplacePage"));
const Auth = React.lazy(() => import("@/pages/EnhancedAuth"));
const RequestAudit = React.lazy(() => import("@/pages/EnhancedRequestAudit"));
const Profile = React.lazy(() => import("@/pages/Profile"));
const AuditDetails = React.lazy(() => import("@/pages/AuditDetails"));
const Audits = React.lazy(() => import("@/pages/Audits"));
const Settings = React.lazy(() => import("@/pages/Settings"));

// Legacy versions for backward compatibility
const LegacyMarketplace = React.lazy(() => import("@/pages/MarketplacePage"));
const LegacyAuth = React.lazy(() => import("@/pages/Auth"));
const LegacyRequestAudit = React.lazy(() => import("@/pages/RequestAudit"));

// Essential business pages
const About = React.lazy(() => import("@/pages/About"));
const Contact = React.lazy(() => import("@/pages/Contact"));
const Careers = React.lazy(() => import("@/pages/Careers"));
const Terms = React.lazy(() => import("@/pages/Terms"));
const Privacy = React.lazy(() => import("@/pages/Privacy"));
const Pricing = React.lazy(() => import("@/pages/Pricing"));

// Core service pages
const CodeReviews = React.lazy(() => import("@/pages/CodeReviews"));
const PenetrationTesting = React.lazy(() => import("@/pages/PenetrationTesting"));
const Consulting = React.lazy(() => import("@/pages/Consulting"));
const SecurityAudits = React.lazy(() => import("@/pages/SecurityAudits"));
const Web3Security = React.lazy(() => import("@/pages/Web3Security"));

// Community and resources
const Resources = React.lazy(() => import("@/pages/Resources"));
const FAQ = React.lazy(() => import("@/pages/FAQ"));
const Support = React.lazy(() => import("@/pages/Support"));
const Community = React.lazy(() => import("@/pages/Community"));
const Vulnerabilities = React.lazy(() => import("@/pages/Vulnerabilities"));

// Tools and utilities
const AiTools = React.lazy(() => import("@/pages/AiTools"));
const VulnerabilityScanner = React.lazy(() => import("@/pages/VulnerabilityScanner"));
const ServiceProviderOnboarding = React.lazy(() => import("@/pages/ServiceProviderOnboarding"));

// Enhanced loading fallback with better UX
const AppLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <LoadingTrivia 
      message="Initializing Hawkly Security Platform..." 
      size="lg" 
      showTrivia={true}
      fullPage={true}
    />
  </div>
);

// Enhanced query client with better error handling and caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors except 408, 429
        if (error?.status >= 400 && error?.status < 500 && ![408, 429].includes(error?.status)) {
          return false;
        }
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: 'always',
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: (failureCount, error: any) => {
        // Only retry on network errors or 5xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 1;
      },
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="light" storageKey="hawkly-ui-theme">
            <ErrorProvider>
              <AuthProvider>
                <NotificationProvider>
                  <ToastHandler>
                    <div className="min-h-screen bg-background font-sans antialiased">
                      <Router>
                        <Suspense fallback={<AppLoadingFallback />}>
                          <Routes>
                            {/* Core application routes - Enhanced versions are primary */}
                            <Route path="/" element={<Index />} />
                            <Route path="/auth" element={<Auth />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/marketplace" element={<Marketplace />} />
                            <Route path="/request-audit" element={<RequestAudit />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/audit/:id" element={<AuditDetails />} />
                            <Route path="/audits" element={<Audits />} />
                            <Route path="/settings" element={<Settings />} />
                            
                            {/* Legacy routes for backward compatibility */}
                            <Route path="/legacy-marketplace" element={<LegacyMarketplace />} />
                            <Route path="/legacy-auth" element={<LegacyAuth />} />
                            <Route path="/legacy-request-audit" element={<LegacyRequestAudit />} />
                            
                            {/* Core service pages */}
                            <Route path="/code-reviews" element={<CodeReviews />} />
                            <Route path="/penetration-testing" element={<PenetrationTesting />} />
                            <Route path="/consulting" element={<Consulting />} />
                            <Route path="/security-audits" element={<SecurityAudits />} />
                            <Route path="/web3-security" element={<Web3Security />} />
                            <Route path="/ai-tools" element={<AiTools />} />
                            <Route path="/vulnerability-scanner" element={<VulnerabilityScanner />} />
                            <Route path="/service-provider-onboarding" element={<ServiceProviderOnboarding />} />
                            
                            {/* Community and resources */}
                            <Route path="/resources" element={<Resources />} />
                            <Route path="/vulnerabilities" element={<Vulnerabilities />} />
                            <Route path="/faq" element={<FAQ />} />
                            <Route path="/support" element={<Support />} />
                            <Route path="/community" element={<Community />} />
                            
                            {/* Essential business pages */}
                            <Route path="/pricing" element={<Pricing />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/careers" element={<Careers />} />
                            <Route path="/terms" element={<Terms />} />
                            <Route path="/privacy" element={<Privacy />} />
                            
                            {/* Essential SEO routes - redirect to main resources */}
                            <Route path="/security-insights" element={<Vulnerabilities />} />
                            <Route path="/docs" element={<Resources />} />
                            <Route path="/templates" element={<Resources />} />
                          </Routes>
                        </Suspense>
                      </Router>
                      
                      <Toaster 
                        position="top-right"
                        toastOptions={{
                          duration: 4000,
                          style: {
                            background: 'hsl(var(--background))',
                            color: 'hsl(var(--foreground))',
                            border: '1px solid hsl(var(--border))',
                          },
                        }}
                      />
                    </div>
                  </ToastHandler>
                </NotificationProvider>
              </AuthProvider>
            </ErrorProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;

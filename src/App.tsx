
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/auth";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { ErrorBoundary } from "@/components/security/ErrorBoundary";

// Lazy load pages - Enhanced versions are now primary
const Index = React.lazy(() => import("@/pages/Index"));
const Dashboard = React.lazy(() => import("@/pages/Dashboard"));
const Marketplace = React.lazy(() => import("@/pages/EnhancedMarketplacePage"));
const Auth = React.lazy(() => import("@/pages/EnhancedAuth"));
const RequestAudit = React.lazy(() => import("@/pages/EnhancedRequestAudit"));
const Profile = React.lazy(() => import("@/pages/Profile"));
const AuditDetails = React.lazy(() => import("@/pages/AuditDetails"));
const Audits = React.lazy(() => import("@/pages/Audits"));
const Settings = React.lazy(() => import("@/pages/Settings"));

// Legacy versions for compatibility (redirects)
const LegacyMarketplace = React.lazy(() => import("@/pages/MarketplacePage"));
const LegacyAuth = React.lazy(() => import("@/pages/Auth"));
const LegacyRequestAudit = React.lazy(() => import("@/pages/RequestAudit"));

// Footer and essential pages
const About = React.lazy(() => import("@/pages/About"));
const Contact = React.lazy(() => import("@/pages/Contact"));
const Careers = React.lazy(() => import("@/pages/Careers"));
const Terms = React.lazy(() => import("@/pages/Terms"));
const Privacy = React.lazy(() => import("@/pages/Privacy"));

// Service pages
const CodeReviews = React.lazy(() => import("@/pages/CodeReviews"));
const PenetrationTesting = React.lazy(() => import("@/pages/PenetrationTesting"));
const Consulting = React.lazy(() => import("@/pages/Consulting"));
const AiTools = React.lazy(() => import("@/pages/AiTools"));
const VulnerabilityScanner = React.lazy(() => import("@/pages/VulnerabilityScanner"));
const ServiceProviderOnboarding = React.lazy(() => import("@/pages/ServiceProviderOnboarding"));

// Community and resources
const Resources = React.lazy(() => import("@/pages/Resources"));
const FAQ = React.lazy(() => import("@/pages/FAQ"));
const Support = React.lazy(() => import("@/pages/Support"));
const SecurityAudits = React.lazy(() => import("@/pages/SecurityAudits"));
const Web3Security = React.lazy(() => import("@/pages/Web3Security"));
const Vulnerabilities = React.lazy(() => import("@/pages/Vulnerabilities"));
const WebSecurity = React.lazy(() => import("@/pages/WebSecurity"));
const Community = React.lazy(() => import("@/pages/Community"));
const Forum = React.lazy(() => import("@/pages/Forum"));
const Events = React.lazy(() => import("@/pages/Events"));
const Leaderboard = React.lazy(() => import("@/pages/Leaderboard"));
const SubmitService = React.lazy(() => import("@/pages/SubmitService"));

// Additional missing pages
const Pricing = React.lazy(() => import("@/pages/Pricing"));
const SecurityPolicy = React.lazy(() => import("@/pages/SecurityPolicy"));

// New platform integration pages
const PlatformIntegration = React.lazy(() => import("@/pages/PlatformIntegration"));
const SecurityCompliance = React.lazy(() => import("@/pages/SecurityCompliance"));
const PerformanceOptimization = React.lazy(() => import("@/pages/PerformanceOptimization"));
const PlatformOptimization = React.lazy(() => import("@/pages/PlatformOptimization"));

// Analytics and Tools pages
const Analytics = React.lazy(() => import("@/pages/Analytics"));
const SystemHealth = React.lazy(() => import("@/pages/SystemHealth"));
const DatabaseTools = React.lazy(() => import("@/pages/DatabaseTools"));
const UserExperience = React.lazy(() => import("@/pages/UserExperience"));

// Enhanced loading fallback
const AppLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center space-y-4">
      <img 
        src="/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png" 
        alt="Hawkly"
        className="h-12 w-12"
        loading="eager"
      />
      <div className="w-8 h-8 border-2 border-border border-t-primary rounded-full animate-spin" />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
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
            <AuthProvider>
              <NotificationProvider>
                <div className="min-h-screen bg-background font-sans antialiased">
                  <Router>
                    <Suspense fallback={<AppLoadingFallback />}>
                      <Routes>
                        {/* Core application routes - Enhanced versions are now primary */}
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
                        
                        {/* Service pages */}
                        <Route path="/code-reviews" element={<CodeReviews />} />
                        <Route path="/penetration-testing" element={<PenetrationTesting />} />
                        <Route path="/consulting" element={<Consulting />} />
                        <Route path="/ai-tools" element={<AiTools />} />
                        <Route path="/vulnerability-scanner" element={<VulnerabilityScanner />} />
                        <Route path="/service-provider-onboarding" element={<ServiceProviderOnboarding />} />
                        
                        {/* Security and resources */}
                        <Route path="/security-audits" element={<SecurityAudits />} />
                        <Route path="/web3-security" element={<Web3Security />} />
                        <Route path="/vulnerabilities" element={<Vulnerabilities />} />
                        <Route path="/web-security" element={<WebSecurity />} />
                        <Route path="/resources" element={<Resources />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/support" element={<Support />} />
                        
                        {/* Community pages */}
                        <Route path="/community" element={<Community />} />
                        <Route path="/forum" element={<Forum />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="/submit-service" element={<SubmitService />} />
                        
                        {/* Business pages */}
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/security-policy" element={<SecurityPolicy />} />
                        
                        {/* Platform Integration Routes */}
                        <Route path="/platform-integration" element={<PlatformIntegration />} />
                        <Route path="/security-compliance" element={<SecurityCompliance />} />
                        <Route path="/performance-optimization" element={<PerformanceOptimization />} />
                        <Route path="/platform-optimization" element={<PlatformOptimization />} />
                        
                        {/* Analytics and Tools Routes */}
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/system-health" element={<SystemHealth />} />
                        <Route path="/database-tools" element={<DatabaseTools />} />
                        <Route path="/user-experience" element={<UserExperience />} />
                        
                        {/* Footer pages - Essential for navigation */}
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/careers" element={<Careers />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/privacy" element={<Privacy />} />
                        
                        {/* Consolidated SEO routes - Only essential ones */}
                        <Route path="/security-insights" element={<Vulnerabilities />} />
                        <Route path="/docs" element={<Resources />} />
                        <Route path="/tutorials" element={<Resources />} />
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
              </NotificationProvider>
            </AuthProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;

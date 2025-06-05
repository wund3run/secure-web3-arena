import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/auth";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { GlobalErrorBoundary } from "@/components/error/GlobalErrorBoundary";
import { RouteGuard } from "@/components/auth/RouteGuard";

// Lazy load pages
const Index = React.lazy(() => import("@/pages/Index"));
const Dashboard = React.lazy(() => import("@/pages/Dashboard"));
const Marketplace = React.lazy(() => import("@/pages/Marketplace"));
const Auth = React.lazy(() => import("@/pages/Auth"));
const RequestAudit = React.lazy(() => import("@/pages/RequestAudit"));
const Profile = React.lazy(() => import("@/pages/Profile"));
const AuditDetails = React.lazy(() => import("@/pages/AuditDetails"));
const Audits = React.lazy(() => import("@/pages/Audits"));
const Settings = React.lazy(() => import("@/pages/Settings"));

// Enhanced pages
const EnhancedRequestAudit = React.lazy(() => import("@/pages/EnhancedRequestAudit"));
const EnhancedMarketplace = React.lazy(() => import("@/pages/EnhancedMarketplace"));
const EnhancedAuth = React.lazy(() => import("@/pages/EnhancedAuth"));

// Footer pages
const About = React.lazy(() => import("@/pages/About"));
const Contact = React.lazy(() => import("@/pages/Contact"));
const Careers = React.lazy(() => import("@/pages/Careers"));
const Terms = React.lazy(() => import("@/pages/Terms"));
const Privacy = React.lazy(() => import("@/pages/Privacy"));

// Messaging page
const MessagingPage = React.lazy(() => import("@/pages/MessagingPage"));

// New launch readiness pages
const PricingINR = React.lazy(() => import("@/pages/PricingINR"));
const LaunchReadiness = React.lazy(() => import("@/pages/LaunchReadiness"));

// Profile completion
const ProfileCompletion = React.lazy(() => import("@/pages/ProfileCompletion"));

// New pages for better navigation
const Resources = React.lazy(() => import("@/pages/Resources"));
const FAQ = React.lazy(() => import("@/pages/FAQ"));
const Support = React.lazy(() => import("@/pages/Support"));

// New pages for complete navigation
const SecurityAudits = React.lazy(() => import("@/pages/SecurityAudits"));
const Web3Security = React.lazy(() => import("@/pages/Web3Security"));
const Vulnerabilities = React.lazy(() => import("@/pages/Vulnerabilities"));
const WebSecurity = React.lazy(() => import("@/pages/WebSecurity"));
const Community = React.lazy(() => import("@/pages/Community"));
const Forum = React.lazy(() => import("@/pages/Forum"));
const Events = React.lazy(() => import("@/pages/Events"));
const Leaderboard = React.lazy(() => import("@/pages/Leaderboard"));
const SubmitService = React.lazy(() => import("@/pages/SubmitService"));

// Production Dashboard
const ProductionDashboard = React.lazy(() => import("@/pages/ProductionDashboard"));

// Escrow page
const Escrow = React.lazy(() => import("@/pages/Escrow"));

// Service pages
const CodeReviews = React.lazy(() => import("@/pages/CodeReviews"));
const PenetrationTesting = React.lazy(() => import("@/pages/PenetrationTesting"));
const Consulting = React.lazy(() => import("@/pages/Consulting"));
const AiTools = React.lazy(() => import("@/pages/AiTools"));
const VulnerabilityScanner = React.lazy(() => import("@/pages/VulnerabilityScanner"));
const ServiceProviderOnboarding = React.lazy(() => import("@/pages/ServiceProviderOnboarding"));
const DashboardAuditor = React.lazy(() => import("@/pages/DashboardAuditor"));
const DashboardProject = React.lazy(() => import("@/pages/DashboardProject"));

// Security and Pricing pages
const SecurityPolicy = React.lazy(() => import("@/pages/SecurityPolicy"));
const Pricing = React.lazy(() => import("@/pages/Pricing"));

// Add the UX enhancements and Performance Optimization pages
const UXEnhancements = React.lazy(() => import("@/pages/UXEnhancements"));
const PerformanceOptimization = React.lazy(() => import("@/pages/PerformanceOptimization"));

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

// Production-optimized query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error: any) => {
        if (error?.status === 404 || error?.status === 403) return false;
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: 'always',
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="hawkly-ui-theme">
          <GlobalErrorBoundary>
            <AuthProvider>
              <NotificationProvider>
                <Router>
                  <div className="min-h-screen bg-background font-sans antialiased">
                    <Suspense fallback={<AppLoadingFallback />}>
                      <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Index />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/marketplace" element={<Marketplace />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/careers" element={<Careers />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/privacy" element={<Privacy />} />
                        
                        {/* Security & Resources Pages */}
                        <Route path="/security-audits" element={<SecurityAudits />} />
                        <Route path="/web3-security" element={<Web3Security />} />
                        <Route path="/vulnerabilities" element={<Vulnerabilities />} />
                        <Route path="/web-security" element={<WebSecurity />} />
                        <Route path="/resources" element={<Resources />} />
                        <Route path="/faq" element={<FAQ />} />
                        <Route path="/support" element={<Support />} />
                        
                        {/* Community Pages */}
                        <Route path="/community" element={<Community />} />
                        <Route path="/forum" element={<Forum />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="/challenges" element={<Events />} />
                        
                        {/* Service Pages */}
                        <Route path="/code-reviews" element={<CodeReviews />} />
                        <Route path="/penetration-testing" element={<PenetrationTesting />} />
                        <Route path="/consulting" element={<Consulting />} />
                        <Route path="/ai-tools" element={<AiTools />} />
                        <Route path="/vulnerability-scanner" element={<VulnerabilityScanner />} />
                        
                        {/* Protected Routes - Require Authentication */}
                        <Route path="/request-audit" element={
                          <RouteGuard requireAuth>
                            <RequestAudit />
                          </RouteGuard>
                        } />
                        
                        <Route path="/security-monitoring" element={
                          <RouteGuard requireAuth>
                            <SecurityMonitoringPage />
                          </RouteGuard>
                        } />
                        
                        <Route path="/enterprise-control" element={
                          <RouteGuard requireAuth allowedRoles={["admin", "project_owner"]}>
                            <EnterpriseControlPage />
                          </RouteGuard>
                        } />
                        
                        <Route path="/dashboard" element={
                          <RouteGuard requireAuth>
                            <Dashboard />
                          </RouteGuard>
                        } />
                        
                        <Route path="/dashboard/auditor" element={
                          <RouteGuard requireAuth allowedRoles={["auditor", "admin"]}>
                            <DashboardAuditor />
                          </RouteGuard>
                        } />
                        
                        <Route path="/dashboard/project" element={
                          <RouteGuard requireAuth allowedRoles={["project_owner", "admin"]}>
                            <DashboardProject />
                          </RouteGuard>
                        } />
                        
                        <Route path="/escrow" element={
                          <RouteGuard requireAuth>
                            <Escrow />
                          </RouteGuard>
                        } />
                        
                        <Route path="/messages" element={
                          <RouteGuard requireAuth>
                            <MessagingPage />
                          </RouteGuard>
                        } />
                        
                        <Route path="/settings" element={
                          <RouteGuard requireAuth>
                            <Settings />
                          </RouteGuard>
                        } />
                        
                        <Route path="/profile" element={
                          <RouteGuard requireAuth>
                            <Profile />
                          </RouteGuard>
                        } />
                        
                        <Route path="/audits" element={
                          <RouteGuard requireAuth>
                            <Audits />
                          </RouteGuard>
                        } />
                        
                        <Route path="/audit/:id" element={
                          <RouteGuard requireAuth>
                            <AuditDetails />
                          </RouteGuard>
                        } />
                        
                        {/* Service Provider Routes */}
                        <Route path="/service-provider-onboarding" element={
                          <RouteGuard requireAuth allowedRoles={["auditor", "admin"]}>
                            <ServiceProviderOnboarding />
                          </RouteGuard>
                        } />
                        
                        <Route path="/submit-service" element={
                          <RouteGuard requireAuth allowedRoles={["auditor", "admin"]}>
                            <SubmitService />
                          </RouteGuard>
                        } />

                        {/* Enhanced pages with better UX */}
                        <Route path="/enhanced-request-audit" element={
                          <RouteGuard requireAuth>
                            <EnhancedRequestAudit />
                          </RouteGuard>
                        } />
                        <Route path="/enhanced-marketplace" element={<EnhancedMarketplace />} />
                        <Route path="/enhanced-auth" element={<EnhancedAuth />} />
                        
                        {/* Launch readiness and profile pages */}
                        <Route path="/pricing-inr" element={<PricingINR />} />
                        <Route path="/launch-readiness" element={<LaunchReadiness />} />
                        <Route path="/profile-completion" element={
                          <RouteGuard requireAuth>
                            <ProfileCompletion />
                          </RouteGuard>
                        } />
                        
                        {/* Performance and UX pages */}
                        <Route path="/performance-optimization" element={<PerformanceOptimization />} />
                        <Route path="/ux-enhancements" element={<UXEnhancements />} />
                        <Route path="/production-dashboard" element={<ProductionDashboard />} />
                        
                        {/* Security Settings */}
                        <Route path="/security-settings" element={
                          <RouteGuard requireAuth>
                            <Settings />
                          </RouteGuard>
                        } />
                        <Route path="/security-policy" element={<SecurityPolicy />} />
                        
                        {/* Alias routes for common navigation patterns */}
                        <Route path="/security-insights" element={<Vulnerabilities />} />
                        <Route path="/security-guides" element={<Resources />} />
                        <Route path="/knowledge-base" element={<Resources />} />
                        <Route path="/docs" element={<Resources />} />
                        <Route path="/tutorials" element={<Resources />} />
                        <Route path="/templates" element={<Resources />} />
                      </Routes>
                    </Suspense>
                    
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
                </Router>
              </NotificationProvider>
            </AuthProvider>
          </GlobalErrorBoundary>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;

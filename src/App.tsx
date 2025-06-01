
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/auth";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { ErrorProvider } from "@/contexts/ErrorContext";
import { ProductionErrorBoundary } from "@/components/error/production-error-boundary";
import { RoleBasedRoute } from "@/components/auth/RoleBasedRoute";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import Index from "./pages/Index";
import { AnalyticsService } from "./services/analyticsService";
import { MonitoringService } from "./services/monitoringService";
import { CDNManager } from "./utils/cdn-manager";
import { Environment } from "./utils/environment";
import { StandardizedLoading } from "@/components/ui/standardized-loading";

// Lazy load pages for better performance
const Auth = React.lazy(() => import("./pages/Auth"));
const Marketplace = React.lazy(() => import("./pages/Marketplace"));
const RequestAudit = React.lazy(() => import("./pages/RequestAudit"));
const ServiceProviderOnboarding = React.lazy(() => import("./pages/ServiceProviderOnboarding"));
const Pricing = React.lazy(() => import("./pages/Pricing"));
const Audits = React.lazy(() => import("./pages/Audits"));
const AuditDetails = React.lazy(() => import("./pages/AuditDetails"));
const Escrow = React.lazy(() => import("./pages/Escrow"));
const Docs = React.lazy(() => import("./pages/Docs"));
const SecurityInsights = React.lazy(() => import("./pages/SecurityInsights"));
const Vulnerabilities = React.lazy(() => import("./pages/Vulnerabilities"));
const Templates = React.lazy(() => import("./pages/Templates"));
const AITools = React.lazy(() => import("./pages/AiTools"));
const PlatformReport = React.lazy(() => import("./pages/PlatformReport"));
const Forum = React.lazy(() => import("./pages/Forum"));
const Events = React.lazy(() => import("./pages/Events"));
const Challenges = React.lazy(() => import("./pages/Challenges"));
const Leaderboard = React.lazy(() => import("./pages/Leaderboard"));
const Blog = React.lazy(() => import("./pages/Blog"));
const Achievements = React.lazy(() => import("./pages/Achievements"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const SubmitService = React.lazy(() => import("./pages/SubmitService"));
const Calendar = React.lazy(() => import("./pages/Calendar"));
const ContactProvider = React.lazy(() => import("./pages/ContactProvider"));
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Support = React.lazy(() => import("./pages/Support"));
const Terms = React.lazy(() => import("./pages/Terms"));
const Privacy = React.lazy(() => import("./pages/Privacy"));
const SecurityPolicy = React.lazy(() => import("./pages/SecurityPolicy"));
const Resources = React.lazy(() => import("./pages/Resources"));
const Community = React.lazy(() => import("./pages/Community"));
const CompetitiveAdvantages = React.lazy(() => import("./pages/CompetitiveAdvantages"));
const ComprehensiveSecurity = React.lazy(() => import("./pages/ComprehensiveSecurity"));
const AuditGuidelines = React.lazy(() => import("./pages/AuditGuidelines"));
const DistributionStrategy = React.lazy(() => import("./pages/DistributionStrategy"));
const FAQ = React.lazy(() => import("./pages/FAQ"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

function App() {
  useEffect(() => {
    // Initialize production services
    if (Environment.analyticsEnabled) {
      AnalyticsService.init();
    }
    
    if (Environment.monitoringEnabled) {
      MonitoringService.init();
    }
    
    // Setup CDN optimizations
    CDNManager.setupDNSPrefetch();
    CDNManager.preloadCriticalAssets();
    
    // Track initial page view
    AnalyticsService.trackPageView('app_init');
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <ProductionErrorBoundary>
              <ErrorProvider>
                <AuthProvider>
                  <NotificationProvider>
                    <Toaster />
                    <BrowserRouter>
                      <React.Suspense fallback={
                        <div className="min-h-screen flex items-center justify-center">
                          <StandardizedLoading 
                            size="lg" 
                            message="Loading Hawkly..." 
                          />
                        </div>
                      }>
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/auth" element={<Auth />} />
                          <Route path="/marketplace" element={<Marketplace />} />
                          <Route path="/pricing" element={<Pricing />} />
                          <Route path="/docs" element={<Docs />} />
                          <Route path="/web3-security" element={<Docs />} />
                          <Route path="/guides" element={<Docs />} />
                          <Route path="/tutorials" element={<Docs />} />
                          <Route path="/knowledge-base" element={<Docs />} />
                          <Route path="/faq" element={<FAQ />} />
                          <Route path="/security-insights" element={<SecurityInsights />} />
                          <Route path="/vulnerabilities" element={<Vulnerabilities />} />
                          <Route path="/templates" element={<Templates />} />
                          <Route path="/ai-tools" element={<AITools />} />
                          <Route path="/platform-report" element={<PlatformReport />} />
                          <Route path="/forum" element={<Forum />} />
                          <Route path="/events" element={<Events />} />
                          <Route path="/challenges" element={<Challenges />} />
                          <Route path="/leaderboard" element={<Leaderboard />} />
                          <Route path="/blog" element={<Blog />} />
                          <Route path="/achievements" element={<Achievements />} />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="/support" element={<Support />} />
                          <Route path="/terms" element={<Terms />} />
                          <Route path="/privacy" element={<Privacy />} />
                          <Route path="/security-policy" element={<SecurityPolicy />} />
                          <Route path="/resources" element={<Resources />} />
                          <Route path="/community" element={<Community />} />
                          <Route path="/competitive-advantages" element={<CompetitiveAdvantages />} />
                          <Route path="/comprehensive-security" element={<ComprehensiveSecurity />} />
                          <Route path="/audit-guidelines" element={<AuditGuidelines />} />
                          <Route path="/distribution-strategy" element={<DistributionStrategy />} />
                          
                          {/* Protected Routes */}
                          <Route path="/request-audit" element={
                            <RoleBasedRoute allowedRoles={['project_owner', 'admin']}>
                              <RequestAudit />
                            </RoleBasedRoute>
                          } />
                          <Route path="/service-provider-onboarding" element={
                            <RoleBasedRoute allowedRoles={['auditor', 'admin']}>
                              <ServiceProviderOnboarding />
                            </RoleBasedRoute>
                          } />
                          <Route path="/audits" element={
                            <RoleBasedRoute allowedRoles={['auditor', 'project_owner', 'admin']}>
                              <Audits />
                            </RoleBasedRoute>
                          } />
                          <Route path="/audit/:id" element={
                            <RoleBasedRoute allowedRoles={['auditor', 'project_owner', 'admin']}>
                              <AuditDetails />
                            </RoleBasedRoute>
                          } />
                          <Route path="/escrow" element={
                            <RoleBasedRoute allowedRoles={['auditor', 'project_owner', 'admin']}>
                              <Escrow />
                            </RoleBasedRoute>
                          } />
                          <Route path="/dashboard/*" element={
                            <RoleBasedRoute allowedRoles={['auditor', 'project_owner', 'admin']}>
                              <Dashboard />
                            </RoleBasedRoute>
                          } />
                          <Route path="/submit-service" element={
                            <RoleBasedRoute allowedRoles={['auditor', 'admin']}>
                              <SubmitService />
                            </RoleBasedRoute>
                          } />
                          <Route path="/calendar" element={
                            <RoleBasedRoute allowedRoles={['auditor', 'project_owner', 'admin']}>
                              <Calendar />
                            </RoleBasedRoute>
                          } />
                          <Route path="/contact-provider/:id" element={
                            <RoleBasedRoute allowedRoles={['project_owner', 'admin']}>
                              <ContactProvider />
                            </RoleBasedRoute>
                          } />
                          <Route path="/admin/*" element={
                            <RoleBasedRoute allowedRoles={['admin']}>
                              <AdminDashboard />
                            </RoleBasedRoute>
                          } />
                          
                          {/* Alias routes for common navigation patterns */}
                          <Route path="/security-audits" element={<Marketplace />} />
                          <Route path="/code-reviews" element={<Marketplace />} />
                          <Route path="/penetration-testing" element={<Marketplace />} />
                          <Route path="/consulting" element={<Marketplace />} />
                          <Route path="/security-guides" element={<Resources />} />
                          <Route path="/video-tutorials" element={<Resources />} />
                          <Route path="/audit-templates" element={<Templates />} />
                          <Route path="/vulnerability-scanner" element={<AITools />} />
                          <Route path="/platform-reports" element={<PlatformReport />} />
                          <Route path="/community-forum" element={<Forum />} />
                          <Route path="/security-events" element={<Events />} />
                          <Route path="/security-challenges" element={<Challenges />} />
                          <Route path="/expert-leaderboard" element={<Leaderboard />} />
                          
                          {/* Catch-all route for 404 pages */}
                          <Route path="*" element={<Index />} />
                        </Routes>
                      </React.Suspense>
                    </BrowserRouter>
                  </NotificationProvider>
                </AuthProvider>
              </ErrorProvider>
            </ProductionErrorBoundary>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;

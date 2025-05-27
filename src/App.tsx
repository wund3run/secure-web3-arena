
import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/auth/AuthContext";
import { EscrowProvider } from "@/contexts/EscrowContext";
import { SmartErrorBoundary } from "@/components/error/smart-error-boundary";
import { OptimizedPerformanceMonitor } from "@/components/performance/OptimizedPerformanceMonitor";
import { EnhancedLoadingState } from "@/components/ui/enhanced-loading-state";
import { PWAManager } from "@/components/pwa/PWAManager";
import { bundleOptimizer } from "@/utils/bundle-optimizer";
import RoleBasedRoute from "@/components/auth/RoleBasedRoute";

// Public pages - no authentication required
const Index = React.lazy(() => import("@/pages/Index"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));
const OptimizedDistributionStrategy = React.lazy(() => import("@/pages/OptimizedDistributionStrategy"));
const ForProjectOwners = React.lazy(() => import("@/pages/ForProjectOwners"));
const ForAuditors = React.lazy(() => import("@/pages/ForAuditors"));
const ForEnterprises = React.lazy(() => import("@/pages/ForEnterprises"));
const ForDevelopers = React.lazy(() => import("@/pages/ForDevelopers"));

// Public marketplace and service pages
const Marketplace = React.lazy(() => import("@/pages/Marketplace"));
const RequestAudit = React.lazy(() => import("@/pages/RequestAudit"));
const ServiceProviderOnboarding = React.lazy(() => import("@/pages/ServiceProviderOnboarding"));
const Pricing = React.lazy(() => import("@/pages/Pricing"));
const Audits = React.lazy(() => import("@/pages/Audits"));
const AuditDetails = React.lazy(() => import("@/pages/AuditDetails"));
const Escrow = React.lazy(() => import("@/pages/Escrow"));

// Resource and documentation pages
const Docs = React.lazy(() => import("@/pages/Docs"));
const Web3Security = React.lazy(() => import("@/pages/Web3Security"));
const SecurityGuides = React.lazy(() => import("@/pages/SecurityGuides"));
const Tutorials = React.lazy(() => import("@/pages/Tutorials"));
const KnowledgeBase = React.lazy(() => import("@/pages/KnowledgeBase"));
const FAQ = React.lazy(() => import("@/pages/FAQ"));
const SecurityInsights = React.lazy(() => import("@/pages/SecurityInsights"));
const Vulnerabilities = React.lazy(() => import("@/pages/Vulnerabilities"));

// Tools and platform pages
const AITools = React.lazy(() => import("@/pages/AITools"));
const PlatformReport = React.lazy(() => import("@/pages/PlatformReport"));
const Templates = React.lazy(() => import("@/pages/Templates"));

// Community pages
const Forum = React.lazy(() => import("@/pages/Forum"));
const Events = React.lazy(() => import("@/pages/Events"));
const Challenges = React.lazy(() => import("@/pages/Challenges"));
const Leaderboard = React.lazy(() => import("@/pages/Leaderboard"));
const Blog = React.lazy(() => import("@/pages/Blog"));

// Authentication and user pages
const Auth = React.lazy(() => import("@/pages/Auth"));
const Dashboard = React.lazy(() => import("@/pages/Dashboard"));
const UserDashboard = React.lazy(() => import("@/pages/UserDashboard"));
const AuditorDashboard = React.lazy(() => import("@/pages/AuditorDashboard"));
const ProjectDashboard = React.lazy(() => import("@/pages/ProjectDashboard"));

// Admin pages
const AdminDashboard = React.lazy(() => import("@/pages/AdminDashboard"));
const AdminUsers = React.lazy(() => import("@/pages/AdminUsers"));
const AdminProviders = React.lazy(() => import("@/pages/AdminProviders"));
const AdminAudits = React.lazy(() => import("@/pages/AdminAudits"));
const AdminReports = React.lazy(() => import("@/pages/AdminReports"));
const AdminServices = React.lazy(() => import("@/pages/AdminServices"));
const AdminDisputes = React.lazy(() => import("@/pages/AdminDisputes"));
const AdminSecurity = React.lazy(() => import("@/pages/AdminSecurity"));
const AdminFinance = React.lazy(() => import("@/pages/AdminFinance"));
const AdminSettings = React.lazy(() => import("@/pages/AdminSettings"));

// Support and legal pages
const Contact = React.lazy(() => import("@/pages/Contact"));
const Support = React.lazy(() => import("@/pages/Support"));
const Terms = React.lazy(() => import("@/pages/Terms"));
const Privacy = React.lazy(() => import("@/pages/Privacy"));
const SecurityPolicy = React.lazy(() => import("@/pages/SecurityPolicy"));

// Additional service pages
const SubmitService = React.lazy(() => import("@/pages/SubmitService"));
const Calendar = React.lazy(() => import("@/pages/Calendar"));
const ContactProvider = React.lazy(() => import("@/pages/ContactProvider"));
const Achievements = React.lazy(() => import("@/pages/Achievements"));
const AuditGuidelines = React.lazy(() => import("@/pages/AuditGuidelines"));
const CompetitiveAdvantages = React.lazy(() => import("@/pages/CompetitiveAdvantages"));
const ComprehensiveSecurity = React.lazy(() => import("@/pages/ComprehensiveSecurity"));

// Optimized QueryClient with better defaults and error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors, but do retry on network errors
        if (error instanceof Error && error.message.includes('4')) {
          return false;
        }
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
    mutations: {
      retry: 1,
      onError: (error) => {
        console.error('Mutation error:', error);
      }
    },
  },
});

function App() {
  useEffect(() => {
    // Initialize bundle optimization
    bundleOptimizer.init();
    
    // Setup intelligent route preloading
    const currentRoute = window.location.pathname;
    bundleOptimizer.intelligentPreload(currentRoute);
  }, []);

  return (
    <SmartErrorBoundary showReportButton={true}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AuthProvider>
              <EscrowProvider>
                <TooltipProvider>
                  <Suspense fallback={
                    <div className="flex items-center justify-center min-h-screen">
                      <EnhancedLoadingState 
                        message="Loading Hawkly Platform..." 
                        variant="spinner"
                        size="lg"
                      />
                    </div>
                  }>
                    <Routes>
                      {/* Public Routes */}
                      <Route path="/" element={<Index />} />
                      <Route path="/distribution-strategy" element={<OptimizedDistributionStrategy />} />
                      <Route path="/for-project-owners" element={<ForProjectOwners />} />
                      <Route path="/for-auditors" element={<ForAuditors />} />
                      <Route path="/for-enterprises" element={<ForEnterprises />} />
                      <Route path="/for-developers" element={<ForDevelopers />} />
                      <Route path="/competitive-advantages" element={<CompetitiveAdvantages />} />
                      <Route path="/comprehensive-security" element={<ComprehensiveSecurity />} />
                      
                      {/* Marketplace Routes */}
                      <Route path="/marketplace" element={<Marketplace />} />
                      <Route path="/request-audit" element={<RequestAudit />} />
                      <Route path="/service-provider-onboarding" element={<ServiceProviderOnboarding />} />
                      <Route path="/pricing" element={<Pricing />} />
                      
                      {/* Audit Routes */}
                      <Route path="/audits" element={<Audits />} />
                      <Route path="/audit/:id" element={<AuditDetails />} />
                      <Route path="/escrow" element={<Escrow />} />
                      <Route path="/audit-guidelines" element={<AuditGuidelines />} />
                      
                      {/* Resource Routes */}
                      <Route path="/docs" element={<Docs />} />
                      <Route path="/web3-security" element={<Web3Security />} />
                      <Route path="/guides" element={<SecurityGuides />} />
                      <Route path="/tutorials" element={<Tutorials />} />
                      <Route path="/knowledge-base" element={<KnowledgeBase />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/security-insights" element={<SecurityInsights />} />
                      <Route path="/vulnerabilities" element={<Vulnerabilities />} />
                      <Route path="/templates" element={<Templates />} />
                      
                      {/* Tools Routes */}
                      <Route path="/ai-tools" element={<AITools />} />
                      <Route path="/platform-report" element={<PlatformReport />} />
                      
                      {/* Community Routes */}
                      <Route path="/forum" element={<Forum />} />
                      <Route path="/events" element={<Events />} />
                      <Route path="/challenges" element={<Challenges />} />
                      <Route path="/leaderboard" element={<Leaderboard />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/achievements" element={<Achievements />} />
                      
                      {/* Authentication Routes */}
                      <Route path="/auth" element={<Auth />} />
                      
                      {/* Protected User Routes */}
                      <Route path="/dashboard" element={
                        <RoleBasedRoute>
                          <Dashboard />
                        </RoleBasedRoute>
                      } />
                      <Route path="/dashboard/user" element={
                        <RoleBasedRoute allowedRoles={["general"]}>
                          <UserDashboard />
                        </RoleBasedRoute>
                      } />
                      <Route path="/dashboard/auditor" element={
                        <RoleBasedRoute allowedRoles={["auditor"]}>
                          <AuditorDashboard />
                        </RoleBasedRoute>
                      } />
                      <Route path="/dashboard/project" element={
                        <RoleBasedRoute allowedRoles={["project_owner"]}>
                          <ProjectDashboard />
                        </RoleBasedRoute>
                      } />
                      <Route path="/dashboard/analytics" element={
                        <RoleBasedRoute allowedRoles={["auditor", "project_owner"]}>
                          <Dashboard />
                        </RoleBasedRoute>
                      } />
                      
                      {/* Service Routes */}
                      <Route path="/submit-service" element={
                        <RoleBasedRoute allowedRoles={["auditor"]}>
                          <SubmitService />
                        </RoleBasedRoute>
                      } />
                      <Route path="/calendar" element={
                        <RoleBasedRoute allowedRoles={["project_owner"]}>
                          <Calendar />
                        </RoleBasedRoute>
                      } />
                      <Route path="/contact-provider/:id" element={
                        <RoleBasedRoute allowedRoles={["project_owner"]}>
                          <ContactProvider />
                        </RoleBasedRoute>
                      } />
                      
                      {/* Admin Routes */}
                      <Route path="/admin" element={
                        <RoleBasedRoute allowedRoles={["admin"]}>
                          <AdminDashboard />
                        </RoleBasedRoute>
                      } />
                      <Route path="/admin/dashboard" element={
                        <RoleBasedRoute allowedRoles={["admin"]}>
                          <AdminDashboard />
                        </RoleBasedRoute>
                      } />
                      <Route path="/admin/users" element={
                        <RoleBasedRoute allowedRoles={["admin"]}>
                          <AdminUsers />
                        </RoleBasedRoute>
                      } />
                      <Route path="/admin/providers" element={
                        <RoleBasedRoute allowedRoles={["admin"]}>
                          <AdminProviders />
                        </RoleBasedRoute>
                      } />
                      <Route path="/admin/audits" element={
                        <RoleBasedRoute allowedRoles={["admin"]}>
                          <AdminAudits />
                        </RoleBasedRoute>
                      } />
                      <Route path="/admin/reports" element={
                        <RoleBasedRoute allowedRoles={["admin"]}>
                          <AdminReports />
                        </RoleBasedRoute>
                      } />
                      <Route path="/admin/services" element={
                        <RoleBasedRoute allowedRoles={["admin"]}>
                          <AdminServices />
                        </RoleBasedRoute>
                      } />
                      <Route path="/admin/disputes" element={
                        <RoleBasedRoute allowedRoles={["admin"]}>
                          <AdminDisputes />
                        </RoleBasedRoute>
                      } />
                      <Route path="/admin/security" element={
                        <RoleBasedRoute allowedRoles={["admin"]}>
                          <AdminSecurity />
                        </RoleBasedRoute>
                      } />
                      <Route path="/admin/finance" element={
                        <RoleBasedRoute allowedRoles={["admin"]}>
                          <AdminFinance />
                        </RoleBasedRoute>
                      } />
                      <Route path="/admin/settings" element={
                        <RoleBasedRoute allowedRoles={["admin"]}>
                          <AdminSettings />
                        </RoleBasedRoute>
                      } />
                      
                      {/* Support and Legal Routes */}
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/support" element={<Support />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/security-policy" element={<SecurityPolicy />} />
                      
                      {/* Route aliases and redirects */}
                      <Route path="/resources" element={<KnowledgeBase />} />
                      <Route path="/community" element={<Forum />} />
                      
                      {/* Catch all - 404 */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                  <Toaster position="top-right" richColors closeButton />
                  <OptimizedPerformanceMonitor />
                  <PWAManager showInstallPrompt={true} />
                </TooltipProvider>
              </EscrowProvider>
            </AuthProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </HelmetProvider>
    </SmartErrorBoundary>
  );
}

export default App;

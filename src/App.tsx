import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/auth';
import { NotificationProvider } from '@/contexts/NotificationContext';

// Import all pages
import Index from './pages/Index';
import Auth from './pages/Auth';
import AuthCallback from './pages/AuthCallback';
import Dashboard from './pages/Dashboard';
import Marketplace from './pages/Marketplace';
import RequestAudit from './pages/RequestAudit';
import ServiceProviderOnboarding from './pages/ServiceProviderOnboarding';
import Pricing from './pages/Pricing';
import Audits from './pages/Audits';
import AuditDetails from './pages/AuditDetails';
import Calendar from './pages/Calendar';
import Escrow from './pages/Escrow';
import Contact from './pages/Contact';
import Support from './pages/Support';
import FAQ from './pages/FAQ';
import Docs from './pages/Docs';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Community from './pages/Community';

// Resource pages
import WebSecurity from './pages/WebSecurity';
import SecurityGuides from './pages/SecurityGuides';
import KnowledgeBase from './pages/KnowledgeBase';
import Resources from './pages/Resources';
import CompetitiveAdvantages from './pages/CompetitiveAdvantages';
import ComprehensiveSecurity from './pages/ComprehensiveSecurity';
import AuditGuidelines from './pages/AuditGuidelines';
import DistributionStrategy from './pages/DistributionStrategy';
import SecurityPolicy from './pages/SecurityPolicy';

// Service-specific pages
import ServiceDetails from './pages/ServiceDetails';
import AuditRequestForService from './pages/AuditRequestForService';

// Missing pages (now as proper placeholders for future implementation)
import { 
  Tutorials, 
  Templates, 
  ShippingDelivery, 
  CancellationRefund,
  Forum,
  Events,
  Challenges,
  Leaderboard,
  Blog,
  Achievements,
  SecurityInsights,
  Vulnerabilities,
  PlatformReport,
  AdminDashboard,
  AdminUsers,
  AdminAudits,
  AdminFinance,
  AdminReports,
  AdminDisputes,
  AdminSecurity,
  AdminServices,
  AdminSettings,
  AdminProviders,
  ContactProvider,
  AuditorDashboard,
  ProjectDashboard,
  UserDashboard,
  SubmitService
} from './pages/missing-pages';

// 404 page
import NotFound from './pages/NotFound';

// Import the new page
import NotificationTesting from './pages/NotificationTesting';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NotificationProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-background font-sans antialiased">
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    {/* Main pages */}
                    <Route path="/" element={<Index />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/auth/callback" element={<AuthCallback />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/request-audit" element={<RequestAudit />} />
                    <Route path="/service-provider-onboarding" element={<ServiceProviderOnboarding />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/audits" element={<Audits />} />
                    <Route path="/audit/:id" element={<AuditDetails />} />
                    <Route path="/calendar" element={<Calendar />} />
                    <Route path="/escrow" element={<Escrow />} />
                    <Route path="/community" element={<Community />} />
                    
                    {/* Dashboard routes */}
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/*" element={<Dashboard />} />
                    
                    {/* Service-specific routes */}
                    <Route path="/service/:serviceId" element={<ServiceDetails />} />
                    <Route path="/service/:serviceId/request" element={<AuditRequestForService />} />
                    
                    {/* Support and Documentation */}
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/docs" element={<Docs />} />
                    
                    {/* Resources and Documentation */}
                    <Route path="/web3-security" element={<WebSecurity />} />
                    <Route path="/guides" element={<SecurityGuides />} />
                    <Route path="/knowledge-base" element={<KnowledgeBase />} />
                    <Route path="/resources" element={<Resources />} />
                    
                    {/* Platform Information */}
                    <Route path="/competitive-advantages" element={<CompetitiveAdvantages />} />
                    <Route path="/comprehensive-security" element={<ComprehensiveSecurity />} />
                    <Route path="/audit-guidelines" element={<AuditGuidelines />} />
                    <Route path="/distribution-strategy" element={<DistributionStrategy />} />
                    
                    {/* Legal */}
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/security-policy" element={<SecurityPolicy />} />
                    
                    {/* Placeholder pages for future implementation */}
                    <Route path="/tutorials" element={<Tutorials />} />
                    <Route path="/templates" element={<Templates />} />
                    <Route path="/shipping-delivery" element={<ShippingDelivery />} />
                    <Route path="/cancellation-refund" element={<CancellationRefund />} />
                    <Route path="/forum" element={<Forum />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/challenges" element={<Challenges />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/achievements" element={<Achievements />} />
                    <Route path="/security-insights" element={<SecurityInsights />} />
                    <Route path="/vulnerabilities" element={<Vulnerabilities />} />
                    <Route path="/platform-report" element={<PlatformReport />} />
                    <Route path="/submit-service" element={<SubmitService />} />
                    
                    {/* Admin routes */}
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/users" element={<AdminUsers />} />
                    <Route path="/admin/audits" element={<AdminAudits />} />
                    <Route path="/admin/finance" element={<AdminFinance />} />
                    <Route path="/admin/reports" element={<AdminReports />} />
                    <Route path="/admin/disputes" element={<AdminDisputes />} />
                    <Route path="/admin/security" element={<AdminSecurity />} />
                    <Route path="/admin/services" element={<AdminServices />} />
                    <Route path="/admin/settings" element={<AdminSettings />} />
                    <Route path="/admin/providers" element={<AdminProviders />} />
                    
                    {/* User-specific routes */}
                    <Route path="/contact-provider" element={<ContactProvider />} />
                    <Route path="/auditor-dashboard" element={<AuditorDashboard />} />
                    <Route path="/project-dashboard" element={<ProjectDashboard />} />
                    <Route path="/user-dashboard" element={<UserDashboard />} />
                    
                    {/* Add notification testing route */}
                    <Route path="/notification-testing" element={<NotificationTesting />} />
                    
                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
                <Toaster />
              </div>
            </BrowserRouter>
          </NotificationProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;

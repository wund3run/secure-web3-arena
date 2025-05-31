
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/contexts/auth';
import { NotificationProvider } from '@/contexts/NotificationContext';
import Home from '@/pages/Home';
import Auth from '@/pages/Auth';
import Marketplace from '@/pages/Marketplace';
import RequestAudit from '@/pages/RequestAudit';
import Audits from '@/pages/Audits';
import AuditDetails from '@/pages/AuditDetails';
import Dashboard from '@/pages/Dashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import ServiceProviderOnboarding from '@/pages/onboarding/ServiceProviderOnboarding';
import AuditorOnboarding from '@/pages/onboarding/AuditorOnboarding';
import SecuritySettings from '@/pages/SecuritySettings';
import { RoleBasedRoute } from '@/components/auth/RoleBasedRoute';
import { UserProfileDetector } from '@/components/user-profiling/UserProfileDetector';
import SecurityAudits from './pages/SecurityAudits';
import CodeReviews from './pages/CodeReviews';
import Templates from './pages/Templates';
import Tutorials from './pages/Tutorials';
import SecurityGuides from './pages/SecurityGuides';
import KnowledgeBase from './pages/KnowledgeBase';
import AITools from './pages/AITools';
import Forum from './pages/Forum';
import { 
  PenetrationTesting, 
  Consulting, 
  VulnerabilityScanner, 
  PlatformReports,
  Events,
  Challenges,
  Leaderboard,
  SubmitService,
  ContactProvider,
  Terms,
  Privacy,
  SecurityPolicy,
  SecurityInsights
} from './pages/missing-pages';

// Create a query client instance
const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Toaster />
          <AuthProvider>
            <NotificationProvider>
              <UserProfileDetector />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/request-audit" element={<RequestAudit />} />
                <Route path="/audits" element={<Audits />} />
                <Route path="/audit/:id" element={<AuditDetails />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
                <Route path="/admin/*" element={<RoleBasedRoute allowedRoles={["admin"]}><AdminDashboard /></RoleBasedRoute>} />
                <Route path="/service-provider-onboarding" element={<ServiceProviderOnboarding />} />
                <Route path="/auditor-onboarding" element={<AuditorOnboarding />} />
                <Route path="/security-settings" element={<SecuritySettings />} />
                
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
                
                {/* Tool Routes */}
                <Route path="/security-insights" element={<SecurityInsights />} />
                <Route path="/ai-tools" element={<AITools />} />
                <Route path="/vulnerability-scanner" element={<VulnerabilityScanner />} />
                <Route path="/platform-reports" element={<PlatformReports />} />
                
                {/* Community Routes */}
                <Route path="/forum" element={<Forum />} />
                <Route path="/events" element={<Events />} />
                <Route path="/challenges" element={<Challenges />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                
                {/* Additional Routes */}
                <Route path="/submit-service" element={<SubmitService />} />
                <Route path="/contact-provider" element={<ContactProvider />} />
                
                {/* Legal Routes */}
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/security-policy" element={<SecurityPolicy />} />
              </Routes>
            </NotificationProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;

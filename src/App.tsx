
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/auth';

// Import all pages
import Index from './pages/Index';
import Auth from './pages/Auth';
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
import Tutorials from './pages/Tutorials';
import Templates from './pages/Templates';
import ShippingDelivery from './pages/ShippingDelivery';
import CancellationRefund from './pages/CancellationRefund';

// Resource pages
import WebSecurity from './pages/WebSecurity';
import SecurityGuides from './pages/SecurityGuides';
import KnowledgeBase from './pages/KnowledgeBase';
import Resources from './pages/Resources';
import Community from './pages/Community';
import CompetitiveAdvantages from './pages/CompetitiveAdvantages';
import ComprehensiveSecurity from './pages/ComprehensiveSecurity';
import AuditGuidelines from './pages/AuditGuidelines';
import DistributionStrategy from './pages/DistributionStrategy';
import SecurityPolicy from './pages/SecurityPolicy';

// Service-specific pages
import ServiceDetails from './pages/ServiceDetails';
import AuditRequestForService from './pages/AuditRequestForService';

// 404 page
import NotFound from './pages/NotFound';

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
        <BrowserRouter>
          <AuthProvider>
            <div className="min-h-screen bg-background font-sans antialiased">
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  {/* Main pages */}
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/request-audit" element={<RequestAudit />} />
                  <Route path="/service-provider-onboarding" element={<ServiceProviderOnboarding />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/audits" element={<Audits />} />
                  <Route path="/audit/:id" element={<AuditDetails />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/escrow" element={<Escrow />} />
                  
                  {/* Dashboard routes */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/dashboard/*" element={<Dashboard />} />
                  
                  {/* Service-specific routes */}
                  <Route path="/service/:serviceId" element={<ServiceDetails />} />
                  <Route path="/service/:serviceId/request" element={<AuditRequestForService />} />
                  
                  {/* Resources and Documentation */}
                  <Route path="/docs" element={<Docs />} />
                  <Route path="/web3-security" element={<WebSecurity />} />
                  <Route path="/guides" element={<SecurityGuides />} />
                  <Route path="/tutorials" element={<Tutorials />} />
                  <Route path="/knowledge-base" element={<KnowledgeBase />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/templates" element={<Templates />} />
                  
                  {/* Community */}
                  <Route path="/community" element={<Community />} />
                  
                  {/* Platform Information */}
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/competitive-advantages" element={<CompetitiveAdvantages />} />
                  <Route path="/comprehensive-security" element={<ComprehensiveSecurity />} />
                  <Route path="/audit-guidelines" element={<AuditGuidelines />} />
                  <Route path="/distribution-strategy" element={<DistributionStrategy />} />
                  
                  {/* Support and Legal */}
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/security-policy" element={<SecurityPolicy />} />
                  <Route path="/shipping-delivery" element={<ShippingDelivery />} />
                  <Route path="/cancellation-refund" element={<CancellationRefund />} />
                  
                  {/* 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <Toaster />
            </div>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;

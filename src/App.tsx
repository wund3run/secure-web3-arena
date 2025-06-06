
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/contexts/auth/AuthContext';
import { ErrorProvider } from '@/contexts/ErrorContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { UserJourneyTracker } from '@/components/analytics/UserJourneyTracker';
import { MessageNotificationHandler } from '@/components/messaging/MessageNotificationHandler';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Services from '@/pages/Services';
import RequestAudit from '@/pages/RequestAudit';
import EnhancedMarketplace from '@/pages/EnhancedMarketplace';
import EnhancedMarketplacePage from '@/pages/EnhancedMarketplacePage';
import AuditDashboard from '@/pages/AuditDashboard';
import AuditDetailsPage from '@/pages/AuditDetailsPage';
import UserProfilePage from '@/pages/UserProfilePage';
import ServiceProviderOnboarding from '@/pages/ServiceProviderOnboarding';
import AuditorOnboarding from '@/pages/AuditorOnboarding';
import SubmitService from '@/pages/SubmitService';
import EscrowDashboard from '@/pages/EscrowDashboard';
import AuditRequestForService from '@/pages/AuditRequestForService';
import UserJourneyMapping from '@/pages/UserJourneyMapping';
import ComprehensiveUserJourney from "./pages/ComprehensiveUserJourney";

function App() {
  return (
    <HelmetProvider>
      <ErrorProvider>
        <NotificationProvider>
          <AuthProvider>
            <UserJourneyTracker />
            <MessageNotificationHandler />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/request-audit" element={<RequestAudit />} />
              <Route path="/marketplace" element={<EnhancedMarketplace />} />
              <Route path="/marketplace-new" element={<EnhancedMarketplacePage />} />
              <Route path="/dashboard" element={<AuditDashboard />} />
              <Route path="/audit/:id" element={<AuditDetailsPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="/service-provider-onboarding" element={<ServiceProviderOnboarding />} />
              <Route path="/auditor-onboarding" element={<AuditorOnboarding />} />
              <Route path="/submit-service" element={<SubmitService />} />
              <Route path="/escrow" element={<EscrowDashboard />} />
              <Route path="/request-audit-for-service" element={<AuditRequestForService />} />
              <Route path="/user-journey" element={<UserJourneyMapping />} />
              <Route path="/journey-analysis" element={<ComprehensiveUserJourney />} />
            </Routes>
          </AuthProvider>
        </NotificationProvider>
      </ErrorProvider>
    </HelmetProvider>
  );
}

export default App;

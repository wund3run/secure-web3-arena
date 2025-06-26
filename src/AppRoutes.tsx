
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import AuthCallback from '@/pages/AuthCallback';
import Dashboard from '@/pages/Dashboard';
import Marketplace from '@/pages/Marketplace';
import RequestAudit from '@/pages/RequestAudit';
import AuditGuidelines from '@/pages/AuditGuidelines';
import Support from '@/pages/Support';
import Contact from '@/pages/Contact';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import AIToolsPage from '@/pages/tools/AIToolsPage';
import NotFound from '@/pages/NotFound';

// Auditor Journey Pages
import AuditorSignUp from '@/pages/AuditorSignUp';
import EmailVerification from '@/pages/auditor/EmailVerification';
import AuditorOnboarding from '@/pages/auditor/AuditorOnboarding';
import AuditorDashboard from '@/pages/auditor/AuditorDashboard';
import AuditDetails from '@/pages/AuditDetails';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/request-audit" element={<RequestAudit />} />
      <Route path="/audit-guidelines" element={<AuditGuidelines />} />
      <Route path="/ai-tools" element={<AIToolsPage />} />
      <Route path="/support" element={<Support />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      
      {/* Auditor Journey Routes */}
      <Route path="/auditor/signup" element={<AuditorSignUp />} />
      <Route path="/auditor/email-verification" element={<EmailVerification />} />
      <Route path="/auditor/onboarding" element={<AuditorOnboarding />} />
      <Route path="/auditor/dashboard" element={<AuditorDashboard />} />
      <Route path="/audit/:id" element={<AuditDetails />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

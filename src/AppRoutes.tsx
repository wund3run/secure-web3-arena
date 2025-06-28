import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import AuthCallback from '@/pages/AuthCallback';
import Dashboard from '@/pages/Dashboard';
import Marketplace from '@/pages/Marketplace';
import ProjectDetails from '@/pages/ProjectDetails';
import RequestAudit from '@/pages/RequestAudit';
import AuditGuidelines from '@/pages/AuditGuidelines';
import Support from '@/pages/Support';
import Contact from '@/pages/Contact';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import AIToolsPage from '@/pages/tools/AIToolsPage';
import NotFound from '@/pages/NotFound';
import Onboarding from '@/pages/Onboarding';
import ProfileCompletion from '@/pages/ProfileCompletion';

// Service Pages
import SecurityAudits from '@/pages/SecurityAudits';
import CodeReviews from '@/pages/CodeReviews';
import PenetrationTesting from '@/pages/PenetrationTesting';
import Consulting from '@/pages/Consulting';

// Resource Pages
import Resources from '@/pages/Resources';
import SecurityGuides from '@/pages/SecurityGuides';
import Tutorials from '@/pages/Tutorials';
import Documentation from '@/pages/Documentation';

// Business Pages
import About from '@/pages/About';

// Auditor Journey Pages
import AuditorSignUp from '@/pages/AuditorSignUp';
import EmailVerification from '@/pages/auditor/EmailVerification';
import AuditorOnboarding from '@/pages/AuditorOnboarding';
import AuditorDashboard from '@/pages/auditor/AuditorDashboard';
import AuditDetails from '@/pages/AuditDetails';

// Project Owner Journey Pages
import SubmitProject from '@/pages/SubmitProject';
import ProjectDashboard from '@/pages/ProjectDashboard';

// Service Provider Pages
import ServiceProviderOnboarding from '@/pages/onboarding/ServiceProviderOnboarding';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Core Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/marketplace" element={<Marketplace />} />
      <Route path="/project/:id" element={<ProjectDetails />} />
      <Route path="/request-audit" element={<RequestAudit />} />
      <Route path="/ai-tools" element={<AIToolsPage />} />
      <Route path="/support" element={<Support />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      
      {/* Service Pages */}
      <Route path="/security-audits" element={<SecurityAudits />} />
      <Route path="/code-reviews" element={<CodeReviews />} />
      <Route path="/penetration-testing" element={<PenetrationTesting />} />
      <Route path="/consulting" element={<Consulting />} />
      
      {/* Resource Pages */}
      <Route path="/resources" element={<Resources />} />
      <Route path="/audit-guidelines" element={<AuditGuidelines />} />
      <Route path="/security-guides" element={<SecurityGuides />} />
      <Route path="/tutorials" element={<Tutorials />} />
      <Route path="/documentation" element={<Documentation />} />
      
      {/* Business Pages */}
      <Route path="/about" element={<About />} />
      
      {/* Enhanced Onboarding Routes */}
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/profile-completion" element={<ProfileCompletion />} />
      <Route path="/service-provider-onboarding" element={<ServiceProviderOnboarding />} />
      
      {/* Auditor Journey Routes */}
      <Route path="/auditor/signup" element={<AuditorSignUp />} />
      <Route path="/auditor/email-verification" element={<EmailVerification />} />
      <Route path="/auditor/onboarding" element={<AuditorOnboarding />} />
      <Route path="/auditor/dashboard" element={<AuditorDashboard />} />
      <Route path="/audit/:id" element={<AuditDetails />} />
      
      {/* Project Owner Journey Routes */}
      <Route path="/submit-project" element={<SubmitProject />} />
      <Route path="/project-dashboard" element={<ProjectDashboard />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

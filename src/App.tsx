
import { Routes, Route } from 'react-router-dom';
import { GlobalComponents } from './components/app/GlobalComponents';
import { Toaster } from './components/ui/toaster';
import { AppProviders } from './components/app/AppProviders';

// Pages
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Marketplace from './pages/Marketplace';
import ServiceDetails from './pages/ServiceDetails';
import Auth from './pages/Auth';
import AuthCallback from './pages/AuthCallback';
import TwoFactorAuth from './pages/TwoFactorAuth';
import Dashboard from './pages/Dashboard';
import RequestAudit from './pages/RequestAudit';
import AuditRequestForService from './pages/AuditRequestForService';
import Contact from './pages/Contact';
import AuditDetails from './pages/AuditDetails';
import Audits from './pages/Audits';
import ContactProvider from './pages/ContactProvider';
import Pricing from './pages/Pricing';
import Stats from './pages/Stats';
import Resources from './pages/Resources';
import EnhancedAITools from './pages/EnhancedAITools';
import SupportCenter from './pages/SupportCenter';
import Leaderboard from './pages/Leaderboard';
import Achievements from './pages/Achievements';
import Community from './pages/Community';
import ApplicationSubmitted from './pages/ApplicationSubmitted';
import AuditGuidelines from './pages/AuditGuidelines';
import ServiceProviderOnboarding from './pages/ServiceProviderOnboarding';
import SubmitService from './pages/SubmitService';
import Escrow from './pages/Escrow';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';

// New Pages
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import SecurityPolicy from './pages/SecurityPolicy';
import Docs from './pages/Docs';
import Blog from './pages/Blog';
import Forum from './pages/Forum';
import Events from './pages/Events';
import Challenges from './pages/Challenges';
import Vulnerabilities from './pages/Vulnerabilities';
import WebThreeSecurity from './pages/WebThreeSecurity';

function App() {
  return (
    <AppProviders>
      <GlobalComponents />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/auth/2fa" element={<TwoFactorAuth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/request-audit" element={<RequestAudit />} />
        <Route path="/request-audit/:serviceId" element={<AuditRequestForService />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/audit/:id" element={<AuditDetails />} />
        <Route path="/audits" element={<Audits />} />
        <Route path="/contact-provider/:id" element={<ContactProvider />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/ai-tools" element={<EnhancedAITools />} />
        <Route path="/support" element={<SupportCenter />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/community" element={<Community />} />
        <Route path="/application-submitted" element={<ApplicationSubmitted />} />
        <Route path="/audit-guidelines" element={<AuditGuidelines />} />
        <Route path="/service-provider-onboarding" element={<ServiceProviderOnboarding />} />
        <Route path="/submit-service" element={<SubmitService />} />
        <Route path="/escrow" element={<Escrow />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* New Routes */}
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/security-policy" element={<SecurityPolicy />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/events" element={<Events />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/vulnerabilities" element={<Vulnerabilities />} />
        <Route path="/web3-security" element={<WebThreeSecurity />} />
        
        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </AppProviders>
  );
}

export default App;

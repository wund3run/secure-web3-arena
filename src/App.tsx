
import { Routes, Route, Navigate } from 'react-router-dom';
import { GlobalComponents } from './components/app/GlobalComponents';
import { Toaster } from './components/ui/toaster';
import { AppProviders } from './components/app/AppProviders';
import { EnhancedErrorBoundary } from './components/error/enhanced-error-boundary';
import { RouterErrorBoundary } from './components/error/RouterErrorBoundary';
import { BreadcrumbEnhanced } from './components/ui/breadcrumb-enhanced';
import { AccessibilityControls } from './components/ui/accessibility-controls';
import { AdminRoute } from './components/auth/AdminRoute';

// Import CSS for accessibility enhancements
import './styles/accessibility.css';

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
import SecurityInsights from './pages/SecurityInsights';
import Roadmap from './pages/Roadmap';

// Protected Admin Pages
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
import FAQ from './pages/FAQ';
import KnowledgeBase from './pages/KnowledgeBase';
import Templates from './pages/Templates';
import Guides from './pages/Guides';
import Tutorials from './pages/Tutorials';

function App() {
  return (
    <EnhancedErrorBoundary routeFallback={true}>
      <AppProviders>
        <RouterErrorBoundary>
          <div className="min-h-screen flex flex-col w-full">
            {/* Skip to main content link for accessibility */}
            <a 
              href="#main-content" 
              className="skip-link"
            >
              Skip to main content
            </a>

            <GlobalComponents removeDevTools={true} />
            
            {/* Breadcrumb navigation for better UX */}
            <BreadcrumbEnhanced />
            
            <main 
              id="main-content" 
              className="flex-1"
              role="main"
              tabIndex={-1}
            >
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
                <Route path="/security-insights" element={<SecurityInsights />} />
                <Route path="/roadmap" element={<Roadmap />} />
                
                {/* Protected Admin Routes - Completely separate from user app */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />
                <Route path="/admin/dashboard" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />
                
                {/* Legal and Policy Pages */}
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/security-policy" element={<SecurityPolicy />} />
                
                {/* Documentation and Learning */}
                <Route path="/docs" element={<Docs />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/events" element={<Events />} />
                <Route path="/challenges" element={<Challenges />} />
                <Route path="/vulnerabilities" element={<Vulnerabilities />} />
                <Route path="/web3-security" element={<WebThreeSecurity />} />
                
                {/* Support Resource Routes */}
                <Route path="/faq" element={<FAQ />} />
                <Route path="/knowledge-base" element={<KnowledgeBase />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/guides" element={<Guides />} />
                <Route path="/tutorials" element={<Tutorials />} />
                
                {/* 404 Page */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            
            {/* Enhanced Accessibility Controls */}
            <AccessibilityControls />
            
            <Toaster />
          </div>
        </RouterErrorBoundary>
      </AppProviders>
    </EnhancedErrorBoundary>
  );
}

export default App;

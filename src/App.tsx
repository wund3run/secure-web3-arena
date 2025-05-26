import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/auth";
import { EscrowProvider } from "@/contexts/EscrowContext";
import RoleBasedRoute from "@/components/auth/RoleBasedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import Audits from "./pages/Audits";
import Community from "./pages/Community";
import ServiceProviderOnboarding from "./pages/ServiceProviderOnboarding";
import RequestAudit from "./pages/RequestAudit";
import SubmitService from "./pages/SubmitService";
import Escrow from "./pages/Escrow";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SystemHealth from "./pages/SystemHealth";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import Support from "./pages/Support";
import FAQ from "./pages/FAQ";
import AiTools from "./pages/AiTools";
import Docs from "./pages/Docs";
import Pricing from "./pages/Pricing";
import Resources from "./pages/Resources";
import Templates from "./pages/Templates";
import CompetitiveAdvantages from "./pages/CompetitiveAdvantages";
import ComprehensiveSecurity from "./pages/ComprehensiveSecurity";

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <EscrowProvider>
              <TooltipProvider>
                <Toaster />
                <Helmet
                  titleTemplate="%s | Hawkly"
                  defaultTitle="Hawkly - Web3 Security Marketplace"
                />
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={
                    <RoleBasedRoute>
                      <Index />
                    </RoleBasedRoute>
                  } />
                  
                  <Route path="/auth" element={
                    <RoleBasedRoute>
                      <Auth />
                    </RoleBasedRoute>
                  } />
                  
                  <Route path="/marketplace" element={
                    <RoleBasedRoute>
                      <Marketplace />
                    </RoleBasedRoute>
                  } />
                  
                  <Route path="/audits" element={
                    <RoleBasedRoute>
                      <Audits />
                    </RoleBasedRoute>
                  } />
                  
                  <Route path="/community" element={
                    <RoleBasedRoute>
                      <Community />
                    </RoleBasedRoute>
                  } />
                  
                  <Route path="/system-health" element={
                    <RoleBasedRoute>
                      <SystemHealth />
                    </RoleBasedRoute>
                  } />

                  {/* New essential pages */}
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/ai-tools" element={<AiTools />} />
                  <Route path="/docs" element={<Docs />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/templates" element={<Templates />} />
                  <Route path="/competitive-advantages" element={<CompetitiveAdvantages />} />
                  <Route path="/comprehensive-security" element={<ComprehensiveSecurity />} />
                  
                  {/* General User Routes */}
                  <Route path="/service-provider-onboarding" element={
                    <RoleBasedRoute>
                      <ServiceProviderOnboarding />
                    </RoleBasedRoute>
                  } />
                  
                  {/* Project Owner Routes */}
                  <Route path="/request-audit" element={
                    <RoleBasedRoute>
                      <RequestAudit />
                    </RoleBasedRoute>
                  } />
                  
                  {/* Auditor Routes */}
                  <Route path="/submit-service" element={
                    <RoleBasedRoute>
                      <SubmitService />
                    </RoleBasedRoute>
                  } />
                  
                  {/* Authenticated User Routes */}
                  <Route path="/dashboard/*" element={
                    <RoleBasedRoute>
                      <Dashboard />
                    </RoleBasedRoute>
                  } />
                  
                  <Route path="/escrow" element={
                    <RoleBasedRoute>
                      <Escrow />
                    </RoleBasedRoute>
                  } />
                  
                  {/* Admin Routes */}
                  <Route path="/admin/*" element={
                    <RoleBasedRoute>
                      <AdminDashboard />
                    </RoleBasedRoute>
                  } />

                  {/* 404 fallback */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </TooltipProvider>
            </EscrowProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;

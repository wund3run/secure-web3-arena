
import { Helmet } from "react-helmet-async";
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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <EscrowProvider>
          <TooltipProvider>
            <Toaster />
            <Helmet
              titleTemplate="%s | Hawkly"
              defaultTitle="Hawkly - Web3 Security Marketplace"
            />
            <BrowserRouter>
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
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </EscrowProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

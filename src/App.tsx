import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/auth";
import { RouteGuard } from "@/components/auth/RouteGuard";
import { GlobalErrorBoundary } from "@/components/error/GlobalErrorBoundary";

// Lazy load pages for better performance
import Index from "./pages/Index";
import Marketplace from "./pages/Marketplace";
import RequestAudit from "./pages/RequestAudit";
import SecurityMonitoringPage from "./pages/SecurityMonitoringPage";
import EnterpriseControlPage from "./pages/EnterpriseControlPage";
import Audits from "./pages/Audits";
import AuditDetail from "./pages/AuditDetail";
import Pricing from "./pages/Pricing";
import Resources from "./pages/Resources";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Messages from "./pages/Messages";
import Escrow from "./pages/Escrow";

// Admin pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminAudits from "./pages/AdminAudits";
import AdminReports from "./pages/AdminReports";
import AdminServices from "./pages/AdminServices";
import AdminProviders from "./pages/AdminProviders";
import AdminSettings from "./pages/AdminSettings";

// Other pages
import Challenges from "./pages/Challenges";
import Achievements from "./pages/Achievements";
import ContactProvider from "./pages/ContactProvider";
import CancellationRefund from "./pages/CancellationRefund";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <GlobalErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <BrowserRouter>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/request-audit" element={<RequestAudit />} />
                  <Route path="/audits" element={<Audits />} />
                  <Route path="/audits/:id" element={<AuditDetail />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/contact" element={<Contact />} />
                  
                  {/* Protected routes */}
                  <Route 
                    path="/dashboard" 
                    element={
                      <RouteGuard requireAuth>
                        <Dashboard />
                      </RouteGuard>
                    } 
                  />
                  <Route 
                    path="/security-monitoring" 
                    element={
                      <RouteGuard requireAuth>
                        <SecurityMonitoringPage />
                      </RouteGuard>
                    } 
                  />
                  <Route 
                    path="/enterprise-control" 
                    element={
                      <RouteGuard requireAuth allowedRoles={["admin", "project_owner"]}>
                        <EnterpriseControlPage />
                      </RouteGuard>
                    } 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <RouteGuard requireAuth>
                        <Profile />
                      </RouteGuard>
                    } 
                  />
                  <Route 
                    path="/settings" 
                    element={
                      <RouteGuard requireAuth>
                        <Settings />
                      </RouteGuard>
                    } 
                  />
                  <Route 
                    path="/messages" 
                    element={
                      <RouteGuard requireAuth>
                        <Messages />
                      </RouteGuard>
                    } 
                  />
                  <Route 
                    path="/escrow" 
                    element={
                      <RouteGuard requireAuth>
                        <Escrow />
                      </RouteGuard>
                    } 
                  />

                  {/* Admin routes */}
                  <Route 
                    path="/admin" 
                    element={
                      <RouteGuard requireAuth allowedRoles={["admin"]}>
                        <AdminDashboard />
                      </RouteGuard>
                    } 
                  />
                  <Route 
                    path="/admin/users" 
                    element={
                      <RouteGuard requireAuth allowedRoles={["admin"]}>
                        <AdminUsers />
                      </RouteGuard>
                    } 
                  />
                  <Route 
                    path="/admin/audits" 
                    element={
                      <RouteGuard requireAuth allowedRoles={["admin"]}>
                        <AdminAudits />
                      </RouteGuard>
                    } 
                  />
                  <Route 
                    path="/admin/reports" 
                    element={
                      <RouteGuard requireAuth allowedRoles={["admin"]}>
                        <AdminReports />
                      </RouteGuard>
                    } 
                  />
                  <Route 
                    path="/admin/services" 
                    element={
                      <RouteGuard requireAuth allowedRoles={["admin"]}>
                        <AdminServices />
                      </RouteGuard>
                    } 
                  />
                  <Route 
                    path="/admin/providers" 
                    element={
                      <RouteGuard requireAuth allowedRoles={["admin"]}>
                        <AdminProviders />
                      </RouteGuard>
                    } 
                  />
                  <Route 
                    path="/admin/settings" 
                    element={
                      <RouteGuard requireAuth allowedRoles={["admin"]}>
                        <AdminSettings />
                      </RouteGuard>
                    } 
                  />

                  {/* Other routes */}
                  <Route path="/challenges" element={<Challenges />} />
                  <Route path="/achievements" element={<Achievements />} />
                  <Route path="/contact-provider" element={<ContactProvider />} />
                  <Route path="/cancellation-refund" element={<CancellationRefund />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </GlobalErrorBoundary>
  );
};

export default App;

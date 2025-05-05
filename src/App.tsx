
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import PrivateRoute from "./components/auth/PrivateRoute";
import ErrorBoundary from "./components/ui/error-boundary";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Marketplace from "./pages/Marketplace";
import Leaderboard from "./pages/Leaderboard";
import Audits from "./pages/Audits";
import Community from "./pages/Community";
import Stats from "./pages/Stats";
import Escrow from "./pages/Escrow";
import Contact from "./pages/Contact";
import RequestAudit from "./pages/RequestAudit";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AuditorOnboarding from "@/pages/AuditorOnboarding";
import ServiceProviderOnboarding from "@/pages/ServiceProviderOnboarding";
import ApplicationSubmitted from "@/pages/ApplicationSubmitted";
import Auth from "@/pages/Auth";
import SecurityInsights from "@/pages/SecurityInsights";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <React.StrictMode>
    <ThemeProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
            <AuthProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    
                    {/* Auth routes */}
                    <Route path="/auth" element={<Auth />} />
                    
                    {/* Protected routes */}
                    <Route 
                      path="/request-audit" 
                      element={<RequestAudit />} 
                    />

                    {/* Security Insights route */}
                    <Route path="/security-insights" element={<SecurityInsights />} />
                    
                    <Route 
                      path="/escrow" 
                      element={
                        <PrivateRoute>
                          <Escrow />
                        </PrivateRoute>
                      } 
                    />
                    
                    <Route 
                      path="/auditor-onboarding" 
                      element={
                        <PrivateRoute>
                          <AuditorOnboarding />
                        </PrivateRoute>
                      } 
                    />
                    
                    {/* Marketplace routes */}
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/auditors" element={<NotFound />} />
                    <Route path="/listings" element={<NotFound />} />
                    <Route path="/requests" element={<NotFound />} />
                    
                    {/* Community routes */}
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/achievements" element={<NotFound />} />
                    <Route path="/events" element={<NotFound />} />
                    <Route path="/forum" element={<NotFound />} />
                    
                    {/* Content routes */}
                    <Route path="/audits" element={<Audits />} />
                    <Route path="/stats" element={<Stats />} />
                    <Route path="/docs" element={<NotFound />} />
                    <Route path="/blog" element={<NotFound />} />
                    <Route path="/vulnerabilities" element={<NotFound />} />
                    <Route path="/faqs" element={<NotFound />} />
                    <Route path="/contact" element={<Contact />} />
                    
                    {/* Admin routes */}
                    <Route 
                      path="/admin" 
                      element={<AdminLogin />} 
                    />
                    <Route 
                      path="/admin/dashboard" 
                      element={
                        <PrivateRoute>
                          <AdminDashboard />
                        </PrivateRoute>
                      } 
                    />
                    <Route 
                      path="/admin/services" 
                      element={
                        <PrivateRoute>
                          <AdminDashboard section="services" />
                        </PrivateRoute>
                      } 
                    />
                    <Route 
                      path="/admin/users" 
                      element={
                        <PrivateRoute>
                          <AdminDashboard section="users" />
                        </PrivateRoute>
                      } 
                    />
                    <Route 
                      path="/admin/applications" 
                      element={
                        <PrivateRoute>
                          <AdminDashboard section="applications" />
                        </PrivateRoute>
                      } 
                    />
                    <Route 
                      path="/admin/audits" 
                      element={
                        <PrivateRoute>
                          <AdminDashboard section="audits" />
                        </PrivateRoute>
                      } 
                    />
                    <Route 
                      path="/admin/reports" 
                      element={
                        <PrivateRoute>
                          <AdminDashboard section="reports" />
                        </PrivateRoute>
                      } 
                    />
                    <Route 
                      path="/admin/settings" 
                      element={
                        <PrivateRoute>
                          <AdminDashboard section="settings" />
                        </PrivateRoute>
                      } 
                    />
                    
                    {/* Onboarding routes */}
                    <Route path="/join" element={<ServiceProviderOnboarding />} />
                    <Route path="/application-submitted" element={<ApplicationSubmitted />} />
                    
                    {/* Legal routes */}
                    <Route path="/terms" element={<NotFound />} />
                    <Route path="/privacy" element={<NotFound />} />
                    <Route path="/security-policy" element={<NotFound />} /> 
                    
                    {/* Catch-all route */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </AuthProvider>
          </ErrorBoundary>
        </QueryClientProvider>
      </HelmetProvider>
    </ThemeProvider>
  </React.StrictMode>
);

export default App;

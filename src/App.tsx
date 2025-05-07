
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import pages
import Auth from "./pages/Auth";
import Marketplace from "./pages/Marketplace";
import ServiceDetails from "./pages/ServiceDetails";
import Contact from "./pages/Contact";
import Stats from "./pages/Stats";
import Leaderboard from "./pages/Leaderboard";
import Community from "./pages/Community";
import SecurityInsights from "./pages/SecurityInsights";
import TwoFactorAuth from "./pages/TwoFactorAuth";
import RequestAudit from "./pages/RequestAudit";
import Audits from "./pages/Audits";
import Achievements from "./pages/Achievements";
import Escrow from "./pages/Escrow";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AuditRequestForService from "./pages/AuditRequestForService";
import ContactProvider from "./pages/ContactProvider";
import SubmitService from "./pages/SubmitService";
import Index from "./pages/Index";

// Import components
import { PrivateRoute } from "./components/auth/PrivateRoute";

// Import contexts
import { AuthProvider } from "./contexts/AuthContext";

// Create a new QueryClient instance
const queryClient = new QueryClient();

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Helmet>
          <title>Hawkly - Web3 Security Audit Marketplace</title>
          <meta name="description" content="Connect with top Web3 security auditors, view their reputation, and request personalized audits for your projects." />
        </Helmet>
        
        <div className="app">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/service/:serviceId" element={<ServiceDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/community" element={<Community />} />
            <Route path="/security-insights" element={<SecurityInsights />} />
            <Route path="/two-factor-auth" element={<TwoFactorAuth />} />
            <Route path="/submit-service" element={<SubmitService />} />
            <Route path="/contact-provider/:providerId" element={<ContactProvider />} />
            
            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/request-audit" element={<RequestAudit />} />
              <Route path="/request-audit/:serviceId" element={<AuditRequestForService />} />
              <Route path="/audits" element={<Audits />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/escrow" element={<Escrow />} />
            </Route>
            
            {/* Provider Onboarding */}
            <Route path="/service-provider-onboarding" element={<ServiceProviderOnboarding />} />
            <Route path="/auditor-onboarding" element={<AuditorOnboarding />} />
            <Route path="/application-submitted" element={<ApplicationSubmitted />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard section="dashboard" />} />
            <Route path="/admin/users" element={<AdminDashboard section="users" />} />
            <Route path="/admin/services" element={<AdminDashboard section="services" />} />
            <Route path="/admin/approvals" element={<AdminDashboard section="approvals" />} />
            <Route path="/admin/audits" element={<AdminDashboard section="audits" />} />
            <Route path="/admin/providers" element={<AdminDashboard section="providers" />} />
            <Route path="/admin/reports" element={<AdminDashboard section="reports" />} />
            <Route path="/admin/settings" element={<AdminDashboard section="settings" />} />
            
            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          {/* Global Components */}
          <Toaster />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;

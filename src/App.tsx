import React, { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from "sonner"; // Use sonner directly
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Import loading state components
import AppLoadingState from "./components/ui/app-loading-state";
import LoadingState from "./components/ui/loading-state";
import ErrorBoundary from "./components/ui/error-boundary";
import { BetaBanner } from "./components/ui/beta-banner";
import { SupportButtonEnhanced } from "./components/ui/support-button-enhanced";
import { SkipLink } from "./components/ui/skip-link";

// Import contexts
import { AuthProvider } from "./contexts/auth";
import { AccessibilityProvider } from "./contexts/AccessibilityContext";

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Lazy load pages to improve initial loading performance
const Index = lazy(() => import("./pages/Index"));
const Auth = lazy(() => import("./pages/Auth"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const Marketplace = lazy(() => import("./pages/Marketplace"));
const ServiceDetails = lazy(() => import("./pages/ServiceDetails"));
const Contact = lazy(() => import("./pages/Contact"));
const Stats = lazy(() => import("./pages/Stats"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const Community = lazy(() => import("./pages/Community"));
const SecurityInsights = lazy(() => import("./pages/SecurityInsights"));
const TwoFactorAuth = lazy(() => import("./pages/TwoFactorAuth"));
const RequestAudit = lazy(() => import("./pages/RequestAudit"));
const Audits = lazy(() => import("./pages/Audits"));
const AuditDetails = lazy(() => import("./pages/AuditDetails"));
const Achievements = lazy(() => import("./pages/Achievements"));
const Escrow = lazy(() => import("./pages/Escrow"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AuditRequestForService = lazy(() => import("./pages/AuditRequestForService"));
const ContactProvider = lazy(() => import("./pages/ContactProvider"));
const SubmitService = lazy(() => import("./pages/SubmitService"));
const AuditGuidelines = lazy(() => import("./pages/AuditGuidelines"));

// Import onboarding pages
const ServiceProviderOnboarding = lazy(() => import("./pages/onboarding/ServiceProviderOnboarding"));
const AuditorOnboarding = lazy(() => import("./pages/onboarding/AuditorOnboarding"));
const ApplicationSubmitted = lazy(() => import("./pages/onboarding/ApplicationSubmitted"));

// Import components
const PrivateRoute = lazy(() => import("./components/auth/PrivateRoute").then(module => ({ default: module.PrivateRoute })));

function App() {
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setAppLoading(false);
    }, 1000);

    // Preconnect to origin for performance
    const preconnectLink = document.createElement('link');
    preconnectLink.rel = 'preconnect';
    preconnectLink.href = window.location.origin;
    document.head.appendChild(preconnectLink);
    
    return () => {
      clearTimeout(timer);
      if (document.head.contains(preconnectLink)) {
        document.head.removeChild(preconnectLink);
      }
    };
  }, []);

  if (appLoading) {
    return <AppLoadingState />;
  }

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <AccessibilityProvider>
          <Helmet>
            <html lang="en" />
            <title>Hawkly - Web3 Security Audit Marketplace</title>
            <meta name="description" content="Connect with top Web3 security auditors, view their reputation, and request personalized audits for your projects." />
          </Helmet>
          
          <div className="app">
            {/* Skip link for keyboard navigation */}
            <SkipLink targetId="main-content" />
            
            <ErrorBoundary>
              {/* Add Beta Banner at the top of the application */}
              <BetaBanner dismissible={true} />
              
              <Suspense fallback={<LoadingState fullPage message="Loading page..." />}>
                <main id="main-content" tabIndex={-1} className="outline-none focus:ring-0">
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Index />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/auth-callback" element={<AuthCallback />} />
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
                    <Route path="/audit-guidelines" element={<AuditGuidelines />} />
                    
                    {/* Join Routes - both direct and redirect */}
                    <Route path="/join" element={<ServiceProviderOnboarding />} />
                    
                    {/* Protected Routes */}
                    <Route path="/request-audit" element={
                      <PrivateRoute>
                        <RequestAudit />
                      </PrivateRoute>
                    } />
                    <Route path="/request-audit/:serviceId" element={
                      <PrivateRoute>
                        <AuditRequestForService />
                      </PrivateRoute>
                    } />
                    <Route path="/audits" element={
                      <PrivateRoute>
                        <Audits />
                      </PrivateRoute>
                    } />
                    <Route path="/audit/:auditId" element={
                      <PrivateRoute>
                        <AuditDetails />
                      </PrivateRoute>
                    } />
                    <Route path="/achievements" element={
                      <PrivateRoute>
                        <Achievements />
                      </PrivateRoute>
                    } />
                    <Route path="/escrow" element={
                      <PrivateRoute>
                        <Escrow />
                      </PrivateRoute>
                    } />
                    
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
                </main>
              </Suspense>
            </ErrorBoundary>
            
            {/* Global Components */}
            <Toaster 
              position="top-right" 
              expand={true}
              richColors 
              closeButton
              toastOptions={{
                duration: 5000,
                className: "rounded-md border border-border bg-background text-foreground accessible-toast"
              }}
            />
            
            {/* Persistent Support Button with Accessibility Options */}
            <SupportButtonEnhanced />
          </div>
        </AccessibilityProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;

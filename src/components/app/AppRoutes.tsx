
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingState from "@/components/ui/loading-state";
import { PrivateRoute } from "@/components/auth/PrivateRoute";

// Lazy-loaded pages for better performance
const Index = lazy(() => import("@/pages/Index"));
const Marketplace = lazy(() => import("@/pages/Marketplace"));
const ServiceDetails = lazy(() => import("@/pages/ServiceDetails"));
const Audits = lazy(() => import("@/pages/Audits"));
const AuditDetail = lazy(() => import("@/pages/AuditDetail"));
const Guidelines = lazy(() => import("@/pages/Guidelines"));
const AuditorOnboarding = lazy(() => import("@/pages/onboarding/AuditorOnboarding"));
const Admin = lazy(() => import("@/pages/Admin"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const LoginPage = lazy(() => import("@/pages/Login"));
const RegisterPage = lazy(() => import("@/pages/Register"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const RequestAudit = lazy(() => import("@/pages/RequestAudit"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const EnhancedDashboard = lazy(() => import("@/pages/EnhancedDashboard"));
const Auth = lazy(() => import("@/pages/Auth"));
const AuthCallback = lazy(() => import("@/pages/AuthCallback"));
const TwoFactorAuth = lazy(() => import("@/pages/TwoFactorAuth"));
const Achievements = lazy(() => import("@/pages/Achievements"));
const Escrow = lazy(() => import("@/pages/Escrow"));
const SecurityInsights = lazy(() => import("@/pages/SecurityInsights"));
const AuditGuidelines = lazy(() => import("@/pages/AuditGuidelines"));
const SubmitService = lazy(() => import("@/pages/SubmitService"));
const Community = lazy(() => import("@/pages/Community"));

// Loading component for Suspense
const PageLoading = () => <LoadingState message="Loading page..." fullPage={true} size="lg" />;

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/marketplace/:id" element={<ServiceDetails />} />
        <Route path="/audits" element={<Audits />} />
        <Route path="/audits/:id" element={<AuditDetail />} />
        <Route path="/guidelines" element={<Guidelines />} />
        <Route path="/service-provider-onboarding" element={<AuditorOnboarding />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/two-factor-auth" element={<TwoFactorAuth />} />
        <Route path="/request-audit" element={<RequestAudit />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/security-insights" element={<SecurityInsights />} />
        <Route path="/audit-guidelines" element={<AuditGuidelines />} />
        <Route path="/submit-service" element={<SubmitService />} />
        <Route path="/escrow" element={<Escrow />} />
        <Route path="/community" element={<Community />} />
        
        {/* Enhanced pages */}
        <Route path="/enhanced-dashboard" element={<EnhancedDashboard />} />
        
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        
        {/* Admin routes */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute adminOnly={true}>
              <Admin />
            </PrivateRoute>
          }
        />
        
        {/* 404 - Not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

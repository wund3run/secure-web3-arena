
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingState from "@/components/ui/loading-state";
import ErrorBoundary from "@/components/ui/error-boundary";

// Import PrivateRoute
const PrivateRoute = lazy(() => import("@/components/auth/PrivateRoute").then(module => ({ default: module.PrivateRoute })));

// Lazy load pages with explicitly named chunks for better debugging
const Index = lazy(() => import(/* webpackChunkName: "index-page" */ "@/pages/Index"));
const Auth = lazy(() => import(/* webpackChunkName: "auth-page" */ "@/pages/Auth"));
const AuthCallback = lazy(() => import(/* webpackChunkName: "auth-callback-page" */ "@/pages/AuthCallback"));
const Marketplace = lazy(() => import(/* webpackChunkName: "marketplace-page" */ "@/pages/Marketplace"));
const ServiceDetails = lazy(() => import(/* webpackChunkName: "service-details-page" */ "@/pages/ServiceDetails"));
const Contact = lazy(() => import(/* webpackChunkName: "contact-page" */ "@/pages/Contact"));
const Stats = lazy(() => import(/* webpackChunkName: "stats-page" */ "@/pages/Stats"));
const Leaderboard = lazy(() => import(/* webpackChunkName: "leaderboard-page" */ "@/pages/Leaderboard"));
const Community = lazy(() => import(/* webpackChunkName: "community-page" */ "@/pages/Community"));
const SecurityInsights = lazy(() => import(/* webpackChunkName: "security-insights-page" */ "@/pages/SecurityInsights"));
const TwoFactorAuth = lazy(() => import(/* webpackChunkName: "two-factor-auth-page" */ "@/pages/TwoFactorAuth"));
const RequestAudit = lazy(() => import(/* webpackChunkName: "request-audit-page" */ "@/pages/RequestAudit"));
const Audits = lazy(() => import(/* webpackChunkName: "audits-page" */ "@/pages/Audits"));
const AuditDetails = lazy(() => import(/* webpackChunkName: "audit-details-page" */ "@/pages/AuditDetails"));
const Achievements = lazy(() => import(/* webpackChunkName: "achievements-page" */ "@/pages/Achievements"));
const Escrow = lazy(() => import(/* webpackChunkName: "escrow-page" */ "@/pages/Escrow"));
const NotFound = lazy(() => import(/* webpackChunkName: "not-found-page" */ "@/pages/NotFound"));
const AdminLogin = lazy(() => import(/* webpackChunkName: "admin-login-page" */ "@/pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import(/* webpackChunkName: "admin-dashboard-page" */ "@/pages/admin/AdminDashboard"));
const AuditRequestForService = lazy(() => import(/* webpackChunkName: "audit-request-service-page" */ "@/pages/AuditRequestForService"));
const ContactProvider = lazy(() => import(/* webpackChunkName: "contact-provider-page" */ "@/pages/ContactProvider"));
const SubmitService = lazy(() => import(/* webpackChunkName: "submit-service-page" */ "@/pages/SubmitService"));
const AuditGuidelines = lazy(() => import(/* webpackChunkName: "audit-guidelines-page" */ "@/pages/AuditGuidelines"));

// Import onboarding pages
const ServiceProviderOnboarding = lazy(() => import(/* webpackChunkName: "service-provider-onboarding-page" */ "@/pages/onboarding/ServiceProviderOnboarding"));
const AuditorOnboarding = lazy(() => import(/* webpackChunkName: "auditor-onboarding-page" */ "@/pages/onboarding/AuditorOnboarding"));
const ApplicationSubmitted = lazy(() => import(/* webpackChunkName: "application-submitted-page" */ "@/pages/onboarding/ApplicationSubmitted"));

// Custom loading component that's route-aware
const RouteLoadingState: React.FC<{ route?: string }> = ({ route }) => {
  const getMessage = () => {
    if (route?.includes('audit')) return 'Loading audit information...';
    if (route?.includes('marketplace')) return 'Loading marketplace...';
    if (route?.includes('admin')) return 'Loading admin dashboard...';
    if (route?.includes('escrow')) return 'Loading secure escrow system...';
    return 'Loading page...';
  };
  
  return <LoadingState fullPage message={getMessage()} />;
};

/**
 * Application routes configuration with code splitting and performance optimization
 */
export const AppRoutes: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<RouteLoadingState />}>
        <main id="main-content" tabIndex={-1} className="outline-none focus:ring-0">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={
              <Suspense fallback={<RouteLoadingState route="auth" />}>
                <Auth />
              </Suspense>
            } />
            <Route path="/auth-callback" element={<AuthCallback />} />
            <Route path="/marketplace" element={
              <Suspense fallback={<RouteLoadingState route="marketplace" />}>
                <Marketplace />
              </Suspense>
            } />
            <Route path="/service/:serviceId" element={
              <Suspense fallback={<RouteLoadingState route="service" />}>
                <ServiceDetails />
              </Suspense>
            } />
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
                <Suspense fallback={<RouteLoadingState route="request-audit" />}>
                  <RequestAudit />
                </Suspense>
              </PrivateRoute>
            } />
            <Route path="/request-audit/:serviceId" element={
              <PrivateRoute>
                <Suspense fallback={<RouteLoadingState route="request-audit" />}>
                  <AuditRequestForService />
                </Suspense>
              </PrivateRoute>
            } />
            <Route path="/audits" element={
              <PrivateRoute>
                <Suspense fallback={<RouteLoadingState route="audits" />}>
                  <Audits />
                </Suspense>
              </PrivateRoute>
            } />
            <Route path="/audit/:auditId" element={
              <PrivateRoute>
                <Suspense fallback={<RouteLoadingState route="audit" />}>
                  <AuditDetails />
                </Suspense>
              </PrivateRoute>
            } />
            <Route path="/achievements" element={
              <PrivateRoute>
                <Achievements />
              </PrivateRoute>
            } />
            <Route path="/escrow" element={
              <PrivateRoute>
                <Suspense fallback={<RouteLoadingState route="escrow" />}>
                  <Escrow />
                </Suspense>
              </PrivateRoute>
            } />
            
            {/* Provider Onboarding */}
            <Route path="/service-provider-onboarding" element={<ServiceProviderOnboarding />} />
            <Route path="/auditor-onboarding" element={<AuditorOnboarding />} />
            <Route path="/application-submitted" element={<ApplicationSubmitted />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <Suspense fallback={<RouteLoadingState route="admin" />}>
                <AdminDashboard section="dashboard" />
              </Suspense>
            } />
            <Route path="/admin/users" element={
              <Suspense fallback={<RouteLoadingState route="admin" />}>
                <AdminDashboard section="users" />
              </Suspense>
            } />
            <Route path="/admin/services" element={
              <Suspense fallback={<RouteLoadingState route="admin" />}>
                <AdminDashboard section="services" />
              </Suspense>
            } />
            <Route path="/admin/approvals" element={
              <Suspense fallback={<RouteLoadingState route="admin" />}>
                <AdminDashboard section="approvals" />
              </Suspense>
            } />
            <Route path="/admin/audits" element={
              <Suspense fallback={<RouteLoadingState route="admin" />}>
                <AdminDashboard section="audits" />
              </Suspense>
            } />
            <Route path="/admin/providers" element={
              <Suspense fallback={<RouteLoadingState route="admin" />}>
                <AdminDashboard section="providers" />
              </Suspense>
            } />
            <Route path="/admin/reports" element={
              <Suspense fallback={<RouteLoadingState route="admin" />}>
                <AdminDashboard section="reports" />
              </Suspense>
            } />
            <Route path="/admin/settings" element={
              <Suspense fallback={<RouteLoadingState route="admin" />}>
                <AdminDashboard section="settings" />
              </Suspense>
            } />
            
            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Suspense>
    </ErrorBoundary>
  );
};

import React, { lazy, Suspense } from "react";
import LoadingState from "@/components/ui/loading-state";
import ErrorBoundary from "@/components/ui/error-boundary";

/**
 * This file is currently not in use. The main routing is handled in App.tsx
 * If you want to use this file for code organization, you'll need to:
 * 1. Import it in App.tsx
 * 2. Replace the Routes in App.tsx with this component
 * 3. Remove the BrowserRouter wrapper since it's already in main.tsx
 */

// Import PrivateRoute
const PrivateRoute = lazy(() => import("@/components/auth/PrivateRoute").then(module => ({ default: module.PrivateRoute })));

// Component exports for potential future use with code splitting
export const lazyComponents = {
  Index: lazy(() => import(/* webpackChunkName: "index-page" */ "@/pages/Index")),
  Auth: lazy(() => import(/* webpackChunkName: "auth-page" */ "@/pages/Auth")),
  AuthCallback: lazy(() => import(/* webpackChunkName: "auth-callback-page" */ "@/pages/AuthCallback")),
  Marketplace: lazy(() => import(/* webpackChunkName: "marketplace-page" */ "@/pages/Marketplace")),
  ServiceDetails: lazy(() => import(/* webpackChunkName: "service-details-page" */ "@/pages/ServiceDetails")),
  Contact: lazy(() => import(/* webpackChunkName: "contact-page" */ "@/pages/Contact")),
  Stats: lazy(() => import(/* webpackChunkName: "stats-page" */ "@/pages/Stats")),
  Leaderboard: lazy(() => import(/* webpackChunkName: "leaderboard-page" */ "@/pages/Leaderboard")),
  Community: lazy(() => import(/* webpackChunkName: "community-page" */ "@/pages/Community")),
  SecurityInsights: lazy(() => import(/* webpackChunkName: "security-insights-page" */ "@/pages/SecurityInsights")),
  TwoFactorAuth: lazy(() => import(/* webpackChunkName: "two-factor-auth-page" */ "@/pages/TwoFactorAuth")),
  RequestAudit: lazy(() => import(/* webpackChunkName: "request-audit-page" */ "@/pages/RequestAudit")),
  Audits: lazy(() => import(/* webpackChunkName: "audits-page" */ "@/pages/Audits")),
  AuditDetails: lazy(() => import(/* webpackChunkName: "audit-details-page" */ "@/pages/AuditDetails")),
  Achievements: lazy(() => import(/* webpackChunkName: "achievements-page" */ "@/pages/Achievements")),
  Escrow: lazy(() => import(/* webpackChunkName: "escrow-page" */ "@/pages/Escrow")),
  Dashboard: lazy(() => import(/* webpackChunkName: "dashboard-page" */ "@/pages/Dashboard")),
  NotFound: lazy(() => import(/* webpackChunkName: "not-found-page" */ "@/pages/NotFound")),
  AdminLogin: lazy(() => import(/* webpackChunkName: "admin-login-page" */ "@/pages/admin/AdminLogin")),
  AdminDashboard: lazy(() => import(/* webpackChunkName: "admin-dashboard-page" */ "@/pages/admin/AdminDashboard")),
  AuditRequestForService: lazy(() => import(/* webpackChunkName: "audit-request-service-page" */ "@/pages/AuditRequestForService")),
  ContactProvider: lazy(() => import(/* webpackChunkName: "contact-provider-page" */ "@/pages/ContactProvider")),
  SubmitService: lazy(() => import(/* webpackChunkName: "submit-service-page" */ "@/pages/SubmitService")),
  AuditGuidelines: lazy(() => import(/* webpackChunkName: "audit-guidelines-page" */ "@/pages/AuditGuidelines")),
  Pricing: lazy(() => import(/* webpackChunkName: "pricing-page" */ "@/pages/Pricing")),
  Resources: lazy(() => import(/* webpackChunkName: "resources-page" */ "@/pages/Resources")),
  ServiceProviderOnboarding: lazy(() => import(/* webpackChunkName: "service-provider-onboarding-page" */ "@/pages/onboarding/ServiceProviderOnboarding")),
  AuditorOnboarding: lazy(() => import(/* webpackChunkName: "auditor-onboarding-page" */ "@/pages/onboarding/AuditorOnboarding")),
  ApplicationSubmitted: lazy(() => import(/* webpackChunkName: "application-submitted-page" */ "@/pages/onboarding/ApplicationSubmitted")),
  EnhancedAITools: lazy(() => import(/* webpackChunkName: "enhanced-ai-tools-page" */ "@/pages/EnhancedAITools")),
  WebThreeSecurity: lazy(() => import(/* webpackChunkName: "web-three-security-page" */ "@/pages/WebThreeSecurity")),
  SupportCenter: lazy(() => import(/* webpackChunkName: "support-center-page" */ "@/pages/SupportCenter")),
};

/**
 * This component is currently not rendered in the application.
 * Main routing is handled in App.tsx
 */
export const AppRoutes: React.FC = () => {
  // This component is kept for reference but is not currently used
  // The active routes are defined in App.tsx
  console.warn("AppRoutes component was rendered but is not currently used in the application.");
  return null;
};

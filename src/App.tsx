import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Auth from "@/pages/Auth";
import Profile from "@/pages/Profile";
import Admin from "@/pages/Admin";
import RequestAudit from "@/pages/RequestAudit";
import ServiceProviderOnboarding from "@/pages/ServiceProviderOnboarding";
import SubmitService from "@/pages/SubmitService";
import ServiceDetails from "@/pages/ServiceDetails";
import Audits from "@/pages/Audits";
import AuditDetails from "@/pages/AuditDetails";
import AIMatchingHub from "@/pages/AIMatchingHub";
import Forum from "@/pages/Forum";
import Leaderboard from "@/pages/Leaderboard";
import Events from "@/pages/Events";
import KnowledgeBase from "@/pages/KnowledgeBase";
import Tutorials from "@/pages/Tutorials";
import SecurityGuides from "@/pages/SecurityGuides";
import AuditGuidelines from "@/pages/AuditGuidelines";
import Dashboard from "@/pages/Dashboard";
import AuditorDashboard from "@/pages/AuditorDashboard";
import ProjectDashboard from "@/pages/ProjectDashboard";
import Index from "@/pages/Index";
import Marketplace from "@/pages/Marketplace";
import { AuthProvider } from "@/contexts/auth/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { ThemeProvider } from "next-themes";
import SecurityServices from "@/pages/SecurityServices";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import EditService from "@/pages/EditService";
import Disputes from "@/pages/Disputes";
import DisputeDetails from "@/pages/DisputeDetails";
import EscrowContracts from "@/pages/EscrowContracts";
import EscrowContractDetails from "@/pages/EscrowContractDetails";
import TermsOfService from "@/pages/TermsOfService";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import ContactUs from "@/pages/ContactUs";
import AboutUs from "@/pages/AboutUs";
import Settings from "@/pages/Settings";
import Support from "@/pages/Support";
import PlatformReview from "@/pages/PlatformReview";
import { EnhancedErrorBoundary } from "@/components/error/enhanced-error-boundary";
import { ProductionErrorHandler } from "@/components/error/production-error-handler";
import { PerformanceMonitor } from "@/components/monitoring/performance-monitor";

// Create a client with optimized settings for production
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: (failureCount, error: any) => {
        // Don't retry for certain errors
        if (error?.status === 404 || error?.status === 403) {
          return false;
        }
        return failureCount < 2;
      },
      refetchOnWindowFocus: false, // Optimize for production
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/profile/:id",
    element: <Profile />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/support",
    element: <Support />,
  },
  {
    path: "/platform-review",
    element: <PlatformReview />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/request-audit",
    element: <RequestAudit />,
  },
  {
    path: "/service-provider-onboarding",
    element: <ServiceProviderOnboarding />,
  },
  {
    path: "/submit-service",
    element: <SubmitService />,
  },
  {
    path: "/marketplace",
    element: <Marketplace />,
  },
  {
    path: "/service/:id",
    element: <ServiceDetails />,
  },
  {
    path: "/audits",
    element: <Audits />,
  },
  {
    path: "/audit/:id",
    element: <AuditDetails />,
  },
  {
    path: "/ai-matching-hub",
    element: <AIMatchingHub />,
  },
  {
    path: "/forum",
    element: <Forum />,
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />,
  },
  {
    path: "/events",
    element: <Events />,
  },
  {
    path: "/knowledge-base",
    element: <KnowledgeBase />,
  },
  {
    path: "/tutorials",
    element: <Tutorials />,
  },
  {
    path: "/security-guides",
    element: <SecurityGuides />,
  },
  {
    path: "/audit-guidelines",
    element: <AuditGuidelines />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/auditor-dashboard",
    element: <AuditorDashboard />,
  },
  {
    path: "/project-dashboard",
    element: <ProjectDashboard />,
  },
  {
    path: "/security-services",
    element: <SecurityServices />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/edit-service",
    element: <EditService />,
  },
  {
    path: "/disputes",
    element: <Disputes />,
  },
  {
    path: "/dispute/:id",
    element: <DisputeDetails />,
  },
  {
    path: "/escrow-contracts",
    element: <EscrowContracts />,
  },
  {
    path: "/escrow-contract/:id",
    element: <EscrowContractDetails />,
  },
  {
    path: "/terms-of-service",
    element: <TermsOfService />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/contact-us",
    element: <ContactUs />,
  },
  {
    path: "/about-us",
    element: <AboutUs />,
  },
]);

function App() {
  return (
    <ProductionErrorHandler>
      <HelmetProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <NotificationProvider>
                <PerformanceMonitor />
                <RouterProvider router={router} />
              </NotificationProvider>
            </AuthProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ProductionErrorHandler>
  );
}

export default App;

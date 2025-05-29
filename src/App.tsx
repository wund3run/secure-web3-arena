import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
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
import { NotificationHandlers } from "@/components/notifications/NotificationHandlers";
import { NotificationProvider } from "@/contexts/NotificationContext";
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
    <NotificationProvider>
      <NotificationHandlers />
      <RouterProvider router={router} />
    </NotificationProvider>
  );
}

export default App;

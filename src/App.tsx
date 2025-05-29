
import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Auth from "@/pages/Auth";
import { Profile } from "@/pages/Profile";
import { Admin } from "@/pages/Admin";
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
import SecurityServices from "@/pages/SecurityServices";

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
]);

function App() {
  return (
    <>
      <NotificationHandlers />
      <RouterProvider router={router} />
    </>
  );
}

export default App;

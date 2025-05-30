
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/auth/AuthContext";
import { HelmetProvider } from "react-helmet-async";
import { AppErrorBoundary } from "@/components/error/AppErrorBoundary";
import { GlobalComponents } from "@/components/app/GlobalComponents";
import Index from "./pages/Index";

// Lazy load pages for better performance
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Auth = lazy(() => import("./pages/Auth"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Marketplace = lazy(() => import("./pages/Marketplace"));
const AuditRequest = lazy(() => import("./pages/AuditRequest"));
const Audits = lazy(() => import("./pages/Audits"));
const AuditDetail = lazy(() => import("./pages/AuditDetail"));
const AuditorParameters = lazy(() => import("./pages/AuditorParameters"));
const TestingDashboard = lazy(() => import("./pages/TestingDashboard"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: (failureCount, error) => {
        // Don't retry on auth errors
        if (error instanceof Error && error.message.includes('auth')) {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});

function App() {
  return (
    <AppErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <TooltipProvider>
              <BrowserRouter>
                <div className="min-h-screen bg-background font-sans antialiased">
                  <Suspense fallback={
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  }>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/auth/callback" element={<AuthCallback />} />
                      <Route path="/admin" element={<AdminDashboard />} />
                      <Route path="/marketplace" element={<Marketplace />} />
                      <Route path="/audit-request" element={<AuditRequest />} />
                      <Route path="/audits" element={<Audits />} />
                      <Route path="/audits/:id" element={<AuditDetail />} />
                      <Route path="/auditor-parameters" element={<AuditorParameters />} />
                      <Route path="/testing-dashboard" element={<TestingDashboard />} />
                    </Routes>
                  </Suspense>
                  <GlobalComponents />
                  <Toaster />
                </div>
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </AppErrorBoundary>
  );
}

export default App;

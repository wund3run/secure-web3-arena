
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/auth/AuthContext";
import { EscrowProvider } from "@/contexts/EscrowContext";
import { RouterErrorBoundary } from "@/components/error/RouterErrorBoundary";

// Lazy load pages for better performance
const Index = React.lazy(() => import("@/pages/Index"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));
const OptimizedDistributionStrategy = React.lazy(() => import("@/pages/OptimizedDistributionStrategy"));
const ForProjectOwners = React.lazy(() => import("@/pages/ForProjectOwners"));
const ForAuditors = React.lazy(() => import("@/pages/ForAuditors"));
const ForEnterprises = React.lazy(() => import("@/pages/ForEnterprises"));
const ForDevelopers = React.lazy(() => import("@/pages/ForDevelopers"));

// Optimized QueryClient with better defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <RouterErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AuthProvider>
              <EscrowProvider>
                <TooltipProvider>
                  <Suspense fallback={
                    <div className="flex items-center justify-center min-h-screen">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  }>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/distribution-strategy" element={<OptimizedDistributionStrategy />} />
                      <Route path="/for-project-owners" element={<ForProjectOwners />} />
                      <Route path="/for-auditors" element={<ForAuditors />} />
                      <Route path="/for-enterprises" element={<ForEnterprises />} />
                      <Route path="/for-developers" element={<ForDevelopers />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                  <Toaster />
                </TooltipProvider>
              </EscrowProvider>
            </AuthProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </HelmetProvider>
    </RouterErrorBoundary>
  );
}

export default App;

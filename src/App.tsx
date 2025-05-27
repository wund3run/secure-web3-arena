
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/auth/AuthContext";
import { EscrowProvider } from "@/contexts/EscrowContext";
import { SmartErrorBoundary } from "@/components/error/smart-error-boundary";
import { OptimizedPerformanceMonitor } from "@/components/performance/OptimizedPerformanceMonitor";
import { EnhancedLoadingState } from "@/components/ui/enhanced-loading-state";

// Lazy load pages for better performance
const Index = React.lazy(() => import("@/pages/Index"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));
const OptimizedDistributionStrategy = React.lazy(() => import("@/pages/OptimizedDistributionStrategy"));
const ForProjectOwners = React.lazy(() => import("@/pages/ForProjectOwners"));
const ForAuditors = React.lazy(() => import("@/pages/ForAuditors"));
const ForEnterprises = React.lazy(() => import("@/pages/ForEnterprises"));
const ForDevelopers = React.lazy(() => import("@/pages/ForDevelopers"));

// Optimized QueryClient with better defaults and error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors, but do retry on network errors
        if (error instanceof Error && error.message.includes('4')) {
          return false;
        }
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
    mutations: {
      retry: 1,
      onError: (error) => {
        console.error('Mutation error:', error);
      }
    },
  },
});

function App() {
  return (
    <SmartErrorBoundary showReportButton={true}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AuthProvider>
              <EscrowProvider>
                <TooltipProvider>
                  <Suspense fallback={
                    <div className="flex items-center justify-center min-h-screen">
                      <EnhancedLoadingState 
                        message="Loading Hawkly Platform..." 
                        variant="spinner"
                        size="lg"
                      />
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
                  <Toaster position="top-right" richColors closeButton />
                  <OptimizedPerformanceMonitor />
                </TooltipProvider>
              </EscrowProvider>
            </AuthProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </HelmetProvider>
    </SmartErrorBoundary>
  );
}

export default App;

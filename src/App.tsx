
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/contexts/auth";
import { AuthNavigationHandler } from "@/components/auth/AuthNavigationHandler";
import { NotificationProvider } from "@/contexts/NotificationContext.tsx";
import { EscrowProvider } from "@/contexts/EscrowContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext.tsx";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ComprehensiveErrorBoundary } from "@/components/error/comprehensive-error-boundary";
import { StabilizedRouter } from "@/components/routing/StabilizedRouter";
import { SystemHealthMonitor } from "@/components/system/SystemHealthMonitor";

// Configure React Query with better defaults for stability
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors (client errors)
        if (error && typeof error === 'object' && 'status' in error) {
          const status = (error as any).status;
          if (status >= 400 && status < 500) return false;
        }
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime in v4)
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <ComprehensiveErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <NotificationProvider>
            <AccessibilityProvider>
              <ThemeProvider storageKey="vite-ui-theme">
                <TooltipProvider>
                  <BrowserRouter>
                    <AuthNavigationHandler />
                    <EscrowProvider>
                      <StabilizedRouter />
                      <SystemHealthMonitor />
                    </EscrowProvider>
                  </BrowserRouter>
                  <Toaster />
                </TooltipProvider>
              </ThemeProvider>
            </AccessibilityProvider>
          </NotificationProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ComprehensiveErrorBoundary>
  );
}

export default App;

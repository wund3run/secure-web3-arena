
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster as Sonner } from "sonner";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "@/contexts/auth";
import { AccessibilityProvider } from "@/components/accessibility/AccessibilityProvider";
import GlobalErrorBoundary from "@/components/error-handling/GlobalErrorBoundary";
import { SkipLink } from "@/components/ui/skip-link";
import "./App.css";
import "./styles/design-system.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        if (error?.message?.includes('blocked') || error?.message?.includes('ERR_BLOCKED')) {
          return false;
        }
        return failureCount < 2;
      },
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  return (
    <GlobalErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AccessibilityProvider>
            <AuthProvider>
              <SkipLink targetId="main-content" />
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
            </AuthProvider>
          </AccessibilityProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </GlobalErrorBoundary>
  );
}

export default App;


import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster as Sonner } from "sonner";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/auth";
import { AccessibilityProvider } from "@/components/accessibility/AccessibilityProvider";
import GlobalErrorBoundary from "@/components/error-handling/GlobalErrorBoundary";
import { RouterErrorBoundary } from "@/components/error/RouterErrorBoundary";
import { SkipLink } from "@/components/ui/skip-link";
import { UnifiedFeedbackProvider } from "@/components/feedback/UnifiedFeedbackSystem";
import { EnhancedThemeProvider } from "@/components/theme/EnhancedThemeSystem";
import AppRoutes from "./AppRoutes";
import "./App.css";
import "./styles/design-system.css";
import "./styles/mobile-optimizations.css";
import "./styles/enhanced-animations.css";

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
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <UnifiedFeedbackProvider>
            <BrowserRouter>
              <RouterErrorBoundary>
                <EnhancedThemeProvider>
                  <AccessibilityProvider>
                    <AuthProvider>
                      <SkipLink targetId="main-content" />
                      <Toaster />
                      <Sonner 
                        position="bottom-right"
                        expand={true}
                        richColors
                        closeButton
                        toastOptions={{
                          className: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg animate-fade-in",
                          duration: 4000,
                        }}
                      />
                      <AppRoutes />
                    </AuthProvider>
                  </AccessibilityProvider>
                </EnhancedThemeProvider>
              </RouterErrorBoundary>
            </BrowserRouter>
          </UnifiedFeedbackProvider>
        </TooltipProvider>
      </QueryClientProvider>
      </HelmetProvider>
    </GlobalErrorBoundary>
  );
}

export default App;

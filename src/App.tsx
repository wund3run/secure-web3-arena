
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
import { UnifiedFeedbackProvider } from "@/components/feedback/UnifiedFeedbackSystem";
import { EnhancedThemeProvider } from "@/components/theme/EnhancedThemeSystem";
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
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <EnhancedThemeProvider>
              <UnifiedFeedbackProvider>
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
              </UnifiedFeedbackProvider>
            </EnhancedThemeProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </GlobalErrorBoundary>
  );
}

export default App;

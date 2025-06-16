
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster as Sonner } from "sonner";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "@/contexts/auth";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { GlobalErrorHandler, useGlobalErrorHandler } from "@/components/error-handling/GlobalErrorHandler";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 2;
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

function AppContent() {
  useGlobalErrorHandler();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AccessibilityProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </AuthProvider>
        </AccessibilityProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function App() {
  return (
    <GlobalErrorHandler>
      <AppContent />
    </GlobalErrorHandler>
  );
}

export default App;

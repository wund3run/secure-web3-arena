
import React from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/contexts/auth";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * Component that wraps the application with necessary providers
 */
export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <AccessibilityProvider>
          <HelmetProvider>
            {children}
          </HelmetProvider>
        </AccessibilityProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};


import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ui/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/auth';
import { NotificationProvider } from './contexts/NotificationContext';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';
import { EnhancedErrorBoundary } from './components/error/enhanced-error-boundary';

import Index from './pages/Index';
import Auth from './pages/Auth';
import Marketplace from './pages/Marketplace';
import MyAudits from './pages/MyAudits';
import RequestAudit from './pages/RequestAudit';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ServiceProviderOnboarding from './pages/ServiceProviderOnboarding';
import AuditorOnboarding from './pages/AuditorOnboarding';
import SystemHealth from './pages/SystemHealth';
import ConnectionTest from './pages/ConnectionTest';
import NotFound from './pages/NotFound';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import SecurityPolicy from './pages/SecurityPolicy';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <EnhancedErrorBoundary>
            <Router>
              <AuthProvider>
                <NotificationProvider>
                  <div className="min-h-screen bg-background">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/marketplace" element={<Marketplace />} />
                      <Route path="/audits" element={<MyAudits />} />
                      <Route path="/request-audit" element={<RequestAudit />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/service-provider-onboarding" element={<ServiceProviderOnboarding />} />
                      <Route path="/auditor-onboarding" element={<AuditorOnboarding />} />
                      <Route path="/system-health" element={<SystemHealth />} />
                      <Route path="/connection-test" element={<ConnectionTest />} />
                      
                      {/* Legal and Policy Pages */}
                      <Route path="/terms" element={<TermsOfService />} />
                      <Route path="/privacy" element={<PrivacyPolicy />} />
                      <Route path="/security-policy" element={<SecurityPolicy />} />
                      
                      {/* Redirect old routes */}
                      <Route path="/terms-of-service" element={<Navigate to="/terms" replace />} />
                      <Route path="/privacy-policy" element={<Navigate to="/privacy" replace />} />
                      
                      {/* 404 fallback */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Toaster 
                      position="top-right"
                      expand={true}
                      richColors
                      closeButton
                    />
                  </div>
                </NotificationProvider>
              </AuthProvider>
            </Router>
          </EnhancedErrorBoundary>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

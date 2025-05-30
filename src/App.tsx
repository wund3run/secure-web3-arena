
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/auth/AuthContext';
import { StripeProvider } from '@/components/payment/StripeProvider';
import { ErrorBoundary } from '@/components/monitoring/ErrorBoundary';
import { SecurityHeaders } from '@/components/security/SecurityHeaders';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { Toaster } from '@/components/ui/sonner';
import Index from '@/pages/Index';
import AuthPage from '@/pages/AuthPage';
import AuthCallback from '@/pages/AuthCallback';
import { PrivacyPolicy } from '@/components/legal/PrivacyPolicy';
import { TermsOfService } from '@/components/legal/TermsOfService';

// Import other existing pages
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import AdminDashboard from '@/pages/AdminDashboard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <StripeProvider>
              <Router>
                <SecurityHeaders />
                <GoogleAnalytics />
                
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  
                  {/* Protected Routes */}
                  <Route 
                    path="/admin/*" 
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Add other protected routes here */}
                </Routes>
                
                <Toaster 
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                  }}
                />
              </Router>
            </StripeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;

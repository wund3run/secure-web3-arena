
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'sonner';

// Providers
import { QueryProvider } from '@/providers/QueryProvider';
import { AuthProvider } from '@/contexts/auth/AuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { StripeProvider } from '@/components/payment/StripeProvider';

// Components
import { ThemeProvider } from '@/components/ui/theme-provider';
import { AppErrorBoundary } from '@/components/error/AppErrorBoundary';
import { EnhancedProtectedRoute } from '@/components/auth/EnhancedProtectedRoute';

// Security Components
import { SecurityHeaders } from '@/components/security/SecurityHeaders';
import { SecurityAuditLogger } from '@/components/security/SecurityAuditLogger';

// Pages
import Index from '@/pages/Index';
import AuthPage from '@/pages/AuthPage';
import AuthCallback from '@/pages/AuthCallback';
import Dashboard from '@/pages/Dashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';

function App() {
  return (
    <AppErrorBoundary>
      <HelmetProvider>
        <SecurityHeaders />
        <QueryProvider>
          <ThemeProvider defaultTheme="light" storageKey="hawkly-ui-theme">
            <AuthProvider>
              <SecurityAuditLogger />
              <NotificationProvider>
                <StripeProvider>
                  <Router>
                    <div className="min-h-screen bg-background">
                      <Routes>
                        {/* Public routes */}
                        <Route path="/" element={<Index />} />
                        <Route path="/auth" element={<AuthPage />} />
                        <Route path="/auth/callback" element={<AuthCallback />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/terms" element={<TermsOfService />} />
                        
                        {/* Protected routes */}
                        <Route 
                          path="/dashboard" 
                          element={
                            <EnhancedProtectedRoute>
                              <Dashboard />
                            </EnhancedProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/admin/dashboard" 
                          element={
                            <EnhancedProtectedRoute requiredRole="admin">
                              <AdminDashboard />
                            </EnhancedProtectedRoute>
                          } 
                        />
                        
                        {/* Fallback route */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </div>
                    
                    {/* Global toast notifications */}
                    <Toaster 
                      position="top-right"
                      expand={true}
                      richColors
                      closeButton
                    />
                  </Router>
                </StripeProvider>
              </NotificationProvider>
            </AuthProvider>
          </ThemeProvider>
        </QueryProvider>
      </HelmetProvider>
    </AppErrorBoundary>
  );
}

export default App;

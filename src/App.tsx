import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import Index from '@/pages';
import Marketplace from '@/pages/Marketplace';
import Web3Security from '@/pages/Web3Security';
import Pricing from '@/pages/Pricing';
import Audits from '@/pages/Audits';
import Leaderboard from '@/pages/Leaderboard';
import Achievements from '@/pages/Achievements';
import ServiceDetail from '@/pages/ServiceDetail';
import Auth from '@/pages/Auth';
import AuthCallback from '@/pages/AuthCallback';
import RequestAudit from '@/pages/RequestAudit';
import Dashboard from '@/pages/Dashboard';
import AuditorDashboard from '@/pages/AuditorDashboard';
import ProjectDashboard from '@/pages/ProjectDashboard';
import Escrow from '@/pages/Escrow';
import AuditDetail from '@/pages/AuditDetail';
import AdminRoutes from '@/pages/admin/AdminRoutes';
import { AuthProvider } from '@/contexts/auth';
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import { EscrowProvider } from '@/contexts/EscrowContext';
import { QueryClient } from '@tanstack/react-query';
import { SessionManager } from '@/components/auth/SessionManager';
import Onboarding from '@/pages/Onboarding';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check local storage for theme preference on initial load
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
    } else if (storedTheme === 'light') {
      setIsDarkMode(false);
    } else {
      // If no preference is stored, you might want to check the system preference
      const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDarkMode);
    }
  }, []);

  // Function to toggle the theme
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <QueryClient>
      <BrowserRouter>
        <AuthProvider>
          <EscrowProvider>
            <AccessibilityProvider>
              <SessionManager>
                <div className="min-h-screen bg-background font-sans antialiased">
                  <Toaster />
                  <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Index />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/web3-security" element={<Web3Security />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/audits" element={<Audits />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/achievements" element={<Achievements />} />
                    <Route path="/service/:id" element={<ServiceDetail />} />
                    
                    {/* Auth routes */}
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/auth/callback" element={<AuthCallback />} />
                    <Route path="/onboarding" element={<Onboarding />} />
                    
                    {/* Protected routes */}
                    <Route path="/request-audit" element={
                      <PrivateRoute>
                        <RequestAudit />
                      </PrivateRoute>
                    } />
                    
                    <Route path="/dashboard" element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                    } />
                    
                    <Route path="/dashboard/auditor" element={
                      <PrivateRoute requiredUserType="auditor">
                        <AuditorDashboard />
                      </PrivateRoute>
                    } />
                    
                    <Route path="/dashboard/project" element={
                      <PrivateRoute requiredUserType="project_owner">
                        <ProjectDashboard />
                      </PrivateRoute>
                    } />
                    
                    <Route path="/escrow" element={
                      <PrivateRoute>
                        <Escrow />
                      </PrivateRoute>
                    } />
                    
                    <Route path="/audit/:id" element={
                      <PrivateRoute>
                        <AuditDetail />
                      </PrivateRoute>
                    } />
                    
                    {/* Admin routes */}
                    <Route path="/admin/*" element={
                      <PrivateRoute requiredUserType="admin">
                        <AdminRoutes />
                      </PrivateRoute>
                    } />
                  </Routes>
                </div>
              </SessionManager>
            </AccessibilityProvider>
          </EscrowProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClient>
  );
}

export default App;

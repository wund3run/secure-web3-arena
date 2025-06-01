
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/auth';
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import { EscrowProvider } from '@/contexts/EscrowContext';
import { SessionManager } from '@/components/auth/SessionManager';

// Import existing pages
import Auth from '@/pages/Auth';
import AuthCallback from '@/pages/AuthCallback';
import Onboarding from '@/pages/Onboarding';

// Create a basic placeholder component for missing pages
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-muted-foreground">This page is under development</p>
    </div>
  </div>
);

// Create QueryClient instance
const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        <BrowserRouter>
          <AuthProvider>
            <EscrowProvider>
              <AccessibilityProvider>
                <SessionManager>
                  <div className="min-h-screen bg-background font-sans antialiased">
                    <Toaster />
                    <Routes>
                      {/* Public routes */}
                      <Route path="/" element={<PlaceholderPage title="Welcome to Hawkly" />} />
                      <Route path="/marketplace" element={<PlaceholderPage title="Marketplace" />} />
                      <Route path="/web3-security" element={<PlaceholderPage title="Web3 Security" />} />
                      <Route path="/pricing" element={<PlaceholderPage title="Pricing" />} />
                      <Route path="/audits" element={<PlaceholderPage title="Audits" />} />
                      <Route path="/leaderboard" element={<PlaceholderPage title="Leaderboard" />} />
                      <Route path="/achievements" element={<PlaceholderPage title="Achievements" />} />
                      <Route path="/service/:id" element={<PlaceholderPage title="Service Detail" />} />
                      
                      {/* Auth routes */}
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/auth/callback" element={<AuthCallback />} />
                      <Route path="/onboarding" element={<Onboarding />} />
                      
                      {/* Protected routes */}
                      <Route path="/request-audit" element={
                        <PrivateRoute>
                          <PlaceholderPage title="Request Audit" />
                        </PrivateRoute>
                      } />
                      
                      <Route path="/dashboard" element={
                        <PrivateRoute>
                          <PlaceholderPage title="Dashboard" />
                        </PrivateRoute>
                      } />
                      
                      <Route path="/dashboard/auditor" element={
                        <PrivateRoute requiredUserType="auditor">
                          <PlaceholderPage title="Auditor Dashboard" />
                        </PrivateRoute>
                      } />
                      
                      <Route path="/dashboard/project" element={
                        <PrivateRoute requiredUserType="project_owner">
                          <PlaceholderPage title="Project Dashboard" />
                        </PrivateRoute>
                      } />
                      
                      <Route path="/escrow" element={
                        <PrivateRoute>
                          <PlaceholderPage title="Escrow" />
                        </PrivateRoute>
                      } />
                      
                      <Route path="/audit/:id" element={
                        <PrivateRoute>
                          <PlaceholderPage title="Audit Detail" />
                        </PrivateRoute>
                      } />
                      
                      {/* Admin routes */}
                      <Route path="/admin/*" element={
                        <PrivateRoute requiredUserType="admin">
                          <PlaceholderPage title="Admin Panel" />
                        </PrivateRoute>
                      } />
                    </Routes>
                  </div>
                </SessionManager>
              </AccessibilityProvider>
            </EscrowProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

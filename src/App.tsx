
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/auth/AuthContext';
import { ThemeProvider } from "@/components/ui/theme-provider"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster"
import { AppInitializer } from './components/app/AppInitializer';
import { GlobalComponents } from './components/app/GlobalComponents';
import MarketplacePage from './pages/MarketplacePage';
import Audits from './pages/Audits';
import AuditRequestForm from './components/audit-request/AuditRequestForm';
import { ServiceProviderOnboardingForm } from './components/service-provider/ServiceProviderOnboardingForm';
import Community from './pages/Community';
import ContactProvider from './pages/ContactProvider';
import RequestAuditPage from './pages/RequestAudit';
import AdminDashboard from './pages/AdminDashboard';
import AuditorDashboard from './pages/AuditorDashboard';
import UserDashboard from './pages/UserDashboard';
import ProjectDashboard from './pages/ProjectDashboard';
import { ActionGuard } from './components/auth/ActionGuard';
import Pricing from './pages/Pricing';
import { AuditDetailsPage } from './components/audits/AuditDetailsPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <div className="min-h-screen bg-background">
              <Toaster />
              <AppInitializer>
                <GlobalComponents />
                
                <Routes>
                  <Route path="/" element={<MarketplacePage />} />
                  <Route path="/marketplace" element={<MarketplacePage />} />
                  <Route path="/audits" element={<Audits />} />
                  
                  <Route path="/request-audit" element={
                    <ActionGuard action="create_audit_request">
                      <AuditRequestForm onSubmitSuccess={() => {}} />
                    </ActionGuard>
                  } />
                  
                  <Route path="/service-provider-onboarding" element={<ServiceProviderOnboardingForm providerType="auditor" />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/contact-provider/:id" element={<ContactProvider />} />
                  
                  <Route path="/admin" element={
                    <ActionGuard action="access_admin_panel">
                      <AdminDashboard />
                    </ActionGuard>
                  } />
                  
                  {/* Role-based dashboards */}
                  <Route path="/dashboard" element={<UserDashboard />} />
                  <Route path="/dashboard/auditor" element={<AuditorDashboard />} />
                  <Route path="/dashboard/project" element={<ProjectDashboard />} />
                  
                  {/* Public Pricing Page */}
                  <Route path="/pricing" element={<Pricing />} />
                  
                  {/* Add new audit details route */}
                  <Route path="/audit/:id" element={<AuditDetailsPage />} />
                </Routes>
              </AppInitializer>
            </div>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

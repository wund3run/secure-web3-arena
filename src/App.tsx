import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';
import { QueryClient } from 'react-query';
import GlobalComponents from './components/GlobalComponents';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Audits from './pages/Audits';
import RequestAudit from './pages/RequestAudit';
import ServiceProviderOnboarding from './pages/ServiceProviderOnboarding';
import Dashboard from './pages/Dashboard';
import Tutorials from './pages/Tutorials';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdvancedFeatures from './pages/AdvancedFeatures';

function App() {
  return (
    <BrowserRouter>
      <QueryClient>
        <AuthProvider>
          <GlobalComponents />
          <div className="min-h-screen bg-background font-sans antialiased">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/audits" element={<Audits />} />
              <Route path="/request-audit" element={<RequestAudit />} />
              <Route path="/service-provider-onboarding" element={<ServiceProviderOnboarding />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tutorials" element={<Tutorials />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              
              <Route path="/advanced-features" element={<AdvancedFeatures />} />
              
            </Routes>
          </div>
        </AuthProvider>
      </QueryClient>
    </BrowserRouter>
  );
}

export default App;

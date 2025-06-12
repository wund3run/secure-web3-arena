
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { AuthProvider } from '@/contexts/auth';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

// Pages
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';
import SecurityAudits from '@/pages/SecurityAudits';
import Marketplace from '@/pages/Marketplace';
import Community from '@/pages/Community';
import KnowledgeBase from '@/pages/KnowledgeBase';
import Forum from '@/pages/Forum';
import Tutorials from '@/pages/Tutorials';
import Search from '@/pages/Search';
import PlatformReports from '@/pages/tools/PlatformReports';
import SecurityInsights from '@/pages/tools/SecurityInsights';
import VulnerabilityScanner from '@/pages/tools/VulnerabilityScanner';
import BusinessPricing from '@/pages/business/BusinessPricing';
import KnowledgeBasePage from '@/pages/resources/KnowledgeBase';
import TutorialsPage from '@/pages/resources/Tutorials';

function App() {
  useEffect(() => {
    // Initialize any global services or listeners here
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="hawkly-theme">
      <AuthProvider>
        <Router>
          <Navbar />
          <main className="min-h-[calc(100vh-64px-80px)]">
            <Routes>
              {/* Existing routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/security-audits" element={<SecurityAudits />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/community" element={<Community />} />
              <Route path="/knowledge-base" element={<KnowledgeBase />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/tutorials" element={<Tutorials />} />
              
              {/* New search route */}
              <Route path="/search" element={<Search />} />

              {/* Tool routes */}
              <Route path="/tools/platform-reports" element={<PlatformReports />} />
              <Route path="/tools/security-insights" element={<SecurityInsights />} />
              <Route path="/tools/vulnerability-scanner" element={<VulnerabilityScanner />} />
              
              {/* Business routes */}
              <Route path="/business/pricing" element={<BusinessPricing />} />
              
              {/* Resource routes */}
              <Route path="/resources/knowledge-base" element={<KnowledgeBasePage />} />
              <Route path="/resources/tutorials" element={<TutorialsPage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="bottom-right" />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;


import { Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

// Import all pages
import Index from '@/pages/Index';
import Analytics from '@/pages/Analytics';
import Gamification from '@/pages/Gamification';
import Marketplace from '@/pages/Marketplace';
import Community from '@/pages/Community';
import Dashboard from '@/pages/Dashboard';
import Tutorials from '@/pages/Tutorials';

// Import tools pages
import SecurityInsights from '@/pages/tools/SecurityInsights';
import PlatformReports from '@/pages/tools/PlatformReports';
import VulnerabilityScanner from '@/pages/tools/VulnerabilityScanner';

// Import resource pages
import KnowledgeBase from '@/pages/resources/KnowledgeBase';
import TutorialsPage from '@/pages/resources/Tutorials';

// Import business pages
import BusinessPricing from '@/pages/business/BusinessPricing';

export const StabilizedRouter = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/gamification" element={<Gamification />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/community" element={<Community />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tutorials" element={<Tutorials />} />
          
          {/* Tools Routes */}
          <Route path="/tools/security-insights" element={<SecurityInsights />} />
          <Route path="/tools/platform-reports" element={<PlatformReports />} />
          <Route path="/tools/vulnerability-scanner" element={<VulnerabilityScanner />} />
          
          {/* Resource Routes */}
          <Route path="/resources/knowledge-base" element={<KnowledgeBase />} />
          <Route path="/resources/tutorials" element={<TutorialsPage />} />
          
          {/* Business Routes */}
          <Route path="/business/pricing" element={<BusinessPricing />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

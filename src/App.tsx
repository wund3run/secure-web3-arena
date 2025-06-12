
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/contexts/auth';

// Import all existing pages
import Home from '@/pages/Home';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import Marketplace from '@/pages/Marketplace';
import MarketplacePage from '@/pages/MarketplacePage';
import AuditRequests from '@/pages/AuditRequests';
import Messages from '@/pages/Messages';
import AdminDashboard from '@/pages/AdminDashboard';
import Billing from '@/pages/Billing';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';
import Escrow from '@/pages/Escrow';
import ServiceDetails from '@/pages/ServiceDetails';

// Import existing Phase 2 pages
import ServiceManagement from '@/pages/ServiceManagement';
import DeliveryTracking from '@/pages/DeliveryTracking';

// Import new Phase 3 pages
import KnowledgeBase from '@/pages/KnowledgeBase';
import KnowledgeBaseArticle from '@/pages/KnowledgeBaseArticle';
import Forum from '@/pages/Forum';
import ForumTopic from '@/pages/ForumTopic';
import ForumCategory from '@/pages/ForumCategory';
import Tutorials from '@/pages/Tutorials';
import TutorialDetail from '@/pages/TutorialDetail';
import AITools from '@/pages/AITools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/marketplace-old" element={<Marketplace />} />
                <Route path="/service/:id" element={<ServiceDetails />} />
                <Route path="/audit-requests" element={<AuditRequests />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/escrow" element={<Escrow />} />
                
                {/* Phase 2 routes */}
                <Route path="/service-management" element={<ServiceManagement />} />
                <Route path="/delivery-tracking/:auditId" element={<DeliveryTracking />} />
                <Route path="/delivery-tracking" element={<DeliveryTracking />} />
                
                {/* New Phase 3 routes */}
                <Route path="/knowledge-base" element={<KnowledgeBase />} />
                <Route path="/knowledge-base/:slug" element={<KnowledgeBaseArticle />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/forum/category/:categorySlug" element={<ForumCategory />} />
                <Route path="/forum/topic/:topicSlug" element={<ForumTopic />} />
                <Route path="/tutorials" element={<Tutorials />} />
                <Route path="/tutorials/:slug" element={<TutorialDetail />} />
                <Route path="/ai-tools" element={<AITools />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </div>
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;

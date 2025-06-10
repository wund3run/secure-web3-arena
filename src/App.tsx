
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/contexts/auth';
import { NotificationProvider } from '@/contexts/NotificationContext';
import { EnhancedSecurityProvider } from '@/components/security/EnhancedSecurityProvider';
import { Navigation } from '@/components/layout/Navigation';
import { EnhancedErrorBoundary } from '@/components/error/enhanced-error-boundary';

// Pages
import { IndexPageLayout } from '@/components/home/index-page-layout';
import { MarketplacePage } from '@/pages/MarketplacePage';
import { RealTimeDashboard } from '@/components/dashboard/enhanced/RealTimeDashboard';
import { EscrowManager } from '@/components/escrow/EscrowManager';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import Auth from '@/pages/Auth';

function App() {
  return (
    <EnhancedErrorBoundary>
      <AuthProvider>
        <NotificationProvider>
          <EnhancedSecurityProvider>
            <Router>
              <div className="min-h-screen bg-background">
                <Navigation />
                
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<IndexPageLayout />} />
                    <Route path="/marketplace" element={<MarketplacePage />} />
                    <Route path="/dashboard" element={<RealTimeDashboard />} />
                    <Route path="/escrow" element={<EscrowManager />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/auth" element={<Auth />} />
                  </Routes>
                </main>
                
                <Toaster position="bottom-right" />
              </div>
            </Router>
          </EnhancedSecurityProvider>
        </NotificationProvider>
      </AuthProvider>
    </EnhancedErrorBoundary>
  );
}

export default App;

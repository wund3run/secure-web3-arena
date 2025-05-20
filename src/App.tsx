
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { HelmetProvider } from 'react-helmet-async';
import { AccessibilityProvider } from '@/contexts/AccessibilityContext';
import { ErrorBoundary } from '@/components/error-boundary/ErrorBoundary';
import { Loader2 } from 'lucide-react';
import { AuthProvider } from '@/contexts/auth';

// Lazy load pages for better performance
const Home = React.lazy(() => import('@/pages/Home'));
const Auth = React.lazy(() => import('@/pages/Auth'));
const Dashboard = React.lazy(() => import('@/pages/Dashboard'));
const PlatformReport = React.lazy(() => import('@/pages/PlatformReport'));
const NotFound = React.lazy(() => import('@/pages/NotFound'));
const Docs = React.lazy(() => import('@/pages/Docs'));
const Templates = React.lazy(() => import('@/pages/Templates'));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <AccessibilityProvider>
          <AuthProvider>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/:type" element={<Dashboard />} />
                <Route path="/platform-report" element={<PlatformReport />} />
                <Route path="/docs" element={<Docs />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </Suspense>
            <Toaster position="top-center" richColors closeButton />
          </AuthProvider>
        </AccessibilityProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;

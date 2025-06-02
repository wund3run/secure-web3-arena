
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/auth";
import { NotificationProvider } from "@/contexts/NotificationContext";

// Lazy load pages
const Index = React.lazy(() => import("@/pages/Index"));
const Dashboard = React.lazy(() => import("@/pages/Dashboard"));
const Marketplace = React.lazy(() => import("@/pages/Marketplace"));
const Auth = React.lazy(() => import("@/pages/Auth"));
const RequestAudit = React.lazy(() => import("@/pages/RequestAudit"));
const Profile = React.lazy(() => import("@/pages/Profile"));
const AuditDetails = React.lazy(() => import("@/pages/AuditDetails"));
const Audits = React.lazy(() => import("@/pages/Audits"));
const Settings = React.lazy(() => import("@/pages/Settings"));

// Enhanced pages
const EnhancedRequestAudit = React.lazy(() => import("@/pages/EnhancedRequestAudit"));
const EnhancedMarketplace = React.lazy(() => import("@/pages/EnhancedMarketplace"));
const EnhancedAuth = React.lazy(() => import("@/pages/EnhancedAuth"));

// Footer pages
const About = React.lazy(() => import("@/pages/About"));
const Contact = React.lazy(() => import("@/pages/Contact"));
const Careers = React.lazy(() => import("@/pages/Careers"));
const Terms = React.lazy(() => import("@/pages/Terms"));
const Privacy = React.lazy(() => import("@/pages/Privacy"));

// Messaging page
const MessagingPage = React.lazy(() => import("@/pages/MessagingPage"));

// New launch readiness pages
const PricingINR = React.lazy(() => import("@/pages/PricingINR"));
const LaunchReadiness = React.lazy(() => import("@/pages/LaunchReadiness"));

// Profile completion
const ProfileCompletion = React.lazy(() => import("@/pages/ProfileCompletion"));

// New pages for better navigation
const Resources = React.lazy(() => import("@/pages/Resources"));
const FAQ = React.lazy(() => import("@/pages/FAQ"));
const Support = React.lazy(() => import("@/pages/Support"));

// Production Dashboard
const ProductionDashboard = React.lazy(() => import("@/pages/ProductionDashboard"));

// Escrow page
const Escrow = React.lazy(() => import("@/pages/Escrow"));

// Enhanced loading fallback
const AppLoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center space-y-4">
      <img 
        src="/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png" 
        alt="Hawkly"
        className="h-12 w-12"
        loading="eager"
      />
      <div className="w-8 h-8 border-2 border-border border-t-primary rounded-full animate-spin" />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
);

// Production-optimized query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error: any) => {
        if (error?.status === 404 || error?.status === 403) return false;
        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: 'always',
    },
    mutations: {
      retry: 1,
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="hawkly-ui-theme">
          <AuthProvider>
            <NotificationProvider>
              <Router>
                <div className="min-h-screen bg-background font-sans antialiased">
                  <Suspense fallback={<AppLoadingFallback />}>
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/marketplace" element={<Marketplace />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/request-audit" element={<RequestAudit />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/audit/:id" element={<AuditDetails />} />
                      <Route path="/audits" element={<Audits />} />
                      <Route path="/settings" element={<Settings />} />
                      
                      {/* Enhanced pages with better UX */}
                      <Route path="/enhanced-request-audit" element={<EnhancedRequestAudit />} />
                      <Route path="/enhanced-marketplace" element={<EnhancedMarketplace />} />
                      <Route path="/enhanced-auth" element={<EnhancedAuth />} />
                      
                      {/* Messaging */}
                      <Route path="/messages" element={<MessagingPage />} />
                      
                      {/* New launch readiness pages */}
                      <Route path="/pricing-inr" element={<PricingINR />} />
                      <Route path="/launch-readiness" element={<LaunchReadiness />} />
                      
                      {/* Profile completion */}
                      <Route path="/profile-completion" element={<ProfileCompletion />} />
                      
                      {/* New navigation support pages */}
                      <Route path="/resources" element={<Resources />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/support" element={<Support />} />
                      
                      {/* Production Dashboard */}
                      <Route path="/production-dashboard" element={<ProductionDashboard />} />
                      
                      {/* Escrow Management */}
                      <Route path="/escrow" element={<Escrow />} />
                      
                      {/* Footer pages */}
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/careers" element={<Careers />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/privacy" element={<Privacy />} />
                    </Routes>
                  </Suspense>
                  
                  <Toaster 
                    position="top-right"
                    toastOptions={{
                      duration: 4000,
                      style: {
                        background: 'hsl(var(--background))',
                        color: 'hsl(var(--foreground))',
                        border: '1px solid hsl(var(--border))',
                      },
                    }}
                  />
                </div>
              </Router>
            </NotificationProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;


import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/auth";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { StandardizedLayout } from "@/components/layout/StandardizedLayout";
import { AppInitializer } from "@/components/app/AppInitializer";
import { GlobalComponents } from "@/components/app/GlobalComponents";

// Import existing pages with default imports
import Marketplace from "@/pages/Marketplace";
import RequestAudit from "@/pages/RequestAudit";
import Auth from "@/pages/Auth";

// Lazy load the AuditDashboard and Index page
const AuditDashboard = lazy(() => import("@/pages/AuditDashboard"));
const IndexPage = lazy(() => import("@/pages/Index"));

// Simple placeholder component for missing pages
const PlaceholderPage = ({ title }: { title: string }) => (
  <StandardizedLayout title={title} description={`${title} page`}>
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-muted-foreground">This page is under development.</p>
    </div>
  </StandardizedLayout>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <ThemeProvider defaultTheme="system" storageKey="ui-theme">
            <BrowserRouter>
              <AuthProvider>
                <AppInitializer>
                  <GlobalComponents />
                  
                  <div className="min-h-screen bg-background">
                    <Helmet>
                      <title>Hawkly | Leading Web3 Security Marketplace</title>
                      <meta name="description" content="Connect with verified Web3 security experts for smart contract audits. Fast, secure, affordable blockchain security solutions." />
                    </Helmet>
                    
                    <Suspense fallback={
                      <div className="min-h-screen flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      </div>
                    }>
                      <Routes>
                        <Route path="/" element={<IndexPage />} />
                        <Route path="/marketplace" element={<Marketplace />} />
                        <Route path="/request-audit" element={<RequestAudit />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/audit-dashboard" element={<AuditDashboard />} />
                        
                        {/* Placeholder routes for missing pages */}
                        <Route path="/docs" element={<PlaceholderPage title="Documentation" />} />
                        <Route path="/security" element={<PlaceholderPage title="Security Practices" />} />
                        <Route path="/vulnerability-scanner" element={<PlaceholderPage title="Vulnerability Scanner" />} />
                        <Route path="/service-provider-onboarding" element={<PlaceholderPage title="Service Provider Onboarding" />} />
                        <Route path="/pricing" element={<PlaceholderPage title="Pricing" />} />
                        <Route path="/about" element={<PlaceholderPage title="About Us" />} />
                        <Route path="/contact" element={<PlaceholderPage title="Contact Us" />} />
                        <Route path="/careers" element={<PlaceholderPage title="Careers" />} />
                        <Route path="/terms" element={<PlaceholderPage title="Terms & Conditions" />} />
                        <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" />} />
                        <Route path="/profile" element={<PlaceholderPage title="User Profile" />} />
                        <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
                        <Route path="/audits" element={<PlaceholderPage title="Audits" />} />
                        <Route path="/community" element={<PlaceholderPage title="Community" />} />
                        <Route path="/resources" element={<PlaceholderPage title="Resources" />} />
                        <Route path="/vulnerabilities" element={<PlaceholderPage title="Vulnerabilities" />} />
                        <Route path="/ai-tools" element={<PlaceholderPage title="AI Tools" />} />
                        <Route path="/security-audits" element={<PlaceholderPage title="Security Audits" />} />
                        <Route path="/code-reviews" element={<PlaceholderPage title="Code Reviews" />} />
                        <Route path="/penetration-testing" element={<PlaceholderPage title="Penetration Testing" />} />
                        <Route path="/consulting" element={<PlaceholderPage title="Consulting" />} />
                        <Route path="/faq" element={<PlaceholderPage title="FAQ" />} />
                        <Route path="/support" element={<PlaceholderPage title="Support" />} />
                        <Route path="/dashboard" element={<PlaceholderPage title="Dashboard" />} />
                        
                        {/* 404 handling */}
                        <Route path="/404" element={<PlaceholderPage title="Page Not Found" />} />
                        <Route path="*" element={<Navigate to="/404" replace />} />
                      </Routes>
                    </Suspense>
                  </div>
                  
                  <Toaster position="top-right" />
                </AppInitializer>
              </AuthProvider>
            </BrowserRouter>
          </ThemeProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

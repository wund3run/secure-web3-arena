
import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/contexts/auth";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { EscrowProvider } from "@/contexts/EscrowContext";
import { GlobalErrorBoundary } from "@/components/error-handling/GlobalErrorBoundary";
import { NotFoundPage } from "@/components/error-handling/NotFoundPage";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Auth = lazy(() => import("./pages/Auth"));
const Marketplace = lazy(() => import("./pages/Marketplace"));
const RequestAudit = lazy(() => import("./pages/RequestAudit"));
const Profile = lazy(() => import("./pages/Profile"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const MessagingPage = lazy(() => import("./pages/MessagingPage"));
const Escrow = lazy(() => import("./pages/Escrow"));
const Collaboration = lazy(() => import("./pages/Collaboration"));
const Analytics = lazy(() => import("./pages/Analytics"));
const AdvancedFeaturesHub = lazy(() => import("./pages/AdvancedFeaturesHub"));

// Business pages
const AboutPage = lazy(() => import("./pages/business/AboutPage"));
const PricingPage = lazy(() => import("./pages/business/PricingPage"));
const CareersPage = lazy(() => import("./pages/business/CareersPage"));
const ContactPage = lazy(() => import("./pages/business/ContactPage"));

// Support pages
const SupportPage = lazy(() => import("./pages/support/SupportPage"));
const FAQPage = lazy(() => import("./pages/support/FAQPage"));
const TermsPage = lazy(() => import("./pages/support/TermsPage"));
const PrivacyPage = lazy(() => import("./pages/support/PrivacyPage"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <GlobalErrorBoundary>
          <BrowserRouter>
            <AuthProvider>
              <NotificationProvider>
                <EscrowProvider>
                  <div className="min-h-screen bg-background font-sans antialiased">
                    <Suspense fallback={<LoadingSpinner />}>
                      <Routes>
                        {/* Main routes */}
                        <Route path="/" element={<Index />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/marketplace" element={<Marketplace />} />
                        <Route path="/request-audit" element={<RequestAudit />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/onboarding" element={<Onboarding />} />
                        <Route path="/messages" element={<MessagingPage />} />
                        
                        {/* Advanced features */}
                        <Route path="/features" element={<AdvancedFeaturesHub />} />
                        <Route path="/escrow" element={<Escrow />} />
                        <Route path="/collaboration" element={<Collaboration />} />
                        <Route path="/analytics" element={<Analytics />} />

                        {/* Business routes */}
                        <Route path="/business/about" element={<AboutPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/business/pricing" element={<PricingPage />} />
                        <Route path="/pricing" element={<PricingPage />} />
                        <Route path="/business/careers" element={<CareersPage />} />
                        <Route path="/careers" element={<CareersPage />} />
                        <Route path="/business/contact" element={<ContactPage />} />
                        <Route path="/contact" element={<ContactPage />} />

                        {/* Support routes */}
                        <Route path="/support" element={<SupportPage />} />
                        <Route path="/support/faq" element={<FAQPage />} />
                        <Route path="/faq" element={<FAQPage />} />
                        <Route path="/support/terms" element={<TermsPage />} />
                        <Route path="/terms" element={<TermsPage />} />
                        <Route path="/support/privacy" element={<PrivacyPage />} />
                        <Route path="/privacy" element={<PrivacyPage />} />

                        {/* Legacy routes for compatibility */}
                        <Route path="/security-audits" element={<Marketplace />} />
                        <Route path="/resources/*" element={<SupportPage />} />
                        <Route path="/tools/*" element={<AdvancedFeaturesHub />} />

                        {/* 404 page */}
                        <Route path="*" element={<NotFoundPage />} />
                      </Routes>
                    </Suspense>
                    <Toaster />
                    <Sonner />
                  </div>
                </EscrowProvider>
              </NotificationProvider>
            </AuthProvider>
          </BrowserRouter>
        </GlobalErrorBoundary>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;

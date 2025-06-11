
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/contexts/auth/AuthContext";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { EscrowProvider } from "@/contexts/EscrowContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ComprehensiveErrorBoundary } from "@/components/error/comprehensive-error-boundary";

// Page imports
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import RequestAudit from "./pages/RequestAudit";
import Pricing from "./pages/Pricing";
import PricingINR from "./pages/PricingINR";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import ContactPage from "./pages/business/ContactPage";
import PricingCalculator from "./pages/PricingCalculator";

const queryClient = new QueryClient();

function App() {
  return (
    <ComprehensiveErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <NotificationProvider>
              <EscrowProvider>
                <AccessibilityProvider>
                  <ThemeProvider storageKey="vite-ui-theme">
                    <TooltipProvider>
                      <Toaster />
                      <Sonner />
                      <BrowserRouter>
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/auth" element={<Auth />} />
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/marketplace" element={<Marketplace />} />
                          <Route path="/request-audit" element={<RequestAudit />} />
                          <Route path="/pricing" element={<Pricing />} />
                          <Route path="/pricing-inr" element={<PricingINR />} />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/privacy" element={<Privacy />} />
                          <Route path="/terms" element={<Terms />} />
                          <Route path="*" element={<NotFound />} />

                          {/* Business Routes */}
                          <Route path="/business/contact" element={<ContactPage />} />

                          {/* Pricing Calculator */}
                          <Route path="/pricing-calculator" element={<PricingCalculator />} />
                        </Routes>
                      </BrowserRouter>
                    </TooltipProvider>
                  </ThemeProvider>
                </AccessibilityProvider>
              </EscrowProvider>
            </NotificationProvider>
          </AuthProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ComprehensiveErrorBoundary>
  );
}

export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/auth";
import { Navbar } from "@/components/layout/navbar";
import { EnhancedErrorBoundary } from "@/components/ui/enhanced-error-boundary";

// Page imports
import Index from "@/pages/Index";
import Marketplace from "@/pages/Marketplace";
import Services from "@/pages/Services";
import Dashboard from "@/pages/Dashboard";
import Admin from "@/pages/Admin";
import Auth from "@/pages/Auth";
import AuditGuidelines from "@/pages/AuditGuidelines";
import Resources from "@/pages/Resources";

// Admin page imports
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminServices from "@/pages/admin/AdminServices";

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
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <AuthProvider>
            <EnhancedErrorBoundary>
              <Router>
                <div className="min-h-screen bg-background font-sans antialiased">
                  <Navbar />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/marketplace" element={<Marketplace />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/admin" element={<Admin />} />
                      <Route path="/admin/users" element={<AdminUsers />} />
                      <Route path="/admin/services" element={<AdminServices />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/audit-guidelines" element={<AuditGuidelines />} />
                      <Route path="/resources" element={<Resources />} />
                    </Routes>
                  </main>
                  <Toaster />
                </div>
              </Router>
            </EnhancedErrorBoundary>
          </AuthProvider>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;

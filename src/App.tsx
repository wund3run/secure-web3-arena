
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/auth";
import { Navbar } from "./components/layout/navbar";
import { ProductionErrorBoundary } from "./components/error/production-error-boundary";

// Import pages
import Index from "./pages/Index";
import MarketplacePage from "./pages/MarketplacePage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import PlatformAnalysisPage from "./pages/PlatformAnalysisPage";

// Create placeholder pages for missing routes
import { PlaceholderPage } from "./components/layout/placeholder-page";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <ProductionErrorBoundary>
              <div className="min-h-screen bg-background">
                <Navbar />
                <main>
                  <Routes>
                    {/* Core Pages */}
                    <Route path="/" element={<Index />} />
                    <Route path="/marketplace" element={<MarketplacePage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/platform-report" element={<PlatformAnalysisPage />} />
                    
                    {/* Service Pages */}
                    <Route path="/service/:id" element={<PlaceholderPage title="Service Details" description="Detailed view of audit service" />} />
                    <Route path="/request-audit" element={<PlaceholderPage title="Request Audit" description="Submit your project for security audit" />} />
                    <Route path="/request-audit/:serviceId" element={<PlaceholderPage title="Request Audit" description="Request audit from specific provider" />} />
                    <Route path="/contact-provider/:id" element={<PlaceholderPage title="Contact Provider" description="Get in touch with audit provider" />} />
                    <Route path="/submit-service" element={<PlaceholderPage title="Submit Service" description="List your audit services on the marketplace" />} />
                    
                    {/* User & Admin */}
                    <Route path="/auth/callback" element={<PlaceholderPage title="Authentication" description="Processing authentication..." />} />
                    <Route path="/auth/2fa" element={<PlaceholderPage title="Two-Factor Authentication" description="Verify your identity" />} />
                    <Route path="/admin" element={<PlaceholderPage title="Admin Dashboard" description="Platform administration" />} />
                    <Route path="/admin/login" element={<PlaceholderPage title="Admin Login" description="Administrator access" />} />
                    <Route path="/admin/dashboard" element={<PlaceholderPage title="Admin Dashboard" description="Administrative controls" />} />
                    
                    {/* Audit Management */}
                    <Route path="/audit/:id" element={<PlaceholderPage title="Audit Details" description="View audit progress and results" />} />
                    <Route path="/audits" element={<PlaceholderPage title="All Audits" description="Browse completed audits" />} />
                    <Route path="/escrow" element={<PlaceholderPage title="Escrow" description="Secure payment management" />} />
                    
                    {/* Information Pages */}
                    <Route path="/pricing" element={<PlaceholderPage title="Pricing" description="Transparent pricing for security audits" />} />
                    <Route path="/contact" element={<PlaceholderPage title="Contact" description="Get in touch with our team" />} />
                    <Route path="/stats" element={<PlaceholderPage title="Statistics" description="Platform metrics and insights" />} />
                    <Route path="/support" element={<PlaceholderPage title="Support" description="Help and customer support" />} />
                    
                    {/* Resources & Learning */}
                    <Route path="/resources" element={<PlaceholderPage title="Resources" description="Educational content and tools" />} />
                    <Route path="/ai-tools" element={<PlaceholderPage title="AI Tools" description="AI-powered security analysis tools" />} />
                    <Route path="/web3-security" element={<PlaceholderPage title="Web3 Security" description="Learn about blockchain security" />} />
                    <Route path="/docs" element={<PlaceholderPage title="Documentation" description="Platform documentation and guides" />} />
                    <Route path="/blog" element={<PlaceholderPage title="Blog" description="Latest insights and updates" />} />
                    <Route path="/guides" element={<PlaceholderPage title="Guides" description="Step-by-step security guides" />} />
                    <Route path="/tutorials" element={<PlaceholderPage title="Tutorials" description="Learn security best practices" />} />
                    <Route path="/faq" element={<PlaceholderPage title="FAQ" description="Frequently asked questions" />} />
                    <Route path="/knowledge-base" element={<PlaceholderPage title="Knowledge Base" description="Comprehensive security knowledge" />} />
                    <Route path="/templates" element={<PlaceholderPage title="Templates" description="Security audit templates" />} />
                    
                    {/* Community */}
                    <Route path="/leaderboard" element={<PlaceholderPage title="Leaderboard" description="Top auditors and contributors" />} />
                    <Route path="/achievements" element={<PlaceholderPage title="Achievements" description="Your security milestones" />} />
                    <Route path="/community" element={<PlaceholderPage title="Community" description="Connect with security professionals" />} />
                    <Route path="/forum" element={<PlaceholderPage title="Forum" description="Community discussions" />} />
                    <Route path="/events" element={<PlaceholderPage title="Events" description="Security events and conferences" />} />
                    <Route path="/challenges" element={<PlaceholderPage title="Challenges" description="Security challenges and CTFs" />} />
                    
                    {/* Security Insights */}
                    <Route path="/security-insights" element={<PlaceholderPage title="Security Insights" description="Latest security trends and analysis" />} />
                    <Route path="/vulnerabilities" element={<PlaceholderPage title="Vulnerabilities" description="Known vulnerabilities database" />} />
                    <Route path="/roadmap" element={<PlaceholderPage title="Roadmap" description="Platform development roadmap" />} />
                    
                    {/* Legal & Compliance */}
                    <Route path="/terms" element={<PlaceholderPage title="Terms of Service" description="Platform terms and conditions" />} />
                    <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" description="How we protect your privacy" />} />
                    <Route path="/security-policy" element={<PlaceholderPage title="Security Policy" description="Our security practices" />} />
                    
                    {/* Onboarding */}
                    <Route path="/application-submitted" element={<PlaceholderPage title="Application Submitted" description="Your application has been received" />} />
                    <Route path="/audit-guidelines" element={<PlaceholderPage title="Audit Guidelines" description="Standards and best practices" />} />
                    <Route path="/service-provider-onboarding" element={<PlaceholderPage title="Provider Onboarding" description="Join as a security auditor" />} />
                  </Routes>
                </main>
              </div>
            </ProductionErrorBoundary>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

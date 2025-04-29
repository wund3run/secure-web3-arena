
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Marketplace from "./pages/Marketplace";
import Leaderboard from "./pages/Leaderboard";
import Audits from "./pages/Audits";
import Community from "./pages/Community";
import Stats from "./pages/Stats";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Marketplace routes with fallbacks for development */}
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/auditors" element={<NotFound />} />
          <Route path="/listings" element={<NotFound />} />
          <Route path="/requests" element={<NotFound />} />
          
          {/* Community routes with fallbacks */}
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/community" element={<Community />} />
          <Route path="/achievements" element={<NotFound />} />
          <Route path="/events" element={<NotFound />} />
          <Route path="/forum" element={<NotFound />} />
          
          {/* Content routes */}
          <Route path="/audits" element={<Audits />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/docs" element={<NotFound />} />
          <Route path="/blog" element={<NotFound />} />
          <Route path="/vulnerabilities" element={<NotFound />} />
          <Route path="/faqs" element={<NotFound />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/services" element={<AdminDashboard section="services" />} />
          <Route path="/admin/users" element={<AdminDashboard section="users" />} />
          <Route path="/admin/audits" element={<AdminDashboard section="audits" />} />
          <Route path="/admin/reports" element={<AdminDashboard section="reports" />} />
          <Route path="/admin/settings" element={<AdminDashboard section="settings" />} />
          
          {/* Legal routes */}
          <Route path="/terms" element={<NotFound />} />
          <Route path="/privacy" element={<NotFound />} />
          <Route path="/contact" element={<NotFound />} />
          <Route path="/security-policy" element={<NotFound />} /> 
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

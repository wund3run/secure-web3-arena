import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Marketplace routes */}
          <Route path="/marketplace" element={<NotFound />} />
          <Route path="/auditors" element={<NotFound />} />
          <Route path="/listings" element={<NotFound />} />
          <Route path="/requests" element={<NotFound />} />
          
          {/* Community routes */}
          <Route path="/leaderboard" element={<NotFound />} />
          <Route path="/achievements" element={<NotFound />} />
          <Route path="/events" element={<NotFound />} />
          <Route path="/forum" element={<NotFound />} />
          
          {/* Content routes */}
          <Route path="/audits" element={<NotFound />} />
          <Route path="/community" element={<NotFound />} />
          <Route path="/docs" element={<NotFound />} />
          <Route path="/blog" element={<NotFound />} />
          <Route path="/vulnerabilities" element={<NotFound />} />
          <Route path="/faqs" element={<NotFound />} />
          <Route path="/stats" element={<NotFound />} />
          
          {/* Legal routes */}
          <Route path="/terms" element={<NotFound />} />
          <Route path="/privacy" element={<NotFound />} />
          <Route path="/contact" element={<NotFound />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/auth";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import Index from "./pages/Index";
import { AnalyticsService } from "./services/analyticsService";
import { MonitoringService } from "./services/monitoringService";
import { CDNManager } from "./utils/cdn-manager";
import { Environment } from "./utils/environment";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    // Initialize production services
    if (Environment.analyticsEnabled) {
      AnalyticsService.init();
    }
    
    if (Environment.monitoringEnabled) {
      MonitoringService.init();
    }
    
    // Setup CDN optimizations
    CDNManager.setupDNSPrefetch();
    CDNManager.preloadCriticalAssets();
    
    // Track initial page view
    AnalyticsService.trackPageView('app_init');
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <AuthProvider>
              <NotificationProvider>
                <Toaster />
                <BrowserRouter>
                  <Routes>
                    <Route path="/*" element={<Index />} />
                  </Routes>
                </BrowserRouter>
              </NotificationProvider>
            </AuthProvider>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;

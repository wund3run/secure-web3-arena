import React, { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
  Route,
  BrowserRouter,
  Routes,
  Link
} from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from "@/components/theme-provider"
import { siteConfig } from './config/site';
import { Shell } from './components/layout/shell';
import { Home } from './pages/Home';
import AuditorOnboarding from './pages/AuditorOnboarding';
import ServiceProviderOnboarding from './pages/ServiceProviderOnboarding';
import ApplicationSubmitted from './pages/ApplicationSubmitted';
import Marketplace from './pages/Marketplace';
import Leaderboard from './pages/Leaderboard';
import Audits from './pages/Audits';
import Community from './pages/Community';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';
import { ScrollToTop } from './components/utils/scroll-to-top';
import { EnhancedOnboarding } from './components/onboarding/enhanced-onboarding';
import { Button } from './components/ui/button';
import { useMediaQuery } from './hooks/use-mobile';
import { useLocalStorage } from './hooks/use-local-storage';

function App() {
  const [isMounted, setIsMounted] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useLocalStorage("hawkly_onboarding_completed", false);
  const [open, setOpen] = useState(!onboardingCompleted);
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Re-evaluate onboarding status when the component mounts
    const completed = localStorage.getItem("hawkly_onboarding_completed");
    setOpen(completed !== "true");
  }, [setOnboardingCompleted]);

  return (
    <HelmetProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Shell><Home /></Shell>} />
            <Route path="/marketplace" element={<Shell><Marketplace /></Shell>} />
            <Route path="/leaderboard" element={<Shell><Leaderboard /></Shell>} />
            <Route path="/audits" element={<Shell><Audits /></Shell>} />
            <Route path="/community" element={<Shell><Community /></Shell>} />
            <Route path="/contact" element={<Shell><Contact /></Shell>} />
            <Route path="/terms" element={<Shell><Terms /></Shell>} />
            <Route path="/privacy" element={<Shell><Privacy /></Shell>} />
            
            <Route path="/auditor-onboarding" element={<Shell><AuditorOnboarding /></Shell>} />
            
            
            <Route
              path="/service-provider-onboarding"
              element={<Shell><ServiceProviderOnboarding /></Shell>}
            />
            <Route
              path="/join"
              element={<Shell><ServiceProviderOnboarding /></Shell>}
            />
            <Route
              path="/application-submitted"
              element={<Shell><ApplicationSubmitted /></Shell>}
            />
            
            <Route path="*" element={<Shell><NotFound /></Shell>} />
          </Routes>
        </BrowserRouter>

        {isMounted && (
          <EnhancedOnboarding
            open={open}
            onOpenChange={setOpen}
          />
        )}
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;

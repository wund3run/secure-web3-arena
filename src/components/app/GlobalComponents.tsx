
import React, { useEffect } from "react";
import { Toaster } from "sonner";
import { BetaBanner } from "@/components/ui/beta-banner";
import { SupportButtonEnhanced } from "@/components/ui/support-button-enhanced";
import { SkipLink } from "@/components/ui/skip-link";
import { Helmet } from "react-helmet-async";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { PerformanceMonitor } from "@/components/ui/performance-monitor";

/**
 * Global UI components that appear on all pages
 */
export const GlobalComponents: React.FC = () => {
  // Performance monitoring
  useEffect(() => {
    // Report web vitals
    const reportWebVitals = async () => {
      const { getCLS, getFID, getLCP, getFCP, getTTFB } = await import('web-vitals');
      
      const reportMetric = ({ name, value }: { name: string, value: number }) => {
        // In production, send to analytics
        console.log(`Web Vital: ${name}`, value);
      };
      
      getCLS(reportMetric);
      getFID(reportMetric);
      getLCP(reportMetric);
      getFCP(reportMetric);
      getTTFB(reportMetric);
    };
    
    reportWebVitals();
  }, []);

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Hawkly - Web3 Security Audit Marketplace</title>
        <meta name="description" content="Premier Web3 security platform - Connect with top security auditors, protect your blockchain projects, and enhance security with AI-assisted tools." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#1a1a1a" />
        {/* Security headers */}
        <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://*.supabase.co" />
        <meta http-equiv="X-Content-Type-Options" content="nosniff" />
        <meta http-equiv="X-Frame-Options" content="DENY" />
      </Helmet>
      
      {/* Skip link for keyboard navigation */}
      <SkipLink targetId="main-content" />
      
      {/* Add Beta Banner at the top of the application */}
      <BetaBanner dismissible={true} />
      
      {/* Global Toast Notifications */}
      <Toaster 
        position="top-right" 
        expand={true}
        richColors 
        closeButton
        toastOptions={{
          duration: 5000,
          className: "rounded-md border border-border bg-background text-foreground accessible-toast"
        }}
      />
      
      {/* Cookie Consent Banner */}
      <CookieConsent />
      
      {/* Persistent Support Button with Accessibility Options */}
      <SupportButtonEnhanced />
      
      {/* Performance monitoring in development mode */}
      {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
    </>
  );
};


import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { BetaBanner } from "@/components/ui/beta-banner";
import { SupportButtonEnhanced } from "@/components/ui/support-button-enhanced";
import { Helmet } from "react-helmet-async";
import { toast } from "@/hooks/use-toast";

/**
 * Global UI components that appear on all pages
 */
export const GlobalComponents: React.FC = () => {
  // Report any initialization errors
  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Global error caught:', event.error);
      toast.error("Something went wrong", {
        description: "We've logged this error and will fix it soon."
      });
    };

    // Detect network status changes
    const handleOnline = () => {
      toast.success("You're back online", {
        description: "Your connection has been restored."
      });
    };

    const handleOffline = () => {
      toast.warning("You're offline", {
        description: "Please check your internet connection."
      });
    };

    window.addEventListener('error', handleError);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Hawkly - Web3 Security Audit Marketplace</title>
        <meta name="description" content="Connect with top Web3 security auditors, view their reputation, and request personalized audits for your projects." />
        
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Accessibility improvements */}
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
      
      {/* Support Button with Enhanced Accessibility */}
      <SupportButtonEnhanced />
      
      {/* Add Beta Banner at the top of the application */}
      <BetaBanner dismissible={true} />
      
      {/* Global Toast Notifications (using the consistent implementation) */}
      <Toaster />
    </>
  );
}

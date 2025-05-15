
import React from "react";
import { Toaster } from "sonner";
import { BetaBanner } from "@/components/ui/beta-banner";
import { SupportButtonEnhanced } from "@/components/ui/support-button-enhanced";
import { SkipLink } from "@/components/ui/skip-link";
import { Helmet } from "react-helmet-async";

/**
 * Global UI components that appear on all pages
 */
export const GlobalComponents: React.FC = () => {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Hawkly - Web3 Security Audit Marketplace</title>
        <meta name="description" content="Connect with top Web3 security auditors, view their reputation, and request personalized audits for your projects." />
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
      
      {/* Persistent Support Button with Accessibility Options */}
      <SupportButtonEnhanced />
    </>
  );
};

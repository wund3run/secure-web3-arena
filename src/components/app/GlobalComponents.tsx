
import React, { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { SupportButton } from "@/components/ui/support-button";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { BetaBanner } from "@/components/ui/beta-banner";
import { AccessibilityMenu } from "@/components/ui/accessibility-menu";
import { KeyboardShortcuts } from "@/components/ui/keyboard-shortcuts";
import { PerformanceMonitor } from "@/components/ui/performance-monitor";

export function GlobalComponents() {
  // Add state for accessibility menu
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  
  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <SupportButton />
      <CookieConsent />
      <BetaBanner />
      <AccessibilityMenu 
        open={accessibilityOpen} 
        onOpenChange={setAccessibilityOpen} 
      />
      <KeyboardShortcuts />
      <PerformanceMonitor />
    </>
  );
}


import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { BetaBanner } from "@/components/ui/beta-banner";
import { AccessibilityMenu } from "@/components/ui/accessibility-menu";
import { KeyboardShortcuts } from "@/components/ui/keyboard-shortcuts";
import { PerformanceMonitor } from "@/components/performance/PerformanceMonitor";
import { RouteValidator } from "@/components/dev/RouteValidator";
import { useLocation } from "react-router-dom";
import { FileCheck } from "lucide-react";
import { toast } from "sonner";
import { FirstTimeUserExperience } from "@/components/onboarding/FirstTimeUserExperience";
import { FeedbackCollector } from "@/components/ui/feedback-collector";

interface GlobalComponentsProps {
  removeDevTools?: boolean;
}

export function GlobalComponents({ removeDevTools = false }: GlobalComponentsProps) {
  // Add state for accessibility menu
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [showDevTools, setShowDevTools] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const location = useLocation();
  
  // Check if first-time user
  useEffect(() => {
    const onboardingCompleted = localStorage.getItem('hawkly-onboarding-completed') === 'true';
    const onboardingSkipped = localStorage.getItem('hawkly-onboarding-skipped') === 'true';
    
    // Only show onboarding on homepage for first-time visitors
    if (!onboardingCompleted && !onboardingSkipped && location.pathname === '/') {
      // Slight delay to ensure page is loaded first
      const timer = setTimeout(() => {
        setShowOnboarding(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);
  
  // Detect keyboard shortcut for route validator
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + V to toggle route validator
      if (e.altKey && e.key === 'v') {
        setShowDevTools(prev => !prev);
        toast.info(
          showDevTools ? "Developer tools hidden" : "Developer tools visible",
          { duration: 2000 }
        );
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showDevTools]);
  
  // Page change hook for route validation
  useEffect(() => {
    // Log page navigation for analytics purposes
    console.log(`Page navigated to: ${location.pathname}`);
    
    // Simple route validation
    if (!showDevTools) return;
    
  }, [location.pathname, showDevTools]);
  
  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <CookieConsent />
      <BetaBanner />
      <AccessibilityMenu 
        open={accessibilityOpen} 
        onOpenChange={setAccessibilityOpen} 
      />
      <KeyboardShortcuts />
      <PerformanceMonitor />
      <FeedbackCollector />
      
      {/* First-time user experience */}
      {showOnboarding && (
        <FirstTimeUserExperience onClose={() => setShowOnboarding(false)} />
      )}
      
      {/* Developer Tools Float Button - Only show if removeDevTools is false */}
      {!removeDevTools && !showDevTools && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setShowDevTools(true)}
            className="p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors"
            title="Show developer tools (Alt+V)"
          >
            <FileCheck className="h-4 w-4" />
            <span className="sr-only">Show developer tools</span>
          </button>
        </div>
      )}
      
      {!removeDevTools && showDevTools && (
        <div className="fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] sm:w-[450px] bg-background shadow-lg rounded-lg border">
          <div className="p-3 flex justify-between items-center border-b">
            <h3 className="text-sm font-medium">Platform Development Tools</h3>
            <button 
              onClick={() => setShowDevTools(false)}
              className="text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">Close</span>
              ×
            </button>
          </div>
          <div className="p-4 max-h-[400px] overflow-auto">
            <RouteValidator />
          </div>
        </div>
      )}
    </>
  );
}

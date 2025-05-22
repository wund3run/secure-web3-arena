
import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { SupportButton } from "@/components/ui/support-button";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { BetaBanner } from "@/components/ui/beta-banner";
import { AccessibilityMenu } from "@/components/ui/accessibility-menu";
import { KeyboardShortcuts } from "@/components/ui/keyboard-shortcuts";
import { PerformanceMonitor } from "@/components/performance";
import { RouteValidator } from "@/components/dev/RouteValidator";
import { useLocation } from "react-router-dom";
import { FileCheck } from "lucide-react";
import { toast } from "sonner";

export function GlobalComponents() {
  // Add state for accessibility menu
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [showDevTools, setShowDevTools] = useState(false);
  const location = useLocation();
  
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
      <SupportButton />
      <CookieConsent />
      <BetaBanner />
      <AccessibilityMenu 
        open={accessibilityOpen} 
        onOpenChange={setAccessibilityOpen} 
      />
      <KeyboardShortcuts />
      <PerformanceMonitor />
      
      {/* Developer Tools Float Button */}
      {!showDevTools && (
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
      
      {showDevTools && (
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

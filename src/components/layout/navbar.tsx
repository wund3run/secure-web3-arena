
import React, { useState } from "react";
import { SimplifiedNavbar } from "./simplified-navbar";
import { SkipToContent } from "./SkipToContent";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { AccessibilityMenu } from "@/components/ui/accessibility-menu";
import { useAccessibility } from "@/contexts/AccessibilityContext";

export function Navbar() {
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false);
  const { keyboardMode } = useAccessibility();
  
  // Set up keyboard shortcut for accessibility menu
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+A to open accessibility menu
      if (e.altKey && e.key === 'a') {
        e.preventDefault();
        setShowAccessibilityMenu(prev => !prev);
      }
      
      // Alt+S to activate skip to content
      if (e.altKey && e.key === 's') {
        e.preventDefault();
        const skipLink = document.querySelector('a[href="#main-content"]') as HTMLAnchorElement;
        if (skipLink) skipLink.click();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return (
    <>
      <SkipToContent targetId="main-content" />
      <SimplifiedNavbar />
      
      {/* Accessibility settings button */}
      <Button 
        variant="outline"
        size="icon"
        className={`fixed bottom-4 right-4 z-40 rounded-full ${keyboardMode ? 'focus-visible:ring-2' : ''}`}
        onClick={() => setShowAccessibilityMenu(true)}
        aria-label="Accessibility settings"
      >
        <Settings className="h-5 w-5" />
      </Button>
      
      <AccessibilityMenu 
        open={showAccessibilityMenu} 
        onOpenChange={setShowAccessibilityMenu} 
      />
    </>
  );
}

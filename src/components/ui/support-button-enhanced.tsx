
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  HelpCircle, 
  MessageSquare, 
  FileQuestion,
  Accessibility,
  ExternalLink
} from "lucide-react";
import { AccessibilityMenu } from "./accessibility-menu";
import { cn } from "@/lib/utils";
import { SkipLink } from "./skip-link";

// Enhanced support button with accessibility features
export function SupportButtonEnhanced() {
  const [supportOpen, setSupportOpen] = useState(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);

  // Add keyboard shortcut for accessibility menu (Alt+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + A for accessibility menu
      if (e.altKey && e.key === 'a') {
        e.preventDefault();
        setAccessibilityOpen(true);
      }
      
      // Alt + S for skip to content
      if (e.altKey && e.key === 's') {
        e.preventDefault();
        const mainContent = document.querySelector('main');
        if (mainContent) {
          const focusableElement = mainContent.querySelector('h1, h2, button, a, input') as HTMLElement;
          if (focusableElement) {
            focusableElement.focus();
          } else {
            mainContent.setAttribute('tabindex', '-1');
            mainContent.focus();
          }
        }
      }

      // Alt + H for help menu
      if (e.altKey && e.key === 'h') {
        e.preventDefault();
        setSupportOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Skip to content links */}
      <div className="skip-links">
        <SkipLink targetId="main-content" />
        <SkipLink 
          targetId="navigation" 
          label="Skip to navigation" 
          className="left-4 top-16" 
        />
      </div>
      
      <Popover open={supportOpen} onOpenChange={setSupportOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg transition-all hover:shadow-md",
              supportOpen ? "bg-primary text-primary-foreground" : "bg-card"
            )}
            aria-label="Support and accessibility options (press Alt+H)"
          >
            <HelpCircle className="h-6 w-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-64 p-2"
          align="end"
          side="top"
          sideOffset={20}
        >
          <div className="grid gap-1">
            <Button
              variant="ghost"
              className="flex w-full items-center justify-start gap-2 text-sm"
              aria-label="Contact support"
            >
              <MessageSquare className="h-4 w-4" />
              Contact Support
            </Button>
            <Button
              variant="ghost"
              className="flex w-full items-center justify-start gap-2 text-sm"
              aria-label="View documentation"
              asChild
            >
              <a href="/documentation" target="_blank" rel="noopener noreferrer">
                <FileQuestion className="h-4 w-4" />
                Documentation
                <ExternalLink className="ml-auto h-3 w-3 opacity-70" />
              </a>
            </Button>
            <Button
              variant="ghost"
              className="flex w-full items-center justify-start gap-2 text-sm"
              onClick={() => {
                setSupportOpen(false);
                setAccessibilityOpen(true);
              }}
              aria-label="Accessibility settings (press Alt+A)"
            >
              <Accessibility className="h-4 w-4" />
              Accessibility
              <kbd className="ml-auto text-xs bg-muted px-1.5 rounded">Alt+A</kbd>
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      
      <AccessibilityMenu
        open={accessibilityOpen}
        onOpenChange={setAccessibilityOpen}
      />
    </>
  );
}

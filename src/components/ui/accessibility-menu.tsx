
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAccessibility } from "@/contexts/AccessibilityContext";

interface AccessibilityMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AccessibilityMenu({ open, onOpenChange }: AccessibilityMenuProps) {
  const {
    highContrast,
    largeText,
    reducedMotion,
    screenReaderFriendly,
    toggleHighContrast,
    toggleLargeText,
    toggleReducedMotion,
    toggleScreenReaderFriendly
  } = useAccessibility();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Accessibility Settings</DialogTitle>
          <DialogDescription>
            Customize your experience to meet your accessibility needs.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="high-contrast">High Contrast</Label>
              <p className="text-sm text-muted-foreground">
                Increases contrast for better readability
              </p>
            </div>
            <Switch
              id="high-contrast"
              checked={highContrast}
              onCheckedChange={toggleHighContrast}
              aria-label="Toggle high contrast mode"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="large-text">Larger Text</Label>
              <p className="text-sm text-muted-foreground">
                Increases text size across the application
              </p>
            </div>
            <Switch
              id="large-text"
              checked={largeText}
              onCheckedChange={toggleLargeText}
              aria-label="Toggle larger text"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="reduced-motion">Reduced Motion</Label>
              <p className="text-sm text-muted-foreground">
                Minimizes animations and transitions
              </p>
            </div>
            <Switch
              id="reduced-motion"
              checked={reducedMotion}
              onCheckedChange={toggleReducedMotion}
              aria-label="Toggle reduced motion"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="screen-reader">Screen Reader Optimized</Label>
              <p className="text-sm text-muted-foreground">
                Enhances compatibility with screen readers
              </p>
            </div>
            <Switch
              id="screen-reader"
              checked={screenReaderFriendly}
              onCheckedChange={toggleScreenReaderFriendly}
              aria-label="Toggle screen reader optimizations"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

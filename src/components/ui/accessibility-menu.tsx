
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Keyboard, Monitor, Volume2, MousePointer } from "lucide-react";

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
    focusVisible,
    toggleHighContrast,
    toggleLargeText,
    toggleReducedMotion,
    toggleScreenReaderFriendly,
    toggleFocusVisible
  } = useAccessibility();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" aria-labelledby="accessibility-dialog-title">
        <DialogHeader>
          <DialogTitle id="accessibility-dialog-title">Accessibility Settings</DialogTitle>
          <DialogDescription>
            Customize your experience to meet your accessibility needs.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="visual" className="w-full mt-2">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="visual" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              <span>Visual</span>
            </TabsTrigger>
            <TabsTrigger value="motion" className="flex items-center gap-2">
              <MousePointer className="h-4 w-4" />
              <span>Motion</span>
            </TabsTrigger>
            <TabsTrigger value="input" className="flex items-center gap-2">
              <Keyboard className="h-4 w-4" />
              <span>Input</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="visual" className="space-y-6 py-4">
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
          </TabsContent>
          
          <TabsContent value="motion" className="space-y-6 py-4">
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
          </TabsContent>
          
          <TabsContent value="input" className="space-y-6 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="focus-visible">Enhanced Focus Indicators</Label>
                <p className="text-sm text-muted-foreground">
                  Makes it easier to see which element is focused
                </p>
              </div>
              <Switch
                id="focus-visible"
                checked={focusVisible}
                onCheckedChange={toggleFocusVisible}
                aria-label="Toggle enhanced focus indicators"
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
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 border-t pt-4">
          <h3 className="text-sm font-medium mb-2">Keyboard Shortcuts</h3>
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Open accessibility menu:</span>
              <kbd className="px-2 py-1 bg-muted rounded text-xs">Alt + A</kbd>
            </div>
            <div className="flex justify-between">
              <span>Skip to main content:</span>
              <kbd className="px-2 py-1 bg-muted rounded text-xs">Alt + S</kbd>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

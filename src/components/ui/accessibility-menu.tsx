
import React from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { FontBold, Type, MousePointer, Keyboard, Clock } from "lucide-react";

interface AccessibilityMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AccessibilityMenu({ open, onOpenChange }: AccessibilityMenuProps) {
  const { 
    highContrast, 
    setHighContrast, 
    largeText, 
    setLargeText, 
    keyboardMode, 
    setKeyboardMode,
    reducedMotion,
    setReducedMotion
  } = useAccessibility();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Accessibility Settings</DialogTitle>
          <DialogDescription>
            Customize your experience to improve accessibility
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="visual" className="mt-4">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="visual">Visual</TabsTrigger>
            <TabsTrigger value="interaction">Interaction</TabsTrigger>
          </TabsList>
          
          <TabsContent value="visual" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="high-contrast" className="flex items-center gap-2">
                  <FontBold className="h-4 w-4" />
                  High Contrast
                </Label>
                <p className="text-sm text-muted-foreground">
                  Increase contrast for better readability
                </p>
              </div>
              <Switch
                id="high-contrast"
                checked={highContrast}
                onCheckedChange={setHighContrast}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="large-text" className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Larger Text
                </Label>
                <p className="text-sm text-muted-foreground">
                  Increase text size throughout the application
                </p>
              </div>
              <Switch
                id="large-text"
                checked={largeText}
                onCheckedChange={setLargeText}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="interaction" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="keyboard-mode" className="flex items-center gap-2">
                  <Keyboard className="h-4 w-4" />
                  Keyboard Navigation
                </Label>
                <p className="text-sm text-muted-foreground">
                  Enhanced focus indicators for keyboard users
                </p>
              </div>
              <Switch
                id="keyboard-mode"
                checked={keyboardMode}
                onCheckedChange={setKeyboardMode}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="reduced-motion" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Reduced Motion
                </Label>
                <p className="text-sm text-muted-foreground">
                  Minimize animations and transitions
                </p>
              </div>
              <Switch
                id="reduced-motion"
                checked={reducedMotion}
                onCheckedChange={setReducedMotion}
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            Save Preferences
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

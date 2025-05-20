
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AccessibilityMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AccessibilityMenu({ open, onOpenChange }: AccessibilityMenuProps) {
  // State for various accessibility settings
  const [highContrast, setHighContrast] = React.useState(false);
  const [largeText, setLargeText] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [screenReader, setScreenReader] = React.useState(false);
  const [fontSize, setFontSize] = React.useState(100);
  const [theme, setTheme] = React.useState<string>("system");
  
  // Apply the settings when they change
  React.useEffect(() => {
    const html = document.documentElement;
    
    // Apply high contrast
    if (highContrast) {
      html.classList.add('high-contrast');
    } else {
      html.classList.remove('high-contrast');
    }
    
    // Apply large text
    if (largeText) {
      html.classList.add('large-text');
    } else {
      html.classList.remove('large-text');
    }
    
    // Apply reduced motion
    if (reducedMotion) {
      html.classList.add('reduced-motion');
    } else {
      html.classList.remove('reduced-motion');
    }
    
    // Apply font size using CSS variables
    html.style.setProperty('--font-scale', `${fontSize}%`);
    
    // Save settings to localStorage
    localStorage.setItem('hawkly-accessibility', JSON.stringify({
      highContrast,
      largeText,
      reducedMotion,
      screenReader,
      fontSize,
      theme
    }));
  }, [highContrast, largeText, reducedMotion, screenReader, fontSize, theme]);
  
  // Load settings from localStorage on mount
  React.useEffect(() => {
    const savedSettings = localStorage.getItem('hawkly-accessibility');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setHighContrast(settings.highContrast || false);
        setLargeText(settings.largeText || false);
        setReducedMotion(settings.reducedMotion || false);
        setScreenReader(settings.screenReader || false);
        setFontSize(settings.fontSize || 100);
        setTheme(settings.theme || 'system');
      } catch (error) {
        console.error('Error loading accessibility settings:', error);
      }
    }
  }, []);
  
  // Handle saving settings
  const handleSave = () => {
    // Apply all settings in one go
    onOpenChange(false);
  };
  
  // Reset to defaults
  const handleReset = () => {
    setHighContrast(false);
    setLargeText(false);
    setReducedMotion(false);
    setScreenReader(false);
    setFontSize(100);
    setTheme('system');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Accessibility Settings</DialogTitle>
          <DialogDescription>
            Customize your experience to improve accessibility.
            Press Alt+A anytime to access these settings.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="high-contrast" className="text-right">
              High Contrast
            </Label>
            <Switch
              id="high-contrast"
              checked={highContrast}
              onCheckedChange={setHighContrast}
            />
          </div>
          
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="large-text" className="text-right">
              Large Text
            </Label>
            <Switch
              id="large-text"
              checked={largeText}
              onCheckedChange={setLargeText}
            />
          </div>
          
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="reduced-motion" className="text-right">
              Reduced Motion
            </Label>
            <Switch
              id="reduced-motion"
              checked={reducedMotion}
              onCheckedChange={setReducedMotion}
            />
          </div>
          
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="screen-reader" className="text-right">
              Screen Reader Optimized
            </Label>
            <Switch
              id="screen-reader"
              checked={screenReader}
              onCheckedChange={setScreenReader}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="font-size">Font Size ({fontSize}%)</Label>
            <Slider
              id="font-size"
              min={75}
              max={150}
              step={5}
              value={[fontSize]}
              onValueChange={([value]) => setFontSize(value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="theme">Color Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger id="theme">
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">System Default</SelectItem>
                <SelectItem value="light">Light Mode</SelectItem>
                <SelectItem value="dark">Dark Mode</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mb-2 text-xs text-muted-foreground">
          Keyboard Shortcuts:
          <ul className="mt-1 space-y-1">
            <li>Alt+A: Open accessibility settings</li>
            <li>Alt+S: Skip to main content</li>
            <li>Alt+M: Toggle menu (when available)</li>
          </ul>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleReset}>
            Reset to Default
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Settings, Eye, Volume2, MousePointer, Keyboard } from 'lucide-react';

export function AccessibilityControls() {
  const [isOpen, setIsOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [enhancedFocus, setEnhancedFocus] = useState(false);
  const [fontSize, setFontSize] = useState([16]);
  const [screenReader, setScreenReader] = useState(false);

  useEffect(() => {
    // Load saved preferences
    const savedPrefs = localStorage.getItem('accessibility-preferences');
    if (savedPrefs) {
      const prefs = JSON.parse(savedPrefs);
      setHighContrast(prefs.highContrast || false);
      setReducedMotion(prefs.reducedMotion || false);
      setEnhancedFocus(prefs.enhancedFocus || false);
      setFontSize([prefs.fontSize || 16]);
      setScreenReader(prefs.screenReader || false);
    }
  }, []);

  useEffect(() => {
    // Apply accessibility preferences
    const root = document.documentElement;
    
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    if (reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    if (enhancedFocus) {
      root.classList.add('focus-visible-enhanced');
    } else {
      root.classList.remove('focus-visible-enhanced');
    }

    root.style.fontSize = `${fontSize[0]}px`;

    // Save preferences
    localStorage.setItem('accessibility-preferences', JSON.stringify({
      highContrast,
      reducedMotion,
      enhancedFocus,
      fontSize: fontSize[0],
      screenReader
    }));
  }, [highContrast, reducedMotion, enhancedFocus, fontSize, screenReader]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full shadow-lg"
          aria-label="Open accessibility controls"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Accessibility Settings
          </DialogTitle>
          <DialogDescription>
            Customize your viewing experience for better accessibility.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Visual Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Visual Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="high-contrast" className="text-sm">High Contrast Mode</Label>
                <Switch
                  id="high-contrast"
                  checked={highContrast}
                  onCheckedChange={setHighContrast}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="enhanced-focus" className="text-sm">Enhanced Focus Indicators</Label>
                <Switch
                  id="enhanced-focus"
                  checked={enhancedFocus}
                  onCheckedChange={setEnhancedFocus}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="font-size" className="text-sm">Font Size: {fontSize[0]}px</Label>
                <Slider
                  id="font-size"
                  min={12}
                  max={24}
                  step={1}
                  value={fontSize}
                  onValueChange={setFontSize}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Motion Settings */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <MousePointer className="h-4 w-4" />
                Motion Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Label htmlFor="reduced-motion" className="text-sm">Reduce Motion</Label>
                <Switch
                  id="reduced-motion"
                  checked={reducedMotion}
                  onCheckedChange={setReducedMotion}
                />
              </div>
            </CardContent>
          </Card>

          {/* Screen Reader */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                Screen Reader
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Label htmlFor="screen-reader" className="text-sm">Screen Reader Optimized</Label>
                <Switch
                  id="screen-reader"
                  checked={screenReader}
                  onCheckedChange={setScreenReader}
                />
              </div>
            </CardContent>
          </Card>

          {/* Keyboard Navigation Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Keyboard className="h-4 w-4" />
                Keyboard Navigation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Press Tab to navigate through elements</p>
                <p>• Press Enter or Space to activate buttons</p>
                <p>• Press Escape to close dialogs</p>
                <p>• Use arrow keys in menus and lists</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

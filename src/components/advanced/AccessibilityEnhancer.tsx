
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, EyeOff, Type, Contrast, Volume2, VolumeX, 
  MousePointer, Keyboard, Monitor, Accessibility 
} from "lucide-react";

interface AccessibilitySettings {
  fontSize: number;
  highContrast: boolean;
  reduceMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  focusIndicators: boolean;
  colorBlindMode: string;
  textSpacing: number;
}

export function AccessibilityEnhancer() {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 16,
    highContrast: false,
    reduceMotion: false,
    screenReader: false,
    keyboardNavigation: true,
    focusIndicators: true,
    colorBlindMode: 'none',
    textSpacing: 1
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Load saved accessibility settings
    const saved = localStorage.getItem('accessibility-settings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Save settings to localStorage
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
    
    // Apply settings to the document
    applyAccessibilitySettings(settings);
  }, [settings]);

  const applyAccessibilitySettings = (settings: AccessibilitySettings) => {
    const root = document.documentElement;
    
    // Font size
    root.style.setProperty('--base-font-size', `${settings.fontSize}px`);
    
    // High contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Reduce motion
    if (settings.reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
    
    // Focus indicators
    if (settings.focusIndicators) {
      root.classList.add('enhanced-focus');
    } else {
      root.classList.remove('enhanced-focus');
    }
    
    // Text spacing
    root.style.setProperty('--text-spacing', settings.textSpacing.toString());
    
    // Color blind mode
    root.setAttribute('data-colorblind-mode', settings.colorBlindMode);
  };

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    const defaultSettings: AccessibilitySettings = {
      fontSize: 16,
      highContrast: false,
      reduceMotion: false,
      screenReader: false,
      keyboardNavigation: true,
      focusIndicators: true,
      colorBlindMode: 'none',
      textSpacing: 1
    };
    setSettings(defaultSettings);
  };

  const colorBlindOptions = [
    { value: 'none', label: 'None' },
    { value: 'protanopia', label: 'Protanopia' },
    { value: 'deuteranopia', label: 'Deuteranopia' },
    { value: 'tritanopia', label: 'Tritanopia' }
  ];

  if (!isVisible) {
    return (
      <Button
        size="sm"
        variant="outline"
        className="fixed bottom-4 right-4 z-50"
        onClick={() => setIsVisible(true)}
        aria-label="Open accessibility settings"
      >
        <Accessibility className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80">
      <Card className="bg-background/95 backdrop-blur border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Accessibility className="h-4 w-4" />
              <CardTitle className="text-lg">Accessibility</CardTitle>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsVisible(false)}
              aria-label="Close accessibility settings"
            >
              <EyeOff className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            Customize your accessibility preferences
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Font Size */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              <label className="text-sm font-medium">Font Size</label>
              <Badge variant="outline" className="text-xs">
                {settings.fontSize}px
              </Badge>
            </div>
            <Slider
              value={[settings.fontSize]}
              onValueChange={([value]) => updateSetting('fontSize', value)}
              min={12}
              max={24}
              step={1}
              className="w-full"
            />
          </div>

          {/* Text Spacing */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              <label className="text-sm font-medium">Text Spacing</label>
              <Badge variant="outline" className="text-xs">
                {settings.textSpacing}x
              </Badge>
            </div>
            <Slider
              value={[settings.textSpacing]}
              onValueChange={([value]) => updateSetting('textSpacing', value)}
              min={1}
              max={2}
              step={0.1}
              className="w-full"
            />
          </div>

          {/* Toggle Settings */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Contrast className="h-4 w-4" />
                <label className="text-sm font-medium">High Contrast</label>
              </div>
              <Switch
                checked={settings.highContrast}
                onCheckedChange={(checked) => updateSetting('highContrast', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <label className="text-sm font-medium">Reduce Motion</label>
              </div>
              <Switch
                checked={settings.reduceMotion}
                onCheckedChange={(checked) => updateSetting('reduceMotion', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                <label className="text-sm font-medium">Screen Reader</label>
              </div>
              <Switch
                checked={settings.screenReader}
                onCheckedChange={(checked) => updateSetting('screenReader', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Keyboard className="h-4 w-4" />
                <label className="text-sm font-medium">Enhanced Focus</label>
              </div>
              <Switch
                checked={settings.focusIndicators}
                onCheckedChange={(checked) => updateSetting('focusIndicators', checked)}
              />
            </div>
          </div>

          {/* Color Blind Mode */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Color Blind Support</label>
            <div className="grid grid-cols-2 gap-2">
              {colorBlindOptions.map((option) => (
                <Button
                  key={option.value}
                  size="sm"
                  variant={settings.colorBlindMode === option.value ? "default" : "outline"}
                  onClick={() => updateSetting('colorBlindMode', option.value)}
                  className="text-xs"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <Button
            size="sm"
            variant="outline"
            onClick={resetSettings}
            className="w-full"
          >
            Reset to Defaults
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

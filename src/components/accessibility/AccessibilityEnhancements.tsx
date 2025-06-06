
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Eye, EyeOff, Type, Contrast, Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';

interface AccessibilityState {
  highContrast: boolean;
  fontSize: number;
  reduceMotion: boolean;
  screenReaderMode: boolean;
  announcements: boolean;
}

export function AccessibilityEnhancements() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilityState>({
    highContrast: false,
    fontSize: 16,
    reduceMotion: false,
    screenReaderMode: false,
    announcements: true
  });

  useEffect(() => {
    // Load saved accessibility settings
    const saved = localStorage.getItem('hawkly-accessibility-settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
        applyAccessibilitySettings(parsed);
      } catch (error) {
        console.error('Failed to parse accessibility settings:', error);
      }
    }

    // Check system preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    
    if (prefersReducedMotion || prefersHighContrast) {
      const systemSettings = {
        ...settings,
        reduceMotion: prefersReducedMotion,
        highContrast: prefersHighContrast
      };
      setSettings(systemSettings);
      applyAccessibilitySettings(systemSettings);
    }
  }, []);

  const applyAccessibilitySettings = (newSettings: AccessibilityState) => {
    const root = document.documentElement;
    
    // High contrast mode
    if (newSettings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // Font size
    root.style.setProperty('--base-font-size', `${newSettings.fontSize}px`);
    
    // Reduced motion
    if (newSettings.reduceMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
    
    // Screen reader mode
    if (newSettings.screenReaderMode) {
      root.classList.add('screen-reader-mode');
    } else {
      root.classList.remove('screen-reader-mode');
    }

    // Save settings
    localStorage.setItem('hawkly-accessibility-settings', JSON.stringify(newSettings));
  };

  const updateSetting = <K extends keyof AccessibilityState>(
    key: K, 
    value: AccessibilityState[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    applyAccessibilitySettings(newSettings);
    
    if (newSettings.announcements) {
      announceChange(key, value);
    }
  };

  const announceChange = (setting: string, value: any) => {
    const messages = {
      highContrast: `High contrast mode ${value ? 'enabled' : 'disabled'}`,
      fontSize: `Font size set to ${value}px`,
      reduceMotion: `Motion ${value ? 'reduced' : 'enabled'}`,
      screenReaderMode: `Screen reader mode ${value ? 'enabled' : 'disabled'}`,
      announcements: `Announcements ${value ? 'enabled' : 'disabled'}`
    };
    
    const message = messages[setting as keyof typeof messages];
    if (message) {
      // Create live region for screen reader announcement
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = message;
      document.body.appendChild(announcement);
      
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
      
      toast.success(message);
    }
  };

  const resetSettings = () => {
    const defaultSettings: AccessibilityState = {
      highContrast: false,
      fontSize: 16,
      reduceMotion: false,
      screenReaderMode: false,
      announcements: true
    };
    setSettings(defaultSettings);
    applyAccessibilitySettings(defaultSettings);
    toast.success('Accessibility settings reset to default');
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="fixed bottom-4 left-4 z-50"
        aria-label="Open accessibility settings"
      >
        <Eye className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 left-4 z-50 w-80 max-h-96 overflow-y-auto">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Accessibility Settings</CardTitle>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="sm"
            aria-label="Close accessibility settings"
          >
            <EyeOff className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* High Contrast */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Contrast className="h-4 w-4" />
            <Label htmlFor="high-contrast">High Contrast</Label>
          </div>
          <Switch
            id="high-contrast"
            checked={settings.highContrast}
            onCheckedChange={(checked) => updateSetting('highContrast', checked)}
          />
        </div>

        {/* Font Size */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Type className="h-4 w-4" />
            <Label>Font Size: {settings.fontSize}px</Label>
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

        {/* Reduce Motion */}
        <div className="flex items-center justify-between">
          <Label htmlFor="reduce-motion">Reduce Motion</Label>
          <Switch
            id="reduce-motion"
            checked={settings.reduceMotion}
            onCheckedChange={(checked) => updateSetting('reduceMotion', checked)}
          />
        </div>

        {/* Screen Reader Mode */}
        <div className="flex items-center justify-between">
          <Label htmlFor="screen-reader">Screen Reader Optimized</Label>
          <Switch
            id="screen-reader"
            checked={settings.screenReaderMode}
            onCheckedChange={(checked) => updateSetting('screenReaderMode', checked)}
          />
        </div>

        {/* Announcements */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {settings.announcements ? (
              <Volume2 className="h-4 w-4" />
            ) : (
              <VolumeX className="h-4 w-4" />
            )}
            <Label htmlFor="announcements">Voice Announcements</Label>
          </div>
          <Switch
            id="announcements"
            checked={settings.announcements}
            onCheckedChange={(checked) => updateSetting('announcements', checked)}
          />
        </div>

        {/* Reset Button */}
        <Button 
          onClick={resetSettings} 
          variant="outline" 
          size="sm" 
          className="w-full"
        >
          Reset to Default
        </Button>
      </CardContent>
    </Card>
  );
}

// Accessibility CSS to be added to global styles
export const accessibilityCSS = `
/* High Contrast Mode */
.high-contrast {
  --background: 255 255 255;
  --foreground: 0 0 0;
  --card: 255 255 255;
  --card-foreground: 0 0 0;
  --primary: 0 0 0;
  --primary-foreground: 255 255 255;
  --secondary: 240 240 240;
  --secondary-foreground: 0 0 0;
  --muted: 240 240 240;
  --muted-foreground: 0 0 0;
  --accent: 240 240 240;
  --accent-foreground: 0 0 0;
  --destructive: 255 0 0;
  --destructive-foreground: 255 255 255;
  --border: 0 0 0;
  --input: 255 255 255;
  --ring: 0 0 0;
}

.high-contrast * {
  border-color: black !important;
}

/* Reduced Motion */
.reduce-motion *,
.reduce-motion *::before,
.reduce-motion *::after {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
  scroll-behavior: auto !important;
}

/* Screen Reader Mode */
.screen-reader-mode {
  --base-font-size: 18px;
}

.screen-reader-mode * {
  font-family: system-ui, -apple-system, sans-serif !important;
  line-height: 1.6 !important;
}

/* Font Size Override */
html {
  font-size: var(--base-font-size, 16px);
}

/* Focus Indicators */
*:focus-visible {
  outline: 3px solid hsl(var(--ring)) !important;
  outline-offset: 2px !important;
}

/* Skip Links */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1000;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 6px;
}

/* Screen Reader Only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
`;

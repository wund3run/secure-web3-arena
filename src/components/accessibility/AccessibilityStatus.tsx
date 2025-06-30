
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Type, Contrast, MousePointer } from 'lucide-react';
import { validateAccessibility } from '@/utils/validation/validators/accessibility-validator';

export function AccessibilityStatus() {
  const [accessibilityMode, setAccessibilityMode] = useState({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    focusVisible: true
  });

  const [validationResults, setValidationResults] = useState<any[]>([]);

  useEffect(() => {
    // Apply accessibility settings to document
    const root = document.documentElement;
    
    if (accessibilityMode.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    if (accessibilityMode.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }
    
    if (accessibilityMode.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
  }, [accessibilityMode]);

  const toggleAccessibilityFeature = (feature: keyof typeof accessibilityMode) => {
    setAccessibilityMode(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  const runAccessibilityCheck = () => {
    const results = validateAccessibility();
    setValidationResults(results);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Accessibility Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Button
            variant={accessibilityMode.highContrast ? "default" : "outline"}
            size="sm"
            onClick={() => toggleAccessibilityFeature('highContrast')}
            className="w-full justify-start"
          >
            <Contrast className="h-4 w-4 mr-2" />
            High Contrast
          </Button>
          
          <Button
            variant={accessibilityMode.largeText ? "default" : "outline"}
            size="sm"
            onClick={() => toggleAccessibilityFeature('largeText')}
            className="w-full justify-start"
          >
            <Type className="h-4 w-4 mr-2" />
            Large Text
          </Button>
          
          <Button
            variant={accessibilityMode.reducedMotion ? "default" : "outline"}
            size="sm"
            onClick={() => toggleAccessibilityFeature('reducedMotion')}
            className="w-full justify-start"
          >
            <MousePointer className="h-4 w-4 mr-2" />
            Reduced Motion
          </Button>
        </div>
        
        <div className="border-t pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={runAccessibilityCheck}
            className="w-full"
          >
            Run Accessibility Check
          </Button>
          
          {validationResults.length > 0 && (
            <div className="mt-2 text-xs text-muted-foreground">
              Found {validationResults.length} accessibility issues
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

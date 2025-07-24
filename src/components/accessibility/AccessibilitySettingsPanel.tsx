import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAccessibility } from './AccessibilityManager';
import { 
  Eye, 
  EyeOff, 
  Volume2, 
  VolumeX, 
  MousePointer, 
  Keyboard, 
  Brain, 
  Navigation,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Settings,
  Zap,
  ShieldCheck,
  Info
} from 'lucide-react';

interface AccessibilitySettingsPanelProps {
  className?: string;
}

export function AccessibilitySettingsPanel({ className }: AccessibilitySettingsPanelProps) {
  const { 
    preferences, 
    updatePreference, 
    resetPreferences, 
    checkAccessibility, 
    applyAccessibilityFixes,
    getAccessibilityScore,
    announceToScreenReader
  } = useAccessibility();
  
  const [activeTab, setActiveTab] = useState('visual');
  const [accessibilityReport, setAccessibilityReport] = useState(checkAccessibility());

  const runAccessibilityCheck = () => {
    const report = checkAccessibility();
    setAccessibilityReport(report);
    announceToScreenReader(`Accessibility check complete. Score: ${report.score}%`);
  };

  const handleAutoFix = () => {
    applyAccessibilityFixes();
    runAccessibilityCheck();
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return 'default';
    if (score >= 70) return 'secondary';
    return 'destructive';
  };

  return (
    <Card className={`w-full max-w-4xl mx-auto ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Accessibility Settings
            </CardTitle>
            <CardDescription>
              Customize your accessibility preferences for optimal experience
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={getScoreBadgeVariant(accessibilityReport.score)}>
              {accessibilityReport.score}% Accessible
            </Badge>
            <Button
              size="sm"
              variant="outline"
              onClick={runAccessibilityCheck}
              aria-label="Run accessibility check"
            >
              <CheckCircle className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Accessibility Score Overview */}
        <Alert>
          <ShieldCheck className="h-4 w-4" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <span>
                {accessibilityReport.accessibleElements} of {accessibilityReport.totalElements} elements are accessible
              </span>
              {accessibilityReport.issues.length > 0 && (
                <Button
                  size="sm"
                  onClick={handleAutoFix}
                  className="ml-2"
                  aria-label="Apply automatic accessibility fixes"
                >
                  <Zap className="h-4 w-4 mr-1" />
                  Auto Fix ({accessibilityReport.issues.length})
                </Button>
              )}
            </div>
          </AlertDescription>
        </Alert>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="visual" className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              Visual
            </TabsTrigger>
            <TabsTrigger value="motor" className="flex items-center gap-1">
              <MousePointer className="h-4 w-4" />
              Motor
            </TabsTrigger>
            <TabsTrigger value="cognitive" className="flex items-center gap-1">
              <Brain className="h-4 w-4" />
              Cognitive
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center gap-1">
              <Volume2 className="h-4 w-4" />
              Audio
            </TabsTrigger>
            <TabsTrigger value="navigation" className="flex items-center gap-1">
              <Navigation className="h-4 w-4" />
              Navigation
            </TabsTrigger>
          </TabsList>

          {/* Visual Accessibility */}
          <TabsContent value="visual" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* High Contrast */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="high-contrast" className="text-sm font-medium">
                    High Contrast Mode
                  </label>
                  <Switch
                    id="high-contrast"
                    checked={preferences.highContrast}
                    onCheckedChange={(value) => updatePreference('highContrast', value)}
                    aria-describedby="high-contrast-desc"
                  />
                </div>
                <p id="high-contrast-desc" className="text-sm text-muted-foreground">
                  Increases contrast for better visibility
                </p>
              </div>

              {/* Large Text */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="large-text" className="text-sm font-medium">
                    Large Text
                  </label>
                  <Switch
                    id="large-text"
                    checked={preferences.largeText}
                    onCheckedChange={(value) => updatePreference('largeText', value)}
                    aria-describedby="large-text-desc"
                  />
                </div>
                <p id="large-text-desc" className="text-sm text-muted-foreground">
                  Increases text size for easier reading
                </p>
              </div>

              {/* Custom Text Size */}
              <div className="space-y-3 md:col-span-2">
                <label htmlFor="text-size" className="text-sm font-medium">
                  Text Size: {preferences.customTextSize}%
                </label>
                <Slider
                  id="text-size"
                  min={100}
                  max={200}
                  step={10}
                  value={[preferences.customTextSize]}
                  onValueChange={(value) => updatePreference('customTextSize', value[0])}
                  className="w-full"
                  aria-describedby="text-size-desc"
                />
                <p id="text-size-desc" className="text-sm text-muted-foreground">
                  Adjust text size from 100% to 200%
                </p>
              </div>

              {/* Reduced Motion */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="reduced-motion" className="text-sm font-medium">
                    Reduced Motion
                  </label>
                  <Switch
                    id="reduced-motion"
                    checked={preferences.reducedMotion}
                    onCheckedChange={(value) => updatePreference('reducedMotion', value)}
                    aria-describedby="reduced-motion-desc"
                  />
                </div>
                <p id="reduced-motion-desc" className="text-sm text-muted-foreground">
                  Minimizes animations and transitions
                </p>
              </div>

              {/* Color Blind Mode */}
              <div className="space-y-2">
                <label htmlFor="colorblind-mode" className="text-sm font-medium">
                  Color Blind Support
                </label>
                <select
                  id="colorblind-mode"
                  value={preferences.colorBlindMode}
                  onChange={(e) => updatePreference('colorBlindMode', e.target.value as any)}
                  className="w-full p-2 border border-input rounded-md bg-background"
                  aria-describedby="colorblind-desc"
                >
                  <option value="none">None</option>
                  <option value="protanopia">Protanopia (Red-blind)</option>
                  <option value="deuteranopia">Deuteranopia (Green-blind)</option>
                  <option value="tritanopia">Tritanopia (Blue-blind)</option>
                </select>
                <p id="colorblind-desc" className="text-sm text-muted-foreground">
                  Adjust colors for color vision deficiencies
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Motor Accessibility */}
          <TabsContent value="motor" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Large Click Targets */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="large-targets" className="text-sm font-medium">
                    Large Click Targets
                  </label>
                  <Switch
                    id="large-targets"
                    checked={preferences.largeClickTargets}
                    onCheckedChange={(value) => updatePreference('largeClickTargets', value)}
                    aria-describedby="large-targets-desc"
                  />
                </div>
                <p id="large-targets-desc" className="text-sm text-muted-foreground">
                  Makes buttons and links easier to click (44px minimum)
                </p>
              </div>

              {/* Sticky Focus */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="sticky-focus" className="text-sm font-medium">
                    Sticky Focus
                  </label>
                  <Switch
                    id="sticky-focus"
                    checked={preferences.stickyFocus}
                    onCheckedChange={(value) => updatePreference('stickyFocus', value)}
                    aria-describedby="sticky-focus-desc"
                  />
                </div>
                <p id="sticky-focus-desc" className="text-sm text-muted-foreground">
                  Helps maintain focus for motor impairments
                </p>
              </div>

              {/* Keyboard Only Mode */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="keyboard-only" className="text-sm font-medium">
                    Keyboard Only Mode
                  </label>
                  <Switch
                    id="keyboard-only"
                    checked={preferences.keyboardOnlyMode}
                    onCheckedChange={(value) => updatePreference('keyboardOnlyMode', value)}
                    aria-describedby="keyboard-only-desc"
                  />
                </div>
                <p id="keyboard-only-desc" className="text-sm text-muted-foreground">
                  Optimizes interface for keyboard navigation
                </p>
              </div>

              {/* Gesture Alternatives */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="gesture-alternatives" className="text-sm font-medium">
                    Gesture Alternatives
                  </label>
                  <Switch
                    id="gesture-alternatives"
                    checked={preferences.gestureAlternatives}
                    onCheckedChange={(value) => updatePreference('gestureAlternatives', value)}
                    aria-describedby="gesture-alternatives-desc"
                  />
                </div>
                <p id="gesture-alternatives-desc" className="text-sm text-muted-foreground">
                  Provides button alternatives for gestures
                </p>
              </div>

              {/* Focus Indicator */}
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="focus-indicator" className="text-sm font-medium">
                  Focus Indicator Style
                </label>
                <select
                  id="focus-indicator"
                  value={preferences.focusIndicator}
                  onChange={(e) => updatePreference('focusIndicator', e.target.value as any)}
                  className="w-full p-2 border border-input rounded-md bg-background"
                  aria-describedby="focus-indicator-desc"
                >
                  <option value="default">Default</option>
                  <option value="enhanced">Enhanced</option>
                  <option value="high-contrast">High Contrast</option>
                </select>
                <p id="focus-indicator-desc" className="text-sm text-muted-foreground">
                  Choose focus indicator visibility level
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Cognitive Accessibility */}
          <TabsContent value="cognitive" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Simplified Language */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="simplified-language" className="text-sm font-medium">
                    Simplified Language
                  </label>
                  <Switch
                    id="simplified-language"
                    checked={preferences.simplifiedLanguage}
                    onCheckedChange={(value) => updatePreference('simplifiedLanguage', value)}
                    aria-describedby="simplified-language-desc"
                  />
                </div>
                <p id="simplified-language-desc" className="text-sm text-muted-foreground">
                  Uses clearer, simpler language
                </p>
              </div>

              {/* Extended Timeouts */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="extended-timeouts" className="text-sm font-medium">
                    Extended Timeouts
                  </label>
                  <Switch
                    id="extended-timeouts"
                    checked={preferences.extendedTimeouts}
                    onCheckedChange={(value) => updatePreference('extendedTimeouts', value)}
                    aria-describedby="extended-timeouts-desc"
                  />
                </div>
                <p id="extended-timeouts-desc" className="text-sm text-muted-foreground">
                  Doubles time limits for forms and actions
                </p>
              </div>

              {/* Auto Save */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="auto-save" className="text-sm font-medium">
                    Auto Save
                  </label>
                  <Switch
                    id="auto-save"
                    checked={preferences.autoSave}
                    onCheckedChange={(value) => updatePreference('autoSave', value)}
                    aria-describedby="auto-save-desc"
                  />
                </div>
                <p id="auto-save-desc" className="text-sm text-muted-foreground">
                  Automatically saves form progress
                </p>
              </div>

              {/* Progress Indicators */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="progress-indicators" className="text-sm font-medium">
                    Progress Indicators
                  </label>
                  <Switch
                    id="progress-indicators"
                    checked={preferences.progressIndicators}
                    onCheckedChange={(value) => updatePreference('progressIndicators', value)}
                    aria-describedby="progress-indicators-desc"
                  />
                </div>
                <p id="progress-indicators-desc" className="text-sm text-muted-foreground">
                  Shows progress for multi-step processes
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Audio/Visual */}
          <TabsContent value="audio" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Text to Speech */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="text-to-speech" className="text-sm font-medium">
                    Text to Speech
                  </label>
                  <Switch
                    id="text-to-speech"
                    checked={preferences.textToSpeech}
                    onCheckedChange={(value) => updatePreference('textToSpeech', value)}
                    aria-describedby="text-to-speech-desc"
                  />
                </div>
                <p id="text-to-speech-desc" className="text-sm text-muted-foreground">
                  Announces focused elements and changes
                </p>
              </div>

              {/* Captions */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="captions" className="text-sm font-medium">
                    Captions Enabled
                  </label>
                  <Switch
                    id="captions"
                    checked={preferences.captionsEnabled}
                    onCheckedChange={(value) => updatePreference('captionsEnabled', value)}
                    aria-describedby="captions-desc"
                  />
                </div>
                <p id="captions-desc" className="text-sm text-muted-foreground">
                  Shows captions for audio content
                </p>
              </div>

              {/* Audio Descriptions */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="audio-descriptions" className="text-sm font-medium">
                    Audio Descriptions
                  </label>
                  <Switch
                    id="audio-descriptions"
                    checked={preferences.audioDescriptions}
                    onCheckedChange={(value) => updatePreference('audioDescriptions', value)}
                    aria-describedby="audio-descriptions-desc"
                  />
                </div>
                <p id="audio-descriptions-desc" className="text-sm text-muted-foreground">
                  Enables audio descriptions for visual content
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Navigation */}
          <TabsContent value="navigation" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Skip Links */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="skip-links" className="text-sm font-medium">
                    Skip Links
                  </label>
                  <Switch
                    id="skip-links"
                    checked={preferences.skipLinks}
                    onCheckedChange={(value) => updatePreference('skipLinks', value)}
                    aria-describedby="skip-links-desc"
                  />
                </div>
                <p id="skip-links-desc" className="text-sm text-muted-foreground">
                  Shows skip to content links (Alt+1, Alt+2)
                </p>
              </div>

              {/* Breadcrumb Navigation */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="breadcrumbs" className="text-sm font-medium">
                    Enhanced Breadcrumbs
                  </label>
                  <Switch
                    id="breadcrumbs"
                    checked={preferences.breadcrumbNavigation}
                    onCheckedChange={(value) => updatePreference('breadcrumbNavigation', value)}
                    aria-describedby="breadcrumbs-desc"
                  />
                </div>
                <p id="breadcrumbs-desc" className="text-sm text-muted-foreground">
                  Shows enhanced navigation breadcrumbs
                </p>
              </div>
            </div>

            {/* Keyboard Shortcuts Info */}
            <Alert>
              <Keyboard className="h-4 w-4" />
              <AlertDescription>
                <strong>Keyboard Shortcuts:</strong>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• Alt + 1: Skip to main content</li>
                  <li>• Alt + 2: Skip to navigation</li>
                  <li>• Escape: Close modals and dropdowns</li>
                  <li>• Tab: Navigate forward</li>
                  <li>• Shift + Tab: Navigate backward</li>
                </ul>
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <div className="flex items-center justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={resetPreferences}
            className="flex items-center gap-2"
            aria-label="Reset all accessibility preferences to defaults"
          >
            <RefreshCw className="h-4 w-4" />
            Reset to Defaults
          </Button>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={runAccessibilityCheck}
              className="flex items-center gap-2"
              aria-label="Run accessibility check on current page"
            >
              <CheckCircle className="h-4 w-4" />
              Check Accessibility
            </Button>
            
            {accessibilityReport.issues.length > 0 && (
              <Button
                onClick={handleAutoFix}
                className="flex items-center gap-2"
                aria-label={`Apply ${accessibilityReport.issues.length} automatic accessibility fixes`}
              >
                <Zap className="h-4 w-4" />
                Auto Fix ({accessibilityReport.issues.length})
              </Button>
            )}
          </div>
        </div>

        {/* Accessibility Issues */}
        {accessibilityReport.issues.length > 0 && (
          <div className="mt-6 space-y-2">
            <h3 className="text-sm font-medium">Accessibility Issues Found:</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {accessibilityReport.issues.map((issue, index) => (
                <Alert key={index} variant={issue.type === 'error' ? 'destructive' : 'default'}>
                  {issue.type === 'error' ? (
                    <AlertTriangle className="h-4 w-4" />
                  ) : (
                    <Info className="h-4 w-4" />
                  )}
                  <AlertDescription>
                    <strong>{issue.element}:</strong> {issue.issue}
                    <br />
                    <small className="text-muted-foreground">
                      Fix: {issue.fix} ({issue.wcagGuideline})
                    </small>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default AccessibilitySettingsPanel; 

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle,
  XCircle,
  Eye,
  Keyboard,
  Volume2,
  Palette
} from 'lucide-react';
import { colorContrastTester } from '@/utils/accessibility/color-contrast-tester';

interface AccessibilityTest {
  name: string;
  category: 'visual' | 'keyboard' | 'screen-reader' | 'color';
  status: 'pass' | 'fail' | 'warning';
  message: string;
  wcagLevel: 'A' | 'AA' | 'AAA';
  recommendation?: string;
}

export function AccessibilityComplianceTest() {
  const [isTesting, setIsTesting] = useState(false);
  const [tests, setTests] = useState<AccessibilityTest[]>([]);
  const [overallScore, setOverallScore] = useState(0);

  const runAccessibilityTests = async () => {
    setIsTesting(true);
    const results: AccessibilityTest[] = [];

    // Color contrast tests
    const contrastIssues = colorContrastTester.testPageContrast();
    if (contrastIssues.length === 0) {
      results.push({
        name: 'Color Contrast',
        category: 'color',
        status: 'pass',
        message: 'All text meets WCAG contrast requirements',
        wcagLevel: 'AA'
      });
    } else {
      results.push({
        name: 'Color Contrast',
        category: 'color',
        status: 'fail',
        message: `${contrastIssues.length} contrast violations found`,
        wcagLevel: 'AA',
        recommendation: 'Increase color contrast to minimum 4.5:1 ratio'
      });
    }

    // Alt text test
    const images = document.querySelectorAll('img');
    const imagesWithoutAlt = Array.from(images).filter(img => 
      !img.alt && img.getAttribute('role') !== 'presentation'
    );
    
    results.push({
      name: 'Image Alt Text',
      category: 'screen-reader',
      status: imagesWithoutAlt.length === 0 ? 'pass' : 'fail',
      message: imagesWithoutAlt.length === 0 
        ? 'All images have appropriate alt text'
        : `${imagesWithoutAlt.length} images missing alt text`,
      wcagLevel: 'A',
      recommendation: imagesWithoutAlt.length > 0 
        ? 'Add descriptive alt text to all images'
        : undefined
    });

    // Heading structure test
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const h1Count = headings.filter(h => h.tagName === 'H1').length;
    
    results.push({
      name: 'Heading Structure',
      category: 'screen-reader',
      status: h1Count === 1 ? 'pass' : h1Count === 0 ? 'fail' : 'warning',
      message: h1Count === 1 
        ? 'Proper heading hierarchy detected'
        : h1Count === 0 
          ? 'No H1 heading found'
          : 'Multiple H1 headings detected',
      wcagLevel: 'A',
      recommendation: h1Count !== 1 
        ? 'Use exactly one H1 heading per page'
        : undefined
    });

    // Form labels test
    const formControls = document.querySelectorAll('input, select, textarea');
    const unlabeledControls = Array.from(formControls).filter(control => {
      const htmlControl = control as HTMLInputElement;
      return !htmlControl.labels?.length && 
             !htmlControl.getAttribute('aria-label') && 
             !htmlControl.getAttribute('aria-labelledby') &&
             htmlControl.type !== 'hidden';
    });

    results.push({
      name: 'Form Labels',
      category: 'screen-reader',
      status: unlabeledControls.length === 0 ? 'pass' : 'fail',
      message: unlabeledControls.length === 0
        ? 'All form controls have proper labels'
        : `${unlabeledControls.length} form controls missing labels`,
      wcagLevel: 'A',
      recommendation: unlabeledControls.length > 0
        ? 'Add labels or aria-label to all form controls'
        : undefined
    });

    // Keyboard navigation test
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const nonKeyboardAccessible = Array.from(focusableElements).filter(el => {
      const htmlEl = el as HTMLElement;
      return htmlEl.tabIndex < 0 && !htmlEl.hasAttribute('aria-hidden');
    });

    results.push({
      name: 'Keyboard Navigation',
      category: 'keyboard',
      status: nonKeyboardAccessible.length === 0 ? 'pass' : 'fail',
      message: nonKeyboardAccessible.length === 0
        ? 'All interactive elements are keyboard accessible'
        : `${nonKeyboardAccessible.length} elements not keyboard accessible`,
      wcagLevel: 'A',
      recommendation: nonKeyboardAccessible.length > 0
        ? 'Ensure all interactive elements can be reached via keyboard'
        : undefined
    });

    // Focus indicators test
    const hasVisibleFocus = document.querySelector('[class*="focus-visible"], [class*="focus:"]') ||
                           Array.from(document.styleSheets).some(sheet => {
                             try {
                               return Array.from(sheet.cssRules).some(rule => 
                                 rule.cssText.includes(':focus')
                               );
                             } catch {
                               return false;
                             }
                           });

    results.push({
      name: 'Focus Indicators',
      category: 'visual',
      status: hasVisibleFocus ? 'pass' : 'warning',
      message: hasVisibleFocus
        ? 'Focus indicators are properly implemented'
        : 'Focus indicators may not be visible',
      wcagLevel: 'AA',
      recommendation: !hasVisibleFocus
        ? 'Add visible focus indicators for keyboard users'
        : undefined
    });

    // ARIA landmarks test
    const landmarks = document.querySelectorAll('main, nav, header, footer, aside, [role="main"], [role="navigation"]');
    results.push({
      name: 'ARIA Landmarks',
      category: 'screen-reader',
      status: landmarks.length > 0 ? 'pass' : 'warning',
      message: landmarks.length > 0
        ? 'Page structure uses semantic landmarks'
        : 'No semantic landmarks detected',
      wcagLevel: 'A',
      recommendation: landmarks.length === 0
        ? 'Add semantic HTML5 elements (main, nav, header, footer)'
        : undefined
    });

    setTests(results);

    // Calculate overall score
    const passCount = results.filter(t => t.status === 'pass').length;
    const score = Math.round((passCount / results.length) * 100);
    setOverallScore(score);

    setIsTesting(false);
  };

  useEffect(() => {
    runAccessibilityTests();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'fail': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return null;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'visual': return <Eye className="h-4 w-4" />;
      case 'keyboard': return <Keyboard className="h-4 w-4" />;
      case 'screen-reader': return <Volume2 className="h-4 w-4" />;
      case 'color': return <Palette className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            WCAG Compliance Test
          </CardTitle>
          <Button onClick={runAccessibilityTests} disabled={isTesting} variant="outline" size="sm">
            <RefreshCw className={`mr-2 h-4 w-4 ${isTesting ? 'animate-spin' : ''}`} />
            {isTesting ? 'Testing...' : 'Re-test'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="text-center p-6 bg-muted/50 rounded-lg">
          <div className={`text-4xl font-bold ${getScoreColor(overallScore)} mb-2`}>
            {overallScore}%
          </div>
          <div className="text-sm text-muted-foreground mb-3">
            WCAG 2.1 Compliance Score
          </div>
          <Progress value={overallScore} className="w-full h-2" />
        </div>

        {/* Test Results */}
        <div className="space-y-3">
          <h4 className="font-medium">Test Results ({tests.length})</h4>
          {tests.map((test, index) => (
            <Alert key={index}>
              <div className="flex items-start gap-3">
                {getStatusIcon(test.status)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {getCategoryIcon(test.category)}
                    <span className="font-medium">{test.name}</span>
                    <Badge variant="outline" className="text-xs">
                      WCAG {test.wcagLevel}
                    </Badge>
                  </div>
                  <AlertDescription>
                    {test.message}
                    {test.recommendation && (
                      <div className="text-xs text-blue-600 mt-1">
                        Recommendation: {test.recommendation}
                      </div>
                    )}
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {tests.filter(t => t.status === 'pass').length}
            </div>
            <div className="text-sm text-green-600">Passed</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {tests.filter(t => t.status === 'warning').length}
            </div>
            <div className="text-sm text-yellow-600">Warnings</div>
          </div>
          <div className="text-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {tests.filter(t => t.status === 'fail').length}
            </div>
            <div className="text-sm text-red-600">Failed</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

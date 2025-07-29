
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Check, X, AlertTriangle, RefreshCw, Palette, Eye } from 'lucide-react';
import { colorContrastTester } from '@/utils/accessibility/color-contrast-tester';

interface BrandIssue {
  type: 'color' | 'typography' | 'spacing' | 'contrast';
  severity: 'error' | 'warning' | 'info';
  message: string;
  element?: string;
  expected?: string;
  actual?: string;
}

export function BrandConsistencyChecker() {
  const [isChecking, setIsChecking] = useState(false);
  const [issues, setIssues] = useState<BrandIssue[]>([]);
  const [score, setScore] = useState(100);

  const runBrandCheck = async () => {
    setIsChecking(true);
    const foundIssues: BrandIssue[] = [];

    // Check for hardcoded colors
    const allElements = document.querySelectorAll('*');
    const hardcodedColors = ['#ffffff', '#000000', '#fff', '#000', 'white', 'black'];
    
    allElements.forEach((element, index) => {
      const styles = window.getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;
      
      hardcodedColors.forEach(hardcoded => {
        if (color.includes(hardcoded) || backgroundColor.includes(hardcoded)) {
          foundIssues.push({
            type: 'color',
            severity: 'warning',
            message: 'Hardcoded color detected',
            element: `Element ${index + 1}`,
            actual: hardcoded,
            expected: 'Design system token'
          });
        }
      });
    });

    // Check Hawkly brand color usage
    const hawklyElements = document.querySelectorAll('[class*="hawkly"]');
    if (hawklyElements.length === 0) {
      foundIssues.push({
        type: 'color',
        severity: 'info',
        message: 'No Hawkly brand colors detected',
        expected: 'Use hawkly-primary, hawkly-secondary, etc.'
      });
    }

    // Check font consistency
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div');
    const fontFamilies = new Set<string>();
    
    textElements.forEach(element => {
      const fontFamily = window.getComputedStyle(element).fontFamily;
      fontFamilies.add(fontFamily);
    });

    if (fontFamilies.size > 3) {
      foundIssues.push({
        type: 'typography',
        severity: 'warning',
        message: 'Too many font families detected',
        actual: `${fontFamilies.size} different fonts`,
        expected: 'Inter (sans) and JetBrains Mono (mono)'
      });
    }

    // Run contrast checks
    const contrastIssues = colorContrastTester.testPageContrast();
    contrastIssues.forEach(issue => {
      foundIssues.push({
        type: 'contrast',
        severity: 'error',
        message: `Low contrast ratio: ${issue.contrast.ratio}:1`,
        element: issue.selector,
        expected: 'Minimum 4.5:1 ratio',
        actual: `${issue.contrast.ratio}:1`
      });
    });

    setIssues(foundIssues);
    
    // Calculate score
    const errorCount = foundIssues.filter(i => i.severity === 'error').length;
    const warningCount = foundIssues.filter(i => i.severity === 'warning').length;
    const newScore = Math.max(0, 100 - (errorCount * 20) - (warningCount * 5));
    setScore(newScore);
    
    setIsChecking(false);
  };

  useEffect(() => {
    runBrandCheck();
  }, []);

  const getIssueIcon = (severity: string) => {
    switch (severity) {
      case 'error': return <X className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info': return <Eye className="h-4 w-4 text-blue-500" />;
      default: return <Check className="h-4 w-4 text-green-500" />;
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
            <Palette className="h-5 w-5" />
            Brand Consistency Check
          </CardTitle>
          <Button onClick={runBrandCheck} disabled={isChecking} variant="outline" size="sm">
            <RefreshCw className={`mr-2 h-4 w-4 ${isChecking ? 'animate-spin' : ''}`} />
            {isChecking ? 'Checking...' : 'Re-check'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Score Display */}
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div>
            <h3 className="font-medium">Brand Consistency Score</h3>
            <p className="text-sm text-muted-foreground">Hawkly design system compliance</p>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
              {score}%
            </div>
            <div className="text-sm text-muted-foreground">
              {score >= 90 ? 'Excellent' : score >= 70 ? 'Good' : 'Needs Work'}
            </div>
          </div>
        </div>

        {/* Issues Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {issues.filter(i => i.severity === 'error').length}
            </div>
            <div className="text-sm text-red-600">Errors</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {issues.filter(i => i.severity === 'warning').length}
            </div>
            <div className="text-sm text-yellow-600">Warnings</div>
          </div>
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {issues.filter(i => i.severity === 'info').length}
            </div>
            <div className="text-sm text-blue-600">Info</div>
          </div>
        </div>

        {/* Issues List */}
        {issues.length > 0 ? (
          <div className="space-y-3">
            <h4 className="font-medium">Issues Found ({issues.length})</h4>
            {issues.map((issue, index) => (
              <Alert key={index}>
                <div className="flex items-start gap-3">
                  {getIssueIcon(issue.severity)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={issue.severity === 'error' ? 'destructive' : 'secondary'}>
                        {issue.type}
                      </Badge>
                      <Badge variant="outline">
                        {issue.severity}
                      </Badge>
                    </div>
                    <AlertDescription>
                      <strong>{issue.message}</strong>
                      {issue.element && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Element: {issue.element}
                        </div>
                      )}
                      {issue.expected && (
                        <div className="text-xs text-green-600 mt-1">
                          Expected: {issue.expected}
                        </div>
                      )}
                      {issue.actual && (
                        <div className="text-xs text-red-600 mt-1">
                          Actual: {issue.actual}
                        </div>
                      )}
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        ) : (
          <Alert>
            <Check className="h-4 w-4 text-green-500" />
            <AlertDescription>
              <strong>Perfect!</strong> All brand guidelines are being followed correctly.
            </AlertDescription>
          </Alert>
        )}

        {/* Recommendations */}
        <div className="bg-hawkly-primary/5 p-4 rounded-lg border border-hawkly-primary/20">
          <h4 className="font-medium mb-2 text-hawkly-primary">Brand Guidelines Checklist</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Use hawkly-primary, hawkly-secondary color tokens</li>
            <li>• Apply text-hawkly-gradient for brand text</li>
            <li>• Use Inter font for text, JetBrains Mono for code</li>
            <li>• Maintain 4.5:1 minimum contrast ratio</li>
            <li>• Apply consistent spacing with Tailwind utilities</li>
            <li>• Use shadow-hawkly for branded shadows</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

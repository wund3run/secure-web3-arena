
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Eye, 
  Keyboard, 
  MousePointer, 
  Volume2, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface AccessibilityIssue {
  type: 'critical' | 'warning' | 'info';
  category: 'visual' | 'keyboard' | 'mouse' | 'audio' | 'structure';
  message: string;
  element?: string;
  fix: string;
}

export function AccessibilityValidator() {
  const [isValidating, setIsValidating] = useState(false);
  const [issues, setIssues] = useState<AccessibilityIssue[]>([]);
  const [score, setScore] = useState(0);

  const runValidation = async () => {
    setIsValidating(true);
    
    // Simulate validation process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const foundIssues: AccessibilityIssue[] = [];
    
    // Check for images without alt text
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      if (!img.alt && img.getAttribute('role') !== 'presentation') {
        foundIssues.push({
          type: 'warning',
          category: 'visual',
          message: 'Image missing alt text',
          element: `Image ${index + 1}: ${img.src.substring(img.src.lastIndexOf('/') + 1)}`,
          fix: 'Add descriptive alt attribute to the image'
        });
      }
    });

    // Check for buttons without accessible names
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button, index) => {
      if (!button.textContent?.trim() && 
          !button.getAttribute('aria-label') && 
          !button.getAttribute('aria-labelledby')) {
        foundIssues.push({
          type: 'critical',
          category: 'structure',
          message: 'Button without accessible name',
          element: `Button ${index + 1}`,
          fix: 'Add text content or aria-label to the button'
        });
      }
    });

    // Check for form inputs without labels
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach((input, index) => {
      const inputId = input.getAttribute('id');
      if (inputId) {
        const hasLabel = document.querySelector(`label[for="${inputId}"]`);
        if (!hasLabel && !input.getAttribute('aria-label')) {
          foundIssues.push({
            type: 'warning',
            category: 'structure',
            message: 'Form control without associated label',
            element: `Input ${index + 1}`,
            fix: 'Add a label element or aria-label attribute'
          });
        }
      }
    });

    // Check for keyboard accessibility
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, select, textarea');
    interactiveElements.forEach((element, index) => {
      if (element.getAttribute('tabindex') === '-1') {
        foundIssues.push({
          type: 'critical',
          category: 'keyboard',
          message: 'Interactive element not keyboard accessible',
          element: `Element ${index + 1}`,
          fix: 'Remove tabindex="-1" or ensure proper keyboard navigation'
        });
      }
    });

    setIssues(foundIssues);
    
    // Calculate score based on issues
    const criticalCount = foundIssues.filter(i => i.type === 'critical').length;
    const warningCount = foundIssues.filter(i => i.type === 'warning').length;
    const newScore = Math.max(0, 100 - (criticalCount * 15) - (warningCount * 5));
    setScore(newScore);
    
    setIsValidating(false);
  };

  useEffect(() => {
    runValidation();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'visual': return <Eye className="h-4 w-4" />;
      case 'keyboard': return <Keyboard className="h-4 w-4" />;
      case 'mouse': return <MousePointer className="h-4 w-4" />;
      case 'audio': return <Volume2 className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'critical': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default: return null;
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
          <CardTitle>Accessibility Validation</CardTitle>
          <Button onClick={runValidation} disabled={isValidating} variant="outline" size="sm">
            <RefreshCw className={`mr-2 h-4 w-4 ${isValidating ? 'animate-spin' : ''}`} />
            {isValidating ? 'Validating...' : 'Re-validate'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Score Display */}
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div>
            <h3 className="font-medium">Accessibility Score</h3>
            <p className="text-sm text-muted-foreground">Based on WCAG 2.1 guidelines</p>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
              {score}%
            </div>
            <Progress value={score} className="w-24 h-2 mt-1" />
          </div>
        </div>

        {/* Issues List */}
        {issues.length > 0 ? (
          <div className="space-y-3">
            <h4 className="font-medium">Issues Found ({issues.length})</h4>
            {issues.map((issue, index) => (
              <Alert key={index}>
                <div className="flex items-start gap-3">
                  {getIssueIcon(issue.type)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getCategoryIcon(issue.category)}
                      <Badge variant={issue.type === 'critical' ? 'destructive' : 'secondary'}>
                        {issue.type}
                      </Badge>
                    </div>
                    <AlertDescription>
                      <strong>{issue.message}</strong>
                      {issue.element && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Element: {issue.element}
                        </div>
                      )}
                      <div className="text-xs text-green-600 mt-1">
                        Fix: {issue.fix}
                      </div>
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            ))}
          </div>
        ) : (
          <Alert>
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertDescription>
              <strong>Great job!</strong> No accessibility issues found on this page.
            </AlertDescription>
          </Alert>
        )}

        {/* Quick Tips */}
        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Accessibility Best Practices</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Ensure all interactive elements are keyboard accessible</li>
            <li>• Provide descriptive alt text for images</li>
            <li>• Use proper heading hierarchy (h1, h2, h3...)</li>
            <li>• Maintain sufficient color contrast (4.5:1 for normal text)</li>
            <li>• Test with screen readers and keyboard navigation</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

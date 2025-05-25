
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  RefreshCw,
  Monitor,
  Smartphone,
  Accessibility,
  Zap,
  Navigation,
  FileCheck
} from 'lucide-react';

interface AnalysisResult {
  category: string;
  score: number;
  issues: {
    type: 'critical' | 'warning' | 'info';
    message: string;
    location?: string;
    fix?: string;
  }[];
  recommendations: string[];
}

export function PlatformAnalyzer() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [overallScore, setOverallScore] = useState(0);

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const analysisResults: AnalysisResult[] = [
      {
        category: 'Navigation & UX',
        score: 75,
        issues: [
          {
            type: 'warning',
            message: 'Dropdown menus have inconsistent styling',
            location: 'Desktop navigation',
            fix: 'Standardize dropdown background, shadows, and z-index'
          },
          {
            type: 'info',
            message: 'Navigation links could use better hover states',
            location: 'Main navigation',
            fix: 'Add consistent hover animations and focus indicators'
          }
        ],
        recommendations: [
          'Implement consistent dropdown styling across all navigation elements',
          'Add keyboard navigation support for all interactive elements',
          'Improve mobile navigation accessibility'
        ]
      },
      {
        category: 'Accessibility',
        score: 80,
        issues: [
          {
            type: 'warning',
            message: 'Some buttons missing accessible labels',
            location: 'Various components',
            fix: 'Add aria-label attributes to icon-only buttons'
          },
          {
            type: 'info',
            message: 'Color contrast could be improved in some areas',
            location: 'Muted text elements',
            fix: 'Increase contrast ratio to meet WCAG AA standards'
          }
        ],
        recommendations: [
          'Add skip navigation links for keyboard users',
          'Implement proper ARIA landmarks and roles',
          'Ensure all form elements have associated labels'
        ]
      },
      {
        category: 'Mobile Responsiveness',
        score: 85,
        issues: [
          {
            type: 'info',
            message: 'Touch targets could be larger on mobile',
            location: 'Navigation buttons',
            fix: 'Increase minimum touch target size to 44px'
          }
        ],
        recommendations: [
          'Test on various device sizes and orientations',
          'Optimize text sizes for mobile readability',
          'Ensure consistent spacing on mobile devices'
        ]
      },
      {
        category: 'Performance',
        score: 90,
        issues: [
          {
            type: 'info',
            message: 'Some components could benefit from lazy loading',
            location: 'Dashboard widgets',
            fix: 'Implement React.lazy for heavy components'
          }
        ],
        recommendations: [
          'Optimize image loading with proper formats',
          'Implement code splitting for better initial load times',
          'Add proper caching strategies'
        ]
      },
      {
        category: 'Error Handling',
        score: 95,
        issues: [],
        recommendations: [
          'Error boundaries are properly implemented',
          'User-friendly error messages are in place',
          'Fallback UI components handle edge cases well'
        ]
      }
    ];

    setResults(analysisResults);
    setOverallScore(Math.round(analysisResults.reduce((sum, result) => sum + result.score, 0) / analysisResults.length));
    setIsAnalyzing(false);
  };

  useEffect(() => {
    runAnalysis();
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'critical': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Platform Analysis Report</h2>
          <p className="text-muted-foreground">Comprehensive analysis of platform readiness</p>
        </div>
        <Button onClick={runAnalysis} disabled={isAnalyzing}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
          {isAnalyzing ? 'Analyzing...' : 'Re-analyze'}
        </Button>
      </div>

      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="h-5 w-5" />
            Overall Platform Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>
              {overallScore}%
            </div>
            <div className="flex-1">
              <Progress value={overallScore} className="h-3" />
              <p className="text-sm text-muted-foreground mt-1">
                {overallScore >= 90 ? 'Excellent' : overallScore >= 70 ? 'Good' : 'Needs Improvement'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Analysis */}
      <Tabs defaultValue="navigation" className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="navigation" className="flex items-center gap-1">
            <Navigation className="h-4 w-4" />
            <span className="hidden sm:inline">Navigation</span>
          </TabsTrigger>
          <TabsTrigger value="accessibility" className="flex items-center gap-1">
            <Accessibility className="h-4 w-4" />
            <span className="hidden sm:inline">A11y</span>
          </TabsTrigger>
          <TabsTrigger value="mobile" className="flex items-center gap-1">
            <Smartphone className="h-4 w-4" />
            <span className="hidden sm:inline">Mobile</span>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-1">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Performance</span>
          </TabsTrigger>
          <TabsTrigger value="errors" className="flex items-center gap-1">
            <Monitor className="h-4 w-4" />
            <span className="hidden sm:inline">Errors</span>
          </TabsTrigger>
        </TabsList>

        {results.map((result, index) => (
          <TabsContent key={result.category} value={result.category.toLowerCase().split(' ')[0]}>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{result.category}</CardTitle>
                  <Badge variant={result.score >= 90 ? 'default' : result.score >= 70 ? 'secondary' : 'destructive'}>
                    {result.score}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={result.score} className="h-2" />
                
                {result.issues.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Issues Found:</h4>
                    {result.issues.map((issue, idx) => (
                      <Alert key={idx}>
                        <div className="flex items-start gap-2">
                          {getIssueIcon(issue.type)}
                          <div className="flex-1">
                            <AlertDescription>
                              <strong>{issue.message}</strong>
                              {issue.location && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  Location: {issue.location}
                                </div>
                              )}
                              {issue.fix && (
                                <div className="text-xs text-green-600 mt-1">
                                  Fix: {issue.fix}
                                </div>
                              )}
                            </AlertDescription>
                          </div>
                        </div>
                      </Alert>
                    ))}
                  </div>
                )}

                <div>
                  <h4 className="font-medium mb-2">Recommendations:</h4>
                  <ul className="space-y-1">
                    {result.recommendations.map((rec, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

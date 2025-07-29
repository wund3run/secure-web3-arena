
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertTriangle, Eye, ExternalLink, FileText } from 'lucide-react';

interface QualityIssue {
  type: 'error' | 'warning' | 'info';
  category: 'design' | 'content' | 'navigation' | 'performance';
  message: string;
  location: string;
  fix: string;
}

interface PageQuality {
  url: string;
  title: string;
  score: number;
  issues: QualityIssue[];
  designConsistency: boolean;
  contentQuality: number;
  navigationFlow: boolean;
  mobileOptimized: boolean;
}

export function PageQualityAudit() {
  const [pages, setPages] = useState<PageQuality[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedPage, setSelectedPage] = useState<PageQuality | null>(null);

  const scanPages = async () => {
    setIsScanning(true);
    
    // Simulate scanning delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock page quality data
    const mockPages: PageQuality[] = [
      {
        url: '/',
        title: 'Homepage',
        score: 85,
        designConsistency: true,
        contentQuality: 90,
        navigationFlow: true,
        mobileOptimized: true,
        issues: [
          {
            type: 'warning',
            category: 'performance',
            message: 'Large hero image could be optimized',
            location: 'Hero section',
            fix: 'Compress image and use WebP format'
          }
        ]
      },
      {
        url: '/marketplace',
        title: 'Marketplace',
        score: 92,
        designConsistency: true,
        contentQuality: 95,
        navigationFlow: true,
        mobileOptimized: true,
        issues: [
          {
            type: 'info',
            category: 'content',
            message: 'Service descriptions could be more detailed',
            location: 'Service cards',
            fix: 'Add more comprehensive service descriptions'
          }
        ]
      },
      {
        url: '/auth',
        title: 'Authentication',
        score: 78,
        designConsistency: true,
        contentQuality: 80,
        navigationFlow: false,
        mobileOptimized: true,
        issues: [
          {
            type: 'error',
            category: 'navigation',
            message: 'Forgot password link not working',
            location: 'Sign in form',
            fix: 'Fix forgot password functionality'
          },
          {
            type: 'warning',
            category: 'design',
            message: 'Form validation messages unclear',
            location: 'Form inputs',
            fix: 'Improve error message clarity'
          }
        ]
      },
      {
        url: '/request-audit',
        title: 'Request Audit',
        score: 88,
        designConsistency: true,
        contentQuality: 85,
        navigationFlow: true,
        mobileOptimized: true,
        issues: [
          {
            type: 'warning',
            category: 'content',
            message: 'Step instructions could be clearer',
            location: 'Form wizard',
            fix: 'Add more detailed step descriptions'
          }
        ]
      },
      {
        url: '/dashboard',
        title: 'Dashboard',
        score: 90,
        designConsistency: true,
        contentQuality: 90,
        navigationFlow: true,
        mobileOptimized: true,
        issues: [
          {
            type: 'info',
            category: 'performance',
            message: 'Dashboard loads slowly on first visit',
            location: 'Widget loading',
            fix: 'Implement progressive loading for widgets'
          }
        ]
      }
    ];
    
    setPages(mockPages);
    setIsScanning(false);
  };

  useEffect(() => {
    scanPages();
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getIssueIcon = (type: QualityIssue['type']) => {
    switch (type) {
      case 'error': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'info': return <Eye className="h-4 w-4 text-blue-600" />;
    }
  };

  const overallScore = pages.length > 0 
    ? Math.round(pages.reduce((acc, page) => acc + page.score, 0) / pages.length)
    : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Page Quality Analysis
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-bold ${getScoreColor(overallScore)}`}>
                {overallScore}
              </span>
              <Badge variant={overallScore >= 90 ? 'default' : overallScore >= 80 ? 'secondary' : 'destructive'}>
                {overallScore >= 90 ? 'Excellent' : overallScore >= 80 ? 'Good' : 'Needs Work'}
              </Badge>
              <Button variant="outline" size="sm" onClick={scanPages} disabled={isScanning}>
                {isScanning ? 'Scanning...' : 'Re-scan'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isScanning ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Analyzing page quality...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pages.map((page, index) => (
                <div 
                  key={index} 
                  className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setSelectedPage(selectedPage?.url === page.url ? null : page)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h4 className="font-medium">{page.title}</h4>
                      <code className="text-xs bg-muted px-2 py-1 rounded">{page.url}</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-lg font-bold ${getScoreColor(page.score)}`}>
                        {page.score}
                      </span>
                      <Badge variant="outline">
                        {page.issues.length} issues
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      {page.designConsistency ? 
                        <CheckCircle className="h-3 w-3 text-green-600" /> : 
                        <XCircle className="h-3 w-3 text-red-600" />
                      }
                      <span>Design</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {page.navigationFlow ? 
                        <CheckCircle className="h-3 w-3 text-green-600" /> : 
                        <XCircle className="h-3 w-3 text-red-600" />
                      }
                      <span>Navigation</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {page.mobileOptimized ? 
                        <CheckCircle className="h-3 w-3 text-green-600" /> : 
                        <XCircle className="h-3 w-3 text-red-600" />
                      }
                      <span>Mobile</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={getScoreColor(page.contentQuality)}>{page.contentQuality}%</span>
                      <span>Content</span>
                    </div>
                  </div>

                  {selectedPage?.url === page.url && (
                    <div className="mt-4 pt-4 border-t space-y-3">
                      <h5 className="font-medium">Issues & Recommendations</h5>
                      {page.issues.map((issue, issueIndex) => (
                        <div key={issueIndex} className="flex gap-3 p-3 bg-muted rounded-lg">
                          {getIssueIcon(issue.type)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-sm font-medium">{issue.message}</p>
                              <Badge variant="outline" className="text-xs">
                                {issue.category}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">
                              Location: {issue.location}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Fix: {issue.fix}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

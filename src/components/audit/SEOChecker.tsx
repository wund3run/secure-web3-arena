
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertTriangle, Search, Eye, ExternalLink } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface SEOIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  fix: string;
}

interface PageSEOData {
  title: string;
  description: string;
  keywords: string[];
  hasStructuredData: boolean;
  imageAlt: string[];
  internalLinks: number;
  externalLinks: number;
  headings: { level: number; text: string }[];
  issues: SEOIssue[];
}

export function SEOChecker() {
  const [seoData, setSeoData] = useState<PageSEOData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const location = useLocation();

  const analyzePage = async () => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock SEO analysis - in real implementation, this would scan the actual DOM
    const issues: SEOIssue[] = [];
    
    // Check title
    const title = document.title;
    if (!title || title.length < 30) {
      issues.push({
        type: 'error',
        message: 'Page title is missing or too short',
        fix: 'Add a descriptive title (30-60 characters)'
      });
    } else if (title.length > 60) {
      issues.push({
        type: 'warning',
        message: 'Page title is too long',
        fix: 'Shorten title to under 60 characters'
      });
    }

    // Check meta description
    const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
    if (!metaDescription) {
      issues.push({
        type: 'error',
        message: 'Missing meta description',
        fix: 'Add a meta description (150-160 characters)'
      });
    } else if (metaDescription.length < 120) {
      issues.push({
        type: 'warning',
        message: 'Meta description is too short',
        fix: 'Expand description to 150-160 characters'
      });
    }

    // Check headings
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const h1Count = document.querySelectorAll('h1').length;
    
    if (h1Count === 0) {
      issues.push({
        type: 'error',
        message: 'Missing H1 tag',
        fix: 'Add exactly one H1 tag with primary keyword'
      });
    } else if (h1Count > 1) {
      issues.push({
        type: 'warning',
        message: 'Multiple H1 tags found',
        fix: 'Use only one H1 tag per page'
      });
    }

    // Check images
    const images = Array.from(document.querySelectorAll('img'));
    const missingAlt = images.filter(img => !img.getAttribute('alt'));
    
    if (missingAlt.length > 0) {
      issues.push({
        type: 'warning',
        message: `${missingAlt.length} images missing alt text`,
        fix: 'Add descriptive alt text to all images'
      });
    }

    // Check links
    const links = Array.from(document.querySelectorAll('a'));
    const internalLinks = links.filter(link => {
      const href = link.getAttribute('href');
      return href && (href.startsWith('/') || href.startsWith('#'));
    }).length;
    
    const externalLinks = links.filter(link => {
      const href = link.getAttribute('href');
      return href && href.startsWith('http');
    }).length;

    // Check structured data
    const hasStructuredData = document.querySelector('script[type="application/ld+json"]') !== null;
    if (!hasStructuredData) {
      issues.push({
        type: 'info',
        message: 'No structured data found',
        fix: 'Add JSON-LD structured data for better search visibility'
      });
    }

    setSeoData({
      title: title || 'No title',
      description: metaDescription || 'No description',
      keywords: [], // Would extract from meta keywords if present
      hasStructuredData,
      imageAlt: images.map(img => img.getAttribute('alt') || '').filter(Boolean),
      internalLinks,
      externalLinks,
      headings: headings.map(h => ({
        level: parseInt(h.tagName.charAt(1)),
        text: h.textContent || ''
      })),
      issues
    });
    
    setIsAnalyzing(false);
  };

  useEffect(() => {
    analyzePage();
  }, [location.pathname]);

  const getIssueIcon = (type: SEOIssue['type']) => {
    switch (type) {
      case 'error': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'info': return <Eye className="h-4 w-4 text-blue-600" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const calculateSEOScore = () => {
    if (!seoData) return 0;
    
    let score = 100;
    seoData.issues.forEach(issue => {
      switch (issue.type) {
        case 'error': score -= 15; break;
        case 'warning': score -= 10; break;
        case 'info': score -= 5; break;
      }
    });
    
    return Math.max(0, score);
  };

  if (isAnalyzing) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Analyzing SEO...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!seoData) return null;

  const seoScore = calculateSEOScore();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              SEO Analysis
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-bold ${getScoreColor(seoScore)}`}>
                {seoScore}
              </span>
              <Badge variant={seoScore >= 80 ? 'default' : seoScore >= 60 ? 'secondary' : 'destructive'}>
                {seoScore >= 80 ? 'Good' : seoScore >= 60 ? 'Fair' : 'Needs Work'}
              </Badge>
              <Button variant="outline" size="sm" onClick={analyzePage}>
                Re-analyze
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Page Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Title Tag</h4>
              <p className="text-sm text-muted-foreground break-words">
                {seoData.title}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Length: {seoData.title.length} characters
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Meta Description</h4>
              <p className="text-sm text-muted-foreground break-words">
                {seoData.description}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Length: {seoData.description.length} characters
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-lg font-bold">{seoData.headings.length}</div>
              <div className="text-xs text-muted-foreground">Headings</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-lg font-bold">{seoData.internalLinks}</div>
              <div className="text-xs text-muted-foreground">Internal Links</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-lg font-bold">{seoData.externalLinks}</div>
              <div className="text-xs text-muted-foreground">External Links</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-lg font-bold">{seoData.imageAlt.length}</div>
              <div className="text-xs text-muted-foreground">Images w/ Alt</div>
            </div>
          </div>

          {/* Issues */}
          {seoData.issues.length > 0 && (
            <div>
              <h4 className="font-medium mb-3">Issues & Recommendations</h4>
              <div className="space-y-3">
                {seoData.issues.map((issue, index) => (
                  <div key={index} className="flex gap-3 p-3 border rounded-lg">
                    {getIssueIcon(issue.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{issue.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{issue.fix}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Heading Structure */}
          {seoData.headings.length > 0 && (
            <div>
              <h4 className="font-medium mb-3">Heading Structure</h4>
              <div className="space-y-1">
                {seoData.headings.slice(0, 10).map((heading, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Badge variant="outline" className="text-xs">
                      H{heading.level}
                    </Badge>
                    <span className="text-muted-foreground truncate">
                      {heading.text}
                    </span>
                  </div>
                ))}
                {seoData.headings.length > 10 && (
                  <p className="text-xs text-muted-foreground">
                    ... and {seoData.headings.length - 10} more
                  </p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  RefreshCw,
  FileText,
  Link as LinkIcon,
  Monitor,
  Users,
  Accessibility,
  Smartphone,
  Database,
  Shield,
  Zap
} from 'lucide-react';

interface ReviewIssue {
  category: 'content' | 'links' | 'accessibility' | 'performance' | 'ui' | 'functionality';
  severity: 'critical' | 'high' | 'medium' | 'low';
  page: string;
  issue: string;
  description: string;
  fix: string;
  status: 'fail' | 'warning' | 'pass';
}

interface PageReview {
  path: string;
  title: string;
  hasPlaceholder: boolean;
  brokenLinks: string[];
  missingContent: string[];
  accessibilityIssues: string[];
  performanceIssues: string[];
  uiIssues: string[];
  functionalityIssues: string[];
  overallStatus: 'ready' | 'needs-work' | 'critical-issues';
}

export function ComprehensivePlatformReview() {
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewProgress, setReviewProgress] = useState(0);
  const [issues, setIssues] = useState<ReviewIssue[]>([]);
  const [pageReviews, setPageReviews] = useState<PageReview[]>([]);
  const [overallScore, setOverallScore] = useState(0);
  const [lastReviewed, setLastReviewed] = useState<Date | null>(null);

  // Define all platform pages for comprehensive review
  const platformPages = [
    { path: '/', title: 'Home Page', critical: true },
    { path: '/auth', title: 'Authentication', critical: true },
    { path: '/marketplace', title: 'Marketplace', critical: true },
    { path: '/request-audit', title: 'Request Audit', critical: true },
    { path: '/dashboard', title: 'Dashboard', critical: true },
    { path: '/auditor-dashboard', title: 'Auditor Dashboard', critical: true },
    { path: '/project-dashboard', title: 'Project Dashboard', critical: true },
    { path: '/profile', title: 'Profile', critical: true },
    { path: '/settings', title: 'Settings', critical: true },
    { path: '/support', title: 'Support', critical: false },
    { path: '/audits', title: 'Audits', critical: false },
    { path: '/ai-matching-hub', title: 'AI Matching', critical: false },
    { path: '/forum', title: 'Forum', critical: false },
    { path: '/leaderboard', title: 'Leaderboard', critical: false },
    { path: '/events', title: 'Events', critical: false },
    { path: '/knowledge-base', title: 'Knowledge Base', critical: false },
    { path: '/tutorials', title: 'Tutorials', critical: false },
    { path: '/security-guides', title: 'Security Guides', critical: false },
    { path: '/audit-guidelines', title: 'Audit Guidelines', critical: false }
  ];

  const runComprehensiveReview = async () => {
    setIsReviewing(true);
    setReviewProgress(0);
    const allIssues: ReviewIssue[] = [];
    const allPageReviews: PageReview[] = [];

    // Step 1: Content Review (25%)
    console.log('Starting content review...');
    setReviewProgress(10);

    // Check for placeholder content
    const placeholderTexts = [
      'lorem ipsum',
      'placeholder',
      'coming soon',
      'under construction',
      'todo',
      'fixme',
      'test content',
      'sample text',
      'dummy data'
    ];

    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
    textElements.forEach(element => {
      const text = element.textContent?.toLowerCase() || '';
      placeholderTexts.forEach(placeholder => {
        if (text.includes(placeholder)) {
          allIssues.push({
            category: 'content',
            severity: 'medium',
            page: window.location.pathname,
            issue: 'Placeholder content found',
            description: `Found "${placeholder}" in page content`,
            fix: 'Replace with final content',
            status: 'warning'
          });
        }
      });
    });

    setReviewProgress(25);

    // Step 2: Link Validation (50%)
    console.log('Starting link validation...');
    const links = document.querySelectorAll('a');
    const brokenLinks: string[] = [];

    links.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href === '#' || href === '') {
        brokenLinks.push(link.textContent || 'unnamed link');
        allIssues.push({
          category: 'links',
          severity: 'medium',
          page: window.location.pathname,
          issue: 'Broken or empty link',
          description: `Link with no destination: "${link.textContent}"`,
          fix: 'Add proper href or remove link',
          status: 'warning'
        });
      }

      // Check for external links without proper attributes
      if (href?.startsWith('http') && !link.getAttribute('target')) {
        allIssues.push({
          category: 'links',
          severity: 'low',
          page: window.location.pathname,
          issue: 'External link missing target',
          description: `External link should open in new tab: "${href}"`,
          fix: 'Add target="_blank" and rel="noopener noreferrer"',
          status: 'warning'
        });
      }
    });

    setReviewProgress(50);

    // Step 3: Accessibility Review (75%)
    console.log('Starting accessibility review...');
    const accessibilityIssues: string[] = [];

    // Check for images without alt text
    const images = document.querySelectorAll('img:not([alt])');
    if (images.length > 0) {
      accessibilityIssues.push(`${images.length} images missing alt text`);
      allIssues.push({
        category: 'accessibility',
        severity: 'high',
        page: window.location.pathname,
        issue: 'Images missing alt text',
        description: `${images.length} images without descriptive alt text`,
        fix: 'Add meaningful alt attributes to all images',
        status: 'fail'
      });
    }

    // Check for form inputs without labels
    const unlabeledInputs = document.querySelectorAll('input:not([aria-label]):not([id])');
    if (unlabeledInputs.length > 0) {
      accessibilityIssues.push(`${unlabeledInputs.length} form inputs missing labels`);
      allIssues.push({
        category: 'accessibility',
        severity: 'high',
        page: window.location.pathname,
        issue: 'Form inputs missing labels',
        description: `${unlabeledInputs.length} inputs without proper labels`,
        fix: 'Add labels or aria-label attributes to all form inputs',
        status: 'fail'
      });
    }

    // Check for buttons without accessible names
    const unlabeledButtons = document.querySelectorAll('button:not([aria-label]):empty');
    if (unlabeledButtons.length > 0) {
      accessibilityIssues.push(`${unlabeledButtons.length} buttons missing accessible names`);
      allIssues.push({
        category: 'accessibility',
        severity: 'medium',
        page: window.location.pathname,
        issue: 'Buttons missing accessible names',
        description: `${unlabeledButtons.length} buttons without text or aria-label`,
        fix: 'Add text content or aria-label to all buttons',
        status: 'warning'
      });
    }

    setReviewProgress(75);

    // Step 4: UI/UX Review (90%)
    console.log('Starting UI/UX review...');
    const uiIssues: string[] = [];

    // Check for responsive design issues
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      uiIssues.push('Missing viewport meta tag');
      allIssues.push({
        category: 'ui',
        severity: 'high',
        page: window.location.pathname,
        issue: 'Missing viewport meta tag',
        description: 'Page may not display correctly on mobile devices',
        fix: 'Add viewport meta tag to document head',
        status: 'fail'
      });
    }

    // Check for loading states
    const loadingElements = document.querySelectorAll('[data-loading], .loading, .spinner');
    if (loadingElements.length === 0) {
      uiIssues.push('No loading states detected');
      allIssues.push({
        category: 'ui',
        severity: 'low',
        page: window.location.pathname,
        issue: 'Missing loading states',
        description: 'No loading indicators found for better UX',
        fix: 'Add loading states for async operations',
        status: 'warning'
      });
    }

    setReviewProgress(90);

    // Step 5: Functionality Review (100%)
    console.log('Starting functionality review...');
    const functionalityIssues: string[] = [];

    // Check for error boundaries
    const errorBoundaries = document.querySelectorAll('[data-error-boundary]');
    if (errorBoundaries.length === 0) {
      functionalityIssues.push('No error boundaries detected');
      allIssues.push({
        category: 'functionality',
        severity: 'medium',
        page: window.location.pathname,
        issue: 'Missing error boundaries',
        description: 'No error boundaries to handle JavaScript errors gracefully',
        fix: 'Implement error boundaries for better error handling',
        status: 'warning'
      });
    }

    // Check for form validation
    const forms = document.querySelectorAll('form');
    let formsWithoutValidation = 0;
    forms.forEach(form => {
      const requiredFields = form.querySelectorAll('[required]');
      if (requiredFields.length === 0) {
        formsWithoutValidation++;
      }
    });

    if (formsWithoutValidation > 0) {
      functionalityIssues.push(`${formsWithoutValidation} forms missing validation`);
      allIssues.push({
        category: 'functionality',
        severity: 'medium',
        page: window.location.pathname,
        issue: 'Forms missing validation',
        description: `${formsWithoutValidation} forms without required field validation`,
        fix: 'Add proper form validation to all forms',
        status: 'warning'
      });
    }

    setReviewProgress(100);

    // Create page review summary
    const currentPageReview: PageReview = {
      path: window.location.pathname,
      title: document.title || 'Current Page',
      hasPlaceholder: placeholderTexts.some(p => document.body.textContent?.toLowerCase().includes(p)),
      brokenLinks,
      missingContent: [],
      accessibilityIssues,
      performanceIssues: [],
      uiIssues,
      functionalityIssues,
      overallStatus: allIssues.filter(i => i.status === 'fail').length > 0 ? 'critical-issues' :
                   allIssues.filter(i => i.status === 'warning').length > 3 ? 'needs-work' : 'ready'
    };

    allPageReviews.push(currentPageReview);

    // Calculate overall score
    const criticalIssues = allIssues.filter(i => i.severity === 'critical' || i.status === 'fail').length;
    const highIssues = allIssues.filter(i => i.severity === 'high').length;
    const mediumIssues = allIssues.filter(i => i.severity === 'medium').length;
    const lowIssues = allIssues.filter(i => i.severity === 'low').length;

    const totalIssues = criticalIssues + highIssues + mediumIssues + lowIssues;
    const weightedScore = totalIssues === 0 ? 100 : Math.max(0, 100 - (criticalIssues * 25 + highIssues * 15 + mediumIssues * 10 + lowIssues * 5));

    setIssues(allIssues);
    setPageReviews(allPageReviews);
    setOverallScore(Math.round(weightedScore));
    setLastReviewed(new Date());
    setIsReviewing(false);
  };

  useEffect(() => {
    runComprehensiveReview();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'fail': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      critical: 'destructive',
      high: 'destructive',
      medium: 'warning',
      low: 'outline'
    } as const;
    
    return (
      <Badge variant={variants[severity as keyof typeof variants] || 'outline'}>
        {severity.charAt(0).toUpperCase() + severity.slice(1)}
      </Badge>
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const criticalIssues = issues.filter(i => i.severity === 'critical' || i.status === 'fail').length;
  const totalIssues = issues.length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Platform Launch Readiness Review</h2>
          <p className="text-muted-foreground mt-2">
            Comprehensive analysis for production deployment readiness
          </p>
          {lastReviewed && (
            <p className="text-sm text-muted-foreground mt-1">
              Last reviewed: {lastReviewed.toLocaleString()}
            </p>
          )}
        </div>
        <Button onClick={runComprehensiveReview} disabled={isReviewing}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isReviewing ? 'animate-spin' : ''}`} />
          {isReviewing ? 'Reviewing...' : 'Re-review'}
        </Button>
      </div>

      {isReviewing && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Review Progress</span>
                <span>{reviewProgress}%</span>
              </div>
              <Progress value={reviewProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Overall Score Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Platform Readiness Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className={`text-5xl font-bold ${getScoreColor(overallScore)}`}>
              {overallScore}%
            </div>
            <div className="flex-1 space-y-3">
              <Progress value={overallScore} className="h-4" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {issues.filter(i => i.severity === 'critical' || i.status === 'fail').length}
                  </div>
                  <div className="text-xs text-muted-foreground">Critical</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    {issues.filter(i => i.severity === 'high').length}
                  </div>
                  <div className="text-xs text-muted-foreground">High</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {issues.filter(i => i.severity === 'medium').length}
                  </div>
                  <div className="text-xs text-muted-foreground">Medium</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {issues.filter(i => i.severity === 'low').length}
                  </div>
                  <div className="text-xs text-muted-foreground">Low</div>
                </div>
              </div>
            </div>
          </div>
          
          {criticalIssues > 0 && (
            <Alert variant="destructive" className="mt-6">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>{criticalIssues} critical issues</strong> must be resolved before launch. 
                The platform is not ready for production deployment.
              </AlertDescription>
            </Alert>
          )}
          
          {overallScore >= 90 && criticalIssues === 0 && (
            <Alert className="mt-6 bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>Platform ready for launch!</strong> All critical checks passed with excellent score.
              </AlertDescription>
            </Alert>
          )}

          {overallScore >= 75 && overallScore < 90 && criticalIssues === 0 && (
            <Alert className="mt-6 bg-yellow-50 border-yellow-200">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>Platform mostly ready.</strong> Consider addressing remaining issues for optimal user experience.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Detailed Results */}
      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="issues">All Issues</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="accessibility">A11y</TabsTrigger>
          <TabsTrigger value="recommendations">Fixes</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Content Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Placeholder Content</span>
                    <Badge variant={issues.filter(i => i.category === 'content').length > 0 ? 'warning' : 'success'}>
                      {issues.filter(i => i.category === 'content').length === 0 ? 'Clean' : `${issues.filter(i => i.category === 'content').length} Found`}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <LinkIcon className="h-4 w-4" />
                  Link Validation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Broken Links</span>
                    <Badge variant={issues.filter(i => i.category === 'links').length > 0 ? 'warning' : 'success'}>
                      {issues.filter(i => i.category === 'links').length}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Accessibility className="h-4 w-4" />
                  Accessibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">A11y Issues</span>
                    <Badge variant={issues.filter(i => i.category === 'accessibility').length > 0 ? 'destructive' : 'success'}>
                      {issues.filter(i => i.category === 'accessibility').length}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Monitor className="h-4 w-4" />
                  UI/UX
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">UI Issues</span>
                    <Badge variant={issues.filter(i => i.category === 'ui').length > 0 ? 'warning' : 'success'}>
                      {issues.filter(i => i.category === 'ui').length}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Functionality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Function Issues</span>
                    <Badge variant={issues.filter(i => i.category === 'functionality').length > 0 ? 'warning' : 'success'}>
                      {issues.filter(i => i.category === 'functionality').length}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Overall Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Launch Ready</span>
                    <Badge variant={overallScore >= 90 && criticalIssues === 0 ? 'success' : 'warning'}>
                      {overallScore >= 90 && criticalIssues === 0 ? 'Yes' : 'Needs Work'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="issues">
          <div className="space-y-3">
            {issues.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Issues Found!</h3>
                  <p className="text-muted-foreground">
                    The platform appears to be in excellent condition for launch.
                  </p>
                </CardContent>
              </Card>
            ) : (
              issues.map((issue, index) => (
                <Alert key={index} variant={issue.status === 'fail' ? 'destructive' : 'default'}>
                  {getStatusIcon(issue.status)}
                  <AlertDescription>
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <strong>{issue.issue}</strong>
                          {getSeverityBadge(issue.severity)}
                          <Badge variant="outline">{issue.category}</Badge>
                        </div>
                        <p className="text-sm mb-2">{issue.description}</p>
                        <div className="bg-blue-50 dark:bg-blue-950/20 p-2 rounded text-sm">
                          <strong>Fix:</strong> {issue.fix}
                        </div>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="content">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Content Quality Review</h3>
            {issues.filter(i => i.category === 'content').length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p>All content appears to be finalized. No placeholder content detected.</p>
                </CardContent>
              </Card>
            ) : (
              issues.filter(i => i.category === 'content').map((issue, index) => (
                <Alert key={index}>
                  <FileText className="h-4 w-4" />
                  <AlertDescription>
                    <strong>{issue.issue}:</strong> {issue.description}
                    <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-950/20 rounded text-sm">
                      <strong>Action needed:</strong> {issue.fix}
                    </div>
                  </AlertDescription>
                </Alert>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="accessibility">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Accessibility Compliance</h3>
            {issues.filter(i => i.category === 'accessibility').length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p>Great! No major accessibility issues detected.</p>
                </CardContent>
              </Card>
            ) : (
              issues.filter(i => i.category === 'accessibility').map((issue, index) => (
                <Alert key={index} variant={issue.status === 'fail' ? 'destructive' : 'default'}>
                  <Accessibility className="h-4 w-4" />
                  <AlertDescription>
                    <div className="flex justify-between items-start">
                      <div>
                        <strong>{issue.issue}</strong>
                        <p className="text-sm mt-1">{issue.description}</p>
                        <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-950/20 rounded text-sm">
                          <strong>Fix:</strong> {issue.fix}
                        </div>
                      </div>
                      {getSeverityBadge(issue.severity)}
                    </div>
                  </AlertDescription>
                </Alert>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="recommendations">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Priority Fixes for Launch</h3>
            
            {/* Critical Issues First */}
            {issues.filter(i => i.severity === 'critical' || i.status === 'fail').length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-red-600 flex items-center gap-2">
                  <XCircle className="h-4 w-4" />
                  Critical Issues (Must Fix Before Launch)
                </h4>
                {issues.filter(i => i.severity === 'critical' || i.status === 'fail').map((issue, index) => (
                  <Card key={index} className="border-red-200">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                        <div className="flex-1">
                          <h5 className="font-medium">{issue.issue}</h5>
                          <p className="text-sm text-muted-foreground mb-2">{issue.description}</p>
                          <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-md">
                            <p className="text-sm font-medium text-red-800 dark:text-red-200">
                              Required Fix: {issue.fix}
                            </p>
                          </div>
                        </div>
                        {getSeverityBadge(issue.severity)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* High Priority Issues */}
            {issues.filter(i => i.severity === 'high' && i.status !== 'fail').length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-orange-600 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  High Priority Issues (Recommended for Launch)
                </h4>
                {issues.filter(i => i.severity === 'high' && i.status !== 'fail').map((issue, index) => (
                  <Card key={index} className="border-orange-200">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                        <div className="flex-1">
                          <h5 className="font-medium">{issue.issue}</h5>
                          <p className="text-sm text-muted-foreground mb-2">{issue.description}</p>
                          <div className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded-md">
                            <p className="text-sm"><strong>Recommended Fix:</strong> {issue.fix}</p>
                          </div>
                        </div>
                        {getSeverityBadge(issue.severity)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Medium and Low Priority */}
            {issues.filter(i => i.severity === 'medium' || i.severity === 'low').length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-blue-600 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Enhancement Opportunities (Post-Launch)
                </h4>
                {issues.filter(i => i.severity === 'medium' || i.severity === 'low').slice(0, 5).map((issue, index) => (
                  <Card key={index}>
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div className="flex-1">
                          <h5 className="font-medium">{issue.issue}</h5>
                          <p className="text-sm text-muted-foreground mb-2">{issue.description}</p>
                          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-md">
                            <p className="text-sm"><strong>Enhancement:</strong> {issue.fix}</p>
                          </div>
                        </div>
                        {getSeverityBadge(issue.severity)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {issues.filter(i => i.severity === 'medium' || i.severity === 'low').length > 5 && (
                  <p className="text-sm text-muted-foreground text-center">
                    And {issues.filter(i => i.severity === 'medium' || i.severity === 'low').length - 5} more enhancement opportunities...
                  </p>
                )}
              </div>
            )}

            {issues.length === 0 && (
              <Card>
                <CardContent className="pt-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Platform Ready for Launch!</h3>
                  <p className="text-muted-foreground">
                    No critical issues found. The platform meets launch readiness criteria.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

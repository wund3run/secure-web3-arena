
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, AlertCircle, ExternalLink, Eye, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PageAuditResult {
  path: string;
  name: string;
  category: string;
  scores: {
    design: number;
    seo: number;
    navigation: number;
    content: number;
    overall: number;
  };
  issues: string[];
  recommendations: string[];
  ctaButtons: { text: string; href: string; works: boolean }[];
}

export function PageQualityAudit() {
  const [auditResults, setAuditResults] = useState<PageAuditResult[]>([]);
  const [isAuditing, setIsAuditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const pages = [
    { path: '/', name: 'Homepage', category: 'core' },
    { path: '/marketplace', name: 'Marketplace', category: 'core' },
    { path: '/auth', name: 'Authentication', category: 'core' },
    { path: '/request-audit', name: 'Request Audit', category: 'core' },
    { path: '/dashboard', name: 'Dashboard', category: 'core' },
    { path: '/security-audits', name: 'Security Audits', category: 'service' },
    { path: '/code-reviews', name: 'Code Reviews', category: 'service' },
    { path: '/penetration-testing', name: 'Penetration Testing', category: 'service' },
    { path: '/consulting', name: 'Consulting', category: 'service' },
    { path: '/resources', name: 'Resources', category: 'resource' },
    { path: '/vulnerabilities', name: 'Vulnerabilities', category: 'resource' },
    { path: '/ai-tools', name: 'AI Tools', category: 'resource' },
    { path: '/about', name: 'About', category: 'business' },
    { path: '/contact', name: 'Contact', category: 'business' },
    { path: '/pricing', name: 'Pricing', category: 'business' }
  ];

  const auditPage = async (page: { path: string; name: string; category: string }): Promise<PageAuditResult> => {
    // Simulate audit process - in real implementation, this would check actual page content
    const mockAudit: PageAuditResult = {
      path: page.path,
      name: page.name,
      category: page.category,
      scores: {
        design: Math.floor(Math.random() * 40) + 60, // 60-100
        seo: Math.floor(Math.random() * 50) + 50,    // 50-100
        navigation: Math.floor(Math.random() * 30) + 70, // 70-100
        content: Math.floor(Math.random() * 40) + 60,    // 60-100
        overall: 0
      },
      issues: [],
      recommendations: [],
      ctaButtons: []
    };

    // Calculate overall score
    mockAudit.scores.overall = Math.round(
      (mockAudit.scores.design + mockAudit.scores.seo + mockAudit.scores.navigation + mockAudit.scores.content) / 4
    );

    // Generate issues based on scores
    if (mockAudit.scores.seo < 70) {
      mockAudit.issues.push('Missing or incomplete SEO meta tags');
      mockAudit.recommendations.push('Add comprehensive meta descriptions and structured data');
    }
    if (mockAudit.scores.design < 80) {
      mockAudit.issues.push('Inconsistent design elements');
      mockAudit.recommendations.push('Update to use latest design system components');
    }
    if (mockAudit.scores.navigation < 85) {
      mockAudit.issues.push('Navigation flow could be improved');
      mockAudit.recommendations.push('Optimize user journey and CTA placement');
    }
    if (mockAudit.scores.content < 75) {
      mockAudit.issues.push('Content needs optimization');
      mockAudit.recommendations.push('Improve content structure and readability');
    }

    // Mock CTA buttons
    if (page.path === '/') {
      mockAudit.ctaButtons = [
        { text: 'Find Security Experts', href: '/marketplace', works: true },
        { text: 'Request Free Quote', href: '/request-audit', works: true },
        { text: 'Browse Services', href: '/marketplace', works: true }
      ];
    } else if (page.category === 'service') {
      mockAudit.ctaButtons = [
        { text: 'Get Started', href: '/request-audit', works: true },
        { text: 'View Pricing', href: '/pricing', works: true }
      ];
    }

    return mockAudit;
  };

  const runAudit = async () => {
    setIsAuditing(true);
    const results: PageAuditResult[] = [];
    
    for (const page of pages) {
      const result = await auditPage(page);
      results.push(result);
      setAuditResults([...results]); // Update progressively
      await new Promise(resolve => setTimeout(resolve, 200)); // Simulate time
    }
    
    setIsAuditing(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 75) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const filteredResults = selectedCategory === 'all' 
    ? auditResults 
    : auditResults.filter(result => result.category === selectedCategory);

  const overallStats = {
    total: auditResults.length,
    excellent: auditResults.filter(r => r.scores.overall >= 90).length,
    good: auditResults.filter(r => r.scores.overall >= 75 && r.scores.overall < 90).length,
    needsWork: auditResults.filter(r => r.scores.overall < 75).length,
    avgScore: auditResults.length > 0 
      ? Math.round(auditResults.reduce((sum, r) => sum + r.scores.overall, 0) / auditResults.length)
      : 0
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Platform Quality Audit</h1>
          <p className="text-muted-foreground">
            Comprehensive analysis of design, SEO, navigation, and user journey
          </p>
        </div>
        <Button onClick={runAudit} disabled={isAuditing}>
          {isAuditing ? 'Auditing...' : 'Run Audit'}
        </Button>
      </div>

      {/* Overall Stats */}
      {auditResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{overallStats.total}</div>
              <p className="text-xs text-muted-foreground">Total Pages</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">{overallStats.excellent}</div>
              <p className="text-xs text-muted-foreground">Excellent (90+)</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-600">{overallStats.good}</div>
              <p className="text-xs text-muted-foreground">Good (75-89)</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-red-600">{overallStats.needsWork}</div>
              <p className="text-xs text-muted-foreground">Needs Work (<75)</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{overallStats.avgScore}</div>
              <p className="text-xs text-muted-foreground">Average Score</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex gap-2">
        {['all', 'core', 'service', 'resource', 'business'].map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>

      {/* Audit Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredResults.map((result, index) => (
          <Card key={result.path} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {result.name}
                  <Badge className={getScoreBadge(result.scores.overall)}>
                    {result.scores.overall}
                  </Badge>
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={result.path}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{result.path}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Score Breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Design</span>
                  <span className={getScoreColor(result.scores.design)}>
                    {result.scores.design}%
                  </span>
                </div>
                <Progress value={result.scores.design} />
                
                <div className="flex justify-between text-sm">
                  <span>SEO</span>
                  <span className={getScoreColor(result.scores.seo)}>
                    {result.scores.seo}%
                  </span>
                </div>
                <Progress value={result.scores.seo} />
                
                <div className="flex justify-between text-sm">
                  <span>Navigation</span>
                  <span className={getScoreColor(result.scores.navigation)}>
                    {result.scores.navigation}%
                  </span>
                </div>
                <Progress value={result.scores.navigation} />
                
                <div className="flex justify-between text-sm">
                  <span>Content</span>
                  <span className={getScoreColor(result.scores.content)}>
                    {result.scores.content}%
                  </span>
                </div>
                <Progress value={result.scores.content} />
              </div>

              {/* CTA Buttons */}
              {result.ctaButtons.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">CTA Buttons</h4>
                  <div className="space-y-1">
                    {result.ctaButtons.map((cta, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span>{cta.text}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">{cta.href}</span>
                          {cta.works ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Issues */}
              {result.issues.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    Issues Found
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {result.issues.map((issue, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-600">•</span>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              {result.recommendations.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Recommendations</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {result.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-600">→</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {isAuditing && auditResults.length === 0 && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Starting comprehensive audit...</p>
        </div>
      )}
    </div>
  );
}

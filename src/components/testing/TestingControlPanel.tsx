
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Play, 
  TestTube, 
  Shield, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { performanceMonitor, PerformanceMetric } from '@/utils/testing/performance-monitor';
import { securityScanner, SecurityIssue } from '@/utils/testing/security-scanner';

export const TestingControlPanel = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  const [securityIssues, setSecurityIssues] = useState<SecurityIssue[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);

  const runPerformanceTest = () => {
    setIsRunningTests(true);
    const metrics = performanceMonitor.getMetrics();
    setPerformanceMetrics(metrics);
    setIsRunningTests(false);
  };

  const runSecurityScan = () => {
    setIsRunningTests(true);
    const issues = securityScanner.scanPage();
    setSecurityIssues(issues);
    setIsRunningTests(false);
  };

  const runAllTests = () => {
    runPerformanceTest();
    runSecurityScan();
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'text-green-600';
      case 'needs-improvement': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Testing Control Panel</h1>
          <p className="text-muted-foreground">
            Comprehensive testing suite for performance and security
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={runAllTests} disabled={isRunningTests}>
            <Play className="h-4 w-4 mr-2" />
            Run All Tests
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Performance Metrics</p>
                <p className="text-2xl font-bold">{performanceMetrics.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Security Issues</p>
                <p className="text-2xl font-bold text-red-500">{securityIssues.length}</p>
              </div>
              <Shield className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Test Status</p>
                <p className="text-2xl font-bold text-green-500">
                  {isRunningTests ? 'Running' : 'Ready'}
                </p>
              </div>
              <TestTube className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Metrics
              </CardTitle>
              <CardDescription>
                Web Vitals and performance monitoring results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={runPerformanceTest} disabled={isRunningTests}>
                Run Performance Test
              </Button>
              
              {performanceMetrics.length === 0 ? (
                <Alert>
                  <TrendingUp className="h-4 w-4" />
                  <AlertDescription>
                    No performance metrics available. Run a test to see results.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-2">
                  {performanceMetrics.map((metric, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{metric.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Value: {metric.value.toFixed(2)}ms
                          </p>
                        </div>
                        <Badge className={getRatingColor(metric.rating)}>
                          {metric.rating}
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Scan Results
              </CardTitle>
              <CardDescription>
                Automated security vulnerability detection
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={runSecurityScan} disabled={isRunningTests}>
                Run Security Scan
              </Button>
              
              {securityIssues.length === 0 ? (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    No security issues detected. Your application appears secure!
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-2">
                  {securityIssues.map((issue, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant={getSeverityColor(issue.severity)}>
                              {issue.severity}
                            </Badge>
                            <Badge variant="outline">{issue.type}</Badge>
                          </div>
                          <h4 className="font-medium">{issue.description}</h4>
                          <p className="text-sm text-muted-foreground">
                            Recommendation: {issue.recommendation}
                          </p>
                          {issue.element && (
                            <p className="text-xs text-muted-foreground">
                              Element: {issue.element}
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Testing Reports</CardTitle>
              <CardDescription>
                Comprehensive testing reports and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Performance Summary</h4>
                  <div className="space-y-1 text-sm">
                    <p>Total Metrics: {performanceMetrics.length}</p>
                    <p>Good: {performanceMetrics.filter(m => m.rating === 'good').length}</p>
                    <p>Poor: {performanceMetrics.filter(m => m.rating === 'poor').length}</p>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Security Summary</h4>
                  <div className="space-y-1 text-sm">
                    <p>Total Issues: {securityIssues.length}</p>
                    <p>Critical: {securityIssues.filter(i => i.severity === 'critical').length}</p>
                    <p>High: {securityIssues.filter(i => i.severity === 'high').length}</p>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

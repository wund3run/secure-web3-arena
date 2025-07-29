
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  AlertTriangle, 
  Activity,
  Clock,
  Zap
} from 'lucide-react';
import { performanceMonitor, PerformanceMetric } from '@/utils/testing/performance-monitor';
import { securityScanner, SecurityIssue } from '@/utils/testing/security-scanner';

interface TestResult {
  id: string;
  name: string;
  status: 'running' | 'passed' | 'failed' | 'pending';
  duration?: number;
  error?: string;
}

export const TestingControlPanel: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [tests, setTests] = useState<TestResult[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  const [securityIssues, setSecurityIssues] = useState<SecurityIssue[]>([]);

  useEffect(() => {
    // Subscribe to performance metrics
    const unsubscribe = performanceMonitor.subscribe((metric) => {
      setPerformanceMetrics(prev => [metric, ...prev.slice(0, 9)]);
    });

    return unsubscribe;
  }, []);

  const runTests = async () => {
    setIsRunning(true);
    
    // Simulate running tests
    const mockTests: TestResult[] = [
      { id: '1', name: 'Component Rendering', status: 'running' },
      { id: '2', name: 'User Interactions', status: 'pending' },
      { id: '3', name: 'API Integration', status: 'pending' },
      { id: '4', name: 'Performance Metrics', status: 'pending' }
    ];
    
    setTests(mockTests);

    // Simulate test execution
    for (let i = 0; i < mockTests.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setTests(prev => prev.map((test, index) => {
        if (index === i) {
          return {
            ...test,
            status: Math.random() > 0.2 ? 'passed' : 'failed',
            duration: Math.floor(Math.random() * 500) + 100,
            error: Math.random() > 0.2 ? undefined : 'Test failed unexpectedly'
          };
        }
        if (index === i + 1) {
          return { ...test, status: 'running' };
        }
        return test;
      }));
    }

    // Run security scan
    const issues = securityScanner.scanPage();
    setSecurityIssues(issues);

    setIsRunning(false);
  };

  const resetTests = () => {
    setTests([]);
    setPerformanceMetrics([]);
    setSecurityIssues([]);
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'running':
        return <Activity className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: TestResult['status']) => {
    const variants = {
      running: 'default',
      passed: 'default',
      failed: 'destructive',
      pending: 'outline'
    } as const;

    return (
      <Badge variant={variants[status]} className="text-xs">
        {status}
      </Badge>
    );
  };

  const passedTests = tests.filter(t => t.status === 'passed').length;
  const failedTests = tests.filter(t => t.status === 'failed').length;
  const totalTests = tests.length;
  const progress = totalTests > 0 ? ((passedTests + failedTests) / totalTests) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Testing Control Panel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Button 
              onClick={runTests} 
              disabled={isRunning}
              className="flex items-center gap-2"
            >
              {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isRunning ? 'Running...' : 'Run Tests'}
            </Button>
            <Button 
              variant="outline" 
              onClick={resetTests}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>

          {totalTests > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress: {Math.round(progress)}%</span>
                <span>{passedTests} passed, {failedTests} failed</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Test Results */}
      {tests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tests.map((test) => (
                <div key={test.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(test.status)}
                    <div>
                      <div className="font-medium">{test.name}</div>
                      {test.error && (
                        <div className="text-sm text-red-600">{test.error}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {test.duration && (
                      <span className="text-sm text-muted-foreground">
                        {test.duration}ms
                      </span>
                    )}
                    {getStatusBadge(test.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Metrics */}
      {performanceMetrics.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {performanceMetrics.slice(0, 5).map((metric, index) => (
                <div key={index} className="flex justify-between items-center p-2 border rounded">
                  <span className="font-medium">{metric.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{metric.value.toFixed(2)}ms</span>
                    <Badge variant={metric.rating === 'good' ? 'default' : metric.rating === 'needs-improvement' ? 'secondary' : 'destructive'}>
                      {metric.rating}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Issues */}
      {securityIssues.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Security Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {securityIssues.map((issue, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">{issue.type}</span>
                    <Badge variant={issue.severity === 'critical' || issue.severity === 'high' ? 'destructive' : 'secondary'}>
                      {issue.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{issue.description}</p>
                  <p className="text-sm text-green-600">{issue.recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

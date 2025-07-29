
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Bug, 
  TestTube, 
  Play, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  BarChart3,
  RefreshCw
} from 'lucide-react';
import { errorMonitoring, testRunner } from '@/utils/testing';
import type { BugReport, TestResult } from '@/utils/testing/ErrorMonitoringService';

export const TestingDashboard = () => {
  const [bugReports, setBugReports] = useState<BugReport[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const refreshData = () => {
    setRefreshing(true);
    setBugReports(errorMonitoring.getBugReports());
    setTestResults(errorMonitoring.getTestResults());
    setTimeout(() => setRefreshing(false), 500);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const runAllTests = async () => {
    setIsRunningTests(true);
    try {
      const results = await testRunner.runAllTests();
      setTestResults(results);
      console.log('All tests completed:', results);
    } catch (error) {
      console.error('Test execution failed:', error);
    } finally {
      setIsRunningTests(false);
    }
  };

  const getTestStats = () => {
    const passed = testResults.filter(t => t.status === 'passed').length;
    const failed = testResults.filter(t => t.status === 'failed').length;
    const total = testResults.length;
    const passRate = total > 0 ? (passed / total) * 100 : 0;

    return { passed, failed, total, passRate };
  };

  const getBugStats = () => {
    const critical = bugReports.filter(b => b.severity === 'critical').length;
    const open = bugReports.filter(b => b.status === 'open').length;
    const resolved = bugReports.filter(b => b.status === 'resolved').length;
    const total = bugReports.length;

    return { critical, open, resolved, total };
  };

  const testStats = getTestStats();
  const bugStats = getBugStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Testing Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor platform health, run tests, and track issues
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={refreshData} disabled={refreshing} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={runAllTests} disabled={isRunningTests}>
            <Play className="h-4 w-4 mr-2" />
            {isRunningTests ? 'Running Tests...' : 'Run All Tests'}
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Test Pass Rate</p>
                <p className="text-2xl font-bold text-green-600">{testStats.passRate.toFixed(1)}%</p>
              </div>
              <TestTube className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tests Run</p>
                <p className="text-2xl font-bold">{testStats.total}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Open Bugs</p>
                <p className="text-2xl font-bold text-orange-600">{bugStats.open}</p>
              </div>
              <Bug className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical Issues</p>
                <p className="text-2xl font-bold text-red-600">{bugStats.critical}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Views */}
      <Tabs defaultValue="tests" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tests">Test Results</TabsTrigger>
          <TabsTrigger value="bugs">Bug Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="tests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5" />
                Test Results ({testStats.total})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {testStats.total > 0 && (
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Pass Rate</span>
                    <span>{testStats.passRate.toFixed(1)}%</span>
                  </div>
                  <Progress value={testStats.passRate} className="w-full" />
                </div>
              )}
              
              <div className="space-y-2">
                {testResults.length === 0 ? (
                  <p className="text-muted-foreground">No test results yet. Run tests to see results.</p>
                ) : (
                  testResults.slice(0, 10).map((result) => (
                    <div key={result.testId} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-3">
                        {result.status === 'passed' ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <div>
                          <p className="font-medium">{result.testName}</p>
                          <p className="text-sm text-muted-foreground">{result.component}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={result.status === 'passed' ? 'default' : 'destructive'}>
                          {result.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{result.duration}ms</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bugs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-5 w-5" />
                Bug Reports ({bugStats.total})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {bugReports.length === 0 ? (
                  <p className="text-muted-foreground">No bug reports yet. Great work!</p>
                ) : (
                  bugReports.slice(0, 10).map((bug) => (
                    <div key={bug.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className={`h-4 w-4 ${
                          bug.severity === 'critical' ? 'text-red-500' :
                          bug.severity === 'high' ? 'text-orange-500' :
                          bug.severity === 'medium' ? 'text-yellow-500' :
                          'text-blue-500'
                        }`} />
                        <div>
                          <p className="font-medium">{bug.title}</p>
                          <p className="text-sm text-muted-foreground">{bug.component}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          bug.severity === 'critical' ? 'destructive' :
                          bug.severity === 'high' ? 'destructive' :
                          bug.severity === 'medium' ? 'secondary' :
                          'default'
                        }>
                          {bug.severity}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {bug.timestamp.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Testing Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Bug Categories</h4>
                  {['ui', 'performance', 'security', 'data'].map(category => {
                    const count = bugReports.filter(b => b.category === category).length;
                    return (
                      <div key={category} className="flex justify-between">
                        <span className="text-sm capitalize">{category}</span>
                        <span className="text-sm font-medium">{count}</span>
                      </div>
                    );
                  })}
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Test Components</h4>
                  {['Navigation', 'Forms', 'Authentication', 'UI'].map(component => {
                    const count = testResults.filter(t => t.component === component).length;
                    return (
                      <div key={component} className="flex justify-between">
                        <span className="text-sm">{component}</span>
                        <span className="text-sm font-medium">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

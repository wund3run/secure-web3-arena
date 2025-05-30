
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Bug, 
  TestTube, 
  Play, 
  Pause, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Filter
} from 'lucide-react';
import { errorMonitoring, BugReport, TestResult } from '@/utils/testing/ErrorMonitoringService';
import { testRunner } from '@/utils/testing/AutomatedTestRunner';
import { initializeTestSuites } from '@/utils/testing/ComponentTestSuites';

export const TestingDashboard = () => {
  const [bugReports, setBugReports] = useState<BugReport[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [filters, setFilters] = useState({
    severity: [] as string[],
    category: [] as string[],
    status: [] as string[]
  });

  useEffect(() => {
    // Initialize test suites
    initializeTestSuites();
    
    // Start error monitoring
    errorMonitoring.startMonitoring();
    
    // Load existing data
    refreshData();
    
    return () => {
      errorMonitoring.stopMonitoring();
    };
  }, []);

  const refreshData = () => {
    setBugReports(errorMonitoring.getBugReports(filters));
    setTestResults(errorMonitoring.getTestResults());
  };

  const runAllTests = async () => {
    setIsRunningTests(true);
    setTestProgress(0);
    
    try {
      const results = await testRunner.runAllTests();
      setTestResults(results);
      setTestProgress(100);
    } catch (error) {
      console.error('Test run failed:', error);
    } finally {
      setIsRunningTests(false);
    }
  };

  const updateBugStatus = (bugId: string, status: BugReport['status']) => {
    errorMonitoring.updateBugStatus(bugId, status);
    refreshData();
  };

  const report = errorMonitoring.generateReport();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'skipped': return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Testing Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive testing and bug tracking system
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={refreshData} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button 
            onClick={runAllTests} 
            disabled={isRunningTests}
            className="bg-gradient-to-r from-blue-500 to-purple-500"
          >
            {isRunningTests ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Running...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Run Tests
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Bugs</p>
                <p className="text-2xl font-bold">{report.summary.totalBugs}</p>
              </div>
              <Bug className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical Bugs</p>
                <p className="text-2xl font-bold text-red-500">{report.summary.criticalBugs}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tests Passed</p>
                <p className="text-2xl font-bold text-green-500">{report.summary.testsPassed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tests Failed</p>
                <p className="text-2xl font-bold text-red-500">{report.summary.testsFailed}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Test Progress */}
      {isRunningTests && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Running Tests...</span>
                <span className="text-sm text-muted-foreground">{testProgress}%</span>
              </div>
              <Progress value={testProgress} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="bugs" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="bugs">Bug Reports</TabsTrigger>
          <TabsTrigger value="tests">Test Results</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="bugs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-5 w-5" />
                Bug Reports ({bugReports.length})
              </CardTitle>
              <CardDescription>
                Track and manage identified issues
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {bugReports.length === 0 ? (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    No bugs detected! The system is running smoothly.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-2">
                  {bugReports.slice(0, 10).map((bug) => (
                    <Card key={bug.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant={getSeverityColor(bug.severity)}>
                              {bug.severity}
                            </Badge>
                            <Badge variant="outline">{bug.category}</Badge>
                            <span className="text-sm text-muted-foreground">
                              {bug.component}
                            </span>
                          </div>
                          <h4 className="font-medium">{bug.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {bug.description}
                          </p>
                          <div className="text-xs text-muted-foreground">
                            {bug.timestamp.toLocaleString()}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateBugStatus(bug.id, 'in_progress')}
                            disabled={bug.status !== 'open'}
                          >
                            Start Fix
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => updateBugStatus(bug.id, 'resolved')}
                            disabled={bug.status === 'resolved'}
                          >
                            Resolve
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5" />
                Test Results ({testResults.length})
              </CardTitle>
              <CardDescription>
                Latest automated test execution results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {testResults.length === 0 ? (
                <Alert>
                  <TestTube className="h-4 w-4" />
                  <AlertDescription>
                    No test results yet. Run the test suite to see results.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-2">
                  {testResults.slice(0, 10).map((test) => (
                    <Card key={test.testId} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(test.status)}
                          <div>
                            <h4 className="font-medium">{test.testName}</h4>
                            <p className="text-sm text-muted-foreground">
                              {test.component} • {test.duration}ms
                            </p>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {test.timestamp.toLocaleString()}
                        </div>
                      </div>
                      {test.error && (
                        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                          {test.error.message}
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Bugs by Severity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(report.bugsBySeverity).map(([severity, count]) => (
                    <div key={severity} className="flex items-center justify-between">
                      <Badge variant={getSeverityColor(severity)}>{severity}</Badge>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bugs by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(report.bugsByCategory).map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between">
                      <Badge variant="outline">{category}</Badge>
                      <span className="font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Testing Configuration</CardTitle>
              <CardDescription>
                Configure monitoring and testing behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button 
                  onClick={() => errorMonitoring.clearAllReports()}
                  variant="destructive"
                >
                  Clear All Data
                </Button>
                <Button 
                  onClick={() => testRunner.clearTestSuites()}
                  variant="outline"
                >
                  Reset Test Suites
                </Button>
              </div>
              
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  This testing framework is designed for development and staging environments. 
                  Do not run in production without proper configuration.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

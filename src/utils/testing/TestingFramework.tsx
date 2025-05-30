
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, Play } from 'lucide-react';

interface TestResult {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'running' | 'pending';
  duration?: number;
  error?: string;
}

interface TestSuite {
  id: string;
  name: string;
  tests: TestResult[];
}

export const TestingFramework: React.FC = () => {
  const [testSuites, setTestSuites] = useState<TestSuite[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const mockTestSuites: TestSuite[] = [
    {
      id: 'auth',
      name: 'Authentication Tests',
      tests: [
        { id: 'auth-1', name: 'User can sign in', status: 'pending' },
        { id: 'auth-2', name: 'User can sign out', status: 'pending' },
        { id: 'auth-3', name: 'Invalid credentials are rejected', status: 'pending' },
      ],
    },
    {
      id: 'marketplace',
      name: 'Marketplace Tests',
      tests: [
        { id: 'market-1', name: 'Services load correctly', status: 'pending' },
        { id: 'market-2', name: 'Filters work properly', status: 'pending' },
        { id: 'market-3', name: 'Service details display', status: 'pending' },
      ],
    },
    {
      id: 'audit',
      name: 'Audit Request Tests',
      tests: [
        { id: 'audit-1', name: 'Can create audit request', status: 'pending' },
        { id: 'audit-2', name: 'Form validation works', status: 'pending' },
        { id: 'audit-3', name: 'Can view audit details', status: 'pending' },
      ],
    },
  ];

  useEffect(() => {
    setTestSuites(mockTestSuites);
  }, []);

  const runTests = async () => {
    setIsRunning(true);
    
    for (const suite of testSuites) {
      const updatedSuite = { ...suite };
      
      for (let i = 0; i < updatedSuite.tests.length; i++) {
        // Mark test as running
        updatedSuite.tests[i] = { ...updatedSuite.tests[i], status: 'running' };
        setTestSuites(prev => prev.map(s => s.id === suite.id ? updatedSuite : s));
        
        // Simulate test execution
        await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 500));
        
        // Random pass/fail for demo
        const passed = Math.random() > 0.2; // 80% pass rate
        updatedSuite.tests[i] = {
          ...updatedSuite.tests[i],
          status: passed ? 'passed' : 'failed',
          duration: Math.floor(Math.random() * 1000 + 100),
          error: passed ? undefined : 'Test assertion failed',
        };
        
        setTestSuites(prev => prev.map(s => s.id === suite.id ? updatedSuite : s));
      }
    }
    
    setIsRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'running':
        return <Clock className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      passed: 'default',
      failed: 'destructive',
      running: 'secondary',
      pending: 'outline',
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'outline'}>
        {status}
      </Badge>
    );
  };

  const totalTests = testSuites.reduce((acc, suite) => acc + suite.tests.length, 0);
  const passedTests = testSuites.reduce(
    (acc, suite) => acc + suite.tests.filter(t => t.status === 'passed').length,
    0
  );
  const failedTests = testSuites.reduce(
    (acc, suite) => acc + suite.tests.filter(t => t.status === 'failed').length,
    0
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Testing Framework</CardTitle>
          <Button 
            onClick={runTests} 
            disabled={isRunning}
            className="flex items-center gap-2"
          >
            <Play className="h-4 w-4" />
            {isRunning ? 'Running Tests...' : 'Run All Tests'}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{totalTests}</div>
              <div className="text-sm text-muted-foreground">Total Tests</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{passedTests}</div>
              <div className="text-sm text-muted-foreground">Passed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{failedTests}</div>
              <div className="text-sm text-muted-foreground">Failed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">{totalTests - passedTests - failedTests}</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {testSuites.map((suite) => (
        <Card key={suite.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {suite.name}
              <div className="flex gap-2">
                {getStatusBadge(
                  suite.tests.every(t => t.status === 'passed') ? 'passed' :
                  suite.tests.some(t => t.status === 'failed') ? 'failed' :
                  suite.tests.some(t => t.status === 'running') ? 'running' : 'pending'
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {suite.tests.map((test) => (
                <div key={test.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(test.status)}
                    <span className="font-medium">{test.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {test.duration && (
                      <span className="text-sm text-muted-foreground">
                        {test.duration}ms
                      </span>
                    )}
                    {getStatusBadge(test.status)}
                  </div>
                  {test.error && (
                    <div className="text-sm text-red-600 mt-1">{test.error}</div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TestingFramework;

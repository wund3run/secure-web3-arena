
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Activity, 
  Users, 
  Zap, 
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Server
} from 'lucide-react';

interface LoadTestConfig {
  id: string;
  name: string;
  description: string;
  virtualUsers: number;
  duration: number;
  rampUpTime: number;
  targetEndpoints: string[];
  expectedThroughput: number;
  maxResponseTime: number;
}

interface LoadTestResult {
  id: string;
  configId: string;
  startTime: Date;
  endTime?: Date;
  status: 'running' | 'completed' | 'failed';
  virtualUsers: number;
  totalRequests: number;
  successfulRequests: number;
  averageResponseTime: number;
  maxResponseTime: number;
  throughput: number;
  errorRate: number;
  bottlenecks: string[];
  recommendations: string[];
}

export const LoadTestingSuite = () => {
  const [testConfigs, setTestConfigs] = useState<LoadTestConfig[]>([]);
  const [testResults, setTestResults] = useState<LoadTestResult[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [selectedTest, setSelectedTest] = useState<string>('');

  const defaultConfigs: LoadTestConfig[] = [
    {
      id: 'light-load',
      name: 'Light Load Test',
      description: 'Basic load test with moderate traffic',
      virtualUsers: 100,
      duration: 300, // 5 minutes
      rampUpTime: 60,
      targetEndpoints: ['/api/audits', '/api/auditors', '/dashboard'],
      expectedThroughput: 50,
      maxResponseTime: 2000
    },
    {
      id: 'peak-load',
      name: 'Peak Load Test',
      description: 'High traffic simulation for peak usage',
      virtualUsers: 500,
      duration: 600, // 10 minutes
      rampUpTime: 120,
      targetEndpoints: ['/api/audits', '/api/auditors', '/dashboard', '/audit-request'],
      expectedThroughput: 200,
      maxResponseTime: 3000
    },
    {
      id: 'stress-test',
      name: 'Stress Test',
      description: 'Push system beyond normal capacity',
      virtualUsers: 1000,
      duration: 900, // 15 minutes
      rampUpTime: 180,
      targetEndpoints: ['/api/audits', '/api/auditors', '/dashboard', '/realtime'],
      expectedThroughput: 400,
      maxResponseTime: 5000
    },
    {
      id: 'spike-test',
      name: 'Spike Test',
      description: 'Sudden traffic spikes simulation',
      virtualUsers: 2000,
      duration: 300, // 5 minutes
      rampUpTime: 30, // Very quick ramp up
      targetEndpoints: ['/api/audits', '/dashboard'],
      expectedThroughput: 800,
      maxResponseTime: 4000
    }
  ];

  useEffect(() => {
    setTestConfigs(defaultConfigs);
  }, []);

  const runLoadTest = async (configId: string) => {
    setIsRunningTests(true);
    const config = testConfigs.find(c => c.id === configId);
    if (!config) return;

    const testResult: LoadTestResult = {
      id: crypto.randomUUID(),
      configId,
      startTime: new Date(),
      status: 'running',
      virtualUsers: config.virtualUsers,
      totalRequests: 0,
      successfulRequests: 0,
      averageResponseTime: 0,
      maxResponseTime: 0,
      throughput: 0,
      errorRate: 0,
      bottlenecks: [],
      recommendations: []
    };

    setTestResults(prev => [testResult, ...prev]);

    // Simulate load test execution
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate realistic test results
    const totalRequests = config.virtualUsers * config.duration * 0.5;
    const successRate = Math.random() * 0.2 + 0.8; // 80-100% success rate
    const avgResponseTime = Math.random() * 1000 + 500; // 500-1500ms
    const maxResponseTime = avgResponseTime * (1.5 + Math.random() * 0.5);

    const completedResult: LoadTestResult = {
      ...testResult,
      endTime: new Date(),
      status: maxResponseTime > config.maxResponseTime ? 'failed' : 'completed',
      totalRequests: Math.round(totalRequests),
      successfulRequests: Math.round(totalRequests * successRate),
      averageResponseTime: Math.round(avgResponseTime),
      maxResponseTime: Math.round(maxResponseTime),
      throughput: Math.round(totalRequests / config.duration),
      errorRate: Math.round((1 - successRate) * 100),
      bottlenecks: generateBottlenecks(config),
      recommendations: generateRecommendations(config, maxResponseTime)
    };

    setTestResults(prev => prev.map(r => r.id === testResult.id ? completedResult : r));
    setIsRunningTests(false);
  };

  const generateBottlenecks = (config: LoadTestConfig): string[] => {
    const bottlenecks = [];
    if (config.virtualUsers > 500) {
      bottlenecks.push('Database connection pool saturation');
      bottlenecks.push('CPU utilization spike during peak load');
    }
    if (config.virtualUsers > 1000) {
      bottlenecks.push('Memory usage approaching limits');
      bottlenecks.push('WebSocket connection limits reached');
    }
    return bottlenecks;
  };

  const generateRecommendations = (config: LoadTestConfig, responseTime: number): string[] => {
    const recommendations = [];
    if (responseTime > config.maxResponseTime) {
      recommendations.push('Implement Redis caching for frequently accessed data');
      recommendations.push('Optimize database queries with proper indexing');
      recommendations.push('Consider horizontal scaling with load balancers');
    }
    if (config.virtualUsers > 500) {
      recommendations.push('Enable CDN for static assets');
      recommendations.push('Implement API rate limiting');
    }
    return recommendations;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'failed': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      running: 'default',
      completed: 'secondary',
      failed: 'destructive'
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'outline'}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">Load Testing Suite</h3>
          <p className="text-muted-foreground">Simulate production traffic to identify performance bottlenecks</p>
        </div>
        <Button 
          onClick={() => testConfigs.forEach(config => runLoadTest(config.id))} 
          disabled={isRunningTests}
        >
          {isRunningTests ? 'Running Tests...' : 'Run All Tests'}
        </Button>
      </div>

      {/* Test Configurations */}
      <div className="grid gap-4 md:grid-cols-2">
        {testConfigs.map((config) => (
          <Card key={config.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {config.name}
                </span>
                <Button 
                  size="sm" 
                  onClick={() => runLoadTest(config.id)}
                  disabled={isRunningTests}
                >
                  Run Test
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{config.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Virtual Users:</strong> {config.virtualUsers}
                </div>
                <div>
                  <strong>Duration:</strong> {Math.round(config.duration / 60)}min
                </div>
                <div>
                  <strong>Ramp-up:</strong> {Math.round(config.rampUpTime / 60)}min
                </div>
                <div>
                  <strong>Target RPS:</strong> {config.expectedThroughput}
                </div>
              </div>
              <div>
                <strong>Endpoints:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {config.targetEndpoints.map(endpoint => (
                    <Badge key={endpoint} variant="outline" className="text-xs">
                      {endpoint}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Load Test Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {testResults.map((result) => {
                const config = testConfigs.find(c => c.id === result.configId);
                return (
                  <Card key={result.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold flex items-center gap-2">
                            {getStatusIcon(result.status)}
                            {config?.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Started: {result.startTime.toLocaleString()}
                          </p>
                        </div>
                        {getStatusBadge(result.status)}
                      </div>

                      {result.status === 'running' && (
                        <Progress value={33} className="mb-4" />
                      )}

                      {result.status !== 'running' && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                              {result.successfulRequests}
                            </div>
                            <div className="text-xs text-muted-foreground">Successful</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">
                              {result.averageResponseTime}ms
                            </div>
                            <div className="text-xs text-muted-foreground">Avg Response</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">
                              {result.throughput}
                            </div>
                            <div className="text-xs text-muted-foreground">RPS</div>
                          </div>
                          <div className="text-center">
                            <div className={`text-2xl font-bold ${result.errorRate > 5 ? 'text-red-600' : 'text-green-600'}`}>
                              {result.errorRate}%
                            </div>
                            <div className="text-xs text-muted-foreground">Error Rate</div>
                          </div>
                        </div>
                      )}

                      {result.bottlenecks.length > 0 && (
                        <Alert className="mb-4">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>
                            <strong>Bottlenecks Detected:</strong>
                            <ul className="list-disc list-inside mt-1">
                              {result.bottlenecks.map((bottleneck, index) => (
                                <li key={index} className="text-sm">{bottleneck}</li>
                              ))}
                            </ul>
                          </AlertDescription>
                        </Alert>
                      )}

                      {result.recommendations.length > 0 && (
                        <div className="bg-blue-50 p-3 rounded">
                          <strong className="text-blue-800">Recommendations:</strong>
                          <ul className="list-disc list-inside mt-1">
                            {result.recommendations.map((rec, index) => (
                              <li key={index} className="text-sm text-blue-700">{rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

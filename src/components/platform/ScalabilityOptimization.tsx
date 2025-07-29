
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Zap, 
  Database, 
  Cloud, 
  Network, 
  TrendingUp,
  Server,
  Globe,
  Settings,
  BarChart3,
  RefreshCw,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface ScalabilityMetric {
  name: string;
  current: number;
  capacity: number;
  unit: string;
  optimization: 'excellent' | 'good' | 'needs_improvement' | 'critical';
  suggestions: string[];
}

interface LoadBalancingConfig {
  algorithm: string;
  healthChecks: boolean;
  autoscaling: boolean;
  regions: string[];
  currentLoad: number;
}

export const ScalabilityOptimization = () => {
  const [metrics, setMetrics] = useState<ScalabilityMetric[]>([]);
  const [loadBalancing, setLoadBalancing] = useState<LoadBalancingConfig | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const initializeMetrics = () => {
    const scalabilityMetrics: ScalabilityMetric[] = [
      {
        name: 'Database Connection Pool',
        current: 45,
        capacity: 100,
        unit: 'connections',
        optimization: 'good',
        suggestions: [
          'Consider implementing connection pooling optimization',
          'Monitor peak usage patterns for better capacity planning'
        ]
      },
      {
        name: 'API Rate Limit Utilization',
        current: 75,
        capacity: 100,
        unit: '%',
        optimization: 'needs_improvement',
        suggestions: [
          'Implement request caching to reduce API calls',
          'Consider rate limit increases for premium users',
          'Add request queuing for burst traffic'
        ]
      },
      {
        name: 'WebSocket Connections',
        current: 234,
        capacity: 1000,
        unit: 'connections',
        optimization: 'excellent',
        suggestions: [
          'Current usage is optimal',
          'Monitor for connection leak patterns'
        ]
      },
      {
        name: 'Cache Hit Ratio',
        current: 87,
        capacity: 100,
        unit: '%',
        optimization: 'good',
        suggestions: [
          'Optimize cache eviction policies',
          'Implement intelligent prefetching'
        ]
      },
      {
        name: 'CDN Cache Efficiency',
        current: 92,
        capacity: 100,
        unit: '%',
        optimization: 'excellent',
        suggestions: [
          'Excellent CDN performance',
          'Consider edge computing for dynamic content'
        ]
      },
      {
        name: 'Background Job Queue',
        current: 156,
        capacity: 500,
        unit: 'jobs',
        optimization: 'good',
        suggestions: [
          'Monitor queue processing times',
          'Implement job prioritization'
        ]
      }
    ];

    setMetrics(scalabilityMetrics);
  };

  const initializeLoadBalancing = () => {
    setLoadBalancing({
      algorithm: 'Weighted Round Robin',
      healthChecks: true,
      autoscaling: true,
      regions: ['US-East', 'US-West', 'EU-Central', 'Asia-Pacific'],
      currentLoad: 67
    });
  };

  const optimizeSystem = async () => {
    setIsOptimizing(true);
    
    // Simulate optimization process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Update metrics with improved values
    setMetrics(prev => prev.map(metric => ({
      ...metric,
      current: Math.min(metric.capacity, metric.current * (0.85 + Math.random() * 0.1))
    })));
    
    setIsOptimizing(false);
  };

  useEffect(() => {
    initializeMetrics();
    initializeLoadBalancing();
  }, []);

  const getOptimizationColor = (optimization: string) => {
    switch (optimization) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'needs_improvement': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getOptimizationBadge = (optimization: string) => {
    const variants = {
      excellent: 'default',
      good: 'secondary',
      needs_improvement: 'outline',
      critical: 'destructive'
    } as const;
    
    return (
      <Badge variant={variants[optimization as keyof typeof variants] || 'outline'}>
        {optimization.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  const overallScore = Math.round(
    metrics.reduce((acc, metric) => {
      const score = (metric.current / metric.capacity) * 100;
      return acc + (metric.optimization === 'excellent' ? score * 1.2 : 
                   metric.optimization === 'good' ? score : 
                   metric.optimization === 'needs_improvement' ? score * 0.8 : score * 0.6);
    }, 0) / metrics.length
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Scalability Optimization</h2>
          <p className="text-muted-foreground">
            Performance optimization and capacity planning for platform scalability
          </p>
        </div>
        <Button onClick={optimizeSystem} disabled={isOptimizing}>
          <Settings className={`mr-2 h-4 w-4 ${isOptimizing ? 'animate-spin' : ''}`} />
          {isOptimizing ? 'Optimizing...' : 'Run Optimization'}
        </Button>
      </div>

      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Scalability Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className={`text-4xl font-bold ${overallScore >= 80 ? 'text-green-600' : overallScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
              {overallScore}%
            </div>
            <div className="flex-1">
              <Progress value={overallScore} className="h-3" />
              <p className="text-sm text-muted-foreground mt-2">
                {overallScore >= 80 ? 'Excellent scalability performance' :
                 overallScore >= 60 ? 'Good performance with room for improvement' :
                 'Requires immediate optimization attention'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="metrics" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="planning">Capacity Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid gap-4">
            {metrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{metric.name}</h4>
                        {getOptimizationBadge(metric.optimization)}
                      </div>
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-2xl font-bold">
                          {Math.round(metric.current)} / {metric.capacity} {metric.unit}
                        </span>
                        <Progress 
                          value={(metric.current / metric.capacity) * 100} 
                          className="flex-1 h-2"
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Suggestions:</p>
                        {metric.suggestions.map((suggestion, idx) => (
                          <p key={idx} className="text-sm text-muted-foreground">
                            • {suggestion}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="infrastructure" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cloud className="h-5 w-5" />
                  Load Balancing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {loadBalancing && (
                  <>
                    <div className="flex justify-between">
                      <span>Algorithm</span>
                      <Badge variant="outline">{loadBalancing.algorithm}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Health Checks</span>
                      <Badge variant={loadBalancing.healthChecks ? 'default' : 'destructive'}>
                        {loadBalancing.healthChecks ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Auto Scaling</span>
                      <Badge variant={loadBalancing.autoscaling ? 'default' : 'destructive'}>
                        {loadBalancing.autoscaling ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <span className="text-sm font-medium">Active Regions</span>
                      <div className="flex flex-wrap gap-1">
                        {loadBalancing.regions.map((region, idx) => (
                          <Badge key={idx} variant="secondary">{region}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Current Load</span>
                        <span>{loadBalancing.currentLoad}%</span>
                      </div>
                      <Progress value={loadBalancing.currentLoad} className="h-2" />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Database Scaling
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Read Replicas</span>
                  <Badge variant="default">3 Active</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Connection Pooling</span>
                  <Badge variant="default">Optimized</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Query Caching</span>
                  <Badge variant="default">87% Hit Rate</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Index Optimization</span>
                  <Badge variant="secondary">Scheduled</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Automated Optimizations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Database Query Optimization</p>
                        <p className="text-sm text-muted-foreground">Automated index suggestions and query rewriting</p>
                      </div>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">CDN Cache Optimization</p>
                        <p className="text-sm text-muted-foreground">Intelligent content delivery and edge caching</p>
                      </div>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="font-medium">API Rate Limit Optimization</p>
                        <p className="text-sm text-muted-foreground">Dynamic rate limiting based on user behavior</p>
                      </div>
                    </div>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Settings className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">Resource Auto-scaling</p>
                        <p className="text-sm text-muted-foreground">Automatic scaling based on traffic patterns</p>
                      </div>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="planning" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Growth Projections
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Next 3 Months</span>
                      <span className="text-sm font-medium">+25% users</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Next 6 Months</span>
                      <span className="text-sm font-medium">+60% users</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Next 12 Months</span>
                      <span className="text-sm font-medium">+150% users</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  Resource Planning
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Database Scaling</span>
                    <Badge variant="outline">Q2 2024</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>CDN Expansion</span>
                    <Badge variant="outline">Q3 2024</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Multi-Region Deployment</span>
                    <Badge variant="outline">Q4 2024</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Microservices Migration</span>
                    <Badge variant="outline">Q1 2025</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

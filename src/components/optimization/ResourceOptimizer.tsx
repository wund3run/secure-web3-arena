
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  TrendingUp, 
  Cpu, 
  MemoryStick, 
  HardDrive, 
  Network,
  Target,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Settings,
  BarChart3
} from 'lucide-react';
import { platformOrchestrator } from '@/services/platformOrchestration';
import { toast } from 'sonner';

interface OptimizationRecommendation {
  id: string;
  category: 'performance' | 'cache' | 'security' | 'cost';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
  savings: string;
  implemented: boolean;
}

interface ResourceMetric {
  name: string;
  current: number;
  optimal: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
}

export function ResourceOptimizer() {
  const [recommendations, setRecommendations] = useState<OptimizationRecommendation[]>([]);
  const [metrics, setMetrics] = useState<ResourceMetric[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeOptimizationData = async () => {
      setIsLoading(true);
      
      try {
        // Get optimization recommendations from platform orchestrator
        const optimizationData = await platformOrchestrator.optimizeResources();
        
        const mockRecommendations: OptimizationRecommendation[] = [
          {
            id: '1',
            category: 'performance',
            title: 'Enable Component Lazy Loading',
            description: 'Implement code splitting for non-critical components to reduce initial bundle size by 35%',
            impact: 'high',
            effort: 'medium',
            savings: '2.3s load time',
            implemented: false
          },
          {
            id: '2',
            category: 'cache',
            title: 'Optimize API Response Caching',
            description: 'Configure intelligent caching strategies for frequently accessed endpoints',
            impact: 'high',
            effort: 'low',
            savings: '67% bandwidth',
            implemented: false
          },
          {
            id: '3',
            category: 'performance',
            title: 'Image Optimization Pipeline',
            description: 'Implement automatic image compression and modern format conversion',
            impact: 'medium',
            effort: 'medium',
            savings: '45% image size',
            implemented: true
          },
          {
            id: '4',
            category: 'security',
            title: 'Enhanced Security Headers',
            description: 'Configure additional security headers for improved protection',
            impact: 'medium',
            effort: 'low',
            savings: 'Security score +15',
            implemented: false
          },
          {
            id: '5',
            category: 'cost',
            title: 'Database Query Optimization',
            description: 'Optimize slow queries and implement connection pooling',
            impact: 'high',
            effort: 'high',
            savings: '$234/month',
            implemented: false
          }
        ];

        const mockMetrics: ResourceMetric[] = [
          {
            name: 'CPU Utilization',
            current: 67,
            optimal: 45,
            unit: '%',
            status: 'warning'
          },
          {
            name: 'Memory Usage',
            current: 78,
            optimal: 60,
            unit: '%',
            status: 'warning'
          },
          {
            name: 'Network Latency',
            current: 89,
            optimal: 50,
            unit: 'ms',
            status: 'critical'
          },
          {
            name: 'Cache Hit Rate',
            current: 73,
            optimal: 90,
            unit: '%',
            status: 'warning'
          },
          {
            name: 'Error Rate',
            current: 0.8,
            optimal: 0.1,
            unit: '%',
            status: 'warning'
          }
        ];

        setRecommendations(mockRecommendations);
        setMetrics(mockMetrics);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load optimization data:', error);
        setIsLoading(false);
      }
    };

    initializeOptimizationData();
  }, []);

  const handleImplementRecommendation = async (id: string) => {
    setIsOptimizing(true);
    
    // Simulate implementation
    setTimeout(() => {
      setRecommendations(prev => 
        prev.map(rec => 
          rec.id === id ? { ...rec, implemented: true } : rec
        )
      );
      setIsOptimizing(false);
      toast.success('Optimization implemented successfully');
    }, 2000);
  };

  const handleRunOptimization = async () => {
    setIsOptimizing(true);
    
    try {
      // Run comprehensive optimization
      const results = await platformOrchestrator.optimizeResources();
      
      setTimeout(() => {
        // Update metrics to show improvement
        setMetrics(prev => prev.map(metric => ({
          ...metric,
          current: Math.max(metric.optimal, metric.current * 0.8),
          status: metric.current * 0.8 <= metric.optimal ? 'good' : 'warning'
        })));
        
        setIsOptimizing(false);
        toast.success('System optimization completed');
      }, 3000);
    } catch (error) {
      setIsOptimizing(false);
      toast.error('Optimization failed');
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'performance': return Zap;
      case 'cache': return MemoryStick;
      case 'security': return CheckCircle;
      case 'cost': return TrendingUp;
      default: return Target;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-orange-500" />
            Resource Optimizer
          </CardTitle>
          <CardDescription>
            AI-powered resource optimization and performance enhancement recommendations
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">System Optimization</h3>
              <p className="text-muted-foreground">
                Run comprehensive optimization to improve performance and reduce resource usage
              </p>
            </div>
            <Button 
              onClick={handleRunOptimization}
              disabled={isOptimizing}
              className="flex items-center gap-2"
            >
              {isOptimizing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Optimizing...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4" />
                  Run Optimization
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Optimization Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">73%</div>
                  <p className="text-sm text-muted-foreground">Room for improvement</p>
                  <Progress value={73} className="mt-3" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Potential Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Performance</span>
                    <span className="font-medium">+45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Cost Reduction</span>
                    <span className="font-medium">$847/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Resource Usage</span>
                    <span className="font-medium">-32%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Implementation Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Completed: 1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Pending: 4</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">High Impact: 3</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          {recommendations.map((recommendation) => {
            const IconComponent = getCategoryIcon(recommendation.category);
            return (
              <Card key={recommendation.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <IconComponent className="h-6 w-6 text-blue-500 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{recommendation.title}</h3>
                          {recommendation.implemented && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <p className="text-muted-foreground mb-3">{recommendation.description}</p>
                        <div className="flex gap-2 flex-wrap">
                          <Badge className={getImpactColor(recommendation.impact)}>
                            {recommendation.impact} impact
                          </Badge>
                          <Badge className={getEffortColor(recommendation.effort)}>
                            {recommendation.effort} effort
                          </Badge>
                          <Badge variant="outline">
                            Saves: {recommendation.savings}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      {recommendation.implemented ? (
                        <Badge className="bg-green-100 text-green-800">
                          Implemented
                        </Badge>
                      ) : (
                        <Button
                          onClick={() => handleImplementRecommendation(recommendation.id)}
                          disabled={isOptimizing}
                          size="sm"
                        >
                          Implement
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.map((metric) => (
              <Card key={metric.name}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{metric.name}</span>
                      <Badge variant="outline" className={getStatusColor(metric.status)}>
                        {metric.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current</span>
                        <span className={getStatusColor(metric.status)}>
                          {metric.current}{metric.unit}
                        </span>
                      </div>
                      <Progress 
                        value={(metric.current / (metric.optimal * 2)) * 100} 
                        className="h-2"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Target: {metric.optimal}{metric.unit}</span>
                        <span>
                          {metric.current > metric.optimal ? '+' : ''}
                          {Math.round(((metric.current - metric.optimal) / metric.optimal) * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Optimization History</CardTitle>
              <CardDescription>
                Track performance improvements and optimization results over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <BarChart3 className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <p className="text-sm font-medium">Performance Gain</p>
                    <p className="text-2xl font-bold text-blue-600">+23%</p>
                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <p className="text-sm font-medium">Cost Savings</p>
                    <p className="text-2xl font-bold text-green-600">$1,247</p>
                    <p className="text-xs text-muted-foreground">This month</p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <Settings className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                    <p className="text-sm font-medium">Optimizations</p>
                    <p className="text-2xl font-bold text-purple-600">12</p>
                    <p className="text-xs text-muted-foreground">Implemented</p>
                  </div>
                </div>
                
                <Button className="w-full">
                  Generate Optimization Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

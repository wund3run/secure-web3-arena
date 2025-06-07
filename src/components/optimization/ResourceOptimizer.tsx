
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Zap, Image, Code, Database, Wifi, Download, Upload } from 'lucide-react';
import { toast } from 'sonner';

interface OptimizationOpportunity {
  id: string;
  type: 'image' | 'code' | 'data' | 'network';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'easy' | 'moderate' | 'complex';
  savings: string;
  currentSize?: string;
  optimizedSize?: string;
  isApplied: boolean;
}

interface ResourceMetric {
  name: string;
  current: number;
  optimized: number;
  unit: string;
  category: string;
}

export function ResourceOptimizer() {
  const [opportunities, setOpportunities] = useState<OptimizationOpportunity[]>([]);
  const [resourceMetrics, setResourceMetrics] = useState<ResourceMetric[]>([]);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [totalSavings, setTotalSavings] = useState({ size: 0, time: 0 });

  useEffect(() => {
    initializeOptimizations();
  }, []);

  const initializeOptimizations = () => {
    const optimizationOpportunities: OptimizationOpportunity[] = [
      {
        id: 'image-compression',
        type: 'image',
        title: 'Compress Profile Images',
        description: 'Reduce profile image file sizes using modern compression',
        impact: 'high',
        effort: 'easy',
        savings: '1.2 MB',
        currentSize: '2.8 MB',
        optimizedSize: '1.6 MB',
        isApplied: false
      },
      {
        id: 'code-splitting',
        type: 'code',
        title: 'Implement Code Splitting',
        description: 'Split large bundles into smaller chunks for faster loading',
        impact: 'high',
        effort: 'moderate',
        savings: '850 KB',
        currentSize: '2.1 MB',
        optimizedSize: '1.25 MB',
        isApplied: false
      },
      {
        id: 'unused-css',
        type: 'code',
        title: 'Remove Unused CSS',
        description: 'Eliminate unused CSS rules to reduce bundle size',
        impact: 'medium',
        effort: 'easy',
        savings: '120 KB',
        currentSize: '340 KB',
        optimizedSize: '220 KB',
        isApplied: false
      },
      {
        id: 'api-caching',
        type: 'network',
        title: 'Implement API Response Caching',
        description: 'Cache frequently requested API responses',
        impact: 'high',
        effort: 'moderate',
        savings: '2.3s avg response time',
        isApplied: false
      },
      {
        id: 'database-indexing',
        type: 'data',
        title: 'Optimize Database Queries',
        description: 'Add indexes to frequently queried columns',
        impact: 'medium',
        effort: 'moderate',
        savings: '450ms query time',
        isApplied: false
      },
      {
        id: 'lazy-loading',
        type: 'code',
        title: 'Implement Component Lazy Loading',
        description: 'Load components only when needed',
        impact: 'medium',
        effort: 'easy',
        savings: '680 KB initial bundle',
        isApplied: false
      }
    ];

    const metrics: ResourceMetric[] = [
      { name: 'JavaScript Bundle', current: 2100, optimized: 1450, unit: 'KB', category: 'code' },
      { name: 'CSS Bundle', current: 340, optimized: 220, unit: 'KB', category: 'code' },
      { name: 'Images', current: 2800, optimized: 1600, unit: 'KB', category: 'image' },
      { name: 'API Calls', current: 45, optimized: 28, unit: 'requests', category: 'network' },
      { name: 'Database Queries', current: 120, optimized: 85, unit: 'queries', category: 'data' }
    ];

    setOpportunities(optimizationOpportunities);
    setResourceMetrics(metrics);
    
    // Calculate total potential savings
    const sizeSavings = optimizationOpportunities
      .filter(op => op.savings.includes('KB') || op.savings.includes('MB'))
      .reduce((total, op) => {
        const match = op.savings.match(/([\d.]+)\s*(KB|MB)/);
        if (match) {
          const value = parseFloat(match[1]);
          const unit = match[2];
          return total + (unit === 'MB' ? value * 1024 : value);
        }
        return total;
      }, 0);

    setTotalSavings({ size: sizeSavings, time: 3.2 });
  };

  const applyOptimization = async (optimizationId: string) => {
    setIsOptimizing(true);
    
    try {
      // Simulate optimization process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setOpportunities(prev => 
        prev.map(op => 
          op.id === optimizationId 
            ? { ...op, isApplied: true }
            : op
        )
      );
      
      const optimization = opportunities.find(op => op.id === optimizationId);
      toast.success(`${optimization?.title} applied successfully!`);
      
      // Track optimization
      if ((window as any).trackConversion) {
        (window as any).trackConversion({
          action: 'optimization_applied',
          category: 'performance',
          label: optimizationId,
          metadata: { savings: optimization?.savings }
        });
      }
    } catch (error) {
      toast.error('Failed to apply optimization');
    } finally {
      setIsOptimizing(false);
    }
  };

  const applyAllOptimizations = async () => {
    setIsOptimizing(true);
    
    try {
      const unappliedOptimizations = opportunities.filter(op => !op.isApplied);
      
      for (const optimization of unappliedOptimizations) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setOpportunities(prev => 
          prev.map(op => 
            op.id === optimization.id 
              ? { ...op, isApplied: true }
              : op
          )
        );
      }
      
      toast.success(`Applied ${unappliedOptimizations.length} optimizations!`);
    } catch (error) {
      toast.error('Failed to apply all optimizations');
    } finally {
      setIsOptimizing(false);
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
      case 'easy': return 'bg-green-100 text-green-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'complex': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="h-4 w-4" />;
      case 'code': return <Code className="h-4 w-4" />;
      case 'data': return <Database className="h-4 w-4" />;
      case 'network': return <Wifi className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  const appliedOptimizations = opportunities.filter(op => op.isApplied).length;
  const totalOptimizations = opportunities.length;
  const optimizationProgress = (appliedOptimizations / totalOptimizations) * 100;

  return (
    <div className="space-y-6">
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-500" />
                Resource Optimizer
              </CardTitle>
              <CardDescription>
                Identify and apply performance optimizations to reduce load times
              </CardDescription>
            </div>
            <Button
              onClick={applyAllOptimizations}
              disabled={isOptimizing || appliedOptimizations === totalOptimizations}
              className="flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              {isOptimizing ? 'Optimizing...' : 'Apply All'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{totalSavings.size.toFixed(0)} KB</div>
              <div className="text-sm text-muted-foreground">Potential Size Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{totalSavings.time}s</div>
              <div className="text-sm text-muted-foreground">Estimated Time Savings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{appliedOptimizations}/{totalOptimizations}</div>
              <div className="text-sm text-muted-foreground">Optimizations Applied</div>
            </div>
          </div>
          <Progress value={optimizationProgress} className="mt-4" />
        </CardContent>
      </Card>

      <Tabs defaultValue="opportunities" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="metrics">Resource Metrics</TabsTrigger>
          <TabsTrigger value="impact">Impact Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities" className="space-y-4">
          {opportunities.map((opportunity) => (
            <Card key={opportunity.id} className={opportunity.isApplied ? 'border-green-200 bg-green-50' : ''}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      {getTypeIcon(opportunity.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium flex items-center gap-2">
                        {opportunity.title}
                        {opportunity.isApplied && (
                          <Badge className="bg-green-100 text-green-800">Applied</Badge>
                        )}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {opportunity.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getImpactColor(opportunity.impact)} variant="secondary">
                          {opportunity.impact} impact
                        </Badge>
                        <Badge className={getEffortColor(opportunity.effort)} variant="secondary">
                          {opportunity.effort} effort
                        </Badge>
                        <Badge variant="outline">
                          Saves {opportunity.savings}
                        </Badge>
                      </div>
                      {opportunity.currentSize && opportunity.optimizedSize && (
                        <div className="text-xs text-muted-foreground mt-2">
                          {opportunity.currentSize} → {opportunity.optimizedSize}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={() => applyOptimization(opportunity.id)}
                    disabled={isOptimizing || opportunity.isApplied}
                    variant={opportunity.isApplied ? "outline" : "default"}
                    size="sm"
                  >
                    {opportunity.isApplied ? 'Applied' : 'Apply'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resource Usage Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={resourceMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="current" fill="#EF4444" name="Current" />
                  <Bar dataKey="optimized" fill="#10B981" name="Optimized" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Download Optimization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Bundle Size Reduction</span>
                  <span className="font-medium text-green-600">-32%</span>
                </div>
                <div className="flex justify-between">
                  <span>Image Compression</span>
                  <span className="font-medium text-green-600">-43%</span>
                </div>
                <div className="flex justify-between">
                  <span>Code Splitting</span>
                  <span className="font-medium text-green-600">-28%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Performance Gains
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Page Load Time</span>
                  <span className="font-medium text-blue-600">-2.3s</span>
                </div>
                <div className="flex justify-between">
                  <span>First Contentful Paint</span>
                  <span className="font-medium text-blue-600">-0.8s</span>
                </div>
                <div className="flex justify-between">
                  <span>Time to Interactive</span>
                  <span className="font-medium text-blue-600">-1.5s</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="text-center">
                <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                <CardTitle>Performance Score</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-yellow-600">+15</div>
                <div className="text-sm text-muted-foreground">Lighthouse Score Improvement</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Download className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <CardTitle>Data Savings</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-green-600">2.1 MB</div>
                <div className="text-sm text-muted-foreground">Total Size Reduction</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Wifi className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <CardTitle>Network Efficiency</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-blue-600">38%</div>
                <div className="text-sm text-muted-foreground">Fewer Network Requests</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Optimization Impact Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span>User Experience Improvement</span>
                  <Badge className="bg-green-100 text-green-800">Significant</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span>Mobile Performance Boost</span>
                  <Badge className="bg-blue-100 text-blue-800">High</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span>SEO Score Enhancement</span>
                  <Badge className="bg-purple-100 text-purple-800">Moderate</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span>Server Load Reduction</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Moderate</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

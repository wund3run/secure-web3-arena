
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { performanceTracker } from '@/utils/performance/performanceTracker';
import { Activity, Zap, Database, Image, Globe } from 'lucide-react';

export function PerformanceMonitor() {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const generateReport = async () => {
    setLoading(true);
    try {
      const newReport = performanceTracker.generateReport();
      setReport(newReport);
    } catch (error) {
      console.error('Failed to generate performance report:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateReport();
  }, []);

  if (!report) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Button onClick={generateReport} disabled={loading}>
              {loading ? 'Generating Report...' : 'Generate Performance Report'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getVitalStatus = (vital: any) => {
    return vital.good ? 'Good' : 'Needs Improvement';
  };

  const getVitalColor = (vital: any) => {
    return vital.good ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Performance Monitor</h2>
          <p className="text-muted-foreground">Comprehensive performance analysis and optimization</p>
        </div>
        <Button onClick={generateReport} disabled={loading}>
          {loading ? 'Refreshing...' : 'Refresh Report'}
        </Button>
      </div>

      {/* Overall Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Overall Performance Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className={`text-4xl font-bold ${getScoreColor(report.score)}`}>
              {report.score}/100
            </div>
            <div className="flex-1">
              <Progress value={report.score} className="h-3" />
              <p className="text-sm text-muted-foreground mt-1">
                {report.score >= 90 ? 'Excellent' : report.score >= 70 ? 'Good' : 'Needs Improvement'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="web-vitals" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="web-vitals">Web Vitals</TabsTrigger>
          <TabsTrigger value="bundles">Bundle Analysis</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
        </TabsList>

        <TabsContent value="web-vitals">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(report.webVitals).map(([vital, data]: [string, any]) => (
              <Card key={vital}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">{vital}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">{data.current.toFixed(1)}</div>
                      <div className="text-xs text-muted-foreground">
                        Avg: {data.average.toFixed(1)}
                      </div>
                    </div>
                    <Badge className={getVitalColor(data)}>
                      {getVitalStatus(data)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bundles">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Bundle Analysis
              </CardTitle>
              <CardDescription>
                Code splitting and bundle optimization metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <div className="text-2xl font-bold">{report.bundleAnalysis.totalBundles}</div>
                  <div className="text-sm text-muted-foreground">Total Bundles</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {Math.round(report.bundleAnalysis.averageLoadTime)}ms
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Load Time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {report.bundleAnalysis.largestChunks.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Slow Chunks</div>
                </div>
              </div>

              {report.bundleAnalysis.largestChunks.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Slowest Chunks</h4>
                  <div className="space-y-2">
                    {report.bundleAnalysis.largestChunks.map((chunk: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                        <span className="text-sm font-mono">{chunk.name}</span>
                        <span className="text-sm">{Math.round(chunk.loadTime)}ms</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Database Performance
              </CardTitle>
              <CardDescription>
                Query optimization and caching metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="text-2xl font-bold">
                    {Math.round(report.queryOptimization.cacheHitRate * 100)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Cache Hit Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {Math.round(report.queryOptimization.averageQueryTime)}ms
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Query Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Image Optimization
              </CardTitle>
              <CardDescription>
                Image loading and format optimization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <div className="text-2xl font-bold">{report.imageOptimization.imagesOptimized}</div>
                  <div className="text-sm text-muted-foreground">Images Optimized</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {Math.round(report.imageOptimization.averageLoadTime)}ms
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Load Time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {Math.round(report.imageOptimization.failureRate * 100)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Failure Rate</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Format Support</h4>
                <div className="flex gap-2">
                  <Badge variant={report.imageOptimization.formatSupport.avif ? 'default' : 'secondary'}>
                    AVIF: {report.imageOptimization.formatSupport.avif ? 'Supported' : 'Not Supported'}
                  </Badge>
                  <Badge variant={report.imageOptimization.formatSupport.webp ? 'default' : 'secondary'}>
                    WebP: {report.imageOptimization.formatSupport.webp ? 'Supported' : 'Not Supported'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recommendations */}
      {report.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Optimization Recommendations</CardTitle>
            <CardDescription>
              AI-generated suggestions to improve performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {report.recommendations.map((recommendation: string, index: number) => (
                <div key={index} className="flex items-start gap-2 p-3 bg-muted rounded">
                  <Globe className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{recommendation}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

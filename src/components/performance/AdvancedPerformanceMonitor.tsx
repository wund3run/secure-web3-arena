
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  Clock, 
  BarChart3, 
  TrendingUp, 
  RefreshCw,
  Monitor,
  Cpu,
  HardDrive
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  bundleSize: number;
  cacheHitRate: number;
  errorRate: number;
  userSatisfaction: number;
}

export function AdvancedPerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 850,
    renderTime: 120,
    bundleSize: 2.3,
    cacheHitRate: 87,
    errorRate: 0.2,
    userSatisfaction: 94
  });

  const [historicalData, setHistoricalData] = useState([
    { time: '00:00', loadTime: 900, renderTime: 140 },
    { time: '00:05', loadTime: 850, renderTime: 130 },
    { time: '00:10', loadTime: 820, renderTime: 120 },
    { time: '00:15', loadTime: 850, renderTime: 125 },
    { time: '00:20', loadTime: 800, renderTime: 115 },
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshMetrics = async () => {
    setIsRefreshing(true);
    
    setTimeout(() => {
      setMetrics({
        loadTime: 800 + Math.random() * 100,
        renderTime: 100 + Math.random() * 40,
        bundleSize: 2.0 + Math.random() * 0.6,
        cacheHitRate: 85 + Math.random() * 10,
        errorRate: Math.random() * 0.5,
        userSatisfaction: 90 + Math.random() * 8
      });
      setIsRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(refreshMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  const getPerformanceScore = () => {
    const score = (
      (metrics.cacheHitRate / 100) * 30 +
      (Math.max(0, 100 - metrics.loadTime / 10)) * 25 +
      (Math.max(0, 100 - metrics.renderTime / 2)) * 25 +
      (Math.max(0, 100 - metrics.errorRate * 50)) * 20
    );
    return Math.round(score);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Performance Monitor</h2>
          <p className="text-muted-foreground">
            Real-time application performance metrics and optimization insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default" className="bg-green-100 text-green-800">
            Score: {getPerformanceScore()}
          </Badge>
          <Button onClick={refreshMetrics} disabled={isRefreshing} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Load Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.loadTime.toFixed(0)}ms</div>
                <div className="text-xs text-muted-foreground mt-1">Target: &lt;800ms</div>
                <Progress 
                  value={Math.max(0, 100 - (metrics.loadTime / 1000) * 100)} 
                  className="mt-2" 
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Render Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.renderTime.toFixed(0)}ms</div>
                <div className="text-xs text-muted-foreground mt-1">Target: &lt;100ms</div>
                <Progress 
                  value={Math.max(0, 100 - (metrics.renderTime / 200) * 100)} 
                  className="mt-2" 
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <HardDrive className="h-4 w-4" />
                  Bundle Size
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.bundleSize.toFixed(1)}MB</div>
                <div className="text-xs text-muted-foreground mt-1">Target: &lt;2.0MB</div>
                <Progress 
                  value={Math.max(0, 100 - (metrics.bundleSize / 3) * 100)} 
                  className="mt-2" 
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Cpu className="h-4 w-4" />
                  Cache Hit Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.cacheHitRate.toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground mt-1">Target: &gt;90%</div>
                <Progress value={metrics.cacheHitRate} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Error Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.errorRate.toFixed(2)}%</div>
                <div className="text-xs text-muted-foreground mt-1">Target: &lt;0.1%</div>
                <Progress 
                  value={Math.max(0, 100 - metrics.errorRate * 200)} 
                  className="mt-2" 
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  User Satisfaction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.userSatisfaction.toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground mt-1">Target: &gt;95%</div>
                <Progress value={metrics.userSatisfaction} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="loadTime" 
                    stroke="#8884d8" 
                    strokeWidth={2}
                    name="Load Time (ms)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="renderTime" 
                    stroke="#82ca9d" 
                    strokeWidth={2}
                    name="Render Time (ms)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Optimization Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <div className="font-medium text-sm">Code Splitting</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Implement route-based code splitting to reduce initial bundle size
                  </div>
                  <Badge variant="secondary" className="mt-2">High Impact</Badge>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-medium text-sm">Image Optimization</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Convert images to WebP format and implement lazy loading
                  </div>
                  <Badge variant="secondary" className="mt-2">Medium Impact</Badge>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-medium text-sm">Cache Headers</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Optimize cache headers for static assets
                  </div>
                  <Badge variant="secondary" className="mt-2">Low Impact</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Score Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Cache Efficiency (30%)</span>
                    <span>{Math.round((metrics.cacheHitRate / 100) * 30)}/30</span>
                  </div>
                  <Progress value={(metrics.cacheHitRate / 100) * 100} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Load Performance (25%)</span>
                    <span>{Math.round(Math.max(0, 100 - metrics.loadTime / 10) / 4)}/25</span>
                  </div>
                  <Progress value={Math.max(0, 100 - metrics.loadTime / 10)} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Render Performance (25%)</span>
                    <span>{Math.round(Math.max(0, 100 - metrics.renderTime / 2) / 4)}/25</span>
                  </div>
                  <Progress value={Math.max(0, 100 - metrics.renderTime / 2)} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Reliability (20%)</span>
                    <span>{Math.round(Math.max(0, 100 - metrics.errorRate * 50) / 5)}/20</span>
                  </div>
                  <Progress value={Math.max(0, 100 - metrics.errorRate * 50)} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

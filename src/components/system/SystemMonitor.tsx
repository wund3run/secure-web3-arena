import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, CheckCircle, Activity, Database, Zap, Clock } from 'lucide-react';
import { SystemInitializer } from '@/utils/system/systemInitializer';
import { CacheManager } from '@/utils/database/cacheManager';
import { Logger, LogLevel } from '@/utils/logging/logger';
import { PerformanceMonitor } from '@/utils/monitoring/performanceMonitor';

export const SystemMonitor: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any[]>([]);
  const [cacheStats, setCacheStats] = useState<any>(null);

  useEffect(() => {
    const updateStatus = async () => {
      const status = await SystemInitializer.getSystemStatus();
      setSystemStatus(status);
      
      const recentLogs = Logger.getLogs().slice(0, 20);
      setLogs(recentLogs);
      
      const recentMetrics = PerformanceMonitor.getMetrics().slice(0, 10);
      setMetrics(recentMetrics);
      
      const cache = CacheManager.getStats();
      setCacheStats(cache);
    };

    updateStatus();
    const interval = setInterval(updateStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (isHealthy: boolean) => {
    return isHealthy ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <AlertTriangle className="h-4 w-4 text-red-500" />
    );
  };

  const getLogLevelColor = (level: LogLevel) => {
    switch (level) {
      case LogLevel.ERROR:
      case LogLevel.FATAL:
        return 'destructive';
      case LogLevel.WARN:
        return 'secondary';
      case LogLevel.INFO:
        return 'default';
      default:
        return 'outline';
    }
  };

  const formatBytes = (bytes: number) => {
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  if (!systemStatus) {
    return <div className="animate-pulse h-64 bg-muted rounded-lg" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">System Monitor</h2>
        <Badge variant={systemStatus.initialized ? 'default' : 'destructive'}>
          {systemStatus.initialized ? 'Operational' : 'Offline'}
        </Badge>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Uptime</p>
                <p className="text-lg font-semibold">
                  {Math.round(systemStatus.uptime / 1000 / 60)}m
                </p>
              </div>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cache Entries</p>
                <p className="text-lg font-semibold">{cacheStats?.totalEntries || 0}</p>
              </div>
              <Database className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Metrics</p>
                <p className="text-lg font-semibold">{metrics.length}</p>
              </div>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Memory Usage</p>
                <p className="text-lg font-semibold">{cacheStats?.memoryUsage || '0 KB'}</p>
              </div>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="logs" className="w-full">
        <TabsList>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="cache">Cache Status</TabsTrigger>
        </TabsList>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Recent System Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {logs.map((log, index) => (
                  <div key={index} className="flex items-start justify-between p-2 border rounded">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={getLogLevelColor(log.level)}>
                          {LogLevel[log.level]}
                        </Badge>
                        <span className="text-sm font-medium">[{log.context || 'system'}]</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm">{log.message}</p>
                      {log.correlationId && (
                        <p className="text-xs text-muted-foreground">
                          ID: {log.correlationId}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Performance Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded">
                    <h4 className="font-medium mb-2">Page Load Time</h4>
                    <p className="text-2xl font-bold">
                      {systemStatus.performanceReport?.summary?.averagePageLoadTime?.toFixed(0) || 'N/A'}ms
                    </p>
                  </div>
                  <div className="p-4 border rounded">
                    <h4 className="font-medium mb-2">Memory Usage</h4>
                    <p className="text-2xl font-bold">
                      {systemStatus.performanceReport?.summary?.averageMemoryUsage?.toFixed(1) || 'N/A'}MB
                    </p>
                  </div>
                  <div className="p-4 border rounded">
                    <h4 className="font-medium mb-2">Long Tasks</h4>
                    <p className="text-2xl font-bold">
                      {systemStatus.performanceReport?.summary?.longTaskCount || 0}
                    </p>
                  </div>
                </div>

                {/* Recent Metrics */}
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {metrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <span className="font-medium">{metric.name}</span>
                        <Badge variant="outline" className="ml-2">{metric.category}</Badge>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">{metric.value.toFixed(2)} {metric.unit}</span>
                        <p className="text-xs text-muted-foreground">
                          {new Date(metric.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recommendations */}
                {systemStatus.performanceReport?.recommendations?.length > 0 && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
                    <h4 className="font-medium mb-2">Recommendations</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {systemStatus.performanceReport.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cache">
          <Card>
            <CardHeader>
              <CardTitle>Cache Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded">
                    <h4 className="font-medium mb-2">Total Entries</h4>
                    <p className="text-2xl font-bold">{cacheStats?.totalEntries || 0}</p>
                  </div>
                  <div className="p-4 border rounded">
                    <h4 className="font-medium mb-2">Active Entries</h4>
                    <p className="text-2xl font-bold">{cacheStats?.activeEntries || 0}</p>
                  </div>
                  <div className="p-4 border rounded">
                    <h4 className="font-medium mb-2">Memory Usage</h4>
                    <p className="text-2xl font-bold">{cacheStats?.memoryUsage || '0 KB'}</p>
                  </div>
                </div>

                {cacheStats && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Cache Hit Ratio</span>
                      <span>{((cacheStats.activeEntries / cacheStats.totalEntries) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress 
                      value={(cacheStats.activeEntries / cacheStats.totalEntries) * 100} 
                      className="w-full"
                    />
                  </div>
                )}

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      CacheManager.clear();
                      window.location.reload();
                    }}
                  >
                    Clear Cache
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => Logger.clearLogs()}
                  >
                    Clear Logs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

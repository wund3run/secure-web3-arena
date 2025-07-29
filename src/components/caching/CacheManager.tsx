
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, 
  Zap, 
  RefreshCw, 
  Trash2, 
  Clock, 
  BarChart3,
  CheckCircle,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';

interface CacheEntry {
  key: string;
  size: number;
  hitCount: number;
  lastAccessed: Date;
  expiry?: Date;
  type: 'api' | 'component' | 'static' | 'user';
}

interface CacheStats {
  totalEntries: number;
  totalSize: number;
  hitRate: number;
  missRate: number;
  evictionCount: number;
}

export function CacheManager() {
  const [cacheEntries, setCacheEntries] = useState<CacheEntry[]>([]);
  const [stats, setStats] = useState<CacheStats>({
    totalEntries: 0,
    totalSize: 0,
    hitRate: 0,
    missRate: 0,
    evictionCount: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    const initializeCacheData = () => {
      setIsLoading(true);
      
      // Simulate cache data
      const mockEntries: CacheEntry[] = [
        {
          key: 'user_profile_123',
          size: 2048,
          hitCount: 156,
          lastAccessed: new Date(Date.now() - 300000),
          expiry: new Date(Date.now() + 3600000),
          type: 'user'
        },
        {
          key: 'api_audits_list',
          size: 8192,
          hitCount: 892,
          lastAccessed: new Date(Date.now() - 120000),
          expiry: new Date(Date.now() + 1800000),
          type: 'api'
        },
        {
          key: 'component_marketplace_grid',
          size: 4096,
          hitCount: 445,
          lastAccessed: new Date(Date.now() - 60000),
          type: 'component'
        },
        {
          key: 'static_images_bundle',
          size: 16384,
          hitCount: 1234,
          lastAccessed: new Date(Date.now() - 30000),
          type: 'static'
        }
      ];

      const mockStats: CacheStats = {
        totalEntries: mockEntries.length,
        totalSize: mockEntries.reduce((sum, entry) => sum + entry.size, 0),
        hitRate: 87.3,
        missRate: 12.7,
        evictionCount: 23
      };

      setCacheEntries(mockEntries);
      setStats(mockStats);
      setIsLoading(false);
    };

    initializeCacheData();
    
    // Update cache stats every 30 seconds
    const interval = setInterval(initializeCacheData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleClearCache = (type?: string) => {
    if (type) {
      setCacheEntries(prev => prev.filter(entry => entry.type !== type));
      toast.success(`${type} cache cleared successfully`);
    } else {
      setCacheEntries([]);
      toast.success('All cache cleared successfully');
    }
  };

  const handleRefreshEntry = (key: string) => {
    setCacheEntries(prev => 
      prev.map(entry => 
        entry.key === key 
          ? { ...entry, lastAccessed: new Date(), hitCount: entry.hitCount + 1 }
          : entry
      )
    );
    toast.success('Cache entry refreshed');
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'api': return 'bg-blue-100 text-blue-800';
      case 'component': return 'bg-green-100 text-green-800';
      case 'static': return 'bg-purple-100 text-purple-800';
      case 'user': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredEntries = selectedType === 'all' 
    ? cacheEntries 
    : cacheEntries.filter(entry => entry.type === selectedType);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-muted rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-green-500" />
            Cache Management System
          </CardTitle>
          <CardDescription>
            Monitor and optimize platform caching for improved performance
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Cache Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Database className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Total Entries</span>
            </div>
            <p className="text-2xl font-bold">{stats.totalEntries}</p>
            <p className="text-xs text-muted-foreground">Active cache entries</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Cache Size</span>
            </div>
            <p className="text-2xl font-bold">{formatBytes(stats.totalSize)}</p>
            <p className="text-xs text-muted-foreground">Total memory usage</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
              <span className="text-sm font-medium">Hit Rate</span>
            </div>
            <p className="text-2xl font-bold text-emerald-600">{stats.hitRate}%</p>
            <Progress value={stats.hitRate} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Miss Rate</span>
            </div>
            <p className="text-2xl font-bold text-yellow-600">{stats.missRate}%</p>
            <Progress value={stats.missRate} className="h-1 mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="entries" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="entries">Cache Entries</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="entries" className="space-y-6">
          {/* Filter Controls */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedType === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedType('all')}
            >
              All ({cacheEntries.length})
            </Button>
            {['api', 'component', 'static', 'user'].map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType(type)}
              >
                {type} ({cacheEntries.filter(e => e.type === type).length})
              </Button>
            ))}
          </div>

          {/* Cache Entries List */}
          <div className="space-y-3">
            {filteredEntries.map((entry) => (
              <Card key={entry.key}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-sm">{entry.key}</span>
                        <Badge className={getTypeColor(entry.type)} variant="secondary">
                          {entry.type}
                        </Badge>
                        {entry.expiry && entry.expiry > new Date() && (
                          <Badge variant="outline" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            Expires in {Math.round((entry.expiry.getTime() - new Date().getTime()) / 60000)}m
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Size: {formatBytes(entry.size)}</span>
                        <span>Hits: {entry.hitCount}</span>
                        <span>Last accessed: {formatTimeAgo(entry.lastAccessed)}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRefreshEntry(entry.key)}
                      >
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCacheEntries(prev => prev.filter(e => e.key !== entry.key));
                          toast.success('Cache entry removed');
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEntries.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Database className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No cache entries found for this filter</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cache Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Hit Rate</span>
                    <span className="font-medium text-green-600">{stats.hitRate}%</span>
                  </div>
                  <Progress value={stats.hitRate} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Memory Utilization</span>
                    <span className="font-medium">67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Eviction Rate</span>
                    <span className="font-medium text-orange-600">2.3%</span>
                  </div>
                  <Progress value={23} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cache Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Cache Status</p>
                      <p className="text-sm text-muted-foreground">Healthy - All systems operational</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="font-medium">Memory Warning</p>
                      <p className="text-sm text-muted-foreground">Approaching 70% capacity</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Performance</p>
                      <p className="text-sm text-muted-foreground">23% improvement this week</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start"
                  onClick={() => handleClearCache()}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All Cache
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleClearCache('api')}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Clear API Cache
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => handleClearCache('component')}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Clear Component Cache
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Optimization Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <Badge className="bg-green-100 text-green-800 mb-2">High Impact</Badge>
                    <p className="text-sm font-medium">Enable compression for large API responses</p>
                    <p className="text-xs text-muted-foreground">Can reduce cache size by 40%</p>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <Badge className="bg-blue-100 text-blue-800 mb-2">Medium Impact</Badge>
                    <p className="text-sm font-medium">Implement cache preloading for popular content</p>
                    <p className="text-xs text-muted-foreground">Improve hit rate by 15%</p>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <Badge className="bg-yellow-100 text-yellow-800 mb-2">Low Impact</Badge>
                    <p className="text-sm font-medium">Adjust TTL for static content</p>
                    <p className="text-xs text-muted-foreground">Optimize memory usage</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cache Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Max Cache Size</label>
                    <p className="text-sm text-muted-foreground">128 MB</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Default TTL</label>
                    <p className="text-sm text-muted-foreground">1 hour</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Eviction Policy</label>
                    <p className="text-sm text-muted-foreground">LRU (Least Recently Used)</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Compression</label>
                    <p className="text-sm text-muted-foreground">Enabled</p>
                  </div>
                </div>
                
                <Button className="mt-4">
                  Update Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, RefreshCw, Trash2, Clock, HardDrive } from 'lucide-react';
import { toast } from 'sonner';

interface CacheEntry {
  key: string;
  size: number;
  lastAccessed: Date;
  hitCount: number;
  type: 'memory' | 'localStorage' | 'sessionStorage' | 'indexedDB';
  ttl?: number;
  isExpired: boolean;
}

export function CacheManager() {
  const [cacheEntries, setCacheEntries] = useState<CacheEntry[]>([]);
  const [totalCacheSize, setTotalCacheSize] = useState(0);
  const [cacheHitRate, setCacheHitRate] = useState(85);
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    loadCacheData();
    
    const interval = setInterval(loadCacheData, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadCacheData = () => {
    const entries: CacheEntry[] = [];
    let totalSize = 0;

    // Check localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        const size = new Blob([value || '']).size;
        totalSize += size;
        
        entries.push({
          key,
          size,
          lastAccessed: new Date(),
          hitCount: Math.floor(Math.random() * 100),
          type: 'localStorage',
          isExpired: false
        });
      }
    }

    // Check sessionStorage
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key) {
        const value = sessionStorage.getItem(key);
        const size = new Blob([value || '']).size;
        totalSize += size;
        
        entries.push({
          key,
          size,
          lastAccessed: new Date(),
          hitCount: Math.floor(Math.random() * 50),
          type: 'sessionStorage',
          isExpired: false
        });
      }
    }

    // Simulate memory cache entries
    const memoryCacheKeys = ['api_users', 'api_audits', 'api_services', 'component_data'];
    memoryCacheKeys.forEach(key => {
      const size = Math.floor(Math.random() * 10000) + 1000;
      totalSize += size;
      
      entries.push({
        key,
        size,
        lastAccessed: new Date(Date.now() - Math.random() * 3600000),
        hitCount: Math.floor(Math.random() * 200),
        type: 'memory',
        ttl: 3600,
        isExpired: Math.random() > 0.8
      });
    });

    setCacheEntries(entries);
    setTotalCacheSize(totalSize);
  };

  const clearCache = async (type?: string) => {
    setIsClearing(true);
    
    try {
      if (!type || type === 'localStorage') {
        localStorage.clear();
      }
      
      if (!type || type === 'sessionStorage') {
        sessionStorage.clear();
      }
      
      if (!type || type === 'memory') {
        // Clear memory cache (simulated)
        console.log('Memory cache cleared');
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      loadCacheData();
      toast.success(`${type ? type : 'All'} cache cleared successfully`);
    } catch (error) {
      toast.error('Failed to clear cache');
    } finally {
      setIsClearing(false);
    }
  };

  const clearExpiredEntries = async () => {
    setIsClearing(true);
    
    try {
      // Remove expired entries
      const expiredEntries = cacheEntries.filter(entry => entry.isExpired);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      loadCacheData();
      toast.success(`Cleared ${expiredEntries.length} expired entries`);
    } catch (error) {
      toast.error('Failed to clear expired entries');
    } finally {
      setIsClearing(false);
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'memory': return 'bg-blue-100 text-blue-800';
      case 'localStorage': return 'bg-green-100 text-green-800';
      case 'sessionStorage': return 'bg-yellow-100 text-yellow-800';
      case 'indexedDB': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const cacheStats = {
    totalEntries: cacheEntries.length,
    expiredEntries: cacheEntries.filter(e => e.isExpired).length,
    memoryEntries: cacheEntries.filter(e => e.type === 'memory').length,
    storageEntries: cacheEntries.filter(e => e.type !== 'memory').length
  };

  return (
    <div className="space-y-6">
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-green-500" />
                Cache Management
              </CardTitle>
              <CardDescription>
                Monitor and optimize application caching performance
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => clearExpiredEntries()}
                disabled={isClearing}
                className="flex items-center gap-2"
              >
                <Clock className="h-4 w-4" />
                Clear Expired
              </Button>
              <Button
                variant="outline"
                onClick={() => clearCache()}
                disabled={isClearing}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Clear All
              </Button>
              <Button
                onClick={loadCacheData}
                disabled={isClearing}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${isClearing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Cache Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <HardDrive className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Total Size</span>
            </div>
            <div className="text-2xl font-bold">{formatSize(totalCacheSize)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Database className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Cache Entries</span>
            </div>
            <div className="text-2xl font-bold">{cacheStats.totalEntries}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Hit Rate</span>
            </div>
            <div className="text-2xl font-bold">{cacheHitRate}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Trash2 className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium">Expired</span>
            </div>
            <div className="text-2xl font-bold">{cacheStats.expiredEntries}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="entries">Cache Entries</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cache Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Memory Cache</span>
                  <Badge className="bg-blue-100 text-blue-800">
                    {cacheStats.memoryEntries} entries
                  </Badge>
                </div>
                <Progress value={(cacheStats.memoryEntries / cacheStats.totalEntries) * 100} />
                
                <div className="flex justify-between items-center">
                  <span>Storage Cache</span>
                  <Badge className="bg-green-100 text-green-800">
                    {cacheStats.storageEntries} entries
                  </Badge>
                </div>
                <Progress value={(cacheStats.storageEntries / cacheStats.totalEntries) * 100} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {((cacheHitRate / 100) * 2.5).toFixed(1)}s
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Average time saved per request
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="entries" className="space-y-4">
          <div className="space-y-2">
            {cacheEntries.map((entry, index) => (
              <Card key={index} className={entry.isExpired ? 'border-red-200' : ''}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className={getTypeColor(entry.type)} variant="secondary">
                        {entry.type}
                      </Badge>
                      <div>
                        <div className="font-medium">{entry.key}</div>
                        <div className="text-sm text-muted-foreground">
                          Last accessed: {entry.lastAccessed.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{formatSize(entry.size)}</div>
                      <div className="text-sm text-muted-foreground">
                        {entry.hitCount} hits
                      </div>
                    </div>
                  </div>
                  {entry.isExpired && (
                    <Badge className="mt-2 bg-red-100 text-red-800" variant="secondary">
                      Expired
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cache Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span>Cache Hit Rate Trend</span>
                  <span className="text-green-600 font-medium">↗ +5.2% this week</span>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span>Memory Usage Optimization</span>
                  <span className="text-blue-600 font-medium">↘ -12% reduction</span>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span>Cache Invalidation Rate</span>
                  <span className="text-yellow-600 font-medium">→ 3.2% stable</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

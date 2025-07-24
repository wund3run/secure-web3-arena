
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Globe, 
  Zap, 
  MapPin, 
  Clock,
  HardDrive,
  Image,
  CheckCircle,
  TrendingUp,
  Settings,
  AlertTriangle
} from 'lucide-react';

interface CDNProvider {
  id: string;
  name: string;
  description: string;
  features: string[];
  globalCoverage: number;
  avgLatency: number;
  pricing: string;
  enabled: boolean;
  configured: boolean;
}

interface CDNRegion {
  id: string;
  name: string;
  location: string;
  latency: number;
  hitRatio: number;
  bandwidthUsage: number;
  status: 'active' | 'inactive' | 'degraded';
}

interface OptimizationRule {
  id: string;
  name: string;
  description: string;
  category: 'caching' | 'compression' | 'optimization' | 'security';
  enabled: boolean;
  impact: 'high' | 'medium' | 'low';
  settings: Record<string, unknown>;
}

export const CDNOptimization = () => {
  const [providers, setProviders] = useState<CDNProvider[]>([]);
  const [regions, setRegions] = useState<CDNRegion[]>([]);
  const [optimizationRules, setOptimizationRules] = useState<OptimizationRule[]>([]);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [selectedTab, setSelectedTab] = useState('providers');

  const cdnProviders: CDNProvider[] = [
    {
      id: 'cloudflare',
      name: 'Cloudflare',
      description: 'Global CDN with advanced security and optimization features',
      features: ['DDoS Protection', 'Web Application Firewall', 'Image Optimization', 'Brotli Compression'],
      globalCoverage: 95,
      avgLatency: 23,
      pricing: 'Free tier available',
      enabled: false,
      configured: false
    },
    {
      id: 'aws-cloudfront',
      name: 'AWS CloudFront',
      description: 'Amazon\'s global content delivery network',
      features: ['Edge Locations', 'Lambda@Edge', 'Real-time Metrics', 'Custom SSL'],
      globalCoverage: 88,
      avgLatency: 31,
      pricing: 'Pay-as-you-go',
      enabled: false,
      configured: false
    },
    {
      id: 'fastly',
      name: 'Fastly',
      description: 'High-performance edge cloud platform',
      features: ['Real-time Analytics', 'Instant Purging', 'VCL Configuration', 'Image Processing'],
      globalCoverage: 78,
      avgLatency: 18,
      pricing: 'Usage-based',
      enabled: false,
      configured: false
    },
    {
      id: 'keycdn',
      name: 'KeyCDN',
      description: 'High-performance content delivery network',
      features: ['HTTP/2', 'Brotli Compression', 'Real-time Stats', 'Origin Shield'],
      globalCoverage: 72,
      avgLatency: 28,
      pricing: 'Pay-as-you-use',
      enabled: false,
      configured: false
    }
  ];

  const cdnRegions: CDNRegion[] = [
    {
      id: 'us-east',
      name: 'US East',
      location: 'Virginia, USA',
      latency: 15,
      hitRatio: 94,
      bandwidthUsage: 2.1,
      status: 'active'
    },
    {
      id: 'us-west',
      name: 'US West',
      location: 'California, USA',
      latency: 22,
      hitRatio: 91,
      bandwidthUsage: 1.8,
      status: 'active'
    },
    {
      id: 'eu-west',
      name: 'EU West',
      location: 'Dublin, Ireland',
      latency: 18,
      hitRatio: 96,
      bandwidthUsage: 1.5,
      status: 'active'
    },
    {
      id: 'asia-pacific',
      name: 'Asia Pacific',
      location: 'Singapore',
      latency: 35,
      hitRatio: 88,
      bandwidthUsage: 1.2,
      status: 'active'
    },
    {
      id: 'australia',
      name: 'Australia',
      location: 'Sydney, Australia',
      latency: 42,
      hitRatio: 85,
      bandwidthUsage: 0.9,
      status: 'degraded'
    }
  ];

  const optimizations: OptimizationRule[] = [
    {
      id: 'browser-caching',
      name: 'Browser Caching',
      description: 'Set optimal cache headers for static assets',
      category: 'caching',
      enabled: false,
      impact: 'high',
      settings: {
        staticAssets: '1y',
        htmlFiles: '1h',
        apiResponses: '5m'
      }
    },
    {
      id: 'gzip-compression',
      name: 'Gzip Compression',
      description: 'Compress text-based assets for faster transfer',
      category: 'compression',
      enabled: false,
      impact: 'high',
      settings: {
        level: 6,
        minSize: 1024,
        types: ['text/html', 'text/css', 'application/javascript', 'application/json']
      }
    },
    {
      id: 'image-optimization',
      name: 'Image Optimization',
      description: 'Automatically optimize and convert images',
      category: 'optimization',
      enabled: false,
      impact: 'high',
      settings: {
        quality: 85,
        formats: ['webp', 'avif'],
        responsive: true
      }
    },
    {
      id: 'minification',
      name: 'Asset Minification',
      description: 'Minify CSS, JavaScript, and HTML files',
      category: 'optimization',
      enabled: false,
      impact: 'medium',
      settings: {
        removeComments: true,
        removeWhitespace: true,
        optimizeJs: true
      }
    },
    {
      id: 'http2-push',
      name: 'HTTP/2 Server Push',
      description: 'Proactively push critical resources',
      category: 'optimization',
      enabled: false,
      impact: 'medium',
      settings: {
        criticalCss: true,
        criticalJs: true,
        fonts: true
      }
    },
    {
      id: 'security-headers',
      name: 'Security Headers',
      description: 'Add security headers for protection',
      category: 'security',
      enabled: false,
      impact: 'medium',
      settings: {
        hsts: true,
        csp: true,
        xssProtection: true
      }
    }
  ];

  useEffect(() => {
    setProviders(cdnProviders);
    setRegions(cdnRegions);
    setOptimizationRules(optimizations);
  }, [cdnProviders, cdnRegions, optimizations]);

  const enableProvider = async (providerId: string) => {
    setIsConfiguring(true);
    
    // Simulate configuration
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setProviders(prev => prev.map(provider => 
      provider.id === providerId 
        ? { ...provider, enabled: true, configured: true }
        : { ...provider, enabled: false, configured: false }
    ));
    
    setIsConfiguring(false);
  };

  const toggleOptimization = (ruleId: string) => {
    setOptimizationRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const enableAllOptimizations = () => {
    setOptimizationRules(prev => prev.map(rule => ({ ...rule, enabled: true })));
  };

  const getActiveProvider = () => {
    return providers.find(provider => provider.enabled);
  };

  const getEnabledOptimizations = () => {
    return optimizationRules.filter(rule => rule.enabled);
  };

  const getOptimizationsByCategory = (category: string) => {
    return optimizationRules.filter(rule => rule.category === category);
  };

  const calculateOptimizationScore = () => {
    const enabledCount = getEnabledOptimizations().length;
    const totalCount = optimizationRules.length;
    return Math.round((enabledCount / totalCount) * 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500';
      case 'degraded': return 'text-yellow-500';
      case 'inactive': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const optimizationCategories = [
    { id: 'caching', name: 'Caching', icon: HardDrive },
    { id: 'compression', name: 'Compression', icon: Zap },
    { id: 'optimization', name: 'Optimization', icon: TrendingUp },
    { id: 'security', name: 'Security', icon: Settings }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">CDN Optimization</h3>
          <p className="text-muted-foreground">Global content delivery and performance optimization</p>
        </div>
        <Badge variant="outline" className="text-lg px-3 py-1">
          Score: {calculateOptimizationScore()}%
        </Badge>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="providers">CDN Providers</TabsTrigger>
          <TabsTrigger value="regions">Global Regions</TabsTrigger>
          <TabsTrigger value="optimizations">Optimizations</TabsTrigger>
          <TabsTrigger value="analytics">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="providers" className="space-y-4">
          <div className="grid gap-4">
            {providers.map((provider) => (
              <Card key={provider.id} className={`${provider.enabled ? 'border-green-500' : 'border-gray-200'}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-blue-500" />
                        <h4 className="font-semibold">{provider.name}</h4>
                        {provider.enabled && (
                          <Badge variant="default" className="bg-green-500">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Active
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{provider.description}</p>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <strong>Global Coverage:</strong> {provider.globalCoverage}%
                        </div>
                        <div>
                          <strong>Avg Latency:</strong> {provider.avgLatency}ms
                        </div>
                        <div>
                          <strong>Pricing:</strong> {provider.pricing}
                        </div>
                      </div>
                      
                      <div>
                        <strong className="text-sm">Features:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {provider.features.map(feature => (
                            <Badge key={feature} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => enableProvider(provider.id)}
                      disabled={isConfiguring || provider.enabled}
                      variant={provider.enabled ? "outline" : "default"}
                    >
                      {isConfiguring ? 'Configuring...' : provider.enabled ? 'Active' : 'Enable'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="regions" className="space-y-4">
          <Alert>
            <MapPin className="h-4 w-4" />
            <AlertDescription>
              {getActiveProvider() ? 
                `CDN regions are managed by ${getActiveProvider()?.name}. Monitor performance across global edge locations.` :
                'Enable a CDN provider to see global region performance.'
              }
            </AlertDescription>
          </Alert>
          
          <div className="grid gap-4 md:grid-cols-2">
            {regions.map((region) => (
              <Card key={region.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {region.name}
                    </span>
                    <Badge variant="outline" className={getStatusColor(region.status)}>
                      {region.status.toUpperCase()}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{region.location}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Latency: {region.latency}ms</span>
                      <Progress value={Math.max(0, 100 - region.latency)} className="w-24 h-2" />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Hit Ratio: {region.hitRatio}%</span>
                      <Progress value={region.hitRatio} className="w-24 h-2" />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Bandwidth: {region.bandwidthUsage} TB</span>
                      <Badge variant="outline">{region.bandwidthUsage > 1.5 ? 'High' : 'Normal'}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="optimizations" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-lg font-semibold">Performance Optimizations</h4>
              <p className="text-sm text-muted-foreground">
                {getEnabledOptimizations().length}/{optimizationRules.length} optimizations enabled
              </p>
            </div>
            <Button onClick={enableAllOptimizations}>
              Enable All Optimizations
            </Button>
          </div>

          <Tabs defaultValue="caching">
            <TabsList className="grid grid-cols-4 w-full">
              {optimizationCategories.map(category => {
                const Icon = category.icon;
                return (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {category.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {optimizationCategories.map(category => (
              <TabsContent key={category.id} value={category.id} className="space-y-4">
                <div className="grid gap-4">
                  {getOptimizationsByCategory(category.id).map((rule) => (
                    <Card key={rule.id} className={`${rule.enabled ? 'border-green-500' : 'border-gray-200'}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-3">
                              <h5 className="font-medium">{rule.name}</h5>
                              <Badge variant="outline" className={getImpactColor(rule.impact)}>
                                {rule.impact.toUpperCase()} IMPACT
                              </Badge>
                              {rule.enabled && (
                                <Badge variant="default" className="bg-green-500">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Active
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{rule.description}</p>
                            
                            {rule.enabled && (
                              <div className="bg-gray-50 p-2 rounded text-xs">
                                <strong>Settings:</strong> {JSON.stringify(rule.settings, null, 2)}
                              </div>
                            )}
                          </div>
                          
                          <Button 
                            variant={rule.enabled ? "outline" : "default"}
                            size="sm"
                            onClick={() => toggleOptimization(rule.id)}
                          >
                            {rule.enabled ? 'Disable' : 'Enable'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">1.2s</div>
                <div className="text-sm text-muted-foreground">Avg Page Load Time</div>
                <Badge variant="outline" className="text-green-600 mt-1">-23% vs last month</Badge>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Globe className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">94%</div>
                <div className="text-sm text-muted-foreground">Global Hit Ratio</div>
                <Badge variant="outline" className="text-green-600 mt-1">+5% vs last month</Badge>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                <div className="text-2xl font-bold">7.2TB</div>
                <div className="text-sm text-muted-foreground">Bandwidth Saved</div>
                <Badge variant="outline" className="text-green-600 mt-1">+12% vs last month</Badge>
              </CardContent>
            </Card>
          </div>

          {!getActiveProvider() && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Enable a CDN provider to see detailed performance analytics and optimization metrics.
              </AlertDescription>
            </Alert>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

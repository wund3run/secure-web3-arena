import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { HawklyCard } from '@/components/ui/hawkly-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IntegrationDashboard } from '@/components/integrations/IntegrationDashboard';
import { EnterpriseControlPanel } from '@/components/integrations/EnterpriseControlPanel';
import { useToast } from '@/components/ui/use-toast';
import {
  Settings,
  PlusCircle,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Search,
  Grid,
  List,
  Filter,
  RefreshCw,
  Globe,
  Server,
  Lock,
  Code,
  Database,
  Webhook,
  Zap
} from 'lucide-react';

export default function IntegrationHub() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('available');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Categories of integrations
  const categories = [
    'all',
    'security',
    'analytics',
    'blockchain',
    'communication',
    'development',
    'enterprise',
    'automation'
  ];

  // Integration statistics
  const stats = {
    totalIntegrations: 47,
    activeIntegrations: 12,
    securityIntegrations: 8,
    enterpriseIntegrations: 5,
    apiUsage: '68%',
    uptime: '99.98%'
  };

  const handleRefresh = () => {
    toast({
      title: "Refreshing integrations",
      description: "Integration status updated successfully.",
    });
  };

  const handleAddIntegration = () => {
    toast({
      title: "Integration wizard started",
      description: "Follow the steps to add a new integration.",
    });
  };

  return (
    <ProductionLayout>
      <Helmet>
        <title>Integration Hub | Hawkly</title>
        <meta name="description" content="Manage your platform integrations and third-party connections" />
      </Helmet>

      <div className="container py-8 max-w-7xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Integration Hub</h1>
              <p className="text-muted-foreground mt-1">
                Manage your platform integrations and third-party connections
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button onClick={handleRefresh} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Status
              </Button>
              <Button onClick={handleAddIntegration} size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Integration
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <HawklyCard className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Integrations</p>
                  <h3 className="text-2xl font-bold">{stats.activeIntegrations}/{stats.totalIntegrations}</h3>
                </div>
                <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-800">
                  Active
                </Badge>
              </div>
            </HawklyCard>
            
            <HawklyCard className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Security Integrations</p>
                  <h3 className="text-2xl font-bold">{stats.securityIntegrations}</h3>
                </div>
                <Badge variant="outline" className="bg-blue-900/20 text-blue-400 border-blue-800">
                  Security
                </Badge>
              </div>
            </HawklyCard>
            
            <HawklyCard className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">API Usage</p>
                  <h3 className="text-2xl font-bold">{stats.apiUsage}</h3>
                </div>
                <Badge variant="outline" className="bg-purple-900/20 text-purple-400 border-purple-800">
                  Healthy
                </Badge>
              </div>
            </HawklyCard>
          </div>

          {/* Main Integration Dashboard */}
          <HawklyCard>
            <div className="p-6">
              <Tabs defaultValue="available" value={activeTab} onValueChange={setActiveTab}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
                  <TabsList className="w-full md:w-auto">
                    <TabsTrigger value="available">Available Integrations</TabsTrigger>
                    <TabsTrigger value="active">Active Integrations</TabsTrigger>
                    <TabsTrigger value="enterprise">Enterprise Control</TabsTrigger>
                  </TabsList>
                  
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-muted-foreground" />
                      <Input
                        placeholder="Search integrations..."
                        className="pl-8 h-9 w-full md:w-[200px]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="h-9 w-[130px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`px-2 ${viewMode === 'grid' ? 'bg-secondary' : ''}`}
                        onClick={() => setViewMode('grid')}
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`px-2 ${viewMode === 'list' ? 'bg-secondary' : ''}`}
                        onClick={() => setViewMode('list')}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <TabsContent value="available">
                  <IntegrationDashboard />
                </TabsContent>
                
                <TabsContent value="active">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Active Integration 1 */}
                      <HawklyCard variant="glass" className="relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-2 h-full bg-green-500" />
                        <div className="p-4">
                          <div className="flex items-center space-x-2 mb-3">
                            <Lock className="h-6 w-6 text-green-400" />
                            <h3 className="font-semibold">OpenZeppelin Defender</h3>
                          </div>
                          <Badge className="mb-3 bg-green-900/20 text-green-400 border-green-800">Security</Badge>
                          <p className="text-sm text-muted-foreground mb-4">
                            Automated smart contract monitoring and protection
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span className="flex items-center">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-1" /> Connected
                            </span>
                            <span>Last synced: 5m ago</span>
                          </div>
                        </div>
                      </HawklyCard>

                      {/* Active Integration 2 */}
                      <HawklyCard variant="glass" className="relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-2 h-full bg-blue-500" />
                        <div className="p-4">
                          <div className="flex items-center space-x-2 mb-3">
                            <BarChart3 className="h-6 w-6 text-blue-400" />
                            <h3 className="font-semibold">Dune Analytics</h3>
                          </div>
                          <Badge className="mb-3 bg-blue-900/20 text-blue-400 border-blue-800">Analytics</Badge>
                          <p className="text-sm text-muted-foreground mb-4">
                            Blockchain data analysis and visualization
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span className="flex items-center">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-1" /> Connected
                            </span>
                            <span>Last synced: 2h ago</span>
                          </div>
                        </div>
                      </HawklyCard>

                      {/* Active Integration 3 */}
                      <HawklyCard variant="glass" className="relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-2 h-full bg-purple-500" />
                        <div className="p-4">
                          <div className="flex items-center space-x-2 mb-3">
                            <Globe className="h-6 w-6 text-purple-400" />
                            <h3 className="font-semibold">Alchemy</h3>
                          </div>
                          <Badge className="mb-3 bg-purple-900/20 text-purple-400 border-purple-800">Blockchain</Badge>
                          <p className="text-sm text-muted-foreground mb-4">
                            Web3 infrastructure and development platform
                          </p>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span className="flex items-center">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-1" /> Connected
                            </span>
                            <span>Last synced: Just now</span>
                          </div>
                        </div>
                      </HawklyCard>

                      {/* More active integrations would be here */}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="enterprise">
                  <EnterpriseControlPanel />
                </TabsContent>
              </Tabs>
            </div>
          </HawklyCard>

          {/* API Usage & Documentation */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <HawklyCard className="h-full">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">API Usage</h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>REST API Calls</span>
                        <span>84,392 / 100,000</span>
                      </div>
                      <div className="w-full h-2 bg-gray-700 rounded-full">
                        <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: '84%' }} />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Webhook Events</span>
                        <span>2,471 / 10,000</span>
                      </div>
                      <div className="w-full h-2 bg-gray-700 rounded-full">
                        <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: '24.7%' }} />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Real-time Connections</span>
                        <span>87 / 250</span>
                      </div>
                      <div className="w-full h-2 bg-gray-700 rounded-full">
                        <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: '34.8%' }} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">Recent API Events</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 rounded-md bg-gray-800/50">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm">OpenZeppelin Defender webhook received</span>
                        </div>
                        <span className="text-xs text-muted-foreground">2 minutes ago</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 rounded-md bg-gray-800/50">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-sm">Dune Analytics data sync completed</span>
                        </div>
                        <span className="text-xs text-muted-foreground">1 hour ago</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-2 rounded-md bg-gray-800/50">
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                          <span className="text-sm">Rate limit warning: Etherscan API</span>
                        </div>
                        <span className="text-xs text-muted-foreground">3 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </HawklyCard>
            </div>
            
            <div>
              <HawklyCard className="h-full">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Quick Resources</h2>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Code className="h-4 w-4 mr-2" />
                      API Documentation
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <Webhook className="h-4 w-4 mr-2" />
                      Webhook Setup Guide
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <Lock className="h-4 w-4 mr-2" />
                      Security Best Practices
                    </Button>
                    
                    <Button variant="outline" className="w-full justify-start">
                      <Zap className="h-4 w-4 mr-2" />
                      Integration Templates
                    </Button>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <h3 className="font-medium mb-2">Need Help?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Contact our integration specialists for custom integration support
                    </p>
                    <Button className="w-full">
                      Contact Integration Team
                    </Button>
                  </div>
                </div>
              </HawklyCard>
            </div>
          </div>
        </div>
      </div>
    </ProductionLayout>
  );
}

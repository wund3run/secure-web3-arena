
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  Shield, 
  Brain, 
  BarChart3, 
  CreditCard, 
  Globe, 
  Settings,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';

interface Integration {
  id: string;
  name: string;
  category: 'blockchain' | 'ai' | 'payments' | 'analytics' | 'security' | 'communication';
  status: 'connected' | 'pending' | 'disconnected' | 'error';
  description: string;
  icon: React.ReactNode;
  features: string[];
  isEnabled: boolean;
  lastSync?: string;
  health: number; // 0-100
}

export const IntegrationDashboard = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'alchemy',
      name: 'Alchemy',
      category: 'blockchain',
      status: 'connected',
      description: 'Blockchain infrastructure and real-time monitoring',
      icon: <Globe className="h-5 w-5" />,
      features: ['Contract Analysis', 'Network Monitoring', 'Transaction Tracking'],
      isEnabled: true,
      lastSync: '2 minutes ago',
      health: 98
    },
    {
      id: 'openai',
      name: 'OpenAI',
      category: 'ai',
      status: 'connected',
      description: 'AI-powered code analysis and vulnerability detection',
      icon: <Brain className="h-5 w-5" />,
      features: ['Code Analysis', 'Report Generation', 'Anomaly Detection'],
      isEnabled: true,
      lastSync: '5 minutes ago',
      health: 95
    },
    {
      id: 'stripe-connect',
      name: 'Stripe Connect',
      category: 'payments',
      status: 'connected',
      description: 'Marketplace payments with escrow and fee splitting',
      icon: <CreditCard className="h-5 w-5" />,
      features: ['Marketplace Payments', 'Escrow', 'Fee Splitting', 'Refunds'],
      isEnabled: true,
      lastSync: '1 minute ago',
      health: 100
    },
    {
      id: 'mixpanel',
      name: 'Mixpanel',
      category: 'analytics',
      status: 'pending',
      description: 'Advanced user analytics and conversion tracking',
      icon: <BarChart3 className="h-5 w-5" />,
      features: ['User Journey', 'Conversion Funnels', 'Retention Analysis'],
      isEnabled: false,
      health: 0
    },
    {
      id: 'forta',
      name: 'Forta Network',
      category: 'security',
      status: 'disconnected',
      description: 'Continuous security monitoring and threat detection',
      icon: <Shield className="h-5 w-5" />,
      features: ['Real-time Monitoring', 'Threat Detection', 'Alert System'],
      isEnabled: false,
      health: 0
    }
  ]);

  const [activeTab, setActiveTab] = useState('overview');

  const getStatusIcon = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Integration['status']) => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleToggleIntegration = async (integrationId: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === integrationId 
          ? { ...integration, isEnabled: !integration.isEnabled }
          : integration
      )
    );
    
    toast.success('Integration settings updated');
  };

  const handleConnectIntegration = async (integrationId: string) => {
    toast.loading('Connecting integration...');
    
    // Simulate connection process
    setTimeout(() => {
      setIntegrations(prev => 
        prev.map(integration => 
          integration.id === integrationId 
            ? { 
                ...integration, 
                status: 'connected', 
                isEnabled: true,
                lastSync: 'just now',
                health: 95 
              }
            : integration
        )
      );
      
      toast.dismiss();
      toast.success('Integration connected successfully');
    }, 2000);
  };

  const connectedIntegrations = integrations.filter(i => i.status === 'connected').length;
  const totalIntegrations = integrations.length;
  const overallHealth = Math.round(
    integrations.reduce((sum, i) => sum + i.health, 0) / integrations.length
  );

  const integrationsByCategory = integrations.reduce((acc, integration) => {
    if (!acc[integration.category]) {
      acc[integration.category] = [];
    }
    acc[integration.category].push(integration);
    return acc;
  }, {} as Record<string, Integration[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Integration Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your Web3 SaaS platform integrations
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-sm">
            {connectedIntegrations}/{totalIntegrations} Connected
          </Badge>
          <Badge variant="secondary" className="text-sm">
            Health: {overallHealth}%
          </Badge>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <span className="font-medium">Active Integrations</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">{connectedIntegrations}</div>
              <div className="text-sm text-muted-foreground">
                out of {totalIntegrations} available
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="font-medium">System Health</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">{overallHealth}%</div>
              <Progress value={overallHealth} className="mt-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-500" />
              <span className="font-medium">AI Features</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">
                {integrations.filter(i => i.category === 'ai' && i.status === 'connected').length}
              </div>
              <div className="text-sm text-muted-foreground">AI services active</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-500" />
              <span className="font-medium">Data Sync</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">Real-time</div>
              <div className="text-sm text-muted-foreground">Last: 2 min ago</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integration Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
          <TabsTrigger value="ai">AI & ML</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {integrations.map((integration) => (
              <Card key={integration.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center gap-3">
                    {integration.icon}
                    <div>
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {integration.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(integration.status)}
                    <Badge className={getStatusColor(integration.status)}>
                      {integration.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {integration.features.map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  
                  {integration.status === 'connected' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Health</span>
                        <span className="text-sm">{integration.health}%</span>
                      </div>
                      <Progress value={integration.health} />
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Last sync: {integration.lastSync}
                        </span>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={integration.isEnabled}
                            onCheckedChange={() => handleToggleIntegration(integration.id)}
                          />
                          <Settings className="h-4 w-4 text-muted-foreground cursor-pointer" />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {integration.status !== 'connected' && (
                    <Button 
                      onClick={() => handleConnectIntegration(integration.id)}
                      className="w-full"
                    >
                      Connect {integration.name}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {Object.entries(integrationsByCategory).map(([category, categoryIntegrations]) => (
          <TabsContent key={category} value={category} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {categoryIntegrations.map((integration) => (
                <Card key={integration.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      {integration.icon}
                      <div>
                        <CardTitle>{integration.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {integration.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {integration.features.map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    {integration.status === 'connected' ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Status</span>
                          <Badge className={getStatusColor(integration.status)}>
                            {integration.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Health</span>
                          <span className="text-sm">{integration.health}%</span>
                        </div>
                        <Progress value={integration.health} />
                        <div className="flex items-center justify-between">
                          <Switch
                            checked={integration.isEnabled}
                            onCheckedChange={() => handleToggleIntegration(integration.id)}
                          />
                          <Button variant="outline" size="sm">
                            Configure
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button 
                        onClick={() => handleConnectIntegration(integration.id)}
                        className="w-full"
                      >
                        Connect {integration.name}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

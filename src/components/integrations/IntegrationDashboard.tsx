
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  CreditCard, 
  Brain, 
  Shield, 
  Settings, 
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';

interface Integration {
  id: string;
  name: string;
  description: string;
  status: 'connected' | 'disconnected' | 'pending';
  icon: React.ReactNode;
  category: 'analytics' | 'payments' | 'ai' | 'security' | 'blockchain';
  features: string[];
}

export const IntegrationDashboard = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'mixpanel',
      name: 'Mixpanel Analytics',
      description: 'Advanced user behavior tracking and conversion analysis',
      status: 'disconnected',
      icon: <Activity className="h-5 w-5" />,
      category: 'analytics',
      features: ['User Journey Tracking', 'Conversion Funnels', 'Behavioral Analytics']
    },
    {
      id: 'stripe',
      name: 'Stripe Connect',
      description: 'Marketplace payments with automatic fee splitting',
      status: 'disconnected',
      icon: <CreditCard className="h-5 w-5" />,
      category: 'payments',
      features: ['Marketplace Payments', 'Escrow Services', 'Multi-party Payouts']
    },
    {
      id: 'openai',
      name: 'OpenAI',
      description: 'AI-powered code analysis and vulnerability detection',
      status: 'connected',
      icon: <Brain className="h-5 w-5" />,
      category: 'ai',
      features: ['Smart Contract Analysis', 'Vulnerability Detection', 'Gas Optimization']
    },
    {
      id: 'alchemy',
      name: 'Alchemy',
      description: 'Blockchain infrastructure and real-time monitoring',
      status: 'disconnected',
      icon: <Shield className="h-5 w-5" />,
      category: 'blockchain',
      features: ['Multi-chain Support', 'Real-time Monitoring', 'Enhanced APIs']
    }
  ]);

  const toggleIntegration = (id: string) => {
    setIntegrations(prev => prev.map(integration => {
      if (integration.id === id) {
        const newStatus = integration.status === 'connected' ? 'disconnected' : 'connected';
        toast.success(`${integration.name} ${newStatus === 'connected' ? 'connected' : 'disconnected'} successfully`);
        return { ...integration, status: newStatus };
      }
      return integration;
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      connected: 'default',
      disconnected: 'secondary',
      pending: 'outline'
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'secondary'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const categories = ['all', 'analytics', 'payments', 'ai', 'security', 'blockchain'];
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredIntegrations = selectedCategory === 'all' 
    ? integrations 
    : integrations.filter(integration => integration.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Integration Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your third-party integrations and services
          </p>
        </div>
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          Manage All
        </Button>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-6">
          {categories.map(category => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations.map((integration) => (
              <Card key={integration.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {integration.icon}
                      <CardTitle className="text-lg">{integration.name}</CardTitle>
                    </div>
                    {getStatusIcon(integration.status)}
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(integration.status)}
                    <Badge variant="outline" className="capitalize">
                      {integration.category}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {integration.description}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Features:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {integration.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={integration.status === 'connected'}
                        onCheckedChange={() => toggleIntegration(integration.id)}
                      />
                      <span className="text-sm">
                        {integration.status === 'connected' ? 'Connected' : 'Connect'}
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredIntegrations.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No integrations found</h3>
            <p className="text-muted-foreground">
              No integrations available for the selected category.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

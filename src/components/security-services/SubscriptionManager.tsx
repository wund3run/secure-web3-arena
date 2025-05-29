
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSubscription } from '@/hooks/useSubscription';
import { Shield, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const SUBSCRIPTION_TIERS = {
  basic: {
    name: 'Basic',
    price: 29,
    features: ['basic_monitoring', 'monthly_reports'],
    description: 'Essential security monitoring'
  },
  professional: {
    name: 'Professional',
    price: 99,
    features: ['continuous_monitoring', 'threat_intelligence', 'compliance_basic'],
    description: 'Advanced security with threat intelligence'
  },
  enterprise: {
    name: 'Enterprise',
    price: 299,
    features: ['continuous_monitoring', 'threat_intelligence', 'compliance_advanced', 'insurance_coverage', 'priority_support'],
    description: 'Complete security suite with insurance'
  }
};

export const SubscriptionManager = () => {
  const { subscription, loading, upgradeSubscription, hasFeature } = useSubscription();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'trial': return 'bg-blue-100 text-blue-800';
      case 'suspended': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFeatureArray = (features: any): string[] => {
    if (Array.isArray(features)) {
      return features;
    }
    return [];
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Security Subscription
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Subscription */}
      {subscription && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Current Subscription
              </div>
              <Badge className={getStatusColor(subscription.status)}>
                {subscription.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold capitalize">{subscription.tier}</h3>
                <p className="text-sm text-muted-foreground">
                  ${subscription.monthly_cost}/month
                </p>
              </div>
              {subscription.expires_at && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  Expires {new Date(subscription.expires_at).toLocaleDateString()}
                </div>
              )}
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Active Features:</h4>
              <div className="flex flex-wrap gap-2">
                {getFeatureArray(subscription.features).map((feature) => (
                  <Badge key={feature} variant="outline" className="flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {feature.replace('_', ' ')}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Plans */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(SUBSCRIPTION_TIERS).map(([tier, details]) => (
            <Card key={tier} className={subscription?.tier === tier ? 'ring-2 ring-primary' : ''}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {details.name}
                  {subscription?.tier === tier && (
                    <Badge variant="default">Current</Badge>
                  )}
                </CardTitle>
                <div className="text-2xl font-bold">${details.price}<span className="text-sm font-normal">/month</span></div>
                <p className="text-sm text-muted-foreground">{details.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {details.features.map((feature) => (
                    <div key={feature} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      {feature.replace('_', ' ')}
                    </div>
                  ))}
                </div>
                
                {subscription?.tier !== tier && (
                  <Button 
                    className="w-full"
                    onClick={() => upgradeSubscription(tier as any, details.features)}
                  >
                    {subscription ? 'Upgrade' : 'Start Trial'}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Feature Status */}
      {subscription && (
        <Card>
          <CardHeader>
            <CardTitle>Security Features Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                {hasFeature('continuous_monitoring') ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-gray-400" />
                )}
                <span className="text-sm">Continuous Monitoring</span>
              </div>
              <div className="flex items-center space-x-2">
                {hasFeature('threat_intelligence') ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-gray-400" />
                )}
                <span className="text-sm">Threat Intelligence</span>
              </div>
              <div className="flex items-center space-x-2">
                {hasFeature('insurance_coverage') ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-gray-400" />
                )}
                <span className="text-sm">Insurance Coverage</span>
              </div>
              <div className="flex items-center space-x-2">
                {hasFeature('compliance_advanced') ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-gray-400" />
                )}
                <span className="text-sm">Advanced Compliance</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

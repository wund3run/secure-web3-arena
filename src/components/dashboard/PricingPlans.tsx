
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, ListOrdered } from 'lucide-react';
import { toast } from 'sonner';

export function PricingPlans() {
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      description: 'Essential security for startups and early-stage projects',
      price: {
        monthly: 49,
        yearly: 39,
      },
      features: [
        'Up to 5 audits per month',
        'Access to marketplace auditors',
        'Basic vulnerability scanning',
        'Email support',
        'Up to 3 team members',
      ],
      highlighted: false,
    },
    {
      id: 'pro',
      name: 'Professional',
      description: 'Enhanced protection for growing projects and organizations',
      price: {
        monthly: 99,
        yearly: 79,
      },
      features: [
        'Unlimited audits',
        'Priority matching with top auditors',
        'Advanced vulnerability analysis',
        'GitHub integration',
        'Priority support',
        'Up to 10 team members',
        'Custom audit parameters',
      ],
      highlighted: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Comprehensive security for established Web3 projects',
      price: {
        monthly: 199,
        yearly: 159,
      },
      features: [
        'All Professional features',
        'Continuous monitoring',
        'Dedicated security advisor',
        'Custom security dashboard',
        'Audit insurance coverage',
        'SLA guarantees',
        'Unlimited team members',
        'API access',
        'SSO authentication',
      ],
      highlighted: false,
    },
  ];

  const handleSelectPlan = (planId: string) => {
    setCurrentPlan(planId);
    toast.success(`${plans.find(p => p.id === planId)?.name} plan selected!`, {
      description: "This is a demo. No actual billing will occur.",
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Security Subscription Plans</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose the perfect security plan that fits your Web3 project's needs
        </p>
      </div>
      
      <div className="flex justify-center">
        <Tabs value={billingInterval} onValueChange={(value) => setBillingInterval(value as 'monthly' | 'yearly')}>
          <TabsList className="grid w-64 grid-cols-2">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly <Badge variant="outline" className="ml-1 rounded-sm">-20%</Badge></TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={plan.highlighted ? "border-primary/50 shadow-md" : "border-border/40"}
          >
            {plan.highlighted && (
              <Badge className="absolute top-4 right-4">
                Most popular
              </Badge>
            )}
            <CardHeader>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">${plan.price[billingInterval]}</span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <ListOrdered className="h-4 w-4" />
                  <span className="font-medium">Features</span>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex text-sm">
                      <Check className="h-4 w-4 mr-2 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                variant={plan.highlighted ? "default" : "outline"}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {currentPlan === plan.id ? "Current Plan" : "Select Plan"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="bg-muted/50 rounded-lg p-6 max-w-3xl mx-auto">
        <h3 className="text-lg font-medium mb-3">Enterprise Security Solutions</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Need a custom security solution for your organization? Our enterprise plans can be tailored to your specific requirements.
        </p>
        <div className="flex justify-center">
          <Button variant="outline">
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  );
}

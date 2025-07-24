import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Plus, Users, Settings, BookOpen, Shield, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const QuickActions = () => {
  const navigate = useNavigate();

  const handleMissingRoute = (routeName: string, fallbackRoute?: string) => {
    toast.info(`${routeName} feature coming soon!`, {
      description: fallbackRoute ? `Redirecting to ${fallbackRoute}` : "We're working on this feature."
    });
    if (fallbackRoute) {
      navigate(fallbackRoute);
    }
  };

  const actions = [
    {
      title: 'Request New Audit',
      description: 'Start a security audit for your project',
      icon: Plus,
      href: '/request-audit',
      variant: 'default' as const,
      priority: 'high',
      onClick: () => navigate('/request-audit')
    },
    {
      title: 'Browse Auditors',
      description: 'Find expert security auditors',
      icon: Users,
      href: '/marketplace',
      variant: 'outline' as const,
      priority: 'medium',
      onClick: () => navigate('/marketplace')
    },
    {
      title: 'View Analytics',
      description: 'Track your security metrics',
      icon: BarChart3,
      href: '/analytics',
      variant: 'outline' as const,
      priority: 'medium',
      onClick: () => navigate('/analytics')
    },
    {
      title: 'Security Resources',
      description: 'Learn about Web3 security',
      icon: BookOpen,
      href: '/resources',
      variant: 'outline' as const,
      priority: 'low',
      onClick: () => navigate('/resources')
    },
    {
      title: 'Security Settings',
      description: 'Manage your security preferences',
      icon: Settings,
      href: '/user/settings',
      variant: 'outline' as const,
      priority: 'low',
      onClick: () => navigate('/user/settings')
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={index}
              variant={action.variant}
              className="w-full justify-start h-auto p-4"
              onClick={action.onClick}
            >
              <div className="flex items-center gap-3 w-full">
                <div className={`p-2 rounded-lg ${
                  action.priority === 'high' ? 'bg-primary/20' : 'bg-muted'
                }`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </div>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};

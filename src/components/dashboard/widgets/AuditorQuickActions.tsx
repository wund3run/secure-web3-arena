
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Search, 
  FileText, 
  Award, 
  MessageSquare, 
  TrendingUp,
  Shield,
  Calendar,
  Settings
} from 'lucide-react';

export const AuditorQuickActions = () => {
  const actions = [
    {
      title: 'Find New Audits',
      description: 'Browse available audit opportunities',
      icon: Search,
      href: '/marketplace',
      variant: 'default' as const,
      priority: 'high'
    },
    {
      title: 'My Active Audits',
      description: 'Continue working on current projects',
      icon: FileText,
      href: '/audits',
      variant: 'outline' as const,
      priority: 'high'
    },
    {
      title: 'Update Profile',
      description: 'Enhance your auditor profile',
      icon: Award,
      href: '/profile',
      variant: 'outline' as const,
      priority: 'medium'
    },
    {
      title: 'Client Messages',
      description: 'Check your conversations',
      icon: MessageSquare,
      href: '/messages',
      variant: 'outline' as const,
      priority: 'medium'
    },
    {
      title: 'Performance Analytics',
      description: 'View your audit statistics',
      icon: TrendingUp,
      href: '/analytics',
      variant: 'outline' as const,
      priority: 'low'
    },
    {
      title: 'Security Guidelines',
      description: 'Review audit best practices',
      icon: Shield,
      href: '/guidelines',
      variant: 'outline' as const,
      priority: 'low'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
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
              asChild
              className="w-full justify-start h-auto p-4"
            >
              <Link to={action.href}>
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
              </Link>
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
};

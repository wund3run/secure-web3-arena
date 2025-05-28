
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Shield, Users, Settings, BarChart3, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuickActionsProps {
  userType: string;
}

export function QuickActions({ userType }: QuickActionsProps) {
  const auditorActions = [
    {
      icon: <Shield className="h-4 w-4" />,
      title: 'Browse Audit Requests',
      description: 'Find new projects to audit',
      href: '/marketplace',
      variant: 'default' as const
    },
    {
      icon: <FileText className="h-4 w-4" />,
      title: 'Submit Report',
      description: 'Upload completed audit report',
      href: '/audits',
      variant: 'outline' as const
    },
    {
      icon: <BarChart3 className="h-4 w-4" />,
      title: 'View Analytics',
      description: 'Check performance metrics',
      href: '/dashboard/analytics',
      variant: 'outline' as const
    },
    {
      icon: <Settings className="h-4 w-4" />,
      title: 'Update Profile',
      description: 'Manage skills and certifications',
      href: '/profile',
      variant: 'outline' as const
    }
  ];

  const projectOwnerActions = [
    {
      icon: <Plus className="h-4 w-4" />,
      title: 'Request New Audit',
      description: 'Get your project audited',
      href: '/request-audit',
      variant: 'default' as const
    },
    {
      icon: <Shield className="h-4 w-4" />,
      title: 'Browse Auditors',
      description: 'Find security experts',
      href: '/marketplace',
      variant: 'outline' as const
    },
    {
      icon: <FileText className="h-4 w-4" />,
      title: 'View Reports',
      description: 'Check audit reports',
      href: '/audits',
      variant: 'outline' as const
    },
    {
      icon: <MessageSquare className="h-4 w-4" />,
      title: 'Contact Support',
      description: 'Get help with your projects',
      href: '/support',
      variant: 'outline' as const
    }
  ];

  const actions = userType === 'auditor' ? auditorActions : projectOwnerActions;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          {userType === 'auditor' ? 'Manage your audit business' : 'Manage your security projects'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              className="justify-start h-auto p-4"
              asChild
            >
              <Link to={action.href}>
                <div className="flex items-center gap-3">
                  {action.icon}
                  <div className="text-left">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-sm text-muted-foreground">{action.description}</div>
                  </div>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

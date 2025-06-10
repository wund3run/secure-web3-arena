
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  FileText, 
  MessageSquare, 
  Settings, 
  Search,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Request New Audit',
      description: 'Start a new security audit for your project',
      icon: Plus,
      color: 'bg-primary',
      textColor: 'text-primary-foreground',
      onClick: () => navigate('/audit/new'),
      priority: 'high'
    },
    {
      title: 'Find Auditors',
      description: 'Browse verified security auditors',
      icon: Search,
      color: 'bg-secondary',
      textColor: 'text-secondary-foreground',
      onClick: () => navigate('/auditors'),
      priority: 'medium'
    },
    {
      title: 'View Reports',
      description: 'Access your audit reports and findings',
      icon: FileText,
      color: 'bg-accent',
      textColor: 'text-accent-foreground',
      onClick: () => navigate('/reports'),
      priority: 'medium'
    },
    {
      title: 'Messages',
      description: 'Communicate with your auditors',
      icon: MessageSquare,
      color: 'bg-orange-500',
      textColor: 'text-white',
      onClick: () => navigate('/messages'),
      priority: 'low',
      badge: '3' // Could be dynamic
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <div key={index} className="relative">
              <Button
                variant="outline"
                className="w-full h-auto p-4 flex flex-col items-center gap-3 hover:shadow-brand transition-all duration-300 group"
                onClick={action.onClick}
              >
                <div className={`p-3 rounded-full ${action.color} group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className={`h-5 w-5 ${action.textColor}`} />
                </div>
                
                <div className="text-center">
                  <h4 className="font-medium text-sm">{action.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {action.description}
                  </p>
                </div>

                {action.priority === 'high' && (
                  <Badge variant="default" className="absolute -top-2 -right-2 text-xs">
                    Recommended
                  </Badge>
                )}

                {action.badge && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 text-xs">
                    {action.badge}
                  </Badge>
                )}
              </Button>
            </div>
          ))}
        </div>

        {/* Helpful tip */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-muted">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
            <div>
              <h5 className="text-sm font-medium mb-1">💡 Pro Tip</h5>
              <p className="text-xs text-muted-foreground">
                Start your first audit request to unlock advanced features and get personalized recommendations.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

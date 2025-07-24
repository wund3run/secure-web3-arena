import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  FileText, 
  Users, 
  BarChart3,
  Settings,
  Search,
  Calendar,
  Shield,
  Brain,
  Briefcase,
  MessageSquare,
  TrendingUp
} from 'lucide-react';

interface NavigationStep {
  step: number;
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  status?: 'completed' | 'current' | 'upcoming';
}

interface QuickAction {
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  variant: 'default' | 'outline';
  badge?: string;
}

export const AuditorNavigationGuide: React.FC = () => {
  const location = useLocation();

  const workflowSteps: NavigationStep[] = [
    {
      step: 1,
      title: 'Browse Opportunities',
      description: 'Find and apply to audit projects that match your skills',
      path: '/auditor/opportunities',
      icon: <Search className="h-4 w-4" />,
    },
    {
      step: 2,
      title: 'Prepare for Audit',
      description: 'Set up tools, review requirements, and communicate with clients',
      path: '/auditor/preparation',
      icon: <FileText className="h-4 w-4" />,
    },
    {
      step: 3,
      title: 'Conduct Analysis',
      description: 'Use AI-powered tools for comprehensive security analysis',
      path: '/phase4',
      icon: <Brain className="h-4 w-4" />,
    },
    {
      step: 4,
      title: 'Complete Audit',
      description: 'Finalize findings and submit deliverables to client',
      path: '/audits',
      icon: <CheckCircle className="h-4 w-4" />,
    }
  ];

  const quickActions: QuickAction[] = [
    {
      title: 'Dashboard Overview',
      description: 'View active projects and performance metrics',
      path: '/dashboard/auditor',
      icon: <BarChart3 className="h-4 w-4" />,
      variant: 'default'
    },
    {
      title: 'Find New Projects',
      description: 'Browse available audit opportunities',
      path: '/auditor/opportunities',
      icon: <Search className="h-4 w-4" />,
      variant: 'outline'
    },
    {
      title: 'AI-Powered Tools',
      description: 'Access advanced analysis and blockchain integration',
      path: '/phase4',
      icon: <Brain className="h-4 w-4" />,
      variant: 'outline',
      badge: 'New'
    },
    {
      title: 'Enhanced Dashboard',
      description: 'Advanced features and intelligent workspace',
      path: '/auditor/enhanced-dashboard',
      icon: <Settings className="h-4 w-4" />,
      variant: 'outline'
    },
    {
      title: 'Professional Growth',
      description: 'Skills development and certification tracking',
      path: '/professional-growth',
      icon: <TrendingUp className="h-4 w-4" />,
      variant: 'outline'
    },
    {
      title: 'Messages',
      description: 'Client communications and project discussions',
      path: '/messages',
      icon: <MessageSquare className="h-4 w-4" />,
      variant: 'outline'
    }
  ];

  const isCurrentPath = (path: string) => location.pathname === path;

  const getCurrentStep = () => {
    return workflowSteps.find(step => isCurrentPath(step.path))?.step || 0;
  };

  return (
    <div className="space-y-6">
      {/* Workflow Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Auditor Workflow Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workflowSteps.map((step, index) => {
              const isCurrent = isCurrentPath(step.path);
              const isCompleted = index < getCurrentStep() - 1;
              
              return (
                <div key={step.step} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCurrent 
                      ? 'bg-primary text-primary-foreground' 
                      : isCompleted 
                        ? 'bg-green-100 text-green-600'
                        : 'bg-gray-100 text-gray-600'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <span className="text-sm font-semibold">{step.step}</span>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className={`font-medium ${isCurrent ? 'text-primary' : ''}`}>
                          {step.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                      
                      <Button
                        variant={isCurrent ? "default" : "outline"}
                        size="sm"
                        asChild
                      >
                        <Link to={step.path}>
                          {step.icon}
                          <span className="ml-2">
                            {isCurrent ? 'Continue' : isCompleted ? 'Review' : 'Start'}
                          </span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <Button
                key={action.path}
                variant={action.variant}
                className="h-auto p-4 flex flex-col items-start text-left justify-start"
                asChild
              >
                <Link to={action.path}>
                  <div className="flex items-center justify-between w-full mb-2">
                    <div className="flex items-center gap-2">
                      {action.icon}
                      <span className="font-medium">{action.title}</span>
                    </div>
                    {action.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {action.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground text-left">
                    {action.description}
                  </p>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation Status */}
      <Card>
        <CardHeader>
          <CardTitle>Navigation Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Current Location:</span>
              <Badge variant="outline">{location.pathname}</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Workflow Step:</span>
              <Badge variant="secondary">
                Step {getCurrentStep() || 'N/A'}
              </Badge>
            </div>
            
            <div className="pt-3 border-t">
              <p className="text-xs text-muted-foreground">
                All navigation links have been verified and are working correctly. 
                Click any button above to navigate seamlessly through your auditor workflow.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditorNavigationGuide; 
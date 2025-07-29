import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  FileText, 
  Users, 
  BarChart3,
  Settings,
  Search,
  Calendar
} from 'lucide-react';

interface NavigationLink {
  path: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
  badge?: string;
}

export const AuditorNavigationFixes: React.FC = () => {
  const location = useLocation();

  const navigationLinks: NavigationLink[] = [
    {
      path: '/dashboard/auditor',
      label: 'Dashboard',
      icon: <BarChart3 className="h-4 w-4" />,
      description: 'Your main auditor workspace',
    },
    {
      path: '/auditor/opportunities',
      label: 'Browse Opportunities',
      icon: <Search className="h-4 w-4" />,
      description: 'Find new audit projects',
    },
    {
      path: '/auditor/preparation',
      label: 'Audit Preparation',
      icon: <FileText className="h-4 w-4" />,
      description: 'Prepare for active audits',
    },
    {
      path: '/audits',
      label: 'My Audits',
      icon: <CheckCircle className="h-4 w-4" />,
      description: 'View and manage your audits',
    },
    {
      path: '/auditor/enhanced-dashboard',
      label: 'Enhanced Dashboard',
      icon: <BarChart3 className="h-4 w-4" />,
      description: 'Advanced auditor features',
      badge: 'New'
    },
    {
      path: '/phase4',
      label: 'AI-Powered Tools',
      icon: <Settings className="h-4 w-4" />,
      description: 'AI analysis and blockchain integration',
      badge: 'Phase 4'
    },
    {
      path: '/profile',
      label: 'Profile',
      icon: <Users className="h-4 w-4" />,
      description: 'Manage your auditor profile',
    },
    {
      path: '/professional-growth',
      label: 'Professional Growth',
      icon: <Users className="h-4 w-4" />,
      description: 'Enhance your skills and certifications',
    }
  ];

  const quickActions = [
    {
      path: '/marketplace',
      label: 'Find New Projects',
      icon: <Search className="h-4 w-4" />,
      variant: 'default' as const
    },
    {
      path: '/auditor/preparation',
      label: 'Continue Active Audit',
      icon: <Clock className="h-4 w-4" />,
      variant: 'outline' as const
    },
    {
      path: '/messages',
      label: 'Client Messages',
      icon: <FileText className="h-4 w-4" />,
      variant: 'outline' as const
    },
    {
      path: '/analytics',
      label: 'View Analytics',
      icon: <BarChart3 className="h-4 w-4" />,
      variant: 'outline' as const
    }
  ];

  const isCurrentPath = (path: string) => location.pathname === path;

  return (
    <div className="space-y-6">
      {/* Navigation Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Auditor Navigation Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {navigationLinks.map((link) => (
              <Button
                key={link.path}
                variant={isCurrentPath(link.path) ? "default" : "outline"}
                className="h-auto p-4 flex flex-col items-start text-left"
                asChild
              >
                <Link to={link.path}>
                  <div className="flex items-center justify-between w-full mb-2">
                    <div className="flex items-center gap-2">
                      {link.icon}
                      <span className="font-medium">{link.label}</span>
                    </div>
                    {link.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {link.badge}
                      </Badge>
                    )}
                  </div>
                  {link.description && (
                    <p className="text-xs text-muted-foreground">
                      {link.description}
                    </p>
                  )}
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {quickActions.map((action) => (
              <Button
                key={action.path}
                variant={action.variant}
                size="sm"
                asChild
              >
                <Link to={action.path}>
                  {action.icon}
                  <span className="ml-2">{action.label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workflow Navigation */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Workflow Navigation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-semibold text-blue-600">1</span>
                </div>
                <div>
                  <p className="font-medium">Browse Opportunities</p>
                  <p className="text-sm text-muted-foreground">Find and apply to audit projects</p>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/auditor/opportunities">
                  <Search className="h-4 w-4 mr-2" />
                  Browse
                </Link>
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-sm font-semibold text-green-600">2</span>
                </div>
                <div>
                  <p className="font-medium">Prepare for Audit</p>
                  <p className="text-sm text-muted-foreground">Set up tools and review requirements</p>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/auditor/preparation">
                  <FileText className="h-4 w-4 mr-2" />
                  Prepare
                </Link>
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <span className="text-sm font-semibold text-purple-600">3</span>
                </div>
                <div>
                  <p className="font-medium">Conduct Audit</p>
                  <p className="text-sm text-muted-foreground">Use AI tools and advanced analysis</p>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/phase4">
                  <Settings className="h-4 w-4 mr-2" />
                  AI Tools
                </Link>
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-sm font-semibold text-orange-600">4</span>
                </div>
                <div>
                  <p className="font-medium">Complete & Submit</p>
                  <p className="text-sm text-muted-foreground">Finalize audit and deliver results</p>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/audits">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Complete
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditorNavigationFixes; 
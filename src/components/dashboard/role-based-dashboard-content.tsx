import React from 'react';
import { useAuth } from '@/contexts/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Users, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  FileText,
  Star,
  TrendingUp,
  Activity,
  AlertTriangle
} from 'lucide-react';

export const RoleBasedDashboardContent = () => {
  const { user, userProfile, getUserType } = useAuth();
  
  const userType = getUserType();
  const displayName = userProfile?.display_name || userProfile?.full_name || user?.email?.split('@')[0] || 'User';
  const projectsCompleted = userProfile?.projects_completed || 0;

  const renderAuditorContent = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Welcome, Security Auditor
          </CardTitle>
          <CardDescription>
            Manage your audits and enhance platform security
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              You have access to advanced security tools and audit management features.
            </p>
            <div className="flex gap-4">
              <Button>
                View Open Audits
              </Button>
              <Button variant="outline">
                Review Findings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Stay updated on recent audit activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            No recent activities to display.
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const renderProjectOwnerContent = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Welcome, {displayName}
          </CardTitle>
          <CardDescription>
            Manage your projects and security audits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              You have completed {projectsCompleted} projects. Request a new audit or view existing ones.
            </p>
            <div className="flex gap-4">
              <Button>
                Request New Audit
              </Button>
              <Button variant="outline">
                View Audit Status
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance Insights
          </CardTitle>
          <CardDescription>
            Track your project's security performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            No performance data available.
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const renderAdminContent = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Admin Dashboard
          </CardTitle>
          <CardDescription>
            Manage platform users, audits, and settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              You have full control over the platform. Manage users, audits, and settings.
            </p>
            <div className="flex gap-4">
              <Button>
                Manage Users
              </Button>
              <Button variant="outline">
                View All Audits
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Security Alerts
          </CardTitle>
          <CardDescription>
            View recent security alerts and take action
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            No security alerts to display.
          </p>
        </CardContent>
      </Card>
    </div>
  );

  // Fix the visitor comparison by removing it since getUserType doesn't return 'visitor'
  const renderGeneralContent = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Welcome to Hawkly
          </CardTitle>
          <CardDescription>
            Get started with our security audit platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Choose your role to get started with personalized features.
            </p>
            <div className="flex gap-4">
              <Button>
                Become an Auditor
              </Button>
              <Button variant="outline">
                Request an Audit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Render content based on user type
  switch (userType) {
    case 'auditor':
      return renderAuditorContent();
    case 'project_owner':
      return renderProjectOwnerContent();
    case 'admin':
      return renderAdminContent();
    case 'general':
      return renderGeneralContent();
    default:
      return renderGeneralContent();
  }
};

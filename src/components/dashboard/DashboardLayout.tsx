
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Shield, 
  FileText, 
  Clock, 
  TrendingUp, 
  Settings,
  Plus,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function DashboardLayout() {
  const { user, getUserType, userProfile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && user) {
      try {
        const userType = getUserType();
        const currentPath = location.pathname;
        
        // Redirect to appropriate dashboard based on user type
        if (currentPath === '/dashboard') {
          if (userType === 'auditor') {
            navigate('/dashboard/auditor', { replace: true });
          } else if (userType === 'admin') {
            navigate('/admin/dashboard', { replace: true });
          } else {
            navigate('/dashboard/project', { replace: true });
          }
        }
      } catch (error) {
        console.error('Error determining user type:', error);
        // Default fallback
        navigate('/dashboard/project', { replace: true });
      }
    }
  }, [user, getUserType, loading, navigate, location.pathname]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-12">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please sign in to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/auth">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const userType = getUserType();

  // Project Owner Dashboard
  if (userType === 'project_owner') {
    return (
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Project Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {userProfile?.full_name || user.email}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Audits</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">+1 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Audits</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45.2K</div>
              <p className="text-xs text-muted-foreground">On security audits</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">96%</div>
              <p className="text-xs text-muted-foreground">Average across projects</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Audit Activity</CardTitle>
              <CardDescription>Your latest security assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">DeFi Protocol Audit</p>
                    <p className="text-sm text-muted-foreground">In progress - 65% complete</p>
                  </div>
                  <Badge>Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">NFT Marketplace Review</p>
                    <p className="text-sm text-muted-foreground">Completed 3 days ago</p>
                  </div>
                  <Badge variant="outline">Completed</Badge>
                </div>
              </div>
              <Button asChild className="w-full mt-4">
                <Link to="/audits">View All Audits</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full justify-start">
                <Link to="/request-audit">
                  <Plus className="mr-2 h-4 w-4" />
                  Request New Audit
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start">
                <Link to="/marketplace">
                  <User className="mr-2 h-4 w-4" />
                  Browse Auditors
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start">
                <Link to="/security-settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Security Settings
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Auditor Dashboard
  if (userType === 'auditor') {
    return (
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Auditor Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {userProfile?.full_name || user.email}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Currently auditing</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Audits</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">Total completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$127K</div>
              <p className="text-xs text-muted-foreground">This year</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.5%</div>
              <p className="text-xs text-muted-foreground">Client satisfaction</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Current Projects</CardTitle>
              <CardDescription>Your active audit assignments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">DEX Protocol Security Review</p>
                    <p className="text-sm text-muted-foreground">Due in 5 days</p>
                  </div>
                  <Badge>High Priority</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">GameFi Smart Contract Audit</p>
                    <p className="text-sm text-muted-foreground">Due in 8 days</p>
                  </div>
                  <Badge variant="outline">Normal</Badge>
                </div>
              </div>
              <Button asChild className="w-full mt-4">
                <Link to="/marketplace">
                  Browse New Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Professional Tools</CardTitle>
              <CardDescription>Access your audit toolkit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full justify-start">
                <Link to="/ai-tools">
                  <Shield className="mr-2 h-4 w-4" />
                  AI Security Scanner
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start">
                <Link to="/submit-service">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Service Offering
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-start">
                <Link to="/leaderboard">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Leaderboard
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Default fallback
  return (
    <div className="container py-12">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle>Welcome to Hawkly</CardTitle>
          <CardDescription>Complete your profile to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link to="/service-provider-onboarding">Complete Setup</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

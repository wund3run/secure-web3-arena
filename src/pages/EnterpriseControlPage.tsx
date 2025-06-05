
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Users, Settings, BarChart3, Shield, Key } from 'lucide-react';
import { EnhancedLoadingState } from '@/components/ui/enhanced-loading-state';

export default function EnterpriseControlPage() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <EnhancedLoadingState message="Loading enterprise dashboard..." />;
  }

  const organizationStats = [
    { label: 'Total Users', value: '247', icon: Users },
    { label: 'Active Projects', value: '34', icon: Building2 },
    { label: 'Security Score', value: '92/100', icon: Shield },
    { label: 'Compliance Rate', value: '98%', icon: BarChart3 }
  ];

  const recentActivities = [
    { action: 'New user invitation sent', user: 'admin@company.com', time: '2 hours ago' },
    { action: 'Security policy updated', user: 'security-team', time: '1 day ago' },
    { action: 'Audit completed for Project Alpha', user: 'auditor-1', time: '2 days ago' }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            Enterprise Control Center
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your organization's security operations and governance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button>
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </Button>
        </div>
      </div>

      {/* Organization Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {organizationStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Control Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest organizational activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">by {activity.user}</p>
                    </div>
                    <Badge variant="outline">{activity.time}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Overview</CardTitle>
                <CardDescription>Current security status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Two-Factor Authentication</span>
                  <Badge variant="default">98% Adoption</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Security Training</span>
                  <Badge variant="default">Completed</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Vulnerability Scans</span>
                  <Badge variant="secondary">Scheduled</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Compliance Audit</span>
                  <Badge variant="default">Passed</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage organization users and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Active Users</p>
                    <p className="text-sm text-muted-foreground">247 users across all departments</p>
                  </div>
                  <Button>Manage Users</Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Pending Invitations</p>
                    <p className="text-sm text-muted-foreground">12 invitations awaiting response</p>
                  </div>
                  <Button variant="outline">View Pending</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Management</CardTitle>
              <CardDescription>Enterprise project oversight and control</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Active Projects</p>
                    <p className="text-sm text-muted-foreground">34 projects currently in progress</p>
                  </div>
                  <Button>View All Projects</Button>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Security Audits</p>
                    <p className="text-sm text-muted-foreground">8 audits completed this month</p>
                  </div>
                  <Button variant="outline">Audit Reports</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Dashboard</CardTitle>
              <CardDescription>Regulatory compliance and governance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">SOC 2 Compliance</p>
                    <p className="text-sm text-muted-foreground">Last audit: 3 months ago</p>
                  </div>
                  <Badge variant="default">Compliant</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">GDPR Compliance</p>
                    <p className="text-sm text-muted-foreground">Data protection measures</p>
                  </div>
                  <Badge variant="default">Compliant</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Industry Standards</p>
                    <p className="text-sm text-muted-foreground">ISO 27001 certification</p>
                  </div>
                  <Badge variant="default">Certified</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

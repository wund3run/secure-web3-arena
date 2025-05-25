
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  TrendingUp, 
  Clock, 
  FileText, 
  Users, 
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Calendar,
  BarChart3
} from 'lucide-react';
import { ProductionErrorBoundary } from '@/components/error/production-error-boundary';

export default function DashboardPage() {
  const mockProjects = [
    {
      id: '1',
      name: 'DeFi Protocol V2',
      status: 'In Progress',
      progress: 65,
      auditor: 'CyberSec Labs',
      deadline: '2024-02-15',
      type: 'Smart Contract'
    },
    {
      id: '2',
      name: 'NFT Marketplace',
      status: 'Completed',
      progress: 100,
      auditor: 'BlockShield Security',
      deadline: '2024-01-20',
      type: 'Web Application'
    },
    {
      id: '3',
      name: 'Cross-Chain Bridge',
      status: 'Pending',
      progress: 0,
      auditor: 'ChainGuard Analytics',
      deadline: '2024-03-01',
      type: 'Protocol'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'In Progress': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'Pending': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <ProductionErrorBoundary>
      <div className="container mx-auto py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your security audits and projects
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                +1 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Audits</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +3 from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,200</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">
                Based on 12 audits
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList>
            <TabsTrigger value="projects">My Projects</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Current Projects</h2>
              <Button>
                <Shield className="mr-2 h-4 w-4" />
                Request New Audit
              </Button>
            </div>

            <div className="grid gap-6">
              {mockProjects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Audited by {project.auditor}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(project.status)}
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-medium">Type</p>
                        <p className="text-sm text-muted-foreground">{project.type}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Deadline</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {project.deadline}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Progress</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={project.progress} className="flex-1" />
                          <span className="text-sm font-medium">{project.progress}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-3 w-3" />
                          View Report
                        </Button>
                        <Button variant="outline" size="sm">
                          <Users className="mr-2 h-3 w-3" />
                          Contact Auditor
                        </Button>
                      </div>
                      <Button size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">NFT Marketplace audit completed</p>
                      <p className="text-sm text-muted-foreground">
                        Final report delivered by BlockShield Security
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                    <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium">DeFi Protocol V2 progress update</p>
                      <p className="text-sm text-muted-foreground">
                        65% complete - Vulnerability testing phase started
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Cross-Chain Bridge audit assigned</p>
                      <p className="text-sm text-muted-foreground">
                        ChainGuard Analytics will begin audit on Feb 20th
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Audit Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average completion time</span>
                      <span className="font-medium">3.2 weeks</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Fastest completion</span>
                      <span className="font-medium">1.5 weeks</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">On-time delivery rate</span>
                      <span className="font-medium">92%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Security Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Critical vulnerabilities found</span>
                      <span className="font-medium text-red-600">2</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Medium risk issues</span>
                      <span className="font-medium text-yellow-600">8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Low risk findings</span>
                      <span className="font-medium text-green-600">15</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProductionErrorBoundary>
  );
}

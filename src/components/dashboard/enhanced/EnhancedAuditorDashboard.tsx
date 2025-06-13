
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  DollarSign, 
  Shield, 
  Clock, 
  TrendingUp, 
  Star,
  Briefcase,
  Target,
  Users,
  CheckCircle
} from 'lucide-react';
import { AuditorWorkspace } from './AuditorWorkspace';
import { ProjectMarketplace } from './ProjectMarketplace';

// Mock data for dashboard metrics
const dashboardMetrics = {
  activeAu dits: 3,
  completedAudits: 47,
  totalEarnings: 127500,
  averageRating: 4.9,
  responseTime: 2.4,
  successRate: 95.2,
  pendingPayments: 25500,
  monthlyGrowth: 15.3
};

const recentActivity = [
  {
    id: '1',
    type: 'audit_completed',
    title: 'Completed audit for DeFi Protocol',
    description: 'Successfully completed security audit for YieldMax Protocol',
    time: '2 hours ago',
    amount: 15000
  },
  {
    id: '2',
    type: 'payment_received',
    title: 'Payment received',
    description: 'Milestone payment for NFT Marketplace audit',
    time: '1 day ago',
    amount: 8500
  },
  {
    id: '3',
    type: 'new_opportunity',
    title: 'New project opportunity',
    description: 'High-value cross-chain bridge audit available',
    time: '2 days ago',
    matchScore: 94
  }
];

export function EnhancedAuditorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Auditor Dashboard</h1>
          <p className="text-muted-foreground">
            Your comprehensive security auditing workspace
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Senior Auditor
          </Badge>
          <Button>
            <Briefcase className="h-4 w-4 mr-2" />
            Find Projects
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Audits</p>
                <p className="text-2xl font-bold">{dashboardMetrics.activeAudits}</p>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span>+{dashboardMetrics.monthlyGrowth}%</span>
                </div>
              </div>
              <div className="text-muted-foreground">
                <Shield className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-2xl font-bold">${dashboardMetrics.totalEarnings.toLocaleString()}</p>
                <div className="flex items-center gap-1 text-sm text-blue-600">
                  <DollarSign className="h-3 w-3" />
                  <span>${dashboardMetrics.pendingPayments.toLocaleString()} pending</span>
                </div>
              </div>
              <div className="text-muted-foreground">
                <DollarSign className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">{dashboardMetrics.successRate}%</p>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle className="h-3 w-3" />
                  <span>{dashboardMetrics.completedAudits} completed</span>
                </div>
              </div>
              <div className="text-muted-foreground">
                <Target className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rating</p>
                <p className="text-2xl font-bold">{dashboardMetrics.averageRating}</p>
                <div className="flex items-center gap-1 text-sm text-yellow-600">
                  <Star className="h-3 w-3 fill-current" />
                  <span>{dashboardMetrics.responseTime}h avg response</span>
                </div>
              </div>
              <div className="text-muted-foreground">
                <Star className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="workspace">Active Workspace</TabsTrigger>
          <TabsTrigger value="marketplace">Find Projects</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{activity.title}</h4>
                        <p className="text-xs text-muted-foreground">{activity.description}</p>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                      {activity.amount && (
                        <Badge variant="secondary">
                          ${activity.amount.toLocaleString()}
                        </Badge>
                      )}
                      {activity.matchScore && (
                        <Badge variant="default">
                          {activity.matchScore}% match
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Project Success Rate</span>
                      <span>{dashboardMetrics.successRate}%</span>
                    </div>
                    <Progress value={dashboardMetrics.successRate} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Client Satisfaction</span>
                      <span>{(dashboardMetrics.averageRating / 5 * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={dashboardMetrics.averageRating / 5 * 100} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Response Time Score</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="workspace">
          <AuditorWorkspace />
        </TabsContent>

        <TabsContent value="marketplace">
          <ProjectMarketplace />
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Analytics & Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Detailed analytics dashboard with earnings trends, project performance,
                and market insights would be implemented here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

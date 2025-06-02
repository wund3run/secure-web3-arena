
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, CheckCircle, Clock, DollarSign, Star, TrendingUp, Users, FileText } from 'lucide-react';

const DashboardAuditor = () => {
  const stats = [
    { label: "Active Audits", value: "3", icon: <Clock className="h-5 w-5" />, change: "+1" },
    { label: "Completed Audits", value: "47", icon: <CheckCircle className="h-5 w-5" />, change: "+2" },
    { label: "Total Earnings", value: "$127,500", icon: <DollarSign className="h-5 w-5" />, change: "+$15,000" },
    { label: "Rating", value: "4.9", icon: <Star className="h-5 w-5" />, change: "+0.1" }
  ];

  const activeAudits = [
    {
      id: "AUD-2025-0142",
      project: "DeFi Yield Aggregator",
      client: "YieldMax Protocol",
      deadline: "2025-03-25",
      progress: 65,
      priority: "High",
      value: "$12,000"
    },
    {
      id: "AUD-2025-0138",
      project: "NFT Marketplace V2",
      client: "CryptoArts",
      deadline: "2025-03-20",
      progress: 85,
      priority: "Medium",
      value: "$8,500"
    },
    {
      id: "AUD-2025-0135",
      project: "Cross-Chain Bridge",
      client: "BridgeSecure",
      deadline: "2025-03-30",
      progress: 25,
      priority: "Critical",
      value: "$25,000"
    }
  ];

  const recentEarnings = [
    { date: "2025-03-10", project: "Smart Lottery Contract", amount: "$7,500", status: "Paid" },
    { date: "2025-03-05", project: "DAO Governance Audit", amount: "$15,000", status: "Paid" },
    { date: "2025-02-28", project: "Token Staking Platform", amount: "$9,200", status: "Pending" }
  ];

  return (
    <StandardLayout
      title="Auditor Dashboard"
      description="Your security auditing workspace"
    >
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Auditor Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Alex Chen</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule
            </Button>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              New Report
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <TrendingUp className="h-3 w-3" />
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <div className="text-muted-foreground">{stat.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="active-audits" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active-audits">Active Audits</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="active-audits" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Active Audits</h2>
              <Button variant="outline">View All</Button>
            </div>
            
            <div className="space-y-4">
              {activeAudits.map((audit) => (
                <Card key={audit.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{audit.project}</h3>
                        <p className="text-sm text-muted-foreground">by {audit.client}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={audit.priority === 'Critical' ? 'destructive' : audit.priority === 'High' ? 'default' : 'secondary'}>
                          {audit.priority}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">ID: {audit.id}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{audit.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all" 
                          style={{ width: `${audit.progress}%` }}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>Due: {audit.deadline}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold">{audit.value}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1">Continue Audit</Button>
                      <Button variant="outline">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-4">
            <h2 className="text-xl font-semibold">Recent Earnings</h2>
            <div className="space-y-4">
              {recentEarnings.map((earning, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{earning.project}</h3>
                        <p className="text-sm text-muted-foreground">{earning.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">{earning.amount}</p>
                        <Badge variant={earning.status === 'Paid' ? 'default' : 'secondary'}>
                          {earning.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Your auditing performance over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-500">98.2%</div>
                    <div className="text-sm text-muted-foreground">On-time Delivery</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-500">4.9</div>
                    <div className="text-sm text-muted-foreground">Average Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-500">47</div>
                    <div className="text-sm text-muted-foreground">Audits Completed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StandardLayout>
  );
};

export default DashboardAuditor;

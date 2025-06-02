
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle, Clock, DollarSign, FileText, Plus, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardProject = () => {
  const stats = [
    { label: "Active Audits", value: "2", icon: <Clock className="h-5 w-5" />, color: "text-blue-500" },
    { label: "Completed Audits", value: "8", icon: <CheckCircle className="h-5 w-5" />, color: "text-green-500" },
    { label: "Total Spent", value: "$45,200", icon: <DollarSign className="h-5 w-5" />, color: "text-purple-500" },
    { label: "Issues Resolved", value: "127", icon: <Shield className="h-5 w-5" />, color: "text-orange-500" }
  ];

  const activeAudits = [
    {
      id: "AUD-2025-0142",
      project: "DeFi Yield Protocol V2",
      auditor: "SecurityPro Labs",
      status: "In Progress",
      progress: 75,
      startDate: "2025-03-10",
      deadline: "2025-03-25",
      cost: "$15,000",
      critical: 0,
      high: 2,
      medium: 5
    },
    {
      id: "AUD-2025-0139",
      project: "NFT Marketplace Security Review",
      auditor: "CyberShield Security",
      status: "Testing Phase",
      progress: 45,
      startDate: "2025-03-15",
      deadline: "2025-03-30",
      cost: "$8,500",
      critical: 1,
      high: 1,
      medium: 3
    }
  ];

  const completedAudits = [
    {
      id: "AUD-2025-0135",
      project: "Token Bridge Contract",
      auditor: "BlockAudit Pro",
      completedDate: "2025-03-08",
      cost: "$12,000",
      rating: 5,
      issuesFound: 12,
      status: "Completed"
    },
    {
      id: "AUD-2025-0132",
      project: "Governance Module Audit",
      auditor: "SecureCode Labs",
      completedDate: "2025-02-28",
      cost: "$7,500",
      rating: 4.8,
      issuesFound: 8,
      status: "Completed"
    }
  ];

  return (
    <StandardLayout
      title="Project Dashboard"
      description="Manage your security audits and projects"
    >
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Project Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, DeFi Protocol Team</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              View Reports
            </Button>
            <Link to="/request-audit">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Audit Request
              </Button>
            </Link>
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
                  </div>
                  <div className={stat.color}>{stat.icon}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">Active Audits</TabsTrigger>
            <TabsTrigger value="completed">Completed Audits</TabsTrigger>
            <TabsTrigger value="reports">Security Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Active Security Audits</h2>
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Message Auditors
              </Button>
            </div>
            
            <div className="space-y-6">
              {activeAudits.map((audit) => (
                <Card key={audit.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{audit.project}</CardTitle>
                        <CardDescription>by {audit.auditor}</CardDescription>
                      </div>
                      <Badge variant="outline">{audit.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Started:</span>
                        <div className="font-medium">{audit.startDate}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Deadline:</span>
                        <div className="font-medium">{audit.deadline}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Cost:</span>
                        <div className="font-medium">{audit.cost}</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{audit.progress}%</span>
                      </div>
                      <Progress value={audit.progress} className="h-2" />
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span>{audit.critical} Critical</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <span>{audit.high} High</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span>{audit.medium} Medium</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">View Progress</Button>
                        <Button size="sm">Contact Auditor</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <h2 className="text-xl font-semibold">Completed Security Audits</h2>
            <div className="space-y-4">
              {completedAudits.map((audit) => (
                <Card key={audit.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{audit.project}</h3>
                        <p className="text-sm text-muted-foreground">by {audit.auditor}</p>
                      </div>
                      <Badge variant="default">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        {audit.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-muted-foreground">Completed:</span>
                        <div className="font-medium">{audit.completedDate}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Cost:</span>
                        <div className="font-medium">{audit.cost}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Issues Found:</span>
                        <div className="font-medium">{audit.issuesFound}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Rating:</span>
                        <div className="font-medium flex items-center gap-1">
                          {audit.rating} ⭐
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        Download Report
                      </Button>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Security Reports</CardTitle>
                <CardDescription>All security reports and documentation for your projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Security Reports Repository</h3>
                  <p className="text-muted-foreground mb-4">
                    Access all your security audit reports, vulnerability assessments, and compliance documentation.
                  </p>
                  <Button>Browse Reports</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StandardLayout>
  );
};

export default DashboardProject;

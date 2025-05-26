
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, TrendingUp, Clock, AlertTriangle, CheckCircle, BarChart3, FileText, Settings } from "lucide-react";
import { Link } from "react-router-dom";

export function ProjectOwnerDashboard() {
  const mockProjects = [
    {
      id: 1,
      name: "DeFi Protocol V2",
      status: "In Progress",
      progress: 65,
      auditor: "Alex Security",
      deadline: "2024-02-15",
      riskLevel: "Medium"
    },
    {
      id: 2,
      name: "NFT Marketplace",
      status: "Completed",
      progress: 100,
      auditor: "Maria Expert",
      deadline: "2024-01-30",
      riskLevel: "Low"
    },
    {
      id: 3,
      name: "Cross-Chain Bridge",
      status: "Planning",
      progress: 15,
      auditor: "TBD",
      deadline: "2024-03-01",
      riskLevel: "High"
    }
  ];

  const securityMetrics = {
    totalIssues: 23,
    criticalIssues: 2,
    resolvedIssues: 18,
    securityScore: 85
  };

  return (
    <div className="space-y-6">
      {/* Security Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{securityMetrics.securityScore}%</div>
            <p className="text-xs text-muted-foreground">Overall security rating</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{securityMetrics.totalIssues - securityMetrics.resolvedIssues}</div>
            <p className="text-xs text-muted-foreground">{securityMetrics.criticalIssues} critical issues</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Issues</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{securityMetrics.resolvedIssues}</div>
            <p className="text-xs text-muted-foreground">Fixed vulnerabilities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProjects.length}</div>
            <p className="text-xs text-muted-foreground">Total projects</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Active Projects</TabsTrigger>
          <TabsTrigger value="analytics">Security Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Project Portfolio</h3>
            <Button asChild>
              <Link to="/request-audit">
                <Shield className="mr-2 h-4 w-4" />
                Request New Audit
              </Link>
            </Button>
          </div>

          <div className="grid gap-4">
            {mockProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <Badge 
                      variant={project.status === "Completed" ? "default" : project.status === "In Progress" ? "secondary" : "outline"}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    Auditor: {project.auditor} • Deadline: {project.deadline}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant={project.riskLevel === "High" ? "destructive" : project.riskLevel === "Medium" ? "secondary" : "default"}
                      >
                        {project.riskLevel} Risk
                      </Badge>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Trends</CardTitle>
              <CardDescription>Track your security posture over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Vulnerability Distribution</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Critical</span>
                      <span className="font-mono text-red-600">2</span>
                    </div>
                    <div className="flex justify-between">
                      <span>High</span>
                      <span className="font-mono text-orange-600">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Medium</span>
                      <span className="font-mono text-yellow-600">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Low</span>
                      <span className="font-mono text-green-600">8</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Resolution Timeline</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Average Resolution:</span>
                      <span className="font-mono">3.2 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Critical Issues:</span>
                      <span className="font-mono">0.8 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Fixed:</span>
                      <span className="font-mono text-green-600">{securityMetrics.resolvedIssues}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit Reports</CardTitle>
              <CardDescription>Access your security audit documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProjects.filter(p => p.status === "Completed").map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{project.name} - Final Report</div>
                        <div className="text-sm text-muted-foreground">Completed {project.deadline}</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Download PDF</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Best Practices</CardTitle>
                <CardDescription>Essential guidelines for your projects</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/for-project-owners">
                    View Project Owner Resources
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audit Preparation</CardTitle>
                <CardDescription>Get ready for your next security audit</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/resources/audit-preparation">
                    Preparation Checklist
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

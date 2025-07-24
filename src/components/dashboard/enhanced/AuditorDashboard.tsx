import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, DollarSign, Clock, Trophy, TrendingUp, Calendar, FileText, Award, User, Briefcase, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import AuditorProjectBrowser from "@/components/auditor-parameters/AuditorProjectBrowser";
import AuditorNavigationGuide from "@/components/navigation/AuditorNavigationGuide";

export function AuditorDashboard() {
  const mockAudits = [
    {
      id: 1,
      projectName: "DeFi Lending Protocol",
      client: "CryptoFinance Ltd",
      status: "In Progress",
      progress: 75,
      deadline: "2024-02-10",
      payment: "$12,500",
      complexity: "High"
    },
    {
      id: 2,
      projectName: "NFT Gaming Platform",
      client: "GameDAO",
      status: "Review",
      progress: 95,
      deadline: "2024-02-05",
      payment: "$8,000",
      complexity: "Medium"
    },
    {
      id: 3,
      projectName: "Cross-Chain Bridge",
      client: "BridgeTech",
      status: "Completed",
      progress: 100,
      deadline: "2024-01-28",
      payment: "$15,000",
      complexity: "High"
    }
  ];

  const performanceMetrics = {
    totalEarnings: 45250,
    completedAudits: 23,
    averageRating: 4.8,
    responseTime: 2.4
  };

  return (
    <div className="space-y-6">
      {/* Performance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${performanceMetrics.totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{performanceMetrics.averageRating}</div>
            <p className="text-xs text-muted-foreground">Average client rating</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Audits</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.completedAudits}</div>
            <p className="text-xs text-muted-foreground">Successfully delivered</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.responseTime}h</div>
            <p className="text-xs text-muted-foreground">Average response time</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="audits" className="space-y-4">
        <TabsList>
          <TabsTrigger value="audits">Active Audits</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="skills">Skills & Certs</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="navigation">Navigation Guide</TabsTrigger>
        </TabsList>

        <TabsContent value="audits" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Current Projects</h3>
            <Button asChild>
              <Link to="/auditor/opportunities">
                <Calendar className="mr-2 h-4 w-4" />
                Browse Opportunities
              </Link>
            </Button>
          </div>

          <div className="grid gap-4">
            {mockAudits.map((audit) => (
              <Card key={audit.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{audit.projectName}</CardTitle>
                    <Badge 
                      variant={audit.status === "Completed" ? "default" : audit.status === "In Progress" ? "secondary" : "outline"}
                    >
                      {audit.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    Client: {audit.client} • Due: {audit.deadline} • {audit.payment}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{audit.progress}%</span>
                      </div>
                      <Progress value={audit.progress} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant={audit.complexity === "High" ? "destructive" : audit.complexity === "Medium" ? "secondary" : "default"}
                      >
                        {audit.complexity} Complexity
                      </Badge>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={audit.status === "In Progress" ? "/auditor/preparation" : "/audits"}>
                          {audit.status === "In Progress" ? "Continue Audit" : "View Details"}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          <AuditorProjectBrowser />
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Overview</CardTitle>
                <CardDescription>Track your income performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>This Month</span>
                    <span className="font-mono text-green-600">$8,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Month</span>
                    <span className="font-mono">$12,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average/Month</span>
                    <span className="font-mono">$9,750</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Payments</span>
                    <span className="font-mono text-orange-600">$20,500</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Client Feedback</CardTitle>
                <CardDescription>Recent client reviews and ratings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm">CryptoFinance Ltd</span>
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    "Exceptional work quality and attention to detail. Found critical issues we missed."
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex">
                      {[1,2,3,4].map(i => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <Star className="h-4 w-4 text-gray-300" />
                    </div>
                    <span className="text-sm">GameDAO</span>
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    "Thorough audit with clear recommendations. Delivery was on time."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Technical Skills</CardTitle>
                <CardDescription>Your verified security expertise</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Solidity Security</span>
                    <Badge>Expert</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>DeFi Protocols</span>
                    <Badge>Advanced</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Cross-Chain Security</span>
                    <Badge variant="secondary">Intermediate</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Gas Optimization</span>
                    <Badge>Advanced</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
                <CardDescription>Professional security certifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="text-sm">Certified Ethereum Security Professional</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="text-sm">CISSP - Information Security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="text-sm">ConsenSys Diligence Certification</span>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4" asChild>
                    <Link to="/for-auditors">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Skill Development
                    </Link>
                  </Button>
                  <Button size="sm" className="mt-2 ml-2" asChild>
                    <Link to="/portfolio/create">
                      <User className="mr-2 h-4 w-4" />
                      Create Portfolio
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Professional Portfolio</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/portfolio/demo-auditor">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview Portfolio
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/portfolio/create">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Build Portfolio
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Status</CardTitle>
                <CardDescription>Complete your professional showcase</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Profile Completeness</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">✅ Basic Information</span>
                      <Badge variant="default" size="sm">Complete</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">✅ Skills & Expertise</span>
                      <Badge variant="default" size="sm">Complete</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">⚠️ Past Projects</span>
                      <Badge variant="secondary" size="sm">Partial</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">❌ Testimonials</span>
                      <Badge variant="outline" size="sm">Missing</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">❌ Portfolio Media</span>
                      <Badge variant="outline" size="sm">Missing</Badge>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-3">
                      Complete your portfolio to attract premium audit opportunities
                    </p>
                    <Button size="sm" className="w-full" asChild>
                      <Link to="/portfolio/create">
                        Complete Portfolio Setup
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Portfolio Analytics</CardTitle>
                <CardDescription>Track your portfolio performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Profile Views</span>
                    <span className="font-mono text-blue-600">47</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Contact Requests</span>
                    <span className="font-mono text-green-600">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Project Invitations</span>
                    <span className="font-mono text-purple-600">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Portfolio Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-mono">4.2</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-xs text-muted-foreground mb-2">This Week's Activity</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>5 new profile views</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>2 contact requests</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>1 project invitation</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Featured Work</CardTitle>
                <CardDescription>Showcase your best audit projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">DeFi Lending Protocol</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Comprehensive security audit with 12 vulnerabilities found
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <Badge variant="secondary">High Impact</Badge>
                      <span>Jan 2024</span>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Cross-Chain Bridge</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Critical vulnerability in bridge logic prevented $2M exploit
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <Badge variant="destructive">Critical</Badge>
                      <span>Dec 2023</span>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-muted/50 border-dashed">
                    <div className="text-center py-4">
                      <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-3">
                        Add more projects to showcase your expertise
                      </p>
                      <Button size="sm" variant="outline" asChild>
                        <Link to="/portfolio/create">
                          Add Project
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="navigation" className="space-y-4">
          <AuditorNavigationGuide />
        </TabsContent>
      </Tabs>
    </div>
  );
}


import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Check, Database, Lock, AlertTriangle, Server, Users, FileCode, ChartBar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AuditStatsTable } from "@/components/home/audit-stats-table";
import { MarketplaceFooter } from "@/components/home/marketplace/marketplace-footer";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SecurityMetric {
  name: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}

const SecurityDashboard = () => {
  const [timeFrame, setTimeFrame] = useState<string>("weekly");

  const securityMetrics: SecurityMetric[] = [
    { 
      name: "Security Score", 
      value: "92%", 
      change: 3, 
      icon: <Shield className="h-5 w-5 text-primary" /> 
    },
    { 
      name: "Audits Completed", 
      value: 47, 
      change: 12, 
      icon: <Check className="h-5 w-5 text-green-500" /> 
    },
    { 
      name: "Critical Vulnerabilities", 
      value: 3, 
      change: -5, 
      icon: <AlertTriangle className="h-5 w-5 text-red-500" /> 
    },
    { 
      name: "Active Monitors", 
      value: 24, 
      change: 2, 
      icon: <Server className="h-5 w-5 text-blue-500" /> 
    },
  ];

  const recentAlerts = [
    { id: 1, severity: "critical", title: "Unauthorized access attempt", source: "API Gateway", time: "2 hours ago" },
    { id: 2, severity: "high", title: "Smart contract reentrancy vulnerability", source: "Contract Scanner", time: "5 hours ago" },
    { id: 3, severity: "medium", title: "Outdated dependency detected", source: "Dependency Scanner", time: "1 day ago" },
    { id: 4, severity: "low", title: "Non-standard token implementation", source: "Token Validator", time: "2 days ago" }
  ];

  const securityRecommendations = [
    { id: 1, title: "Update authentication module", priority: "high", impact: "Critical" },
    { id: 2, title: "Implement multi-sig wallet for treasury", priority: "medium", impact: "High" },
    { id: 3, title: "Enhance rate limiting on public APIs", priority: "medium", impact: "Medium" }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      {/* Enhanced Header Section */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-primary/20 rounded-full">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm font-medium px-3 py-1 bg-secondary/20 text-secondary rounded-full">
                  Security Analytics
                </span>
              </div>
              <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Security Dashboard
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Monitor and protect your Web3 assets with real-time security insights
              </p>
              
              <NavigationMenu className="mb-8">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-card hover:bg-card/80">Security Resources</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {[
                          {
                            title: "Vulnerability Database",
                            href: "/vulnerabilities",
                            description: "Browse common Web3 vulnerabilities and remediation tactics",
                            icon: <AlertTriangle className="h-5 w-5 text-primary" />
                          },
                          {
                            title: "Audit Reports",
                            href: "/audits",
                            description: "Access sample audit reports and industry best practices",
                            icon: <FileCode className="h-5 w-5 text-secondary" />
                          },
                          {
                            title: "Security Blog",
                            href: "/blog",
                            description: "Latest insights on blockchain security trends",
                            icon: <Database className="h-5 w-5 text-blue-500" />
                          },
                          {
                            title: "Community Forum",
                            href: "/community",
                            description: "Connect with security experts and share knowledge",
                            icon: <Users className="h-5 w-5 text-green-500" />
                          }
                        ].map((item) => (
                          <li key={item.title}>
                            <NavigationMenuLink asChild>
                              <a
                                href={item.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="flex items-center mb-2">
                                  {item.icon}
                                  <div className="text-sm font-medium leading-none ml-2">{item.title}</div>
                                </div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {item.description}
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Button variant="ghost" className="px-4 py-2 text-sm" onClick={() => setTimeFrame("daily")}>
                      Daily
                    </Button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Button variant="ghost" className={cn("px-4 py-2 text-sm", timeFrame === "weekly" && "bg-accent")} onClick={() => setTimeFrame("weekly")}>
                      Weekly
                    </Button>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Button variant="ghost" className="px-4 py-2 text-sm" onClick={() => setTimeFrame("monthly")}>
                      Monthly
                    </Button>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
            
            <div className="w-full md:w-auto">
              <Card className="bg-card/70 backdrop-blur-sm border border-primary/20 shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-medium">Quick Insights</CardTitle>
                    <ChartBar className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Contracts Secured</span>
                      <div className="flex items-center">
                        <span className="font-medium">78/85</span>
                        <span className="text-xs text-green-500 ml-2">92%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Risk Score</span>
                      <div className="flex items-center">
                        <span className="font-medium">Low</span>
                        <span className="text-xs text-green-500 ml-2">-12%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Last Audit</span>
                      <span className="font-medium">2 days ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8">
        <div className="flex flex-col gap-8">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityMetrics.map((metric, index) => (
              <Card key={index} className="hover-lift transition-all border border-border/40">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 bg-primary/10 rounded-full">{metric.icon}</div>
                    <span className={`text-sm font-medium ${metric.change > 0 ? "text-green-500" : metric.change < 0 ? "text-red-500" : "text-gray-500"}`}>
                      {metric.change > 0 ? "+" : ""}{metric.change}%
                    </span>
                  </div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Security Alerts Section */}
          <Card className="border border-border/40">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Security Alerts</CardTitle>
                <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20">
                  {recentAlerts.length} New
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Severity</TableHead>
                    <TableHead>Alert</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>
                        <Badge 
                          variant={alert.severity === "critical" ? "destructive" : 
                                 alert.severity === "high" ? "default" :
                                 alert.severity === "medium" ? "secondary" : "outline"}
                        >
                          {alert.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>{alert.title}</TableCell>
                      <TableCell>{alert.source}</TableCell>
                      <TableCell>{alert.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Recommendations Section */}
          <Card className="border border-border/40">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Security Recommendations</CardTitle>
                <Button variant="outline" size="sm" className="text-xs">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Recommendation</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Impact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {securityRecommendations.map((recommendation) => (
                    <TableRow key={recommendation.id}>
                      <TableCell>{recommendation.title}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={recommendation.priority === "high" ? "default" : 
                                 recommendation.priority === "medium" ? "secondary" : "outline"}
                        >
                          {recommendation.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{recommendation.impact}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Platform Security Stats */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Platform Security Statistics</h2>
              <Tabs value={timeFrame} onValueChange={setTimeFrame} className="hidden md:block">
                <TabsList>
                  <TabsTrigger value="daily">Daily</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <AuditStatsTable />
          </div>
          
          {/* CTA Section */}
          <div className="mt-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 border border-border/40">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Need personalized security advice?</h3>
                <p className="text-muted-foreground">Connect with a top-rated auditor to discuss your specific project needs</p>
              </div>
              <div className="flex gap-4">
                <Button variant="secondary">Request Audit</Button>
                <Button variant="default" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">Find Auditor</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <MarketplaceFooter />
      <Footer />
    </div>
  );
};

export default SecurityDashboard;

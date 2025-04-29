
import { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Check, Database, Lock, AlertTriangle, Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AuditStatsTable } from "@/components/home/audit-stats-table";

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
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Security Dashboard</h1>
              <p className="text-muted-foreground mt-1">Monitor and manage your Web3 security in real-time</p>
            </div>
            <Tabs defaultValue="weekly" onValueChange={setTimeFrame}>
              <TabsList>
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityMetrics.map((metric, index) => (
              <Card key={index} className="hover-lift transition-all">
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
          <Card>
            <CardHeader>
              <CardTitle>Security Alerts</CardTitle>
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
          <Card>
            <CardHeader>
              <CardTitle>Security Recommendations</CardTitle>
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
            <h2 className="text-2xl font-bold mb-4">Platform Security Statistics</h2>
            <AuditStatsTable />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SecurityDashboard;

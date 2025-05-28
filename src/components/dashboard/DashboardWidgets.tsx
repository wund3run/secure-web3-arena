
import React from 'react';
import { ProjectMetrics } from './widgets/ProjectMetrics';
import { RecentActivity } from './widgets/RecentActivity';
import { QuickActions } from './widgets/QuickActions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, TrendingUp, Users, Shield } from 'lucide-react';

interface DashboardWidgetsProps {
  userType: string;
  section: string;
}

export function DashboardWidgets({ userType, section }: DashboardWidgetsProps) {
  if (section === 'analytics') {
    return (
      <div className="space-y-6">
        <ProjectMetrics userType={userType} />
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Trends
              </CardTitle>
              <CardDescription>Your performance over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completion Rate</span>
                    <span className="font-medium">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Client Satisfaction</span>
                    <span className="font-medium">4.8/5</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>On-Time Delivery</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Upcoming Deadlines
              </CardTitle>
              <CardDescription>Projects requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">DeFi Protocol Audit</p>
                    <p className="text-xs text-muted-foreground">Final report due</p>
                  </div>
                  <Badge variant="destructive">2 days</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">NFT Security Review</p>
                    <p className="text-xs text-muted-foreground">Initial findings</p>
                  </div>
                  <Badge variant="secondary">5 days</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Bridge Contract Audit</p>
                    <p className="text-xs text-muted-foreground">Code review phase</p>
                  </div>
                  <Badge variant="outline">1 week</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (section === 'projects') {
    return (
      <div className="space-y-6">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>{userType === 'auditor' ? 'Active Audits' : 'Active Projects'}</CardTitle>
              <CardDescription>
                {userType === 'auditor' ? 'Audits currently in progress' : 'Projects under security review'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">Project {i}</p>
                        <p className="text-sm text-muted-foreground">Smart contract audit</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={25 + i * 25} className="w-24" />
                      <Badge variant="secondary">{25 + i * 25}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (section === 'reports') {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Audit Reports</CardTitle>
            <CardDescription>Generated security reports and findings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Security Report #{i}</p>
                      <p className="text-xs text-muted-foreground">Generated 2024-01-{10 + i}</p>
                    </div>
                  </div>
                  <Badge variant={i % 2 === 0 ? "secondary" : "outline"}>
                    {i % 2 === 0 ? "Complete" : "Draft"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (section === 'skills' && userType === 'auditor') {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Skills & Certifications</CardTitle>
            <CardDescription>Your professional qualifications and expertise</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Technical Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {['Solidity', 'Rust', 'Web3.js', 'Hardhat', 'Foundry', 'Slither'].map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Certifications</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium text-sm">Certified Ethereum Developer</span>
                    <Badge variant="secondary">Valid</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="font-medium text-sm">Smart Contract Security Auditor</span>
                    <Badge variant="secondary">Valid</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (section === 'security' && userType !== 'auditor') {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Security Overview</CardTitle>
            <CardDescription>Your project security status and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Security Score</span>
                    <Badge variant="secondary">92%</Badge>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Vulnerabilities Fixed</span>
                    <Badge variant="secondary">28</Badge>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (section === 'management' && userType === 'admin') {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Total Users</span>
                  <span className="font-medium">2,350</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Active Auditors</span>
                  <span className="font-medium">127</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Project Owners</span>
                  <span className="font-medium">1,890</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Platform Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Active Audits</span>
                  <span className="font-medium">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Completed Today</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Success Rate</span>
                  <span className="font-medium">97.2%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">This Month</span>
                  <span className="font-medium">$125,430</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Growth</span>
                  <span className="font-medium text-green-600">+8.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Projected</span>
                  <span className="font-medium">$150,000</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Default overview
  return (
    <div className="space-y-6">
      <ProjectMetrics userType={userType} />
      
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentActivity userType={userType} />
        </div>
        <div className="lg:col-span-1">
          <QuickActions userType={userType} />
        </div>
      </div>
    </div>
  );
}

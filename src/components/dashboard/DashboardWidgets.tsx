
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  DollarSign,
  Calendar,
  Star,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardWidgetsProps {
  userType: string;
  section: string;
}

export function DashboardWidgets({ userType, section }: DashboardWidgetsProps) {
  const isAuditor = userType === 'auditor';
  const isAdmin = userType === 'admin';

  if (section === 'analytics') {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <Progress value={94} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Client Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-muted-foreground">Based on 24 reviews</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (section === 'projects') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {isAuditor ? 'Active Audits' : 'Your Projects'}
          </h3>
          <Button asChild>
            <Link to={isAuditor ? "/audits" : "/audit-request"}>
              {isAuditor ? "View All Audits" : "Create New Project"}
            </Link>
          </Button>
        </div>

        <div className="grid gap-4">
          {[1, 2, 3].map((item) => (
            <Card key={item}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    {isAuditor ? `Audit Request #${item}` : `Project ${item}`}
                  </CardTitle>
                  <Badge variant={item === 1 ? "default" : item === 2 ? "secondary" : "outline"}>
                    {item === 1 ? "In Progress" : item === 2 ? "Review" : "Completed"}
                  </Badge>
                </div>
                <CardDescription>
                  {isAuditor 
                    ? "Smart contract security audit for DeFi protocol"
                    : "Security review for NFT marketplace"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span>{item === 1 ? "65%" : item === 2 ? "90%" : "100%"}</span>
                </div>
                <Progress value={item === 1 ? 65 : item === 2 ? 90 : 100} className="mt-2" />
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm text-muted-foreground">
                    Due: {item === 1 ? "3 days" : item === 2 ? "1 day" : "Completed"}
                  </span>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/audits/${item}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (section === 'reports') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Reports & Analytics</h3>
          <Button variant="outline">Download Report</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Monthly Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Completed {isAuditor ? 'Audits' : 'Projects'}</span>
                <span className="font-semibold">{isAuditor ? '12' : '5'}</span>
              </div>
              <div className="flex justify-between">
                <span>Revenue</span>
                <span className="font-semibold">$15,420</span>
              </div>
              <div className="flex justify-between">
                <span>Average Rating</span>
                <span className="font-semibold">4.8/5</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">On-time Delivery</span>
                  <span className="text-sm">95%</span>
                </div>
                <Progress value={95} />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Client Satisfaction</span>
                  <span className="text-sm">92%</span>
                </div>
                <Progress value={92} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (section === 'skills' && isAuditor) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Skills & Certifications</h3>
          <Button variant="outline">Add Certification</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Award className="h-4 w-4" />
                Certifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {['Certified Smart Contract Auditor', 'Web3 Security Professional', 'Blockchain Security Expert'].map((cert) => (
                <div key={cert} className="flex items-center justify-between">
                  <span className="text-sm">{cert}</span>
                  <Badge variant="secondary">Verified</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Skill Proficiency</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { skill: 'Smart Contract Auditing', level: 95 },
                { skill: 'Solidity', level: 90 },
                { skill: 'DeFi Protocols', level: 85 }
              ].map((item) => (
                <div key={item.skill}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{item.skill}</span>
                    <span className="text-sm">{item.level}%</span>
                  </div>
                  <Progress value={item.level} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (section === 'security') {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Security Overview</h3>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Score</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">85%</div>
              <p className="text-xs text-muted-foreground">Above average</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Vulnerabilities</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Medium priority</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Audit</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">30d</div>
              <p className="text-xs text-muted-foreground">ago</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (section === 'management' && isAdmin) {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Platform Management</h3>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">+12% this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Audits</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">+5% this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$89,240</div>
              <p className="text-xs text-muted-foreground">+15% this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.9%</div>
              <p className="text-xs text-muted-foreground">Uptime</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                'New auditor approved: CryptoSec Pro',
                'Service verification completed',
                'User reported issue resolved',
                'Platform maintenance scheduled'
              ].map((action, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  {action}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Auditor Applications</span>
                <Badge>5</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Service Verifications</span>
                <Badge>3</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Dispute Cases</span>
                <Badge variant="destructive">2</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return <div>Content for {section} section</div>;
}

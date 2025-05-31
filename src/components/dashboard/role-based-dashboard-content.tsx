import React from 'react';
import { useAuth } from '@/contexts/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Star,
  Award,
  Target,
  FileText,
  Settings,
  Activity,
  BookOpen,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

export function RoleBasedDashboardContent() {
  const { user, userProfile, getUserType } = useAuth();
  const userType = getUserType();
  const isNewUser = !userProfile?.projects_completed || userProfile.projects_completed === 0;

  // New user onboarding content for auditors
  if (userType === "auditor" && isNewUser) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Complete Your Profile</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">25%</div>
            <p className="text-xs text-blue-600">Profile completion</p>
            <div className="mt-4">
              <Button asChild className="w-full" size="sm">
                <Link to="/auditor-onboarding">Complete Profile</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Audits</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Waiting for auditors
            </p>
            <div className="mt-4">
              <Button variant="outline" asChild className="w-full" size="sm">
                <Link to="/audits">Browse Audits</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Center</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">New</div>
            <p className="text-xs text-muted-foreground">
              Auditing resources available
            </p>
            <div className="mt-4">
              <Button variant="ghost" asChild className="w-full" size="sm">
                <Link to="/guidelines">View Resources</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Quick Start Guide</CardTitle>
            <CardDescription>Follow these steps to get started as an auditor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
                <div className="flex-1">
                  <p className="font-medium">Complete your auditor profile</p>
                  <p className="text-sm text-muted-foreground">Add your skills, experience, and certifications</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/auditor-onboarding">Start</Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold">2</div>
                <div className="flex-1">
                  <p className="font-medium">Review audit guidelines</p>
                  <p className="text-sm text-muted-foreground">Learn best practices and standards</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/guidelines">Learn</Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold">3</div>
                <div className="flex-1">
                  <p className="font-medium">Find your first audit</p>
                  <p className="text-sm text-muted-foreground">Browse available projects and submit proposals</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/audits">Browse</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // New user onboarding content for project owners
  if (userType === "project_owner" && isNewUser) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Request Your First Audit</CardTitle>
            <Zap className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">Ready</div>
            <p className="text-xs text-green-600">
              Start securing your project
            </p>
            <div className="mt-4">
              <Button asChild className="w-full" size="sm">
                <Link to="/request-audit">Request Audit</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expert Auditors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50+</div>
            <p className="text-xs text-muted-foreground">
              Verified security experts
            </p>
            <div className="mt-4">
              <Button variant="outline" asChild className="w-full" size="sm">
                <Link to="/marketplace">Browse Auditors</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Resources</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Free</div>
            <p className="text-xs text-muted-foreground">
              Security best practices
            </p>
            <div className="mt-4">
              <Button variant="ghost" asChild className="w-full" size="sm">
                <Link to="/resources">Learn More</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Get Started in 3 Easy Steps</CardTitle>
            <CardDescription>Secure your Web3 project with our expert auditors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
                <div className="flex-1">
                  <p className="font-medium">Submit audit request</p>
                  <p className="text-sm text-muted-foreground">Tell us about your project and security needs</p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/request-audit">Start</Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold">2</div>
                <div className="flex-1">
                  <p className="font-medium">Review auditor proposals</p>
                  <p className="text-sm text-muted-foreground">Get matched with qualified security experts</p>
                </div>
                <Button variant="outline" size="sm" disabled>
                  Coming Soon
                </Button>
              </div>
              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold">3</div>
                <div className="flex-1">
                  <p className="font-medium">Receive detailed report</p>
                  <p className="text-sm text-muted-foreground">Get actionable security recommendations</p>
                </div>
                <Button variant="outline" size="sm" disabled>
                  Coming Soon
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // General user dashboard (visitors, etc.)
  if (userType === "general" || userType === "visitor") {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Getting Started</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Welcome!</div>
            <p className="text-xs text-muted-foreground">
              Start your Web3 security journey
            </p>
            <div className="mt-4 space-y-2">
              <Button asChild className="w-full">
                <Link to="/marketplace">Explore Services</Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link to="/service-provider-onboarding">Become an Auditor</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Hub</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Resources</div>
            <p className="text-xs text-muted-foreground">
              Educational content and guides
            </p>
            <div className="mt-4 space-y-1">
              <Button variant="ghost" size="sm" asChild className="w-full justify-start">
                <Link to="/guides">Security Guides</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="w-full justify-start">
                <Link to="/tutorials">Video Tutorials</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Connect</div>
            <p className="text-xs text-muted-foreground">
              Join the security community
            </p>
            <div className="mt-4">
              <Button variant="outline" asChild className="w-full">
                <Link to="/community">Join Community</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Auditor dashboard
  if (userType === "auditor") {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Audits</CardTitle>
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
            <CardTitle className="text-sm font-medium">Reputation Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground">
              Based on 24 reviews
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Audits</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">
              +12 this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Earnings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest audit activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Badge variant="secondary">Completed</Badge>
                <div className="flex-1">
                  <p className="font-medium">DeFi Protocol Audit</p>
                  <p className="text-sm text-muted-foreground">Smart contract security review</p>
                </div>
                <span className="text-sm text-muted-foreground">2 hours ago</span>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline">In Progress</Badge>
                <div className="flex-1">
                  <p className="font-medium">NFT Marketplace Review</p>
                  <p className="text-sm text-muted-foreground">Frontend security assessment</p>
                </div>
                <span className="text-sm text-muted-foreground">1 day ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Project Owner dashboard
  if (userType === "project_owner") {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              2 under review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              +5% improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vulnerabilities Fixed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              2 high priority
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin dashboard
  if (userType === "admin") {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">
              +180 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Audits</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              +12% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$125,430</div>
            <p className="text-xs text-muted-foreground">
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground">
              Uptime this month
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Fallback for any other role
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to Hawkly</CardTitle>
        <CardDescription>Your security dashboard is being prepared.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Please complete your profile setup to access all features.</p>
      </CardContent>
    </Card>
  );
}

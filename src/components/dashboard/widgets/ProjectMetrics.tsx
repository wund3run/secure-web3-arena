
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Shield, Clock, CheckCircle, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';

interface ProjectMetricsProps {
  userType: string;
}

interface AuditorMetrics {
  activeAudits: number;
  completedAudits: number;
  averageRating: number;
  totalEarnings: number;
  monthlyGrowth: number;
}

interface ProjectOwnerMetrics {
  activeProjects: number;
  completedAudits: number;
  securityScore: number;
  totalSpent: number;
  vulnerabilitiesFixed: number;
}

export function ProjectMetrics({ userType }: ProjectMetricsProps) {
  // Mock data - in real app, this would come from API
  const auditorMetrics: AuditorMetrics = {
    activeAudits: 5,
    completedAudits: 127,
    averageRating: 4.8,
    totalEarnings: 45231,
    monthlyGrowth: 12.5
  };

  const projectOwnerMetrics: ProjectOwnerMetrics = {
    activeProjects: 3,
    completedAudits: 12,
    securityScore: 92,
    totalSpent: 45200,
    vulnerabilitiesFixed: 28
  };

  if (userType === 'auditor') {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Audits</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditorMetrics.activeAudits}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditorMetrics.completedAudits}</div>
            <p className="text-xs text-muted-foreground">
              +{auditorMetrics.monthlyGrowth}% this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditorMetrics.averageRating}</div>
            <p className="text-xs text-muted-foreground">
              Based on 89 reviews
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${auditorMetrics.totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{auditorMetrics.monthlyGrowth}% from last month
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{projectOwnerMetrics.activeProjects}</div>
          <p className="text-xs text-muted-foreground">
            2 under review
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Security Score</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{projectOwnerMetrics.securityScore}%</div>
          <p className="text-xs text-muted-foreground">
            +5% improvement
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${projectOwnerMetrics.totalSpent.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            Across {projectOwnerMetrics.completedAudits} audits
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Issues Fixed</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{projectOwnerMetrics.vulnerabilitiesFixed}</div>
          <p className="text-xs text-muted-foreground">
            This month
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

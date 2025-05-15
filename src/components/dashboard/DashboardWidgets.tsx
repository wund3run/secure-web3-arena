
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface DashboardWidgetsProps {
  userType: string;
  section: 'overview' | 'analytics' | 'projects' | 'reports';
}

export function DashboardWidgets({ userType, section }: DashboardWidgetsProps) {
  const isAuditor = userType === 'auditor';
  
  const renderContent = () => {
    switch (section) {
      case 'analytics':
        return isAuditor 
          ? <AuditorAnalytics /> 
          : <ProjectOwnerAnalytics />;
      case 'projects':
        return isAuditor 
          ? <AuditorProjects /> 
          : <ProjectOwnerProjects />;
      case 'reports':
        return isAuditor 
          ? <AuditorReports /> 
          : <ProjectOwnerReports />;
      default:
        return <div>Section content not available</div>;
    }
  };
  
  return (
    <div className="mt-6">
      {renderContent()}
    </div>
  );
}

// Auditor specific components
function AuditorAnalytics() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Auditor performance metrics will be displayed here.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Audit Efficiency</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Metrics on audit completion time and efficiency.</p>
        </CardContent>
      </Card>
    </div>
  );
}

function AuditorProjects() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Active Audits</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Currently active audit projects will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}

function AuditorReports() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Your recent audit reports will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}

// Project Owner specific components
function ProjectOwnerAnalytics() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Security Posture</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Security metrics and risk analysis for your projects.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Vulnerability Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Trending vulnerabilities in your codebase over time.</p>
        </CardContent>
      </Card>
    </div>
  );
}

function ProjectOwnerProjects() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Your projects under audit will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}

function ProjectOwnerReports() {
  return (
    <div className="space-y-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Audit Reports</AlertTitle>
        <AlertDescription>
          Your audit reports and findings will appear here once audits are completed.
        </AlertDescription>
      </Alert>
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Audit reports for your projects will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}

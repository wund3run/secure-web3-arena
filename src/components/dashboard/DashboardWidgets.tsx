
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Book, CheckSquare, Shield, Award, FileSpreadsheet, ChartPie, LineChart, Users, Settings } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { NotificationDashboardWidget } from './NotificationDashboardWidget';
import { AuditorStats } from './widgets/AuditorStats';
import { ReputationWidget } from './widgets/ReputationWidget';
import { EarningsWidget } from './widgets/EarningsWidget';
import { UpcomingDeadlinesWidget } from './widgets/UpcomingDeadlinesWidget';
import { AuditPerformanceWidget } from './widgets/AuditPerformanceWidget';
import { ProjectOwnerStats } from './widgets/ProjectOwnerStats';
import { SecurityScoreWidget } from './widgets/SecurityScoreWidget';
import { ProjectsWidget } from './widgets/ProjectsWidget';
import { VulnerabilityWidget } from './widgets/VulnerabilityWidget';
import { AuditProgressWidget } from './widgets/AuditProgressWidget';
import { AdminDashboardWidgets } from '../admin/dashboard/AdminDashboardWidgets';

interface DashboardWidgetsProps {
  userType: string;
  section: 'overview' | 'analytics' | 'projects' | 'reports' | 'skills' | 'security' | 'management';
}

export function DashboardWidgets({ userType, section }: DashboardWidgetsProps) {
  const isAuditor = userType === 'auditor';
  const isAdmin = userType === 'admin';
  
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
      case 'skills':
        return <AuditorSkills />;
      case 'security':
        return <ProjectOwnerSecurity />;
      case 'management':
        return <AdminManagement />;
      default:
        return <div>Section content not available</div>;
    }
  };
  
  const renderOverviewWidgets = () => {
    switch (userType) {
      case 'auditor':
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AuditorStats />
            <ReputationWidget />
            <EarningsWidget />
            <NotificationDashboardWidget />
            <UpcomingDeadlinesWidget />
            <AuditPerformanceWidget />
          </div>
        );
      case 'project_owner':
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ProjectOwnerStats />
            <SecurityScoreWidget />
            <ProjectsWidget />
            <NotificationDashboardWidget />
            <VulnerabilityWidget />
            <AuditProgressWidget />
          </div>
        );
      case 'admin':
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AdminDashboardWidgets />
            <NotificationDashboardWidget />
          </div>
        );
      default:
        return (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ProjectOwnerStats />
            <SecurityScoreWidget />
            <NotificationDashboardWidget />
            <ProjectsWidget />
          </div>
        );
    }
  };
  
  return (
    <div className="mt-6">
      {renderContent()}
      {renderOverviewWidgets()}
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
          <div className="flex items-center gap-2 mb-4">
            <ChartPie className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Audit Efficiency Trends</h3>
          </div>
          <p>Track your audit completion times, issue discovery rates, and overall efficiency compared to platform averages.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Revenue Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <LineChart className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Income Tracking</h3>
          </div>
          <p>View your earnings over time, upcoming payments, and projected income based on current workload.</p>
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
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Current Assignments</h3>
          </div>
          <p>View and manage your active audit projects, including deadlines, progress tracking, and client communications.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Audit Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <CheckSquare className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Available Projects</h3>
          </div>
          <p>Browse new audit requests matching your skills and expertise profile that you can apply for.</p>
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
          <div className="flex items-center gap-2 mb-4">
            <FileSpreadsheet className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Published Findings</h3>
          </div>
          <p>Access your recently completed audit reports, findings summaries, and client responses.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Report Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Book className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Standardized Formats</h3>
          </div>
          <p>Use professionally designed report templates to create consistent, high-quality audit documents.</p>
        </CardContent>
      </Card>
    </div>
  );
}

function AuditorSkills() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Skills & Certifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Award className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Professional Development</h3>
          </div>
          <p>Manage your security certifications, technical skills, and professional credentials displayed to clients.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Learning Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Book className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Skill Enhancement</h3>
          </div>
          <p>Access specialized training materials, courses, and resources to expand your security expertise.</p>
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
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Risk Assessment</h3>
          </div>
          <p>Comprehensive security metrics and risk analysis for all your projects, with historical trends and comparisons.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Vulnerability Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <ChartPie className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Issue Tracking</h3>
          </div>
          <p>Monitor discovered vulnerabilities across your codebase over time, with severity distributions and remediation status.</p>
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
          <div className="flex items-center gap-2 mb-4">
            <FileSpreadsheet className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Project Management</h3>
          </div>
          <p>Overview of all your active projects under audit, with status indicators, recent updates, and action items.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Audit Planning</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <CheckSquare className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Future Audits</h3>
          </div>
          <p>Plan upcoming security audits with budget estimates, scope definition tools, and auditor selection guidance.</p>
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
          Access comprehensive audit reports and findings to improve your project's security posture.
        </AlertDescription>
      </Alert>
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <FileSpreadsheet className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Audit Findings</h3>
          </div>
          <p>View detailed security reports for your projects, with vulnerability explanations and remediation recommendations.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Compliance Documentation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Book className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Security Verification</h3>
          </div>
          <p>Access audit certificates, compliance documentation, and security verification proof for partners and users.</p>
        </CardContent>
      </Card>
    </div>
  );
}

function ProjectOwnerSecurity() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Security Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Continuous Assessment</h3>
          </div>
          <p>Real-time security monitoring of your projects, with alerts for new vulnerabilities and emerging threats.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Security Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Book className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Educational Resources</h3>
          </div>
          <p>Access blockchain security guidelines, best practices, and educational materials specific to your project types.</p>
        </CardContent>
      </Card>
    </div>
  );
}

// Add the new AdminManagement component
function AdminManagement() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Platform Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">User Management</h3>
          </div>
          <p>Manage platform users, roles, permissions, and account status across all user types.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Settings className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Platform Settings</h3>
          </div>
          <p>Configure platform-wide settings, security policies, and operational parameters.</p>
        </CardContent>
      </Card>
    </div>
  );
}

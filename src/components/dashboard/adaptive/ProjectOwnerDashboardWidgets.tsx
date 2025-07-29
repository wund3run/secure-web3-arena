
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SmartCTA } from '@/components/ui/smart-cta';
import { WorkflowProgress } from '@/components/ui/workflow-progress';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Users, 
  FileText, 
  Shield, 
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProjectOwnerDashboardWidgetsProps {
  user: any;
  profile: any;
}

export function ProjectOwnerDashboardWidgets({ user, profile }: ProjectOwnerDashboardWidgetsProps) {
  const navigate = useNavigate();

  // Mock data - in real app this would come from API
  const activeProjects = [
    {
      id: '1',
      name: 'Smart Contract Audit',
      auditor: 'John Doe',
      status: 'in_progress',
      deadline: '2024-01-20',
      applications: 5
    }
  ];

  const projectSteps = [
    { id: '1', title: 'Project Submitted', status: 'completed' as const },
    { id: '2', title: 'Auditor Selected', status: 'completed' as const },
    { id: '3', title: 'Audit In Progress', status: 'current' as const },
    { id: '4', title: 'Report Complete', status: 'pending' as const }
  ];

  const stats = {
    totalProjects: profile?.projects_completed || 0,
    activeAudits: 1,
    vulnerabilitiesFixed: 12,
    securityScore: 95
  };

  return (
    <div className="space-y-6">
      {/* Smart CTA Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {activeProjects.length > 0 ? (
          <SmartCTA
            context="info"
            message="Your audit is in progress"
            primary={{
              text: "View Progress",
              onClick: () => navigate(`/project/${activeProjects[0].id}`),
              icon: FileText
            }}
            secondary={{
              text: "Message Auditor",
              onClick: () => navigate(`/messages/${activeProjects[0].id}`)
            }}
            badge="Day 3 of 7"
          />
        ) : (
          <SmartCTA
            context="success"
            message="Ready to secure your next project?"
            primary={{
              text: "Request New Audit",
              onClick: () => navigate('/request-audit'),
              icon: Plus
            }}
            secondary={{
              text: "Browse Auditors",
              onClick: () => navigate('/marketplace')
            }}
          />
        )}

        <SmartCTA
          context="warning"
          message="5 auditors applied to your project"
          primary={{
            text: "Review Applications",
            onClick: () => navigate('/applications'),
            icon: Users
          }}
          badge="New"
        />
      </div>

      {/* Active Projects */}
      {activeProjects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Active Audits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeProjects.map((project) => (
              <div key={project.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{project.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Auditor: {project.auditor}
                    </p>
                  </div>
                  <Badge variant="outline">Due {project.deadline}</Badge>
                </div>
                <WorkflowProgress 
                  steps={projectSteps}
                  onStepClick={(stepId) => navigate(`/project/${project.id}/step/${stepId}`)}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.totalProjects}</p>
            <p className="text-sm text-muted-foreground">Total Projects</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.activeAudits}</p>
            <p className="text-sm text-muted-foreground">Active Audits</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.vulnerabilitiesFixed}</p>
            <p className="text-sm text-muted-foreground">Issues Fixed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.securityScore}%</p>
            <p className="text-sm text-muted-foreground">Security Score</p>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Recommended Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium">Schedule follow-up audit</p>
              <p className="text-sm text-muted-foreground">Maintain security with regular reviews</p>
            </div>
            <button 
              onClick={() => navigate('/request-audit')}
              className="text-primary hover:underline text-sm"
            >
              Schedule →
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium">Implement security fixes</p>
              <p className="text-sm text-muted-foreground">Address findings from your last audit</p>
            </div>
            <button 
              onClick={() => navigate('/reports')}
              className="text-primary hover:underline text-sm"
            >
              View Report →
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

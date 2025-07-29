
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SmartCTA } from '@/components/ui/smart-cta';
import { WorkflowProgress } from '@/components/ui/workflow-progress';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Search, 
  DollarSign, 
  Award, 
  Clock,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AuditorDashboardWidgetsProps {
  user: any;
  profile: any;
}

export function AuditorDashboardWidgets({ user, profile }: AuditorDashboardWidgetsProps) {
  const navigate = useNavigate();

  // Mock data - in real app this would come from API
  const activeAudits = [
    {
      id: '1',
      projectName: 'DeFi Protocol',
      client: 'CryptoDAO',
      deadline: '2024-01-15',
      progress: 65,
      status: 'in_progress'
    }
  ];

  const auditSteps = [
    { id: '1', title: 'Initial Review', status: 'completed' as const },
    { id: '2', title: 'Code Analysis', status: 'current' as const },
    { id: '3', title: 'Testing', status: 'pending' as const },
    { id: '4', title: 'Report', status: 'pending' as const }
  ];

  const stats = {
    completedAudits: profile?.projects_completed || 0,
    earnings: 2500,
    averageRating: 4.8,
    responseTime: '2 hours'
  };

  return (
    <div className="space-y-6">
      {/* Smart CTA Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {activeAudits.length > 0 ? (
          <SmartCTA
            context="info"
            message="Continue your active audit"
            primary={{
              text: "Resume Audit",
              onClick: () => navigate(`/audit/${activeAudits[0].id}`),
              icon: FileText
            }}
            secondary={{
              text: "View Details",
              onClick: () => navigate(`/audit/${activeAudits[0].id}/details`)
            }}
            badge={`${activeAudits[0].progress}% Complete`}
          />
        ) : (
          <SmartCTA
            context="success"
            message="Ready for your next audit?"
            primary={{
              text: "Find New Audits",
              onClick: () => navigate('/marketplace'),
              icon: Search
            }}
            secondary={{
              text: "Update Skills",
              onClick: () => navigate('/profile')
            }}
          />
        )}

        <SmartCTA
          context="warning"
          message="Profile completion boosts visibility"
          primary={{
            text: "Complete Profile",
            onClick: () => navigate('/profile'),
            icon: Award
          }}
          badge="85% Complete"
        />
      </div>

      {/* Active Audits */}
      {activeAudits.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Active Audits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeAudits.map((audit) => (
              <div key={audit.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">{audit.projectName}</h4>
                    <p className="text-sm text-muted-foreground">by {audit.client}</p>
                  </div>
                  <Badge variant="outline">Due {audit.deadline}</Badge>
                </div>
                <WorkflowProgress 
                  steps={auditSteps}
                  onStepClick={(stepId) => navigate(`/audit/${audit.id}/step/${stepId}`)}
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
            <p className="text-2xl font-bold">{stats.completedAudits}</p>
            <p className="text-sm text-muted-foreground">Audits Completed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">${stats.earnings}</p>
            <p className="text-sm text-muted-foreground">Total Earnings</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.averageRating}</p>
            <p className="text-sm text-muted-foreground">Avg Rating</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{stats.responseTime}</p>
            <p className="text-sm text-muted-foreground">Response Time</p>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Recommended Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium">Update your GitHub portfolio</p>
              <p className="text-sm text-muted-foreground">Showcase recent work to attract clients</p>
            </div>
            <button 
              onClick={() => navigate('/profile/verification')}
              className="text-primary hover:underline text-sm"
            >
              Update →
            </button>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <p className="font-medium">Complete skills assessment</p>
              <p className="text-sm text-muted-foreground">Unlock premium audit opportunities</p>
            </div>
            <button 
              onClick={() => navigate('/skills-assessment')}
              className="text-primary hover:underline text-sm"
            >
              Start →
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

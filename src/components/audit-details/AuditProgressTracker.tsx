
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, Clock, AlertTriangle, FileText, Timer, BarChart } from 'lucide-react';
import { MilestoneManager } from '@/components/audit-progress/MilestoneManager';
import { TimeTracker } from '@/components/audit-progress/TimeTracker';
import { ReportGenerator } from '@/components/audit-progress/ReportGenerator';
import type { EnhancedAuditData } from '@/hooks/useAuditDetails';
import { useAuth } from '@/contexts/auth';

interface AuditProgressTrackerProps {
  auditData: EnhancedAuditData;
}

const phaseSteps = [
  { phase: 'initial_review', label: 'Initial Review', icon: FileText },
  { phase: 'detailed_analysis', label: 'Detailed Analysis', icon: AlertTriangle },
  { phase: 'vulnerability_assessment', label: 'Vulnerability Assessment', icon: AlertTriangle },
  { phase: 'report_generation', label: 'Report Generation', icon: FileText },
  { phase: 'review_delivery', label: 'Review & Delivery', icon: CheckCircle },
];

export const AuditProgressTracker: React.FC<AuditProgressTrackerProps> = ({ auditData }) => {
  const { user } = useAuth();
  const currentPhaseIndex = phaseSteps.findIndex(step => step.phase === auditData.current_phase);
  const isAuditor = user?.id === auditData.assigned_auditor_id;
  
  const getPhaseStatus = (index: number) => {
    if (index < currentPhaseIndex) return 'completed';
    if (index === currentPhaseIndex) return 'current';
    return 'pending';
  };

  const completedDeliverables = auditData.deliverables.filter(d => d.status === 'completed').length;
  const totalDeliverables = auditData.deliverables.length;
  const deliverableProgress = totalDeliverables > 0 ? (completedDeliverables / totalDeliverables) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            Overall Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Completion</span>
              <span className="text-2xl font-bold text-primary">{auditData.completion_percentage}%</span>
            </div>
            <Progress value={auditData.completion_percentage} className="w-full" />
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{auditData.security_score}</div>
                <div className="text-sm text-muted-foreground">Security Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{completedDeliverables}/{totalDeliverables}</div>
                <div className="text-sm text-muted-foreground">Deliverables</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{auditData.findings?.length || 0}</div>
                <div className="text-sm text-muted-foreground">Findings</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phase Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Phases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {phaseSteps.map((step, index) => {
              const status = getPhaseStatus(index);
              const IconComponent = step.icon;
              
              return (
                <div key={step.phase} className="flex items-center gap-4">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    status === 'completed' ? 'bg-green-500 border-green-500 text-white' :
                    status === 'current' ? 'bg-primary border-primary text-primary-foreground' :
                    'border-muted-foreground text-muted-foreground'
                  }`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className={`font-medium ${
                      status === 'current' ? 'text-primary' : 
                      status === 'completed' ? 'text-green-600' : 
                      'text-muted-foreground'
                    }`}>
                      {step.label}
                    </div>
                  </div>
                  
                  <Badge variant={
                    status === 'completed' ? 'default' :
                    status === 'current' ? 'secondary' : 'outline'
                  }>
                    {status === 'completed' ? 'Completed' :
                     status === 'current' ? 'In Progress' : 'Pending'}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Progress Management */}
      <Tabs defaultValue="milestones" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="milestones" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Milestones
          </TabsTrigger>
          <TabsTrigger value="time" className="flex items-center gap-2">
            <Timer className="h-4 w-4" />
            Time Tracking
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="milestones" className="mt-6">
          <MilestoneManager auditRequestId={auditData.id} isAuditor={isAuditor} />
        </TabsContent>

        <TabsContent value="time" className="mt-6">
          <TimeTracker auditRequestId={auditData.id} isAuditor={isAuditor} />
        </TabsContent>

        <TabsContent value="reports" className="mt-6">
          <ReportGenerator auditRequestId={auditData.id} isAuditor={isAuditor} />
        </TabsContent>
      </Tabs>

      {/* Legacy Deliverables Progress */}
      {auditData.deliverables.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Legacy Deliverables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">{completedDeliverables}/{totalDeliverables}</span>
              </div>
              <Progress value={deliverableProgress} className="w-full mb-4" />
              
              {auditData.deliverables.map((deliverable) => (
                <div key={deliverable.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{deliverable.title}</div>
                    {deliverable.description && (
                      <div className="text-sm text-muted-foreground">{deliverable.description}</div>
                    )}
                    {deliverable.due_date && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Due: {new Date(deliverable.due_date).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  <Badge variant={
                    deliverable.status === 'completed' ? 'default' :
                    deliverable.status === 'in_progress' ? 'secondary' :
                    deliverable.status === 'delivered' ? 'outline' : 'outline'
                  }>
                    {deliverable.status.replace('_', ' ')}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

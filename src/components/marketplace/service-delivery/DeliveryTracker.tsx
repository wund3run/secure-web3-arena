
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, FileText, MessageSquare, CheckCircle } from 'lucide-react';

interface DeliveryTrackerProps {
  auditRequestId?: string;
}

export const DeliveryTracker: React.FC<DeliveryTrackerProps> = ({ auditRequestId }) => {
  const [activeTab, setActiveTab] = useState('progress');

  // Mock data - replace with real data from your backend
  const auditProgress = {
    id: auditRequestId || '1',
    title: 'DeFi Protocol Security Audit',
    client: 'AcmeDAO',
    auditor: 'BlockSec Experts',
    status: 'in_progress',
    progress: 65,
    startDate: '2024-01-15',
    deadline: '2024-02-15',
    estimatedCompletion: '2024-02-10',
    milestones: [
      {
        id: '1',
        title: 'Initial Assessment',
        description: 'Review project documentation and setup',
        status: 'completed',
        completedAt: '2024-01-18',
        deliverables: ['Project Assessment Report']
      },
      {
        id: '2',
        title: 'Code Review',
        description: 'Comprehensive smart contract analysis',
        status: 'in_progress',
        progress: 80,
        deliverables: ['Code Analysis Report', 'Vulnerability Assessment']
      },
      {
        id: '3',
        title: 'Testing & Validation',
        description: 'Automated and manual testing of identified issues',
        status: 'pending',
        deliverables: ['Test Results', 'Validation Report']
      },
      {
        id: '4',
        title: 'Final Report',
        description: 'Comprehensive audit report and recommendations',
        status: 'pending',
        deliverables: ['Final Audit Report', 'Executive Summary']
      }
    ],
    communications: [
      {
        id: '1',
        type: 'message',
        from: 'auditor',
        message: 'Started the initial assessment. Found the documentation comprehensive.',
        timestamp: '2024-01-15T10:00:00Z'
      },
      {
        id: '2',
        type: 'milestone',
        message: 'Initial Assessment milestone completed',
        timestamp: '2024-01-18T15:30:00Z'
      },
      {
        id: '3',
        type: 'message',
        from: 'client',
        message: 'Great progress! Please let me know if you need any clarifications.',
        timestamp: '2024-01-20T09:15:00Z'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'pending': return 'bg-gray-500';
      default: return 'bg-yellow-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in_progress': return <Clock className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{auditProgress.title}</h1>
          <p className="text-muted-foreground">
            {auditProgress.client} • Audited by {auditProgress.auditor}
          </p>
        </div>
        <Badge className={getStatusColor(auditProgress.status)}>
          {auditProgress.status.replace('_', ' ')}
        </Badge>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm">
            <span>Progress: {auditProgress.progress}%</span>
            <span>Est. Completion: {new Date(auditProgress.estimatedCompletion).toLocaleDateString()}</span>
          </div>
          <Progress value={auditProgress.progress} className="w-full" />
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Start Date</p>
              <p className="font-medium">{new Date(auditProgress.startDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Deadline</p>
              <p className="font-medium">{new Date(auditProgress.deadline).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Days Remaining</p>
              <p className="font-medium">
                {Math.ceil((new Date(auditProgress.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="progress">Milestones</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="space-y-4">
          {auditProgress.milestones.map((milestone, index) => (
            <Card key={milestone.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${getStatusColor(milestone.status)}`}>
                      {getStatusIcon(milestone.status)}
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold">{milestone.title}</h3>
                      <p className="text-muted-foreground text-sm">{milestone.description}</p>
                      {milestone.completedAt && (
                        <p className="text-xs text-green-600">
                          Completed on {new Date(milestone.completedAt).toLocaleDateString()}
                        </p>
                      )}
                      {milestone.progress && milestone.status === 'in_progress' && (
                        <div className="mt-2">
                          <Progress value={milestone.progress} className="w-48" />
                          <p className="text-xs text-muted-foreground mt-1">{milestone.progress}% complete</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <Badge variant="outline">{milestone.status.replace('_', ' ')}</Badge>
                </div>
                
                {milestone.deliverables.length > 0 && (
                  <div className="mt-4 ml-11">
                    <p className="text-sm font-medium mb-2">Deliverables:</p>
                    <div className="flex flex-wrap gap-2">
                      {milestone.deliverables.map((deliverable, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          {deliverable}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="communications" className="space-y-4">
          {auditProgress.communications.map((comm) => (
            <Card key={comm.id}>
              <CardContent className="pt-4">
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-sm">{comm.message}</p>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comm.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    {comm.from && (
                      <p className="text-xs text-muted-foreground mt-1">
                        From: {comm.from}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="deliverables">
          <Card>
            <CardHeader>
              <CardTitle>All Deliverables</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {auditProgress.milestones.flatMap(milestone => 
                  milestone.deliverables.map((deliverable, idx) => (
                    <div key={`${milestone.id}-${idx}`} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span>{deliverable}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{milestone.title}</Badge>
                        {milestone.status === 'completed' ? (
                          <Button size="sm" variant="outline">Download</Button>
                        ) : (
                          <span className="text-sm text-muted-foreground">Pending</span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

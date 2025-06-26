
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, FileText, Bug, Activity, Users } from 'lucide-react';
import { IntegratedCommunicationPlatform } from './IntegratedCommunicationPlatform';
import { VulnerabilityTrackingSystem } from './VulnerabilityTrackingSystem';
import { ProgressMonitoringDashboard } from './ProgressMonitoringDashboard';
import { CodeReviewAnnotationTools } from './CodeReviewAnnotationTools';

interface AuditWorkspaceProps {
  auditId: string;
  projectName: string;
  participants: Array<{
    id: string;
    name: string;
    role: 'client' | 'auditor';
    avatar?: string;
  }>;
}

export function AuditWorkspace({ auditId, projectName, participants }: AuditWorkspaceProps) {
  const [activeTab, setActiveTab] = useState('communication');
  const [unreadMessages, setUnreadMessages] = useState(3);
  const [pendingVulnerabilities, setPendingVulnerabilities] = useState(7);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{projectName}</h1>
              <p className="text-muted-foreground">Audit Workspace</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {participants.length} participants
              </Badge>
              <Button variant="outline" size="sm">
                <Activity className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="communication" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Communication
              {unreadMessages > 0 && (
                <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 text-xs">
                  {unreadMessages}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="code-review" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Code Review
            </TabsTrigger>
            <TabsTrigger value="vulnerabilities" className="flex items-center gap-2">
              <Bug className="h-4 w-4" />
              Vulnerabilities
              {pendingVulnerabilities > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 text-xs">
                  {pendingVulnerabilities}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Progress
            </TabsTrigger>
          </TabsList>

          <TabsContent value="communication" className="space-y-6">
            <IntegratedCommunicationPlatform 
              auditId={auditId}
              participants={participants}
              onUnreadCountChange={setUnreadMessages}
            />
          </TabsContent>

          <TabsContent value="code-review" className="space-y-6">
            <CodeReviewAnnotationTools auditId={auditId} />
          </TabsContent>

          <TabsContent value="vulnerabilities" className="space-y-6">
            <VulnerabilityTrackingSystem 
              auditId={auditId}
              onPendingCountChange={setPendingVulnerabilities}
            />
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <ProgressMonitoringDashboard auditId={auditId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

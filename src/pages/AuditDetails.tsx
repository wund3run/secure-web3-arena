
import React from 'react';
import { useParams } from 'react-router-dom';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { useAuditDetails } from '@/hooks/useAuditDetails';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AuditProgressTracker } from '@/components/audit-details/AuditProgressTracker';
import { VulnerabilityTracker } from '@/components/audit-details/VulnerabilityTracker';
import { ActivityTimeline } from '@/components/audit-details/ActivityTimeline';
import { CollaborationPanel } from '@/components/audit-details/CollaborationPanel';
import LoadingState from '@/components/ui/loading-state';

const AuditDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    isLoading, 
    auditData, 
    activeTab, 
    setActiveTab, 
    handleSendMessage,
    updateFindingStatus 
  } = useAuditDetails(id);

  if (isLoading) {
    return (
      <StandardLayout 
        title="Loading Audit Details" 
        description="Loading detailed information about your security audit"
      >
        <LoadingState message="Loading audit details..." />
      </StandardLayout>
    );
  }

  if (!auditData) {
    return (
      <StandardLayout 
        title="Audit Not Found" 
        description="The requested audit could not be found"
      >
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold">Audit Not Found</h1>
          <p className="text-muted-foreground">The requested audit could not be found.</p>
        </div>
      </StandardLayout>
    );
  }

  // Mock data for participants (in real app, this would come from the backend)
  const participants = [
    {
      id: auditData.client_id,
      name: auditData.client.full_name || 'Client',
      role: 'Project Owner',
      avatar: auditData.client.avatar_url,
      status: 'online' as const
    },
    ...(auditData.auditor ? [{
      id: auditData.auditor.id,
      name: auditData.auditor.full_name || 'Auditor',
      role: 'Security Auditor',
      avatar: auditData.auditor.avatar_url,
      status: 'online' as const
    }] : [])
  ];

  // Mock messages (in real app, this would come from audit_messages table)
  const messages = [
    {
      id: '1',
      content: 'Starting the initial security review of your smart contracts.',
      sender: {
        id: auditData.assigned_auditor_id || 'system',
        name: 'Security Auditor',
        avatar: auditData.auditor?.avatar_url
      },
      timestamp: new Date().toISOString(),
      type: 'text' as const
    }
  ];

  return (
    <StandardLayout 
      title={auditData.project_name} 
      description={`Security audit details for ${auditData.project_name} - Track progress, view vulnerabilities, and collaborate with your audit team`}
    >
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">{auditData.project_name}</h1>
              <p className="text-muted-foreground">{auditData.project_description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{auditData.completion_percentage}%</div>
              <div className="text-sm text-muted-foreground">Complete</div>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Progress</TabsTrigger>
            <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="collaboration">Collaborate</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <AuditProgressTracker auditData={auditData} />
          </TabsContent>

          <TabsContent value="vulnerabilities" className="mt-6">
            <VulnerabilityTracker 
              auditData={auditData} 
              onUpdateFindingStatus={updateFindingStatus}
            />
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <ActivityTimeline updates={auditData.status_updates} />
          </TabsContent>

          <TabsContent value="collaboration" className="mt-6">
            <CollaborationPanel
              auditId={auditData.id}
              participants={participants}
              messages={messages}
              onSendMessage={handleSendMessage}
            />
          </TabsContent>
        </Tabs>
      </div>
    </StandardLayout>
  );
};

export default AuditDetails;

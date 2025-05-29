
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, MessageCircle, Clock, Users } from 'lucide-react';
import { useAuditApproval } from '@/hooks/useAuditApproval';
import { useAuth } from '@/contexts/auth';

interface AuditApprovalInterfaceProps {
  auditRequest: {
    id: string;
    project_name: string;
    status: string;
    client_id: string;
    assigned_auditor_id?: string;
  };
  onApprovalComplete?: (conversationId: string) => void;
}

export function AuditApprovalInterface({ auditRequest, onApprovalComplete }: AuditApprovalInterfaceProps) {
  const { user } = useAuth();
  const { loading, approveAuditAsClient, approveAuditAsAuditor } = useAuditApproval();

  const isClient = user?.id === auditRequest.client_id;
  const isAuditor = user?.id === auditRequest.assigned_auditor_id;
  
  const clientApproved = ['client_approved', 'in_progress'].includes(auditRequest.status);
  const auditorApproved = auditRequest.status === 'in_progress';
  const bothApproved = clientApproved && auditorApproved;

  const handleApproval = async () => {
    let success = false;
    
    if (isClient && !clientApproved) {
      success = await approveAuditAsClient(auditRequest.id);
    } else if (isAuditor && !auditorApproved) {
      success = await approveAuditAsAuditor(auditRequest.id);
    }

    if (success && bothApproved && onApprovalComplete) {
      // Get conversation ID and notify parent
      // This would be handled by the real-time updates
    }
  };

  const getStatusMessage = () => {
    if (bothApproved) {
      return "Both parties approved - Real-time communication active!";
    }
    if (clientApproved && !auditorApproved) {
      return "Waiting for auditor confirmation";
    }
    if (!clientApproved) {
      return "Waiting for client approval";
    }
    return "Pending approval";
  };

  const getActionButton = () => {
    if (bothApproved) {
      return (
        <Button className="bg-green-600 hover:bg-green-700">
          <MessageCircle className="h-4 w-4 mr-2" />
          Open Chat
        </Button>
      );
    }

    if (isClient && !clientApproved) {
      return (
        <Button 
          onClick={handleApproval}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Approve Audit
        </Button>
      );
    }

    if (isAuditor && !auditorApproved) {
      return (
        <Button 
          onClick={handleApproval}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Confirm & Start Audit
        </Button>
      );
    }

    return (
      <Button disabled variant="outline">
        <Clock className="h-4 w-4 mr-2" />
        Waiting for approval
      </Button>
    );
  };

  return (
    <Card className="border-l-4 border-l-blue-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Audit Approval & Communication
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{auditRequest.project_name}</h3>
            <p className="text-sm text-muted-foreground">{getStatusMessage()}</p>
          </div>
          <Badge variant={bothApproved ? "default" : "secondary"}>
            {auditRequest.status.replace('_', ' ').toUpperCase()}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${clientApproved ? 'bg-green-500' : 'bg-gray-300'}`} />
            <span className="text-sm">Client Approved</span>
            {clientApproved && <CheckCircle className="h-4 w-4 text-green-500" />}
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${auditorApproved ? 'bg-green-500' : 'bg-gray-300'}`} />
            <span className="text-sm">Auditor Confirmed</span>
            {auditorApproved && <CheckCircle className="h-4 w-4 text-green-500" />}
          </div>
        </div>

        {bothApproved && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-800">
              <MessageCircle className="h-4 w-4" />
              <span className="font-medium">Real-time communication is now active!</span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              Both parties have approved the audit. You can now communicate in real-time, share files, and track progress.
            </p>
          </div>
        )}

        <div className="flex justify-end">
          {getActionButton()}
        </div>
      </CardContent>
    </Card>
  );
}

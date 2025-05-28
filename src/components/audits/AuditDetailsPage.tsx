
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, DollarSign, FileText, MessageSquare, Settings, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AuditMessaging } from '@/components/messaging/AuditMessaging';
import { formatDistanceToNow, format } from 'date-fns';

interface AuditRequest {
  id: string;
  project_name: string;
  project_description: string;
  blockchain: string;
  status: string;
  budget: number;
  deadline: string;
  created_at: string;
  client_id: string;
  assigned_auditor_id: string;
  audit_scope: string;
  specific_concerns: string;
  contract_count: number;
  lines_of_code: number;
}

interface AuditProgress {
  progress_percentage: number;
  milestones_completed: number;
  total_milestones: number;
  current_phase: string;
  estimated_completion_date: string;
  notes: string;
}

export function AuditDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, getUserType } = useAuth();
  const [audit, setAudit] = useState<AuditRequest | null>(null);
  const [progress, setProgress] = useState<AuditProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const userType = getUserType();

  useEffect(() => {
    if (!id || !user) return;
    fetchAuditDetails();
  }, [id, user]);

  const fetchAuditDetails = async () => {
    if (!id) return;

    try {
      // Fetch audit request details
      const { data: auditData, error: auditError } = await supabase
        .from('audit_requests')
        .select('*')
        .eq('id', id)
        .single();

      if (auditError) throw auditError;

      // Check if user has access to this audit
      const hasAccess = 
        auditData.client_id === user?.id ||
        auditData.assigned_auditor_id === user?.id ||
        userType === 'admin';

      if (!hasAccess) {
        toast.error('You do not have permission to view this audit');
        navigate('/audits');
        return;
      }

      setAudit(auditData);

      // Fetch progress data if audit is assigned
      if (auditData.assigned_auditor_id) {
        const { data: progressData } = await supabase
          .from('audit_progress')
          .select('*')
          .eq('audit_request_id', id)
          .single();

        if (progressData) {
          setProgress(progressData);
        }
      }
    } catch (error: any) {
      console.error('Failed to fetch audit details:', error);
      toast.error('Failed to load audit details');
      navigate('/audits');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'in_progress': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getOtherParticipant = () => {
    if (!audit) return null;

    if (userType === 'auditor') {
      return {
        id: audit.client_id,
        name: 'Project Owner', // In real app, fetch from profiles
        role: 'client' as const,
      };
    } else {
      return {
        id: audit.assigned_auditor_id || '',
        name: 'Auditor', // In real app, fetch from profiles
        role: 'auditor' as const,
      };
    }
  };

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center h-64">
          <div>Loading audit details...</div>
        </div>
      </div>
    );
  }

  if (!audit) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Audit Not Found</h1>
          <Button onClick={() => navigate('/audits')}>Back to Audits</Button>
        </div>
      </div>
    );
  }

  const otherParticipant = getOtherParticipant();

  return (
    <div className="container py-8 max-w-7xl">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold">{audit.project_name}</h1>
            <p className="text-muted-foreground mt-1">
              {audit.blockchain} • Created {formatDistanceToNow(new Date(audit.created_at), { addSuffix: true })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className={`${getStatusColor(audit.status)} text-white`}>
              {audit.status.replace('_', ' ').toUpperCase()}
            </Badge>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Actions
            </Button>
          </div>
        </div>

        {/* Progress Card */}
        {progress && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Audit Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span>{progress.progress_percentage}%</span>
                  </div>
                  <Progress value={progress.progress_percentage} className="h-2" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Phase</p>
                    <p className="font-medium">{progress.current_phase.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Milestones</p>
                    <p className="font-medium">{progress.milestones_completed}/{progress.total_milestones}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Est. Completion</p>
                    <p className="font-medium">
                      {progress.estimated_completion_date 
                        ? format(new Date(progress.estimated_completion_date), 'MMM dd, yyyy')
                        : 'TBD'}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <p className="font-medium">{audit.status.replace('_', ' ')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Audit Details */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="scope">Scope</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {audit.project_description || 'No description provided.'}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Technical Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Blockchain</p>
                        <p className="font-medium">{audit.blockchain}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Contracts</p>
                        <p className="font-medium">{audit.contract_count}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Lines of Code</p>
                        <p className="font-medium">{audit.lines_of_code?.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Budget</p>
                        <p className="font-medium">${audit.budget?.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="scope" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Audit Scope</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {audit.audit_scope || 'No scope defined.'}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Specific Concerns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {audit.specific_concerns || 'No specific concerns mentioned.'}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="timeline" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Deadline</p>
                          <p className="font-medium">
                            {audit.deadline 
                              ? format(new Date(audit.deadline), 'PPP')
                              : 'No deadline set'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Created</p>
                          <p className="font-medium">
                            {format(new Date(audit.created_at), 'PPP')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="deliverables" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Expected Deliverables</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Security Assessment Report</span>
                        <Badge variant="outline">Pending</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Vulnerability Analysis</span>
                        <Badge variant="outline">Pending</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Code Review Summary</span>
                        <Badge variant="outline">Pending</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Remediation Recommendations</span>
                        <Badge variant="outline">Pending</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Messaging Sidebar */}
          <div className="space-y-6">
            {otherParticipant && audit.assigned_auditor_id && (
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Communication
                </h3>
                <AuditMessaging 
                  auditRequestId={audit.id}
                  otherParticipant={otherParticipant}
                />
              </div>
            )}

            {!audit.assigned_auditor_id && userType === 'auditor' && (
              <Card>
                <CardHeader>
                  <CardTitle>Apply for this Audit</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    This audit is still open for applications. Submit your proposal to get started.
                  </p>
                  <Button className="w-full">
                    Submit Proposal
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

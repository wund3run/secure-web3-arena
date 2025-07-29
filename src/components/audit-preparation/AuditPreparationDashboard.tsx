import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  GitBranch, 
  MessageSquare, 
  FileText, 
  CheckCircle2, 
  Clock, 
  User, 
  Calendar,
  Shield,
  ExternalLink,
  Download,
  Upload,
  Settings
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";
import { Tables } from "@/integrations/supabase/types";

type AuditRequest = Tables<'audit_requests'>;
type AuditProgress = Tables<'audit_progress'>;
type AuditMessage = Tables<'audit_messages'>;

interface PreparationStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  required: boolean;
}

interface AuditProject extends AuditRequest {
  client_profile?: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

export function AuditPreparationDashboard() {
  const [selectedProject, setSelectedProject] = useState<AuditProject | null>(null);
  const [auditProgress, setAuditProgress] = useState<AuditProgress | null>(null);
  const [preparationSteps, setPreparationSteps] = useState<PreparationStep[]>([]);
  const [notes, setNotes] = useState('');
  const [communicationLog, setCommunicationLog] = useState<AuditMessage[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchAssignedProject();
    }
  }, [user]);

  const fetchAssignedProject = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Fetch assigned audit project
      const { data: auditData, error: auditError } = await supabase
        .from('audit_requests')
        .select('*')
        .eq('assigned_auditor_id', user.id)
        .in('status', ['assigned', 'in_progress', 'preparation'])
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (auditError && auditError.code !== 'PGRST116') {
        console.error('Error fetching audit project:', auditError);
        toast({
          title: "Error",
          description: "Failed to load assigned project",
          variant: "error",
        });
        return;
      }

      if (auditData) {
        // Fetch client profile separately
        // Define a type for client profile to avoid deep type instantiation
        interface ClientProfile {
          full_name: string | null;
          avatar_url: string | null;
          [key: string]: any;
        }
        
        // Use any to break the deep type instantiation, then manually type the result
        const clientProfileResult = await (supabase as any)
          .from('extended_profiles')
          .select('full_name, avatar_url')
          .eq('user_id', auditData.client_id)
          .single();
          
        const clientProfile = clientProfileResult.data as ClientProfile | null;

        setSelectedProject({
          ...auditData,
          client_profile: clientProfile || undefined
        });

        // Fetch or create audit progress
        await fetchOrCreateAuditProgress(auditData.id);
        await fetchCommunicationLog(auditData.id);
      }
    } catch (error) {
      console.error('Error in fetchAssignedProject:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrCreateAuditProgress = async (auditRequestId: string) => {
    if (!user) return;

    try {
      // First try to fetch existing progress
      let { data: progressData, error: progressError } = await supabase
        .from('audit_progress')
        .select('*')
        .eq('audit_request_id', auditRequestId)
        .eq('auditor_id', user.id)
        .single();

      if (progressError && progressError.code === 'PGRST116') {
        // Create initial progress record
                 const { data: newProgress, error: createError } = await supabase
           .from('audit_progress')
           .insert({
             audit_request_id: auditRequestId,
             auditor_id: user.id,
             current_phase: 'preparation',
             progress_percentage: 0,
             phase_details: {
               preparation_steps: getInitialPreparationSteps()
             } as any
           })
           .select()
           .single();

        if (createError) {
          console.error('Error creating audit progress:', createError);
          return;
        }

        progressData = newProgress;
      }

      if (progressData) {
        setAuditProgress(progressData);
        setNotes(progressData.notes || '');
        
        // Load preparation steps from phase_details
        const phaseDetails = progressData.phase_details as any;
        const steps = phaseDetails?.preparation_steps || getInitialPreparationSteps();
        setPreparationSteps(steps);
      }
    } catch (error) {
      console.error('Error in fetchOrCreateAuditProgress:', error);
    }
  };

  const fetchCommunicationLog = async (auditRequestId: string) => {
    try {
      const { data, error } = await supabase
        .from('audit_messages')
        .select('*')
        .eq('audit_request_id', auditRequestId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching communication log:', error);
        return;
      }

      setCommunicationLog(data || []);
    } catch (error) {
      console.error('Error in fetchCommunicationLog:', error);
    }
  };

  const getInitialPreparationSteps = (): PreparationStep[] => [
    {
      id: 'repo-access',
      title: 'Repository Access',
      description: 'Gain access to the project repository and verify you can clone it',
      completed: false,
      required: true
    },
    {
      id: 'environment-setup',
      title: 'Development Environment',
      description: 'Set up local development environment with required tools',
      completed: false,
      required: true
    },
    {
      id: 'initial-review',
      title: 'Initial Code Review',
      description: 'Perform preliminary review of codebase structure and architecture',
      completed: false,
      required: true
    },
    {
      id: 'client-meeting',
      title: 'Client Kickoff Meeting',
      description: 'Schedule and conduct initial meeting with client team',
      completed: false,
      required: true
    },
    {
      id: 'scope-definition',
      title: 'Audit Scope Definition',
      description: 'Define detailed audit scope and methodology with client',
      completed: false,
      required: true
    },
    {
      id: 'tools-setup',
      title: 'Security Tools Setup',
      description: 'Configure security analysis tools and testing frameworks',
      completed: false,
      required: false
    }
  ];

  const toggleStepCompletion = async (stepId: string) => {
    if (!auditProgress) return;

    const updatedSteps = preparationSteps.map(step => 
      step.id === stepId 
        ? { ...step, completed: !step.completed }
        : step
    );
    
    setPreparationSteps(updatedSteps);

    // Calculate new progress percentage
    const completedSteps = updatedSteps.filter(step => step.completed).length;
    const progressPercentage = (completedSteps / updatedSteps.length) * 100;

    try {
             const { error } = await supabase
         .from('audit_progress')
         .update({
           phase_details: {
             ...(auditProgress.phase_details as any || {}),
             preparation_steps: updatedSteps
           } as any,
           progress_percentage: Math.round(progressPercentage),
           updated_at: new Date().toISOString()
         })
         .eq('id', auditProgress.id);

      if (error) {
        console.error('Error updating progress:', error);
        toast({
          title: "Error",
          description: "Failed to update progress",
          variant: "error",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Step updated successfully",
      });
    } catch (error) {
      console.error('Error in toggleStepCompletion:', error);
    }
  };

  const saveNotes = async () => {
    if (!auditProgress) return;

    try {
      const { error } = await supabase
        .from('audit_progress')
        .update({
          notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', auditProgress.id);

      if (error) {
        console.error('Error saving notes:', error);
        toast({
          title: "Error",
          description: "Failed to save notes",
          variant: "error",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Notes saved successfully",
      });
    } catch (error) {
      console.error('Error in saveNotes:', error);
    }
  };

  const sendMessage = async (content: string, messageType: string = 'message') => {
    if (!selectedProject || !user) return;

    try {
      const { error } = await supabase
        .from('audit_messages')
        .insert({
          audit_request_id: selectedProject.id,
          sender_id: user.id,
          content,
          message_type: messageType,
          created_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error sending message:', error);
        toast({
          title: "Error",
          description: "Failed to send message",
          variant: "error",
        });
        return;
      }

      // Refresh communication log
      await fetchCommunicationLog(selectedProject.id);
      
      toast({
        title: "Success",
        description: "Message sent successfully",
      });
    } catch (error) {
      console.error('Error in sendMessage:', error);
    }
  };

  const completedSteps = preparationSteps.filter(step => step.completed).length;
  const totalSteps = preparationSteps.length;
  const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  const handleRepositoryAccess = () => {
    if (selectedProject?.repository_url) {
      window.open(selectedProject.repository_url, '_blank');
      toast({
        title: "Info",
        description: "Opening repository in new tab",
      });
    } else {
      toast({
        title: "Info",
        description: "Repository URL not available",
        variant: "error",
      });
    }
  };

  const startAudit = async () => {
    if (!selectedProject || !auditProgress) return;

    const requiredSteps = preparationSteps.filter(step => step.required);
    const completedRequiredSteps = requiredSteps.filter(step => step.completed);
    
    if (completedRequiredSteps.length < requiredSteps.length) {
      toast({
        title: "Error",
        description: "Please complete all required preparation steps before starting the audit",
        variant: "error",
      });
      return;
    }

    try {
      // Update project status and audit progress
      const { error: projectError } = await supabase
        .from('audit_requests')
        .update({
          status: 'in_progress',
          current_phase: 'audit'
        })
        .eq('id', selectedProject.id);

      const { error: progressError } = await supabase
        .from('audit_progress')
        .update({
          current_phase: 'audit',
          actual_start_date: new Date().toISOString()
        })
        .eq('id', auditProgress.id);

      if (projectError || progressError) {
        console.error('Error starting audit:', projectError || progressError);
        toast({
          title: "Error",
          description: "Failed to start audit",
          variant: "error",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Audit started! Redirecting to audit workspace...",
      });
      
      // In a real implementation, this would navigate to the audit workspace
      // navigate('/audit/workspace');
    } catch (error) {
      console.error('Error in startAudit:', error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Card className="animate-pulse">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!selectedProject) {
    return (
      <div className="text-center py-12">
        <Card>
          <CardContent className="p-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Project</h3>
            <p className="text-gray-600">You don't have any assigned audit projects in preparation phase.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">{selectedProject.project_name}</CardTitle>
              <CardDescription className="mt-2 text-base">
                Client: {selectedProject.client_profile?.full_name || 'Unknown'} • 
                Budget: ${selectedProject.budget?.toLocaleString() || 'TBD'} • 
                Deadline: {selectedProject.deadline ? new Date(selectedProject.deadline).toLocaleDateString() : 'Flexible'}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="capitalize">
              {selectedProject.status?.replace('_', ' ') || 'preparation'}
            </Badge>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="outline">
              {selectedProject.blockchain}
            </Badge>
            {selectedProject.urgency_level && (
              <Badge variant={selectedProject.urgency_level === 'high' ? 'destructive' : 'default'}>
                {selectedProject.urgency_level} Priority
              </Badge>
            )}
          </div>
          
          <p className="text-muted-foreground mt-3">
            {selectedProject.project_description || 'No description provided'}
          </p>
        </CardHeader>
      </Card>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Preparation Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {completedSteps} of {totalSteps} steps completed
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            
            <Progress value={progressPercentage} className="w-full" />
            
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Start Date: {selectedProject.created_at ? new Date(selectedProject.created_at).toLocaleDateString() : 'TBD'}</span>
              <span>Deadline: {selectedProject.deadline ? new Date(selectedProject.deadline).toLocaleDateString() : 'Flexible'}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="steps" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="steps">Preparation Steps</TabsTrigger>
          <TabsTrigger value="repository">Repository</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="notes">Planning Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="steps" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Required Preparation Steps</CardTitle>
              <CardDescription>
                Complete all required steps before starting the audit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {preparationSteps.map((step) => (
                  <div 
                    key={step.id}
                    className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleStepCompletion(step.id)}
                      className="p-0 h-auto"
                    >
                      <CheckCircle2 
                        className={`h-5 w-5 ${
                          step.completed 
                            ? 'text-green-600 fill-green-100' 
                            : 'text-gray-400'
                        }`} 
                      />
                    </Button>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-medium ${
                          step.completed ? 'line-through text-gray-500' : ''
                        }`}>
                          {step.title}
                        </h4>
                        {step.required && (
                          <Badge variant="error" className="text-xs px-2">
                            Required
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="repository" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5" />
                Repository Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedProject.repository_url ? (
                <>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Label className="text-sm font-medium">Repository URL</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="flex-1 px-2 py-1 bg-white border rounded text-sm">
                        {selectedProject.repository_url}
                      </code>
                      <Button size="sm" onClick={handleRepositoryAccess}>
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Open
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Clone Command</Label>
                    <code className="block p-2 bg-gray-100 rounded text-sm">
                      git clone {selectedProject.repository_url}
                    </code>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <GitBranch className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Repository URL not provided yet</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => sendMessage("Could you please provide the repository URL for the audit?", "request")}
                  >
                    Request Repository Access
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communication" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Client Communication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {communicationLog.length > 0 ? (
                  communicationLog.map((message) => (
                    <div key={message.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">
                          {message.message_type || 'Message'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {message.created_at ? new Date(message.created_at).toLocaleDateString() : ''}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{message.content}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No communication history yet</p>
                  </div>
                )}
                
                <div className="border-t pt-4">
                  <Label htmlFor="message">Send Message to Client</Label>
                  <div className="flex gap-2 mt-2">
                    <Input 
                      id="message"
                      placeholder="Type your message..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                          sendMessage(e.currentTarget.value.trim());
                          e.currentTarget.value = '';
                        }
                      }}
                    />
                    <Button size="sm">Send</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Planning Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add your preparation notes, findings, and planning details..."
                  rows={10}
                />
                <Button onClick={saveNotes}>
                  Save Notes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Button */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Ready to start the audit?</h3>
              <p className="text-sm text-muted-foreground">
                Ensure all required preparation steps are completed
              </p>
            </div>
            <Button 
              onClick={startAudit}
              disabled={preparationSteps.filter(s => s.required && !s.completed).length > 0}
              size="lg"
            >
              <Shield className="h-4 w-4 mr-2" />
              Start Audit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
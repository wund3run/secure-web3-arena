import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Upload, 
  Download, 
  Send,
  Eye,
  Calendar,
  Clock,
  Star,
  MessageSquare,
  Shield,
  TrendingUp,
  Award,
  Info,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";
import { Tables } from "@/integrations/supabase/types";
import { FileUpload } from '@/components/ui/file-upload';
import { fileUploadService, UploadedFile } from '@/services/fileUploadService';
import { Link, useNavigate } from 'react-router-dom';

type AuditRequest = Tables<'audit_requests'>;
type AuditFinding = Tables<'audit_findings'>;
type AuditDeliverable = Tables<'audit_deliverables'>;

interface AuditProject extends AuditRequest {
  client_profile?: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

export function AuditCompletionDashboard() {
  const [selectedProject, setSelectedProject] = useState<AuditProject | null>(null);
  const [findings, setFindings] = useState<AuditFinding[]>([]);
  const [deliverables, setDeliverables] = useState<AuditDeliverable[]>([]);
  const [newFinding, setNewFinding] = useState({
    title: '',
    severity: 'medium',
    category: 'security',
    description: '',
    recommendation: '',
    location: '',
    code_snippet: ''
  });
  const [loading, setLoading] = useState(true);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchAuditProject();
    }
  }, [user]);

  const fetchAuditProject = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      // Fetch audit project in completion phase
      const { data: auditData, error: auditError } = await supabase
        .from('audit_requests')
        .select('*')
        .eq('assigned_auditor_id', user.id)
        .in('status', ['in_progress', 'review', 'completing'])
        .eq('current_phase', 'completion')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (auditError && auditError.code !== 'PGRST116') {
        console.error('Error fetching audit project:', auditError);
        toast({
          title: "Error",
          description: "Failed to load audit project",
          variant: "error",
        });
        return;
      }

      if (auditData) {
        // Fetch client profile - use type assertion to avoid infinite type instantiation
        interface ExtendedProfile {
          user_id: string;
          full_name: string;
          avatar_url: string;
          [key: string]: any;
        }
        
        const clientProfileResult = await (supabase as any)
          .from('extended_profiles')
          .select('full_name, avatar_url')
          .eq('user_id', auditData.client_id)
          .single();
          
        const clientProfile = clientProfileResult.data as ExtendedProfile | null;

        setSelectedProject({
          ...auditData,
          client_profile: clientProfile || undefined
        });

        // Fetch findings and deliverables
        await Promise.all([
          fetchFindings(auditData.id),
          fetchDeliverables(auditData.id)
        ]);
      }
    } catch (error) {
      console.error('Error in fetchAuditProject:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFindings = async (auditRequestId: string) => {
    try {
      const { data, error } = await supabase
        .from('audit_findings')
        .select('*')
        .eq('audit_request_id', auditRequestId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching findings:', error);
        return;
      }

      setFindings(data || []);
    } catch (error) {
      console.error('Error in fetchFindings:', error);
    }
  };

  const fetchDeliverables = async (auditRequestId: string) => {
    try {
      const { data, error } = await supabase
        .from('audit_deliverables')
        .select('*')
        .eq('audit_request_id', auditRequestId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching deliverables:', error);
        return;
      }

      setDeliverables(data || []);
    } catch (error) {
      console.error('Error in fetchDeliverables:', error);
    }
  };

  const addFinding = async () => {
    if (!selectedProject || !newFinding.title || !newFinding.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "error",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('audit_findings')
        .insert({
          audit_request_id: selectedProject.id,
          title: newFinding.title,
          severity: newFinding.severity,
          category: newFinding.category,
          description: newFinding.description,
          recommendation: newFinding.recommendation || null,
          location: newFinding.location || null,
          code_snippet: newFinding.code_snippet || null,
          status: 'identified'
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding finding:', error);
        toast({
          title: "Error",
          description: "Failed to add finding",
          variant: "error",
        });
        return;
      }

      setFindings(prev => [data, ...prev]);
      setNewFinding({
        title: '',
        severity: 'medium',
        category: 'security',
        description: '',
        recommendation: '',
        location: '',
        code_snippet: ''
      });

      toast({
        title: "Success",
        description: "Finding added successfully",
      });
    } catch (error) {
      console.error('Error in addFinding:', error);
    }
  };

  const updateDeliverableStatus = async (deliverableId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('audit_deliverables')
        .update({ 
          status,
          delivered_at: status === 'delivered' ? new Date().toISOString() : null
        })
        .eq('id', deliverableId);

      if (error) {
        console.error('Error updating deliverable:', error);
        toast({
          title: "Error",
          description: "Failed to update deliverable status",
          variant: "error",
        });
        return;
      }

      // Refresh deliverables
      if (selectedProject) {
        await fetchDeliverables(selectedProject.id);
      }

      toast({
        title: "Success",
        description: "Deliverable status updated",
      });
    } catch (error) {
      console.error('Error in updateDeliverableStatus:', error);
    }
  };

  const handleFileUpload = async (files: File[], deliverableId: string) => {
    if (!selectedProject || files.length === 0) return;

    setUploadingFiles(true);
    try {
      const uploadedFiles = await fileUploadService.uploadMultipleFiles(
        files,
        `audit-deliverables/${selectedProject.id}/${deliverableId}`
      );

      // Update deliverable with file URLs
      const fileUrls = uploadedFiles.map(f => f.url);
      const filePaths = uploadedFiles.map(f => f.path);

      const { error } = await supabase
        .from('audit_deliverables')
        .update({
          file_url: fileUrls[0], // Primary file URL
          file_path: filePaths[0], // Primary file path
          additional_files: fileUrls.length > 1 ? fileUrls.slice(1) : null,
          status: 'delivered',
          delivered_at: new Date().toISOString()
        })
        .eq('id', deliverableId);

      if (error) {
        console.error('Error updating deliverable with files:', error);
        toast({
          title: "Error",
          description: "Failed to attach files to deliverable",
          variant: "error",
        });
        return;
      }

      // Refresh deliverables
      await fetchDeliverables(selectedProject.id);

      toast({
        title: "Success",
        description: `${files.length} file(s) uploaded successfully`,
      });
    } catch (error) {
      console.error('Error uploading files:', error);
      toast({
        title: "Error",
        description: "Failed to upload files",
        variant: "error",
      });
    } finally {
      setUploadingFiles(false);
    }
  };

  const createNewDeliverable = async (title: string, description: string) => {
    if (!selectedProject) return;

    try {
      const { data, error } = await supabase
        .from('audit_deliverables')
        .insert({
          audit_request_id: selectedProject.id,
          title,
          description,
          status: 'pending',
          deliverable_type: 'report'
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating deliverable:', error);
        toast({
          title: "Error",
          description: "Failed to create deliverable",
          variant: "error",
        });
        return;
      }

      await fetchDeliverables(selectedProject.id);

      toast({
        title: "Success",
        description: "Deliverable created successfully",
      });
    } catch (error) {
      console.error('Error in createNewDeliverable:', error);
    }
  };

  const completeAudit = async () => {
    if (!selectedProject) return;

    // Check if all critical/high findings are resolved
    const unresolvedCritical = findings.filter(f => 
      (f.severity === 'critical' || f.severity === 'high') && 
      f.status !== 'resolved'
    );

    if (unresolvedCritical.length > 0) {
      toast({
        title: "Error",
        description: "Please resolve all critical and high severity findings before completing",
        variant: "error",
      });
      return;
    }

    // Check if all deliverables are completed
    const pendingDeliverables = deliverables.filter(d => d.status !== 'delivered');
    if (pendingDeliverables.length > 0) {
      toast({
        title: "Error",
        description: "Please complete all deliverables before finishing the audit",
        variant: "error",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('audit_requests')
        .update({
          status: 'completed',
          current_phase: 'completed',
          completion_percentage: 100
        })
        .eq('id', selectedProject.id);

      if (error) {
        console.error('Error completing audit:', error);
        toast({
          title: "Error",
          description: "Failed to complete audit",
          variant: "error",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Audit completed and submitted successfully!",
      });

      // Navigate back to dashboard after completion
      setTimeout(() => {
        navigate('/dashboard/auditor');
      }, 2000);
    } catch (error) {
      console.error('Error in completeAudit:', error);
      toast({
        title: "Error",
        description: "Failed to complete audit",
        variant: "error",
      });
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'info': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="h-4 w-4" />;
      case 'medium':
        return <AlertCircle className="h-4 w-4" />;
      case 'low':
        return <Info className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const completedDeliverables = deliverables.filter(d => d.status === 'delivered').length;
  const totalDeliverables = deliverables.length;
  const deliverableProgress = totalDeliverables > 0 ? (completedDeliverables / totalDeliverables) * 100 : 0;

  const resolvedFindings = findings.filter(f => f.status === 'resolved').length;
  const totalFindings = findings.length;

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
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Audit</h3>
            <p className="text-gray-600">You don't have any audit projects in completion phase.</p>
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
              {selectedProject.status?.replace('_', ' ') || 'completion'}
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
        </CardHeader>
      </Card>

      {/* Progress Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Deliverables Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {completedDeliverables} of {totalDeliverables} completed
                </span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(deliverableProgress)}%
                </span>
              </div>
              <Progress value={deliverableProgress} className="w-full" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Findings Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Findings</span>
                <Badge variant="outline">{totalFindings}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Resolved</span>
                <Badge variant="secondary">{resolvedFindings}</Badge>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-4">
                {['critical', 'high', 'medium', 'low'].map(severity => {
                  const count = findings.filter(f => f.severity === severity).length;
                  return (
                    <div key={severity} className="text-center">
                      <div className={`text-xs px-2 py-1 rounded ${getSeverityColor(severity)}`}>
                        {count}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 capitalize">{severity}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="findings" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="findings">Findings</TabsTrigger>
          <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
          <TabsTrigger value="submission">Final Submission</TabsTrigger>
        </TabsList>

        <TabsContent value="findings" className="space-y-4">
          {/* Add New Finding */}
          <Card>
            <CardHeader>
              <CardTitle>Add New Finding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="finding-title">Title *</Label>
                  <Input
                    id="finding-title"
                    value={newFinding.title}
                    onChange={(e) => setNewFinding(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Brief finding title"
                  />
                </div>
                <div>
                  <Label>Severity *</Label>
                  <Select 
                    value={newFinding.severity} 
                    onValueChange={(value) => setNewFinding(prev => ({ ...prev, severity: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Select 
                    value={newFinding.category} 
                    onValueChange={(value) => setNewFinding(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="gas_optimization">Gas Optimization</SelectItem>
                      <SelectItem value="code_quality">Code Quality</SelectItem>
                      <SelectItem value="logic_error">Logic Error</SelectItem>
                      <SelectItem value="best_practices">Best Practices</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="finding-location">Location</Label>
                  <Input
                    id="finding-location"
                    value={newFinding.location}
                    onChange={(e) => setNewFinding(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="File:line or contract.function"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="finding-description">Description *</Label>
                <Textarea
                  id="finding-description"
                  value={newFinding.description}
                  onChange={(e) => setNewFinding(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Detailed description of the finding"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="finding-recommendation">Recommendation</Label>
                <Textarea
                  id="finding-recommendation"
                  value={newFinding.recommendation}
                  onChange={(e) => setNewFinding(prev => ({ ...prev, recommendation: e.target.value }))}
                  placeholder="Recommended fix or mitigation"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="finding-code">Code Snippet</Label>
                <Textarea
                  id="finding-code"
                  value={newFinding.code_snippet}
                  onChange={(e) => setNewFinding(prev => ({ ...prev, code_snippet: e.target.value }))}
                  placeholder="Relevant code snippet"
                  rows={4}
                  className="font-mono text-sm"
                />
              </div>

              <Button onClick={addFinding}>
                Add Finding
              </Button>
            </CardContent>
          </Card>

          {/* Findings List */}
          <div className="space-y-4">
            {findings.map((finding) => (
              <Card key={finding.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${getSeverityColor(finding.severity)}`}>
                        {getSeverityIcon(finding.severity)}
                        {finding.severity.toUpperCase()}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {finding.category.replace('_', ' ')}
                      </Badge>
                    </div>
                    <Badge variant={finding.status === 'resolved' ? 'default' : 'secondary'}>
                      {finding.status}
                    </Badge>
                  </div>
                  
                  <h4 className="font-semibold mb-2">{finding.title}</h4>
                  
                  {finding.location && (
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">Location:</span> {finding.location}
                    </p>
                  )}
                  
                  <p className="text-sm mb-3">{finding.description}</p>
                  
                  {finding.recommendation && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Recommendation:</p>
                      <p className="text-sm text-gray-600">{finding.recommendation}</p>
                    </div>
                  )}
                  
                  {finding.code_snippet && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Code:</p>
                      <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                        {finding.code_snippet}
                      </pre>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="deliverables" className="space-y-4">
          <div className="space-y-4">
            {deliverables.map((deliverable) => (
              <Card key={deliverable.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">{deliverable.title}</h4>
                      {deliverable.description && (
                        <p className="text-sm text-gray-600 mb-3">{deliverable.description}</p>
                      )}
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        {deliverable.due_date && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Due: {new Date(deliverable.due_date).toLocaleDateString()}
                          </div>
                        )}
                        {deliverable.delivered_at && (
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            Delivered: {new Date(deliverable.delivered_at).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant={deliverable.status === 'delivered' ? 'default' : 'secondary'}>
                        {deliverable.status}
                      </Badge>
                      
                      {deliverable.file_url && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => deliverable.file_url && window.open(deliverable.file_url, '_blank')}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* File Upload Section */}
                  {deliverable.status === 'pending' && (
                    <div className="border-t pt-4">
                      <h5 className="text-sm font-medium mb-3">Upload Deliverable Files</h5>
                      <FileUpload
                        onFilesSelected={(files) => handleFileUpload(files, deliverable.id)}
                        accept=".pdf,.doc,.docx,.md,.zip,.tar.gz"
                        maxFiles={3}
                        disabled={uploadingFiles}
                      />
                      {uploadingFiles && (
                        <div className="mt-2 text-sm text-gray-500">
                          Uploading files...
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Show uploaded files */}
                  {deliverable.file_url && (
                    <div className="border-t pt-4">
                      <h5 className="text-sm font-medium mb-2">Uploaded Files</h5>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <FileText className="h-4 w-4" />
                          <span>Primary file uploaded</span>
                          <Badge variant="outline" className="text-xs">Delivered</Badge>
                        </div>
                                                 {(deliverable as any).additional_files && Array.isArray((deliverable as any).additional_files) && (
                           <>
                             {((deliverable as any).additional_files as string[]).map((_: string, index: number) => (
                               <div key={index} className="flex items-center gap-2 text-sm">
                                 <FileText className="h-4 w-4" />
                                 <span>Additional file {index + 1}</span>
                               </div>
                             ))}
                           </>
                         )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="submission" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Final Audit Submission</CardTitle>
              <CardDescription>
                Review and submit the completed audit to the client
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Pre-submission checklist */}
              <div className="space-y-3">
                <h4 className="font-medium">Pre-submission Checklist</h4>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {deliverableProgress === 100 ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <Clock className="h-4 w-4 text-orange-500" />
                    )}
                    <span className="text-sm">All deliverables completed ({completedDeliverables}/{totalDeliverables})</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {findings.filter(f => (f.severity === 'critical' || f.severity === 'high') && f.status !== 'resolved').length === 0 ? (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-sm">All critical/high findings resolved</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button 
                  onClick={completeAudit}
                  disabled={
                    deliverableProgress !== 100 || 
                    findings.filter(f => (f.severity === 'critical' || f.severity === 'high') && f.status !== 'resolved').length > 0
                  }
                  size="lg"
                  className="w-full"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Complete & Submit Audit
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, X, Calendar, DollarSign, Shield } from 'lucide-react';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface ProjectFormData {
  projectName: string;
  description: string;
  blockchain: string;
  projectType: string;
  repositoryUrl: string;
  documentation: string;
  auditScope: string;
  timeline: string;
  budget: number;
  urgencyLevel: string;
  communicationPreference: string;
  requirements: string[];
}

const BLOCKCHAIN_OPTIONS = [
  'Ethereum', 'Polygon', 'Binance Smart Chain', 'Avalanche', 'Solana',
  'Arbitrum', 'Optimism', 'Fantom', 'Cardano', 'Polkadot'
];

const PROJECT_TYPES = [
  'DeFi Protocol', 'NFT Marketplace', 'Gaming Platform', 'DAO Governance',
  'Cross-Chain Bridge', 'Layer 2 Solution', 'Wallet Application', 'Other'
];

const URGENCY_LEVELS = [
  { value: 'low', label: 'Low - Flexible timeline' },
  { value: 'medium', label: 'Medium - Standard priority' },
  { value: 'high', label: 'High - Urgent review needed' },
  { value: 'critical', label: 'Critical - Immediate attention required' }
];

export const ProjectSubmissionForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<ProjectFormData>({
    projectName: '',
    description: '',
    blockchain: '',
    projectType: '',
    repositoryUrl: '',
    documentation: '',
    auditScope: '',
    timeline: '',
    budget: 0,
    urgencyLevel: '',
    communicationPreference: 'email',
    requirements: []
  });

  const handleInputChange = (field: keyof ProjectFormData, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const addRequirement = (requirement: string) => {
    if (requirement && !formData.requirements.includes(requirement)) {
      handleInputChange('requirements', [...formData.requirements, requirement]);
    }
  };

  const removeRequirement = (requirement: string) => {
    handleInputChange('requirements', formData.requirements.filter(r => r !== requirement));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!user) {
      toast.error('Please log in to submit a project');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Submit project to audit_requests table
      const { data, error } = await supabase
        .from('audit_requests')
        .insert({
          client_id: user.id,
          project_name: formData.projectName,
          description: formData.description,
          blockchain: formData.blockchain,
          project_type: formData.projectType,
          repository_url: formData.repositoryUrl,
          documentation_url: formData.documentation,
          audit_scope: formData.auditScope,
          preferred_timeline: formData.timeline,
          budget: formData.budget,
          urgency_level: formData.urgencyLevel,
          communication_preference: formData.communicationPreference,
          special_requirements: formData.requirements,
          status: 'pending',
          auto_assign_enabled: true
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Project submitted successfully!', {
        description: 'We will match you with qualified auditors shortly.'
      });

      // Navigate to project dashboard
      navigate('/project-dashboard');
    } catch (error) {
      console.error('Project submission error:', error);
      toast.error('Failed to submit project', {
        description: 'Please try again or contact support.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.projectName && formData.description && formData.blockchain && 
                     formData.projectType && formData.timeline && formData.budget > 0;

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Submit Your Project for Audit</h1>
        <p className="text-muted-foreground">
          Get your Web3 project reviewed by certified security experts
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Project Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Project Information
            </CardTitle>
            <CardDescription>
              Tell us about your project and what needs to be audited
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectName">Project Name *</Label>
                <Input
                  id="projectName"
                  placeholder="My DeFi Protocol"
                  value={formData.projectName}
                  onChange={(e) => handleInputChange('projectName', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="blockchain">Blockchain *</Label>
                <Select value={formData.blockchain} onValueChange={(value) => handleInputChange('blockchain', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select blockchain" />
                  </SelectTrigger>
                  <SelectContent>
                    {BLOCKCHAIN_OPTIONS.map(chain => (
                      <SelectItem key={chain} value={chain}>{chain}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectType">Project Type *</Label>
                <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECT_TYPES.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="repositoryUrl">Repository URL</Label>
                <Input
                  id="repositoryUrl"
                  placeholder="https://github.com/username/project"
                  value={formData.repositoryUrl}
                  onChange={(e) => handleInputChange('repositoryUrl', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Project Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your project, its functionality, and key features..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="auditScope">Audit Scope</Label>
              <Textarea
                id="auditScope"
                placeholder="Specify which parts of your project need auditing (smart contracts, protocols, etc.)"
                value={formData.auditScope}
                onChange={(e) => handleInputChange('auditScope', e.target.value)}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Timeline and Budget */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Timeline & Budget
            </CardTitle>
            <CardDescription>
              Set your preferred timeline and budget for the audit
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timeline">Preferred Timeline *</Label>
                <Input
                  id="timeline"
                  placeholder="e.g., 2-3 weeks"
                  value={formData.timeline}
                  onChange={(e) => handleInputChange('timeline', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget (USD) *</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder="5000"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', Number(e.target.value))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="urgencyLevel">Urgency Level</Label>
              <Select value={formData.urgencyLevel} onValueChange={(value) => handleInputChange('urgencyLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency level" />
                </SelectTrigger>
                <SelectContent>
                  {URGENCY_LEVELS.map(level => (
                    <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Documentation Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Documentation
            </CardTitle>
            <CardDescription>
              Upload project documentation, whitepaper, or technical specifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.md,.txt"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click to upload documentation files
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, DOC, MD, TXT up to 10MB each
                </p>
              </label>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">{file.name}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="documentation">Documentation URL</Label>
              <Input
                id="documentation"
                placeholder="https://docs.yourproject.com"
                value={formData.documentation}
                onChange={(e) => handleInputChange('documentation', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            size="lg"
            className="px-8"
          >
            {isSubmitting ? 'Submitting...' : 'Submit for Audit'}
          </Button>
        </div>
      </form>
    </div>
  );
};

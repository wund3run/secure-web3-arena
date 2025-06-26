
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, X, Calendar, DollarSign } from 'lucide-react';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface ProjectData {
  name: string;
  description: string;
  repositoryUrl: string;
  techStack: string[];
  auditType: string;
  timeline: string;
  budget: string;
  requirements: string;
}

const TECH_STACK_OPTIONS = [
  'Solidity', 'Vyper', 'Rust', 'JavaScript', 'TypeScript', 'Python', 'Go', 'C++', 'Move'
];

const AUDIT_TYPES = [
  'Smart Contract Audit',
  'DeFi Protocol Audit',
  'NFT Security Review',
  'Token Security Audit',
  'Bridge Security Review',
  'DAO Governance Audit'
];

export const ProjectSubmissionForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [documents, setDocuments] = useState<File[]>([]);
  const [projectData, setProjectData] = useState<ProjectData>({
    name: '',
    description: '',
    repositoryUrl: '',
    techStack: [],
    auditType: '',
    timeline: '',
    budget: '',
    requirements: ''
  });

  const updateField = (field: keyof ProjectData, value: string | string[]) => {
    setProjectData(prev => ({ ...prev, [field]: value }));
  };

  const addTechStack = (tech: string) => {
    if (!projectData.techStack.includes(tech)) {
      updateField('techStack', [...projectData.techStack, tech]);
    }
  };

  const removeTechStack = (tech: string) => {
    updateField('techStack', projectData.techStack.filter(t => t !== tech));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setDocuments(prev => [...prev, ...files]);
  };

  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please log in to submit a project');
      return;
    }

    if (!projectData.name || !projectData.description || !projectData.auditType) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Submit audit request to database
      const { data, error } = await supabase
        .from('audit_requests')
        .insert({
          project_owner_id: user.id,
          title: projectData.name,
          description: projectData.description,
          repository_url: projectData.repositoryUrl,
          tech_stack: projectData.techStack,
          audit_type: projectData.auditType,
          timeline: projectData.timeline,
          budget: projectData.budget ? parseFloat(projectData.budget) : null,
          requirements: projectData.requirements,
          status: 'pending'
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Project submitted successfully!', {
        description: 'Your audit request has been submitted and is being reviewed.'
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

  const isValid = projectData.name && projectData.description && projectData.auditType;

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Submit Your Project for Audit</h1>
        <p className="text-muted-foreground">
          Get your Web3 project audited by top security experts
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Project Information */}
        <Card>
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
            <CardDescription>
              Tell us about your project and what you need audited
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                placeholder="My DeFi Protocol"
                value={projectData.name}
                onChange={(e) => updateField('name', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Project Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your project, its purpose, and key features..."
                value={projectData.description}
                onChange={(e) => updateField('description', e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="repository">Repository URL</Label>
              <Input
                id="repository"
                placeholder="https://github.com/yourproject/repo"
                value={projectData.repositoryUrl}
                onChange={(e) => updateField('repositoryUrl', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Technical Details */}
        <Card>
          <CardHeader>
            <CardTitle>Technical Details</CardTitle>
            <CardDescription>
              Help auditors understand your technology stack
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Technology Stack</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                {TECH_STACK_OPTIONS.map((tech) => (
                  <Button
                    key={tech}
                    type="button"
                    variant={projectData.techStack.includes(tech) ? "default" : "outline"}
                    size="sm"
                    onClick={() => 
                      projectData.techStack.includes(tech)
                        ? removeTechStack(tech)
                        : addTechStack(tech)
                    }
                  >
                    {tech}
                  </Button>
                ))}
              </div>
              {projectData.techStack.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {projectData.techStack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                      {tech}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeTechStack(tech)}
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="auditType">Audit Type *</Label>
              <Select value={projectData.auditType} onValueChange={(value) => updateField('auditType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select audit type" />
                </SelectTrigger>
                <SelectContent>
                  {AUDIT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              When do you need the audit completed and what's your budget?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timeline">Preferred Timeline</Label>
                <Select value={projectData.timeline} onValueChange={(value) => updateField('timeline', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                    <SelectItem value="2-4 weeks">2-4 weeks</SelectItem>
                    <SelectItem value="1-2 months">1-2 months</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Budget (USD)
                </Label>
                <Input
                  id="budget"
                  placeholder="5000"
                  type="number"
                  value={projectData.budget}
                  onChange={(e) => updateField('budget', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Requirements</CardTitle>
            <CardDescription>
              Any specific requirements or areas of focus for the audit?
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Specific vulnerabilities to check, compliance requirements, etc..."
              value={projectData.requirements}
              onChange={(e) => updateField('requirements', e.target.value)}
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Document Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Supporting Documents</CardTitle>
            <CardDescription>
              Upload any relevant documentation, whitepapers, or specifications
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
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, DOC, MD, TXT up to 10MB each
                </p>
              </label>
            </div>

            {documents.length > 0 && (
              <div className="space-y-2">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">{doc.name}</span>
                    </div>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => removeDocument(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            size="lg"
            className="px-8"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Project for Audit'}
          </Button>
        </div>
      </form>
    </div>
  );
};

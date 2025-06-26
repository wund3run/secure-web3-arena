
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Calendar, DollarSign, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { useNavigate } from 'react-router-dom';

interface ProjectSubmissionData {
  name: string;
  description: string;
  repository_url: string;
  project_type: string;
  tech_stack: string[];
  audit_scope: string[];
  budget_range: string;
  timeline: string;
  requirements: string;
}

const TECH_STACK_OPTIONS = [
  'Solidity', 'Vyper', 'Rust', 'Move', 'JavaScript', 'TypeScript',
  'React', 'Vue', 'Angular', 'Node.js', 'Python', 'Go'
];

const AUDIT_SCOPE_OPTIONS = [
  'Smart Contract Security',
  'Access Control',
  'Business Logic',
  'Gas Optimization',
  'Reentrancy Analysis',
  'Integer Overflow/Underflow',
  'Front-end Security',
  'Integration Testing',
  'Economic Security'
];

const PROJECT_TYPES = [
  { value: 'defi', label: 'DeFi Protocol' },
  { value: 'nft', label: 'NFT Platform' },
  { value: 'dao', label: 'DAO Governance' },
  { value: 'bridge', label: 'Cross-Chain Bridge' },
  { value: 'wallet', label: 'Wallet Application' },
  { value: 'exchange', label: 'DEX/Exchange' },
  { value: 'other', label: 'Other' }
];

const BUDGET_RANGES = [
  { value: '1000-5000', label: '$1,000 - $5,000' },
  { value: '5000-15000', label: '$5,000 - $15,000' },
  { value: '15000-50000', label: '$15,000 - $50,000' },
  { value: '50000-100000', label: '$50,000 - $100,000' },
  { value: '100000+', label: '$100,000+' },
  { value: 'custom', label: 'Custom Quote' }
];

export const ProjectSubmissionForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [documents, setDocuments] = useState<File[]>([]);
  const [formData, setFormData] = useState<ProjectSubmissionData>({
    name: '',
    description: '',
    repository_url: '',
    project_type: '',
    tech_stack: [],
    audit_scope: [],
    budget_range: '',
    timeline: '',
    requirements: ''
  });

  const updateField = (field: keyof ProjectSubmissionData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addToArray = (field: 'tech_stack' | 'audit_scope', value: string) => {
    if (!formData[field].includes(value)) {
      updateField(field, [...formData[field], value]);
    }
  };

  const removeFromArray = (field: 'tech_stack' | 'audit_scope', value: string) => {
    updateField(field, formData[field].filter(item => item !== value));
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
    if (!user) return;

    setIsSubmitting(true);
    try {
      // Submit project to database
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert({
          name: formData.name,
          description: formData.description,
          owner_id: user.id,
          repository_url: formData.repository_url,
          project_type: formData.project_type,
          tech_stack: formData.tech_stack,
          audit_scope: formData.audit_scope,
          budget_range: formData.budget_range,
          timeline: formData.timeline,
          requirements: formData.requirements,
          status: 'pending_review'
        })
        .select()
        .single();

      if (projectError) throw projectError;

      // Upload documents if any
      if (documents.length > 0) {
        for (const doc of documents) {
          const fileName = `${project.id}/${doc.name}`;
          const { error: uploadError } = await supabase.storage
            .from('project-documents')
            .upload(fileName, doc);

          if (uploadError) {
            console.error('Document upload error:', uploadError);
          }
        }
      }

      toast.success('Project submitted successfully!', {
        description: 'We\'ll match you with suitable auditors within 24 hours.'
      });

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

  const isValid = formData.name && formData.description && formData.project_type && 
                  formData.tech_stack.length > 0 && formData.audit_scope.length > 0 &&
                  formData.budget_range && formData.timeline;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Submit Your Project</h1>
        <p className="text-muted-foreground">
          Get your Web3 project audited by top security experts
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
            <CardDescription>Basic details about your project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name *</Label>
                <Input
                  id="name"
                  placeholder="My DeFi Protocol"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Project Type *</Label>
                <Select value={formData.project_type} onValueChange={(value) => updateField('project_type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECT_TYPES.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Project Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your project, its purpose, and key features..."
                value={formData.description}
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
                value={formData.repository_url}
                onChange={(e) => updateField('repository_url', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technical Stack</CardTitle>
            <CardDescription>Technologies and frameworks used in your project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {TECH_STACK_OPTIONS.map(tech => (
                <Button
                  key={tech}
                  type="button"
                  variant={formData.tech_stack.includes(tech) ? "default" : "outline"}
                  size="sm"
                  onClick={() => 
                    formData.tech_stack.includes(tech)
                      ? removeFromArray('tech_stack', tech)
                      : addToArray('tech_stack', tech)
                  }
                >
                  {tech}
                </Button>
              ))}
            </div>
            
            {formData.tech_stack.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tech_stack.map(tech => (
                  <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                    {tech}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeFromArray('tech_stack', tech)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Audit Scope</CardTitle>
            <CardDescription>Areas you want the audit to focus on</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {AUDIT_SCOPE_OPTIONS.map(scope => (
                <Button
                  key={scope}
                  type="button"
                  variant={formData.audit_scope.includes(scope) ? "default" : "outline"}
                  size="sm"
                  onClick={() => 
                    formData.audit_scope.includes(scope)
                      ? removeFromArray('audit_scope', scope)
                      : addToArray('audit_scope', scope)
                  }
                >
                  {scope}
                </Button>
              ))}
            </div>
            
            {formData.audit_scope.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.audit_scope.map(scope => (
                  <Badge key={scope} variant="secondary" className="flex items-center gap-1">
                    {scope}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeFromArray('audit_scope', scope)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Budget Range
              </CardTitle>
              <CardDescription>Expected budget for the audit</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={formData.budget_range} onValueChange={(value) => updateField('budget_range', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  {BUDGET_RANGES.map(budget => (
                    <SelectItem key={budget.value} value={budget.value}>
                      {budget.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Timeline
              </CardTitle>
              <CardDescription>When do you need the audit completed?</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={formData.timeline} onValueChange={(value) => updateField('timeline', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asap">ASAP (Rush job)</SelectItem>
                  <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                  <SelectItem value="2-4weeks">2-4 weeks</SelectItem>
                  <SelectItem value="1-2months">1-2 months</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Additional Requirements</CardTitle>
            <CardDescription>Any specific requirements or concerns</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Describe any specific requirements, concerns, or areas you want extra attention on..."
              value={formData.requirements}
              onChange={(e) => updateField('requirements', e.target.value)}
              rows={4}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Project Documentation
            </CardTitle>
            <CardDescription>Upload any relevant documents or specifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.md,.txt"
                onChange={handleFileUpload}
                className="hidden"
                id="doc-upload"
              />
              <label htmlFor="doc-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click to upload project documents
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, DOC, images, markdown files up to 10MB each
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

        <div className="flex justify-center">
          <Button
            type="submit"
            size="lg"
            disabled={!isValid || isSubmitting}
            className="px-8"
          >
            {isSubmitting ? 'Submitting Project...' : 'Submit for Review'}
          </Button>
        </div>
      </form>
    </div>
  );
};

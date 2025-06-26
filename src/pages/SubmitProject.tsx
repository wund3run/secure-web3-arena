
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Upload, FileText, Code, Shield, Clock, DollarSign } from 'lucide-react';

const SubmitProject = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectName: '',
    description: '',
    repositoryUrl: '',
    techStack: [] as string[],
    auditScope: [] as string[],
    timeline: '',
    budget: '',
    requirements: ''
  });

  const techStackOptions = [
    'Solidity', 'Rust', 'JavaScript', 'TypeScript', 'Python', 'Go', 'Move'
  ];

  const auditScopeOptions = [
    'Smart Contracts', 'Frontend Security', 'API Security', 'Infrastructure', 'Token Economics'
  ];

  const handleTechStackChange = (tech: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      techStack: checked 
        ? [...prev.techStack, tech]
        : prev.techStack.filter(t => t !== tech)
    }));
  };

  const handleAuditScopeChange = (scope: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      auditScope: checked 
        ? [...prev.auditScope, scope]
        : prev.auditScope.filter(s => s !== scope)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.projectName || !formData.description || !formData.repositoryUrl || 
        formData.auditScope.length === 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Project submitted successfully!');
      navigate('/project-dashboard');
    } catch (error) {
      toast.error('Failed to submit project. Please try again.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Submit Project | Hawkly</title>
        <meta name="description" content="Submit your Web3 project for security audit" />
      </Helmet>

      <StandardLayout title="Submit Your Project" description="Get your Web3 project audited by security experts">
        <div className="container max-w-4xl py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Submit Your Project for Audit</h1>
            <p className="text-muted-foreground">
              Provide details about your Web3 project and we'll match you with the best security auditors.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Project Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="projectName">Project Name *</Label>
                    <Input
                      id="projectName"
                      placeholder="Enter your project name"
                      value={formData.projectName}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="repositoryUrl">Repository URL *</Label>
                    <Input
                      id="repositoryUrl"
                      placeholder="https://github.com/yourproject"
                      value={formData.repositoryUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, repositoryUrl: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Project Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project, its purpose, and key features..."
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Technical Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Tech Stack</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                    {techStackOptions.map((tech) => (
                      <div key={tech} className="flex items-center space-x-2">
                        <Checkbox
                          id={tech}
                          checked={formData.techStack.includes(tech)}
                          onCheckedChange={(checked) => handleTechStackChange(tech, checked as boolean)}
                        />
                        <Label htmlFor={tech} className="text-sm">{tech}</Label>
                      </div>
                    ))}
                  </div>
                  {formData.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.techStack.map((tech) => (
                        <Badge key={tech} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <Label>Audit Scope *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    {auditScopeOptions.map((scope) => (
                      <div key={scope} className="flex items-center space-x-2">
                        <Checkbox
                          id={scope}
                          checked={formData.auditScope.includes(scope)}
                          onCheckedChange={(checked) => handleAuditScopeChange(scope, checked as boolean)}
                        />
                        <Label htmlFor={scope} className="text-sm">{scope}</Label>
                      </div>
                    ))}
                  </div>
                  {formData.auditScope.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.auditScope.map((scope) => (
                        <Badge key={scope} variant="outline">{scope}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Audit Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="timeline">Preferred Timeline</Label>
                    <Select value={formData.timeline} onValueChange={(value) => setFormData(prev => ({ ...prev, timeline: value }))}>
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
                  <div>
                    <Label htmlFor="budget">Budget Range</Label>
                    <Select value={formData.budget} onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="$5k-$10k">$5,000 - $10,000</SelectItem>
                        <SelectItem value="$10k-$25k">$10,000 - $25,000</SelectItem>
                        <SelectItem value="$25k-$50k">$25,000 - $50,000</SelectItem>
                        <SelectItem value="$50k+">$50,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="requirements">Additional Requirements</Label>
                  <Textarea
                    id="requirements"
                    placeholder="Any specific requirements, compliance needs, or areas of concern..."
                    value={formData.requirements}
                    onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value }))}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => navigate('/marketplace')}>
                Cancel
              </Button>
              <Button type="submit" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Submit Project
              </Button>
            </div>
          </form>
        </div>
      </StandardLayout>
    </>
  );
};

export default SubmitProject;

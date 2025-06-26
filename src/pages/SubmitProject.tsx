
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Upload, FileText, Shield, Clock, DollarSign, Users, ArrowRight, CheckCircle } from 'lucide-react';

interface ProjectFormData {
  projectName: string;
  projectDescription: string;
  blockchain: string;
  repositoryUrl: string;
  contractCount: string;
  linesOfCode: string;
  auditScope: string[];
  timeline: string;
  budget: string;
  urgency: string;
  previousAudits: boolean;
  specificRequirements: string;
  contactEmail: string;
}

const SubmitProject = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>({
    projectName: '',
    projectDescription: '',
    blockchain: '',
    repositoryUrl: '',
    contractCount: '',
    linesOfCode: '',
    auditScope: [],
    timeline: '',
    budget: '',
    urgency: 'normal',
    previousAudits: false,
    specificRequirements: '',
    contactEmail: '',
  });

  const handleInputChange = (field: keyof ProjectFormData, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleScopeChange = (scope: string, checked: boolean) => {
    const currentScope = Array.isArray(formData.auditScope) ? formData.auditScope : [];
    
    if (checked) {
      setFormData(prev => ({
        ...prev,
        auditScope: [...currentScope, scope]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        auditScope: currentScope.filter(s => s !== scope)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.projectName || !formData.projectDescription || !formData.blockchain) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Project submitted successfully! We\'ll match you with qualified auditors.');
      navigate('/project-dashboard');
    } catch (error) {
      toast.error('Failed to submit project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const auditScopeOptions = [
    'Smart Contract Logic',
    'Access Controls',
    'Token Economics',
    'Upgrade Mechanisms',
    'External Integrations',
    'Gas Optimization',
    'Documentation Review'
  ];

  const currentScope = Array.isArray(formData.auditScope) ? formData.auditScope : [];

  return (
    <>
      <Helmet>
        <title>Submit Project for Audit | Hawkly</title>
        <meta name="description" content="Submit your Web3 project for professional security audit" />
      </Helmet>

      <StandardLayout title="Submit Project" description="Get your Web3 project audited by security experts">
        <div className="container max-w-4xl py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Project Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="projectName">Project Name *</Label>
                        <Input
                          id="projectName"
                          placeholder="Enter your project name"
                          value={formData.projectName}
                          onChange={(e) => handleInputChange('projectName', e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="projectDescription">Project Description *</Label>
                        <Textarea
                          id="projectDescription"
                          placeholder="Describe your project, its purpose, and key features"
                          rows={4}
                          value={formData.projectDescription}
                          onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="blockchain">Blockchain *</Label>
                          <Select value={formData.blockchain} onValueChange={(value) => handleInputChange('blockchain', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select blockchain" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ethereum">Ethereum</SelectItem>
                              <SelectItem value="polygon">Polygon</SelectItem>
                              <SelectItem value="bsc">Binance Smart Chain</SelectItem>
                              <SelectItem value="arbitrum">Arbitrum</SelectItem>
                              <SelectItem value="optimism">Optimism</SelectItem>
                              <SelectItem value="solana">Solana</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="contractCount">Number of Contracts</Label>
                          <Select value={formData.contractCount} onValueChange={(value) => handleInputChange('contractCount', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-5">1-5 contracts</SelectItem>
                              <SelectItem value="6-10">6-10 contracts</SelectItem>
                              <SelectItem value="11-20">11-20 contracts</SelectItem>
                              <SelectItem value="20+">20+ contracts</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="repositoryUrl">Repository URL</Label>
                        <Input
                          id="repositoryUrl"
                          placeholder="https://github.com/your-org/project"
                          value={formData.repositoryUrl}
                          onChange={(e) => handleInputChange('repositoryUrl', e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Audit Scope */}
                    <div className="space-y-4">
                      <Label>Audit Scope</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {auditScopeOptions.map((scope) => (
                          <div key={scope} className="flex items-center space-x-2">
                            <Checkbox
                              id={scope}
                              checked={currentScope.includes(scope)}
                              onCheckedChange={(checked) => handleScopeChange(scope, checked === true)}
                            />
                            <Label htmlFor={scope} className="text-sm">{scope}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Timeline & Budget */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="timeline">Preferred Timeline</Label>
                        <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timeline" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
                            <SelectItem value="3-4weeks">3-4 weeks</SelectItem>
                            <SelectItem value="1-2months">1-2 months</SelectItem>
                            <SelectItem value="flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="budget">Budget Range</Label>
                        <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                            <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                            <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                            <SelectItem value="50k+">$50,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="specificRequirements">Specific Requirements</Label>
                        <Textarea
                          id="specificRequirements"
                          placeholder="Any specific requirements, concerns, or areas of focus"
                          rows={3}
                          value={formData.specificRequirements}
                          onChange={(e) => handleInputChange('specificRequirements', e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="contactEmail">Contact Email</Label>
                        <Input
                          id="contactEmail"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.contactEmail}
                          onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="previousAudits"
                          checked={formData.previousAudits}
                          onCheckedChange={(checked) => handleInputChange('previousAudits', checked === true)}
                        />
                        <Label htmlFor="previousAudits" className="text-sm">
                          This project has had previous security audits
                        </Label>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Shield className="mr-2 h-4 w-4 animate-spin" />
                          Submitting Project...
                        </>
                      ) : (
                        <>
                          Submit Project
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What Happens Next?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">AI Matching</h4>
                      <p className="text-sm text-muted-foreground">
                        Our AI will match you with qualified auditors based on your project requirements.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Auditor Selection</h4>
                      <p className="text-sm text-muted-foreground">
                        Review auditor profiles and select the best fit for your project.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-purple-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Secure Audit</h4>
                      <p className="text-sm text-muted-foreground">
                        Professional audit with detailed security report and recommendations.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Audit Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="h-4 w-4 text-green-500" />
                    <span>Comprehensive security report</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <span>Vulnerability identification</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <span>Fast turnaround time</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-purple-500" />
                    <span>Transparent pricing</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </StandardLayout>
    </>
  );
};

export default SubmitProject;

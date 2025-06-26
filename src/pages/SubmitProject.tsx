
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Upload, X, Plus, FileText, Code, Calendar, DollarSign } from 'lucide-react';
import { useAuth } from '@/contexts/auth';

const SubmitProject = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    repositoryUrl: '',
    techStack: [] as string[],
    blockchain: '',
    projectType: '',
    auditScope: [] as string[],
    timeline: '',
    budget: '',
    previousAudits: false,
    previousAuditLinks: '',
    requirements: '',
    preferredAuditorSkills: [] as string[],
    urgency: 'normal'
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const blockchains = ['Ethereum', 'Solana', 'Polygon', 'Binance Smart Chain', 'Avalanche', 'Arbitrum', 'Optimism', 'Other'];
  const projectTypes = ['DeFi Protocol', 'NFT Marketplace', 'Gaming Platform', 'DAO', 'Token Contract', 'Bridge', 'Other'];
  const auditScopes = ['Smart Contract Security', 'Architecture Review', 'Gas Optimization', 'Vulnerability Assessment', 'Compliance Check'];
  const techStacks = ['Solidity', 'Rust', 'JavaScript', 'TypeScript', 'Python', 'Go', 'Move'];
  const auditorSkills = ['Smart Contract Security', 'DeFi Protocols', 'NFT Standards', 'Gas Optimization', 'Formal Verification'];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].includes(value)
        ? (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
        : [...(prev[field as keyof typeof prev] as string[]), value]
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to submit a project');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Project submitted successfully!', {
        description: 'Your project will be reviewed and published to the marketplace.'
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to submit project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  if (!user) {
    return (
      <StandardLayout title="Submit Project | Hawkly" description="Submit your project for security audit">
        <div className="container max-w-md py-12">
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4">Authentication Required</h3>
              <p className="text-gray-600 mb-6">
                Please sign in to submit your project for audit.
              </p>
              <Button asChild>
                <a href="/auth">Sign In</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </StandardLayout>
    );
  }

  return (
    <>
      <Helmet>
        <title>Submit Project | Hawkly</title>
        <meta name="description" content="Submit your project for professional security audit" />
      </Helmet>

      <StandardLayout title="Submit Project" description="Get your project audited by security experts">
        <div className="container max-w-4xl py-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((stepNum) => (
              <React.Fragment key={stepNum}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= stepNum ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step > stepNum ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {step === 1 && <><Code className="h-5 w-5" />Project Details</>}
                {step === 2 && <><FileText className="h-5 w-5" />Requirements & Scope</>}
                {step === 3 && <><Calendar className="h-5 w-5" />Timeline & Budget</>}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="projectName">Project Name *</Label>
                      <Input
                        id="projectName"
                        value={formData.projectName}
                        onChange={(e) => handleInputChange('projectName', e.target.value)}
                        placeholder="Enter your project name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="projectDescription">Project Description *</Label>
                      <Textarea
                        id="projectDescription"
                        value={formData.projectDescription}
                        onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                        placeholder="Describe your project, its purpose, and key features"
                        rows={4}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="repositoryUrl">Repository URL</Label>
                      <Input
                        id="repositoryUrl"
                        value={formData.repositoryUrl}
                        onChange={(e) => handleInputChange('repositoryUrl', e.target.value)}
                        placeholder="https://github.com/your-username/your-project"
                      />
                    </div>

                    <div>
                      <Label>Blockchain *</Label>
                      <Select value={formData.blockchain} onValueChange={(value) => handleInputChange('blockchain', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select blockchain" />
                        </SelectTrigger>
                        <SelectContent>
                          {blockchains.map(blockchain => (
                            <SelectItem key={blockchain} value={blockchain}>{blockchain}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Project Type *</Label>
                      <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Tech Stack</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                        {techStacks.map(tech => (
                          <div key={tech} className="flex items-center space-x-2">
                            <Checkbox
                              id={tech}
                              checked={formData.techStack.includes(tech)}
                              onCheckedChange={() => handleArrayToggle('techStack', tech)}
                            />
                            <Label htmlFor={tech} className="text-sm">{tech}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <Label>Audit Scope *</Label>
                      <div className="space-y-2 mt-2">
                        {auditScopes.map(scope => (
                          <div key={scope} className="flex items-center space-x-2">
                            <Checkbox
                              id={scope}
                              checked={formData.auditScope.includes(scope)}
                              onCheckedChange={() => handleArrayToggle('auditScope', scope)}
                            />
                            <Label htmlFor={scope} className="text-sm">{scope}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="requirements">Specific Requirements</Label>
                      <Textarea
                        id="requirements"
                        value={formData.requirements}
                        onChange={(e) => handleInputChange('requirements', e.target.value)}
                        placeholder="Any specific requirements, concerns, or areas of focus for the audit"
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label>Preferred Auditor Skills</Label>
                      <div className="space-y-2 mt-2">
                        {auditorSkills.map(skill => (
                          <div key={skill} className="flex items-center space-x-2">
                            <Checkbox
                              id={skill}
                              checked={formData.preferredAuditorSkills.includes(skill)}
                              onCheckedChange={() => handleArrayToggle('preferredAuditorSkills', skill)}
                            />
                            <Label htmlFor={skill} className="text-sm">{skill}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="fileUpload">Supporting Documents</Label>
                      <div className="mt-2">
                        <input
                          type="file"
                          id="fileUpload"
                          multiple
                          accept=".pdf,.doc,.docx,.txt,.md"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('fileUpload')?.click()}
                          className="w-full"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Documents
                        </Button>
                        {uploadedFiles.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {uploadedFiles.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                                <span className="text-sm">{file.name}</span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(index)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="previousAudits"
                        checked={formData.previousAudits}
                        onCheckedChange={(checked) => handleInputChange('previousAudits', checked)}
                      />
                      <Label htmlFor="previousAudits">This project has been audited before</Label>
                    </div>

                    {formData.previousAudits && (
                      <div>
                        <Label htmlFor="previousAuditLinks">Previous Audit Links</Label>
                        <Textarea
                          id="previousAuditLinks"
                          value={formData.previousAuditLinks}
                          onChange={(e) => handleInputChange('previousAuditLinks', e.target.value)}
                          placeholder="Links to previous audit reports"
                          rows={3}
                        />
                      </div>
                    )}
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <Label>Timeline *</Label>
                      <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-week">1 Week</SelectItem>
                          <SelectItem value="2-weeks">2 Weeks</SelectItem>
                          <SelectItem value="1-month">1 Month</SelectItem>
                          <SelectItem value="2-months">2 Months</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Budget Range *</Label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-5k">Under $5,000</SelectItem>
                          <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                          <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                          <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                          <SelectItem value="50k-plus">$50,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Urgency Level</Label>
                      <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - Standard timeline</SelectItem>
                          <SelectItem value="normal">Normal - Preferred timeline</SelectItem>
                          <SelectItem value="high">High - Rush job</SelectItem>
                          <SelectItem value="urgent">Urgent - ASAP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Summary */}
                    <div className="border rounded-lg p-4 bg-muted/50">
                      <h3 className="font-semibold mb-3">Project Summary</h3>
                      <div className="space-y-2 text-sm">
                        <p><strong>Project:</strong> {formData.projectName}</p>
                        <p><strong>Blockchain:</strong> {formData.blockchain}</p>
                        <p><strong>Type:</strong> {formData.projectType}</p>
                        <p><strong>Timeline:</strong> {formData.timeline}</p>
                        <p><strong>Budget:</strong> {formData.budget}</p>
                        {formData.auditScope.length > 0 && (
                          <div>
                            <strong>Audit Scope:</strong>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {formData.auditScope.map(scope => (
                                <Badge key={scope} variant="outline" className="text-xs">
                                  {scope}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-6">
                  {step > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Previous
                    </Button>
                  )}
                  
                  <div className="ml-auto">
                    {step < 3 ? (
                      <Button type="button" onClick={nextStep}>
                        Next
                      </Button>
                    ) : (
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Project'}
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </StandardLayout>
    </>
  );
};

export default SubmitProject;

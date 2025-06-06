
import React, { useState } from 'react';
import { StandardizedLayout } from '@/components/layout/StandardizedLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Shield, Clock, DollarSign, FileText, Calendar, AlertTriangle } from 'lucide-react';

const EnhancedRequestAudit = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    blockchain: '',
    repositoryUrl: '',
    contractCount: '',
    linesOfCode: '',
    deadline: '',
    budget: '',
    auditScope: '',
    previousAudits: false,
    specificConcerns: '',
    urgencyLevel: 'normal',
    communicationPreference: 'email'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const blockchains = [
    'Ethereum', 'Binance Smart Chain', 'Polygon', 'Avalanche', 
    'Fantom', 'Arbitrum', 'Optimism', 'Solana', 'Other'
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low - Standard timeline', color: 'bg-green-100 text-green-800' },
    { value: 'normal', label: 'Normal - 2-3 weeks', color: 'bg-blue-100 text-blue-800' },
    { value: 'high', label: 'High - 1-2 weeks', color: 'bg-orange-100 text-orange-800' },
    { value: 'critical', label: 'Critical - < 1 week', color: 'bg-red-100 text-red-800' }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.projectName && formData.projectDescription && formData.blockchain);
      case 2:
        return !!(formData.contractCount && formData.auditScope);
      case 3:
        return !!(formData.deadline && formData.budget);
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    } else {
      toast.error('Please fill in all required fields for this step');
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) {
      toast.error('Please complete all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Audit request submitted successfully! We\'ll match you with suitable auditors within 24 hours.');
      // Reset form or redirect
    } catch (error) {
      toast.error('Failed to submit audit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
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
              <Label htmlFor="blockchain">Blockchain *</Label>
              <Select value={formData.blockchain} onValueChange={(value) => handleInputChange('blockchain', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select blockchain" />
                </SelectTrigger>
                <SelectContent>
                  {blockchains.map((blockchain) => (
                    <SelectItem key={blockchain} value={blockchain}>
                      {blockchain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="repositoryUrl">Repository URL</Label>
              <Input
                id="repositoryUrl"
                value={formData.repositoryUrl}
                onChange={(e) => handleInputChange('repositoryUrl', e.target.value)}
                placeholder="https://github.com/your-repo"
                type="url"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contractCount">Number of Contracts *</Label>
                <Input
                  id="contractCount"
                  value={formData.contractCount}
                  onChange={(e) => handleInputChange('contractCount', e.target.value)}
                  placeholder="e.g., 5"
                  type="number"
                  min="1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="linesOfCode">Estimated Lines of Code</Label>
                <Input
                  id="linesOfCode"
                  value={formData.linesOfCode}
                  onChange={(e) => handleInputChange('linesOfCode', e.target.value)}
                  placeholder="e.g., 1000"
                  type="number"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="auditScope">Audit Scope *</Label>
              <Textarea
                id="auditScope"
                value={formData.auditScope}
                onChange={(e) => handleInputChange('auditScope', e.target.value)}
                placeholder="Describe what should be included in the audit (e.g., smart contracts, architecture review, gas optimization)"
                rows={3}
                required
              />
            </div>
            <div>
              <Label htmlFor="specificConcerns">Specific Security Concerns</Label>
              <Textarea
                id="specificConcerns"
                value={formData.specificConcerns}
                onChange={(e) => handleInputChange('specificConcerns', e.target.value)}
                placeholder="Any specific vulnerabilities or areas of concern you'd like the auditor to focus on"
                rows={3}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="previousAudits"
                checked={formData.previousAudits}
                onCheckedChange={(checked) => handleInputChange('previousAudits', checked)}
              />
              <Label htmlFor="previousAudits" className="text-sm">
                This project has undergone previous security audits
              </Label>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="deadline">Preferred Deadline *</Label>
                <Input
                  id="deadline"
                  value={formData.deadline}
                  onChange={(e) => handleInputChange('deadline', e.target.value)}
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div>
                <Label htmlFor="budget">Budget (USD) *</Label>
                <Input
                  id="budget"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  placeholder="e.g., 10000"
                  type="number"
                  min="1000"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="urgencyLevel">Urgency Level</Label>
              <Select value={formData.urgencyLevel} onValueChange={(value) => handleInputChange('urgencyLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency level" />
                </SelectTrigger>
                <SelectContent>
                  {urgencyLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      <div className="flex items-center space-x-2">
                        <Badge className={level.color}>{level.label}</Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="communicationPreference">Communication Preference</Label>
              <Select value={formData.communicationPreference} onValueChange={(value) => handleInputChange('communicationPreference', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select communication method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="discord">Discord</SelectItem>
                  <SelectItem value="telegram">Telegram</SelectItem>
                  <SelectItem value="slack">Slack</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Review Your Request</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Name:</strong> {formData.projectName}</p>
                  <p><strong>Blockchain:</strong> {formData.blockchain}</p>
                  <p><strong>Contracts:</strong> {formData.contractCount}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Budget & Timeline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Budget:</strong> ${formData.budget}</p>
                  <p><strong>Deadline:</strong> {formData.deadline}</p>
                  <p><strong>Urgency:</strong> {urgencyLevels.find(l => l.value === formData.urgencyLevel)?.label}</p>
                </CardContent>
              </Card>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• Our AI will match you with suitable auditors within 24 hours</li>
                <li>• You'll receive proposals from qualified security experts</li>
                <li>• Review auditor profiles, ratings, and proposals</li>
                <li>• Select your preferred auditor and begin the audit process</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <StandardizedLayout
      title="Request Security Audit | Hawkly"
      description="Request a comprehensive security audit for your Web3 project"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Request Security Audit</h1>
            <p className="text-muted-foreground">
              Get your Web3 project audited by verified security experts
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`h-1 w-16 mx-2 ${
                      step < currentStep ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Project Info</span>
              <span>Scope & Details</span>
              <span>Budget & Timeline</span>
              <span>Review</span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Step {currentStep} of 4
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Tell us about your project"}
                {currentStep === 2 && "Define the audit scope and requirements"}
                {currentStep === 3 && "Set your budget and timeline"}
                {currentStep === 4 && "Review and submit your request"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                {renderStep()}
                
                <div className="flex justify-between mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>
                  
                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={!validateStep(currentStep)}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </StandardizedLayout>
  );
};

export default EnhancedRequestAudit;

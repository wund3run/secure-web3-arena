
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, FileText, Shield, Clock, DollarSign, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const RequestAudit = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectName: '',
    projectDescription: '',
    blockchain: '',
    projectType: '',
    repositoryUrl: '',
    contractCount: '',
    linesOfCode: '',
    deadline: null as Date | null,
    budget: '',
    auditScope: [] as string[],
    previousAudits: '',
    specificConcerns: '',
    contactEmail: '',
    urgency: 'normal'
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleScopeChange = (scope: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      auditScope: checked 
        ? [...prev.auditScope, scope]
        : prev.auditScope.filter(s => s !== scope)
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitRequest = () => {
    // Here you would submit to your backend
    toast.success('Audit request submitted successfully!');
    console.log('Form data:', formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Project Information</h3>
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
                    <Label htmlFor="projectType">Project Type *</Label>
                    <Select value={formData.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="defi">DeFi Protocol</SelectItem>
                        <SelectItem value="nft">NFT Project</SelectItem>
                        <SelectItem value="gaming">Gaming/GameFi</SelectItem>
                        <SelectItem value="dao">DAO</SelectItem>
                        <SelectItem value="bridge">Cross-chain Bridge</SelectItem>
                        <SelectItem value="token">Token/Coin</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
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
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Technical Details</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contractCount">Number of Contracts</Label>
                    <Input
                      id="contractCount"
                      type="number"
                      placeholder="e.g., 5"
                      value={formData.contractCount}
                      onChange={(e) => handleInputChange('contractCount', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="linesOfCode">Estimated Lines of Code</Label>
                    <Input
                      id="linesOfCode"
                      type="number"
                      placeholder="e.g., 1500"
                      value={formData.linesOfCode}
                      onChange={(e) => handleInputChange('linesOfCode', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Audit Scope *</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {[
                      'Smart Contract Review',
                      'Gas Optimization',
                      'Business Logic Review',
                      'Access Control Review',
                      'Reentrancy Analysis',
                      'Front-running Analysis',
                      'Integration Testing',
                      'Documentation Review'
                    ].map(scope => (
                      <div key={scope} className="flex items-center space-x-2">
                        <Checkbox
                          id={scope}
                          checked={formData.auditScope.includes(scope)}
                          onCheckedChange={(checked) => handleScopeChange(scope, checked as boolean)}
                        />
                        <Label htmlFor={scope} className="text-sm">{scope}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="previousAudits">Previous Audits</Label>
                  <RadioGroup 
                    value={formData.previousAudits} 
                    onValueChange={(value) => handleInputChange('previousAudits', value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="none" id="none" />
                      <Label htmlFor="none">No previous audits</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="internal" id="internal" />
                      <Label htmlFor="internal">Internal review only</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="external" id="external" />
                      <Label htmlFor="external">Previous external audit</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="specificConcerns">Specific Security Concerns</Label>
                  <Textarea
                    id="specificConcerns"
                    placeholder="Any specific vulnerabilities or areas you're concerned about..."
                    rows={3}
                    value={formData.specificConcerns}
                    onChange={(e) => handleInputChange('specificConcerns', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Timeline & Budget</h3>
              <div className="space-y-4">
                <div>
                  <Label>Preferred Deadline</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.deadline && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.deadline ? format(formData.deadline, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.deadline}
                        onSelect={(date) => handleInputChange('deadline', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label>Budget Range</Label>
                  <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                      <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                      <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                      <SelectItem value="50k+">$50,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Urgency Level</Label>
                  <RadioGroup 
                    value={formData.urgency} 
                    onValueChange={(value) => handleInputChange('urgency', value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="normal" id="normal" />
                      <Label htmlFor="normal">Normal (2-4 weeks)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="urgent" id="urgent" />
                      <Label htmlFor="urgent">Urgent (1-2 weeks)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="critical" id="critical" />
                      <Label htmlFor="critical">Critical (Rush - 1 week)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="contactEmail">Contact Email *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="your-email@example.com"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Review Your Request</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <div>
                    <span className="font-medium">Project:</span> {formData.projectName}
                  </div>
                  <div>
                    <span className="font-medium">Blockchain:</span> {formData.blockchain}
                  </div>
                  <div>
                    <span className="font-medium">Type:</span> {formData.projectType}
                  </div>
                  <div>
                    <span className="font-medium">Scope:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {formData.auditScope.map(scope => (
                        <Badge key={scope} variant="secondary" className="text-xs">
                          {scope}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Budget:</span> {formData.budget}
                  </div>
                  <div>
                    <span className="font-medium">Deadline:</span> {formData.deadline ? format(formData.deadline, "PPP") : "Not specified"}
                  </div>
                  <div>
                    <span className="font-medium">Urgency:</span> {formData.urgency}
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• We'll review your request within 24 hours</li>
                    <li>• You'll receive matched auditor recommendations</li>
                    <li>• You can review profiles and select your preferred auditor</li>
                    <li>• The audit begins once terms are agreed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Request Security Audit | Hawkly</title>
        <meta name="description" content="Submit your Web3 project for professional security audit" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Request Security Audit
              </h1>
              <p className="text-gray-600">
                Get your Web3 project audited by expert security professionals
              </p>
            </div>

            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
                <span className="text-sm text-gray-500">{Math.round(progress)}% complete</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>

            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {currentStep === 1 && "Project Information"}
                  {currentStep === 2 && "Technical Details"}
                  {currentStep === 3 && "Timeline & Budget"}
                  {currentStep === 4 && "Review & Submit"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderStep()}

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  {currentStep < totalSteps ? (
                    <Button onClick={nextStep}>
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button onClick={submitRequest}>
                      Submit Request
                      <FileText className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestAudit;

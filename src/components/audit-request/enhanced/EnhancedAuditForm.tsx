
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { auditFormValidationSchema, validateForm, validateField } from '../validation/FormValidation';
import { useAuth } from '@/contexts/auth';

interface FormData {
  projectName: string;
  projectDescription: string;
  blockchain: string;
  customBlockchain: string;
  repositoryUrl: string;
  contractCount: string;
  linesOfCode: string;
  deadline: string;
  budget: string;
  auditScope: string;
  specificConcerns: string;
  contactEmail: string;
  contactName: string;
  previousAudits: boolean;
  [key: string]: unknown;
}

interface EnhancedAuditFormProps {
  onSubmitSuccess: () => void;
}

export function EnhancedAuditForm({ onSubmitSuccess }: EnhancedAuditFormProps) {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    projectDescription: '',
    blockchain: '',
    customBlockchain: '',
    repositoryUrl: '',
    contractCount: '',
    linesOfCode: '',
    deadline: '',
    budget: '',
    auditScope: '',
    specificConcerns: '',
    contactEmail: user?.email || '',
    contactName: '',
    previousAudits: false
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleFieldChange = useCallback((fieldName: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    
    // Real-time validation for touched fields
    if (touchedFields.has(fieldName)) {
      const error = validateField(fieldName, value, auditFormValidationSchema);
      setErrors(prev => ({
        ...prev,
        [fieldName]: error || ''
      }));
    }
  }, [touchedFields]);

  const handleFieldBlur = useCallback((fieldName: string) => {
    setTouchedFields(prev => new Set([...prev, fieldName]));
    const error = validateField(fieldName, formData[fieldName], auditFormValidationSchema);
    setErrors(prev => ({
      ...prev,
      [fieldName]: error || ''
    }));
  }, [formData]);

  const validateCurrentStep = (): boolean => {
    const stepFields = getStepFields(currentStep);
    const stepValidation = Object.fromEntries(
      stepFields.map(field => [field, auditFormValidationSchema[field]])
    );
    
    const stepErrors = validateForm(formData, stepValidation);
    setErrors(prev => ({ ...prev, ...stepErrors }));
    
    return Object.keys(stepErrors).length === 0;
  };

  const getStepFields = (step: number): string[] => {
    switch (step) {
      case 1:
        return ['projectName', 'projectDescription', 'blockchain'];
      case 2:
        return ['contractCount', 'linesOfCode', 'repositoryUrl'];
      case 3:
        return ['deadline', 'budget', 'auditScope'];
      case 4:
        return ['contactName', 'contactEmail'];
      default:
        return [];
    }
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
      toast.success('Step completed successfully');
    } else {
      toast.error('Please fix the errors before proceeding');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    const formErrors = validateForm(formData, auditFormValidationSchema);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      toast.error('Please fix all errors before submitting');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Audit request submitted successfully!');
      onSubmitSuccess();
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
                onChange={(e) => handleFieldChange('projectName', e.target.value)}
                onBlur={() => handleFieldBlur('projectName')}
                className={errors.projectName ? 'border-red-500' : ''}
              />
              {errors.projectName && (
                <p className="text-sm text-red-500 mt-1">{errors.projectName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="projectDescription">Project Description *</Label>
              <Textarea
                id="projectDescription"
                rows={4}
                value={formData.projectDescription}
                onChange={(e) => handleFieldChange('projectDescription', e.target.value)}
                onBlur={() => handleFieldBlur('projectDescription')}
                className={errors.projectDescription ? 'border-red-500' : ''}
              />
              {errors.projectDescription && (
                <p className="text-sm text-red-500 mt-1">{errors.projectDescription}</p>
              )}
            </div>

            <div>
              <Label htmlFor="blockchain">Blockchain *</Label>
              <Select value={formData.blockchain} onValueChange={(value) => handleFieldChange('blockchain', value)}>
                <SelectTrigger className={errors.blockchain ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select blockchain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ethereum">Ethereum</SelectItem>
                  <SelectItem value="Solana">Solana</SelectItem>
                  <SelectItem value="Polygon">Polygon</SelectItem>
                  <SelectItem value="Binance Smart Chain">Binance Smart Chain</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.blockchain && (
                <p className="text-sm text-red-500 mt-1">{errors.blockchain}</p>
              )}
            </div>

            {formData.blockchain === 'Other' && (
              <div>
                <Label htmlFor="customBlockchain">Custom Blockchain</Label>
                <Input
                  id="customBlockchain"
                  value={formData.customBlockchain}
                  onChange={(e) => handleFieldChange('customBlockchain', e.target.value)}
                  onBlur={() => handleFieldBlur('customBlockchain')}
                  className={errors.customBlockchain ? 'border-red-500' : ''}
                />
                {errors.customBlockchain && (
                  <p className="text-sm text-red-500 mt-1">{errors.customBlockchain}</p>
                )}
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="contractCount">Number of Contracts *</Label>
              <Select value={formData.contractCount} onValueChange={(value) => handleFieldChange('contractCount', value)}>
                <SelectTrigger className={errors.contractCount ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-5">1-5 contracts</SelectItem>
                  <SelectItem value="6-10">6-10 contracts</SelectItem>
                  <SelectItem value="11-20">11-20 contracts</SelectItem>
                  <SelectItem value="20+">20+ contracts</SelectItem>
                </SelectContent>
              </Select>
              {errors.contractCount && (
                <p className="text-sm text-red-500 mt-1">{errors.contractCount}</p>
              )}
            </div>

            <div>
              <Label htmlFor="linesOfCode">Lines of Code *</Label>
              <Select value={formData.linesOfCode} onValueChange={(value) => handleFieldChange('linesOfCode', value)}>
                <SelectTrigger className={errors.linesOfCode ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="< 1,000">Less than 1,000</SelectItem>
                  <SelectItem value="1,000 - 5,000">1,000 - 5,000</SelectItem>
                  <SelectItem value="5,000 - 10,000">5,000 - 10,000</SelectItem>
                  <SelectItem value="10,000+">10,000+</SelectItem>
                </SelectContent>
              </Select>
              {errors.linesOfCode && (
                <p className="text-sm text-red-500 mt-1">{errors.linesOfCode}</p>
              )}
            </div>

            <div>
              <Label htmlFor="repositoryUrl">Repository URL</Label>
              <Input
                id="repositoryUrl"
                type="url"
                placeholder="https://github.com/yourproject/repo"
                value={formData.repositoryUrl}
                onChange={(e) => handleFieldChange('repositoryUrl', e.target.value)}
                onBlur={() => handleFieldBlur('repositoryUrl')}
                className={errors.repositoryUrl ? 'border-red-500' : ''}
              />
              {errors.repositoryUrl && (
                <p className="text-sm text-red-500 mt-1">{errors.repositoryUrl}</p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="deadline">Deadline *</Label>
              <Select value={formData.deadline} onValueChange={(value) => handleFieldChange('deadline', value)}>
                <SelectTrigger className={errors.deadline ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2 weeks">1-2 weeks</SelectItem>
                  <SelectItem value="2-4 weeks">2-4 weeks</SelectItem>
                  <SelectItem value="1-2 months">1-2 months</SelectItem>
                  <SelectItem value="Flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
              {errors.deadline && (
                <p className="text-sm text-red-500 mt-1">{errors.deadline}</p>
              )}
            </div>

            <div>
              <Label htmlFor="budget">Budget *</Label>
              <Select value={formData.budget} onValueChange={(value) => handleFieldChange('budget', value)}>
                <SelectTrigger className={errors.budget ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="$5,000 - $10,000">$5,000 - $10,000</SelectItem>
                  <SelectItem value="$10,000 - $25,000">$10,000 - $25,000</SelectItem>
                  <SelectItem value="$25,000 - $50,000">$25,000 - $50,000</SelectItem>
                  <SelectItem value="$50,000+">$50,000+</SelectItem>
                </SelectContent>
              </Select>
              {errors.budget && (
                <p className="text-sm text-red-500 mt-1">{errors.budget}</p>
              )}
            </div>

            <div>
              <Label htmlFor="auditScope">Audit Scope</Label>
              <Textarea
                id="auditScope"
                rows={3}
                placeholder="Describe what should be included in the audit..."
                value={formData.auditScope}
                onChange={(e) => handleFieldChange('auditScope', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="specificConcerns">Specific Security Concerns</Label>
              <Textarea
                id="specificConcerns"
                rows={3}
                placeholder="Any specific areas of concern or previous issues..."
                value={formData.specificConcerns}
                onChange={(e) => handleFieldChange('specificConcerns', e.target.value)}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="contactName">Contact Name *</Label>
              <Input
                id="contactName"
                value={formData.contactName}
                onChange={(e) => handleFieldChange('contactName', e.target.value)}
                onBlur={() => handleFieldBlur('contactName')}
                className={errors.contactName ? 'border-red-500' : ''}
              />
              {errors.contactName && (
                <p className="text-sm text-red-500 mt-1">{errors.contactName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="contactEmail">Contact Email *</Label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => handleFieldChange('contactEmail', e.target.value)}
                onBlur={() => handleFieldBlur('contactEmail')}
                className={errors.contactEmail ? 'border-red-500' : ''}
              />
              {errors.contactEmail && (
                <p className="text-sm text-red-500 mt-1">{errors.contactEmail}</p>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-3">Review Your Request</h4>
              <div className="space-y-2 text-sm">
                <div><strong>Project:</strong> {formData.projectName}</div>
                <div><strong>Blockchain:</strong> {formData.blockchain}</div>
                <div><strong>Timeline:</strong> {formData.deadline}</div>
                <div><strong>Budget:</strong> {formData.budget}</div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Request Security Audit</CardTitle>
        <div className="space-y-2">
          <Progress value={progress} />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {renderStep()}
          
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep < totalSteps ? (
              <Button onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Request'
                )}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

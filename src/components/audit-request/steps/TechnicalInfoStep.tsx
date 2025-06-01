
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { FileCode, Settings, Shield } from 'lucide-react';
import type { AuditFormData, AuditFormErrors } from '@/types/audit-request.types';

interface TechnicalInfoStepProps {
  formData: AuditFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (field: keyof AuditFormData, value: string) => void;
  handleCheckboxChange: (field: keyof AuditFormData, checked: boolean) => void;
  prevStep: () => void;
  nextStep: () => void;
  formErrors: AuditFormErrors;
}

const contractCountOptions = [
  "1-5", "6-10", "11-20", "21-50", "50+"
];

const linesOfCodeOptions = [
  "< 1,000", "1,000 - 5,000", "5,000 - 10,000", "10,000 - 25,000", "25,000+"
];

const auditTypeOptions = [
  { value: "Standard", label: "Standard Audit", description: "Comprehensive security review" },
  { value: "Express", label: "Express Audit", description: "Fast-track security assessment" },
  { value: "Comprehensive", label: "Comprehensive Audit", description: "In-depth analysis with formal verification" },
  { value: "Continuous", label: "Continuous Monitoring", description: "Ongoing security monitoring" }
];

export const TechnicalInfoStep: React.FC<TechnicalInfoStepProps> = ({
  formData,
  handleChange,
  handleSelectChange,
  handleCheckboxChange,
  prevStep,
  nextStep,
  formErrors
}) => {
  const isValid = formData.contractCount && formData.linesOfCode;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Technical Information</h2>
        <p className="text-muted-foreground">
          Help us understand the scope and complexity of your project
        </p>
      </div>

      <div className="grid gap-6">
        {/* Project Scale */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCode className="h-5 w-5" />
              Project Scale
            </CardTitle>
            <CardDescription>
              Provide details about the size and complexity of your codebase
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contractCount">Number of Smart Contracts *</Label>
                <Select 
                  value={formData.contractCount} 
                  onValueChange={(value) => handleSelectChange('contractCount', value)}
                >
                  <SelectTrigger className={formErrors.contractCount ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select contract count" />
                  </SelectTrigger>
                  <SelectContent>
                    {contractCountOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option} contracts
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formErrors.contractCount && (
                  <p className="text-sm text-destructive">{formErrors.contractCount}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="linesOfCode">Lines of Code (Estimate) *</Label>
                <Select 
                  value={formData.linesOfCode} 
                  onValueChange={(value) => handleSelectChange('linesOfCode', value)}
                >
                  <SelectTrigger className={formErrors.linesOfCode ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select LOC range" />
                  </SelectTrigger>
                  <SelectContent>
                    {linesOfCodeOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option} lines
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formErrors.linesOfCode && (
                  <p className="text-sm text-destructive">{formErrors.linesOfCode}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="auditScope">Audit Scope & Focus Areas</Label>
              <Textarea
                id="auditScope"
                name="auditScope"
                placeholder="Describe specific areas you want audited (e.g., token economics, access controls, upgrade mechanisms, external integrations)..."
                rows={3}
                value={formData.auditScope}
                onChange={handleChange}
              />
            </div>
          </CardContent>
        </Card>

        {/* Audit Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Audit Type
            </CardTitle>
            <CardDescription>
              Choose the type of security audit that best fits your needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {auditTypeOptions.map((type) => (
                <div
                  key={type.value}
                  className={`
                    p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md
                    ${formData.specializedAuditType === type.value 
                      ? 'border-primary bg-primary/5 shadow-sm' 
                      : 'border-border hover:border-primary/50'
                    }
                  `}
                  onClick={() => handleSelectChange('specializedAuditType', type.value)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{type.label}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {type.description}
                      </div>
                    </div>
                    {formData.specializedAuditType === type.value && (
                      <Badge variant="default">Selected</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Audit Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Enhanced Options
            </CardTitle>
            <CardDescription>
              Additional services to enhance your audit experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="collaborativeAudit"
                  checked={formData.collaborativeAudit || false}
                  onCheckedChange={(checked) => handleCheckboxChange('collaborativeAudit', checked as boolean)}
                />
                <Label htmlFor="collaborativeAudit" className="text-sm font-medium">
                  Collaborative Audit Process
                </Label>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                Work closely with auditors during the review process
              </p>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="continuousAuditing"
                  checked={formData.continuousAuditing || false}
                  onCheckedChange={(checked) => handleCheckboxChange('continuousAuditing', checked as boolean)}
                />
                <Label htmlFor="continuousAuditing" className="text-sm font-medium">
                  Continuous Monitoring
                </Label>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                Ongoing security monitoring after deployment
              </p>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hybridModel"
                  checked={formData.hybridModel || false}
                  onCheckedChange={(checked) => handleCheckboxChange('hybridModel', checked as boolean)}
                />
                <Label htmlFor="hybridModel" className="text-sm font-medium">
                  Hybrid Audit Model
                </Label>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                Combination of automated tools and manual review
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Previous Audits */}
        <Card>
          <CardHeader>
            <CardTitle>Previous Security Work</CardTitle>
            <CardDescription>
              Tell us about any previous security assessments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="previousAudits"
                checked={formData.previousAudits}
                onCheckedChange={(checked) => handleCheckboxChange('previousAudits', checked as boolean)}
              />
              <Label htmlFor="previousAudits" className="text-sm font-medium">
                This project has been audited before
              </Label>
            </div>

            {formData.previousAudits && (
              <div className="space-y-2">
                <Label htmlFor="previousAuditLinks">Previous Audit Reports</Label>
                <Textarea
                  id="previousAuditLinks"
                  name="previousAuditLinks"
                  placeholder="Please provide links to previous audit reports or details about previous security work..."
                  rows={3}
                  value={formData.previousAuditLinks || ''}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="specificConcerns">Specific Security Concerns</Label>
              <Textarea
                id="specificConcerns"
                name="specificConcerns"
                placeholder="Are there any specific security concerns or areas you want auditors to pay special attention to?"
                rows={3}
                value={formData.specificConcerns}
                onChange={handleChange}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep} disabled={!isValid} size="lg">
          Continue to Requirements
        </Button>
      </div>
    </div>
  );
};


import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileCode, GitBranch, Clock } from 'lucide-react';
import type { AuditFormData } from '@/types/audit-request.types';

interface TechnicalInfoStepProps {
  formData: AuditFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (field: keyof AuditFormData, value: string) => void;
  handleCheckboxChange: (field: keyof AuditFormData, checked: boolean) => void;
  prevStep: () => void;
  nextStep: () => void;
  formErrors: Record<string, string>;
}

const contractCountOptions = [
  { value: "1-5", label: "1-5 contracts", description: "Small project" },
  { value: "6-15", label: "6-15 contracts", description: "Medium project" },
  { value: "16-30", label: "16-30 contracts", description: "Large project" },
  { value: "30+", label: "30+ contracts", description: "Enterprise project" }
];

const linesOfCodeOptions = [
  { value: "< 1,000", label: "< 1,000 lines", description: "Simple implementation" },
  { value: "1,000 - 5,000", label: "1,000 - 5,000 lines", description: "Standard project" },
  { value: "5,000 - 15,000", label: "5,000 - 15,000 lines", description: "Complex project" },
  { value: "15,000+", label: "15,000+ lines", description: "Very complex project" }
];

const auditScopeOptions = [
  { value: "smart-contracts", label: "Smart Contracts Only", description: "Focus on contract logic and security" },
  { value: "full-stack", label: "Full Stack Review", description: "Frontend, backend, and smart contracts" },
  { value: "infrastructure", label: "Infrastructure Review", description: "Deployment and infrastructure security" },
  { value: "tokenomics", label: "Tokenomics Analysis", description: "Economic model and token mechanics" }
];

const TechnicalInfoStep: React.FC<TechnicalInfoStepProps> = ({
  formData,
  handleSelectChange,
  handleCheckboxChange,
  prevStep,
  nextStep,
  formErrors
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Technical Information</h2>
        <p className="text-muted-foreground">Help us understand the scope and complexity of your project</p>
      </div>

      {/* Project Scale */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCode className="h-5 w-5" />
            Project Scale
          </CardTitle>
          <CardDescription>Tell us about the size and complexity of your codebase</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base font-medium">Number of Smart Contracts *</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {contractCountOptions.map((option) => (
                <div
                  key={option.value}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-primary ${
                    formData.contractCount === option.value ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => handleSelectChange('contractCount', option.value)}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-muted-foreground">{option.description}</div>
                </div>
              ))}
            </div>
            {formErrors.contractCount && (
              <p className="text-sm text-red-500 mt-2">{formErrors.contractCount}</p>
            )}
          </div>

          <div>
            <Label className="text-base font-medium">Lines of Code *</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {linesOfCodeOptions.map((option) => (
                <div
                  key={option.value}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-primary ${
                    formData.linesOfCode === option.value ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => handleSelectChange('linesOfCode', option.value)}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className="text-sm text-muted-foreground">{option.description}</div>
                </div>
              ))}
            </div>
            {formErrors.linesOfCode && (
              <p className="text-sm text-red-500 mt-2">{formErrors.linesOfCode}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Audit Scope */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Audit Scope
          </CardTitle>
          <CardDescription>What aspects of your project need auditing?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {auditScopeOptions.map((option) => (
              <div
                key={option.value}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-primary ${
                  formData.auditScope === option.value ? 'border-primary bg-primary/5' : 'border-border'
                }`}
                onClick={() => handleSelectChange('auditScope', option.value)}
              >
                <div className="font-medium">{option.label}</div>
                <div className="text-sm text-muted-foreground mt-1">{option.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Options */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Audit Options</CardTitle>
          <CardDescription>Additional audit features and services</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="collaborativeAudit"
              checked={formData.collaborativeAudit}
              onChange={(e) => handleCheckboxChange('collaborativeAudit', e.target.checked)}
              className="rounded"
            />
            <div>
              <Label htmlFor="collaborativeAudit" className="font-medium">Collaborative Audit</Label>
              <p className="text-sm text-muted-foreground">Work directly with auditors during the process</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="continuousAuditing"
              checked={formData.continuousAuditing}
              onChange={(e) => handleCheckboxChange('continuousAuditing', e.target.checked)}
              className="rounded"
            />
            <div>
              <Label htmlFor="continuousAuditing" className="font-medium">Continuous Auditing</Label>
              <p className="text-sm text-muted-foreground">Ongoing security monitoring after deployment</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="hybridModel"
              checked={formData.hybridModel}
              onChange={(e) => handleCheckboxChange('hybridModel', e.target.checked)}
              className="rounded"
            />
            <div>
              <Label htmlFor="hybridModel" className="font-medium">AI + Human Hybrid</Label>
              <p className="text-sm text-muted-foreground">Combine automated tools with expert review</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={nextStep}>
          Continue to Requirements
        </Button>
      </div>
    </div>
  );
};

export default TechnicalInfoStep;

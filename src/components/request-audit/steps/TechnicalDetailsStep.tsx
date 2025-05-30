
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Code, FileText, Shield } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface TechnicalDetailsStepProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
  handleScopeChange: (scope: string, checked: boolean) => void;
  errors?: any;
  onNext: () => void;
  onBack: () => void;
}

const auditScopes = [
  { 
    id: 'smart-contract-review', 
    label: 'Smart Contract Review', 
    description: 'Comprehensive review of contract logic and security',
    icon: Code,
    critical: true
  },
  { 
    id: 'gas-optimization', 
    label: 'Gas Optimization', 
    description: 'Optimize transaction costs and efficiency',
    icon: Shield,
    critical: false
  },
  { 
    id: 'business-logic-review', 
    label: 'Business Logic Review', 
    description: 'Validate business rules and workflows',
    icon: FileText,
    critical: true
  },
  { 
    id: 'access-control-review', 
    label: 'Access Control Review', 
    description: 'Verify permissions and role management',
    icon: Shield,
    critical: true
  },
  { 
    id: 'reentrancy-analysis', 
    label: 'Reentrancy Analysis', 
    description: 'Detect and prevent reentrancy vulnerabilities',
    icon: AlertCircle,
    critical: true
  },
  { 
    id: 'front-running-analysis', 
    label: 'Front-running Analysis', 
    description: 'MEV and transaction ordering protection',
    icon: Shield,
    critical: false
  },
  { 
    id: 'integration-testing', 
    label: 'Integration Testing', 
    description: 'Test interactions with external contracts',
    icon: Code,
    critical: false
  },
  { 
    id: 'documentation-review', 
    label: 'Documentation Review', 
    description: 'Validate technical documentation quality',
    icon: FileText,
    critical: false
  }
];

export const TechnicalDetailsStep = ({ 
  formData, 
  handleInputChange, 
  handleScopeChange, 
  errors, 
  onNext, 
  onBack 
}: TechnicalDetailsStepProps) => {
  const selectedScopes = Array.isArray(formData.auditScope) ? formData.auditScope : [];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Technical Details</h3>
        <p className="text-muted-foreground mb-6">
          Provide technical specifications to help auditors understand the scope and complexity.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contractCount">Number of Smart Contracts *</Label>
            <Select value={formData.contractCount} onValueChange={(value) => handleInputChange('contractCount', value)}>
              <SelectTrigger className={errors?.contractCount ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-5">1-5 contracts</SelectItem>
                <SelectItem value="6-15">6-15 contracts</SelectItem>
                <SelectItem value="16-30">16-30 contracts</SelectItem>
                <SelectItem value="31-50">31-50 contracts</SelectItem>
                <SelectItem value="50+">50+ contracts</SelectItem>
              </SelectContent>
            </Select>
            {errors?.contractCount && (
              <p className="text-red-500 text-sm mt-1">{errors.contractCount}</p>
            )}
          </div>

          <div>
            <Label htmlFor="linesOfCode">Estimated Lines of Code *</Label>
            <Select value={formData.linesOfCode} onValueChange={(value) => handleInputChange('linesOfCode', value)}>
              <SelectTrigger className={errors?.linesOfCode ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="< 1,000">Less than 1,000 lines</SelectItem>
                <SelectItem value="1,000 - 5,000">1,000 - 5,000 lines</SelectItem>
                <SelectItem value="5,000 - 15,000">5,000 - 15,000 lines</SelectItem>
                <SelectItem value="15,000 - 50,000">15,000 - 50,000 lines</SelectItem>
                <SelectItem value="50,000+">50,000+ lines</SelectItem>
              </SelectContent>
            </Select>
            {errors?.linesOfCode && (
              <p className="text-red-500 text-sm mt-1">{errors.linesOfCode}</p>
            )}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Audit Scope *</CardTitle>
            <p className="text-sm text-muted-foreground">
              Select all areas you want audited. Critical items are recommended for most projects.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {auditScopes.map((scope) => {
                const Icon = scope.icon;
                const isSelected = selectedScopes.includes(scope.id);
                
                return (
                  <div 
                    key={scope.id} 
                    className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleScopeChange(scope.id, !isSelected)}
                  >
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={scope.id}
                        checked={isSelected}
                        onCheckedChange={(checked) => handleScopeChange(scope.id, checked as boolean)}
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="h-4 w-4 text-primary" />
                          <Label htmlFor={scope.id} className="text-sm font-medium cursor-pointer">
                            {scope.label}
                          </Label>
                          {scope.critical && (
                            <Badge variant="secondary" className="text-xs">Critical</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{scope.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {errors?.auditScope && (
              <p className="text-red-500 text-sm mt-2">{errors.auditScope}</p>
            )}
          </CardContent>
        </Card>

        <div>
          <Label className="text-base font-medium">Previous Audits *</Label>
          <RadioGroup 
            value={formData.previousAudits} 
            onValueChange={(value) => handleInputChange('previousAudits', value)}
            className="mt-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="none" />
              <Label htmlFor="none" className="font-normal">No previous audits</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="internal" id="internal" />
              <Label htmlFor="internal" className="font-normal">Internal review only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="external" id="external" />
              <Label htmlFor="external" className="font-normal">Previous external audit</Label>
            </div>
          </RadioGroup>
          {errors?.previousAudits && (
            <p className="text-red-500 text-sm mt-1">{errors.previousAudits}</p>
          )}
        </div>

        {formData.previousAudits === 'external' && (
          <div>
            <Label htmlFor="previousAuditLinks">Previous Audit Reports (Optional)</Label>
            <Textarea
              id="previousAuditLinks"
              placeholder="Provide links or details about previous audits..."
              rows={3}
              value={formData.previousAuditLinks}
              onChange={(e) => handleInputChange('previousAuditLinks', e.target.value)}
            />
          </div>
        )}

        <div>
          <Label htmlFor="specificConcerns">Specific Security Concerns (Optional)</Label>
          <Textarea
            id="specificConcerns"
            placeholder="Describe any specific vulnerabilities, patterns, or areas you're particularly concerned about..."
            rows={4}
            value={formData.specificConcerns}
            onChange={(e) => handleInputChange('specificConcerns', e.target.value)}
          />
          <p className="text-sm text-muted-foreground mt-1">
            Examples: Complex calculations, external integrations, upgrade mechanisms, oracle dependencies, etc.
          </p>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Technical Review:</strong> Our matching algorithm will use this information to connect you with auditors who have specific expertise in your technology stack and concern areas.
          </AlertDescription>
        </Alert>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button onClick={onNext} className="flex-1 md:flex-none">
            Continue to Timeline & Budget
          </Button>
        </div>
      </div>
    </div>
  );
};

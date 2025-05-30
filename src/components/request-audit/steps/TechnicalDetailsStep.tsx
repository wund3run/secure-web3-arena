
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface TechnicalDetailsStepProps {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
  handleScopeChange: (scope: string, checked: boolean) => void;
}

export const TechnicalDetailsStep = ({ formData, handleInputChange, handleScopeChange }: TechnicalDetailsStepProps) => {
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
};

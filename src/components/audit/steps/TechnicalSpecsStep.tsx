
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

interface TechnicalSpecsStepProps {
  values: any;
  setValue: (field: string, value: any) => void;
  errors: any;
}

export function TechnicalSpecsStep({ values, setValue, errors }: TechnicalSpecsStepProps) {
  const frameworks = ['Hardhat', 'Truffle', 'Foundry', 'Brownie', 'Anchor', 'Other'];

  const toggleFramework = (framework: string) => {
    const current = values.frameworks || [];
    const updated = current.includes(framework)
      ? current.filter((f: string) => f !== framework)
      : [...current, framework];
    setValue('frameworks', updated);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="repositoryUrl">Repository URL *</Label>
        <Input
          id="repositoryUrl"
          value={values.repositoryUrl}
          onChange={(e) => setValue('repositoryUrl', e.target.value)}
          placeholder="https://github.com/your-org/your-project"
          type="url"
        />
        {errors.repositoryUrl && <p className="text-sm text-red-500">{errors.repositoryUrl}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="contractCount">Number of Contracts *</Label>
          <Input
            id="contractCount"
            type="number"
            value={values.contractCount}
            onChange={(e) => setValue('contractCount', parseInt(e.target.value) || 0)}
            placeholder="5"
            min="1"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linesOfCode">Lines of Code (approx.)</Label>
          <Input
            id="linesOfCode"
            type="number"
            value={values.linesOfCode}
            onChange={(e) => setValue('linesOfCode', parseInt(e.target.value) || 0)}
            placeholder="1000"
            min="0"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="testCoverage">Test Coverage (%)</Label>
          <Input
            id="testCoverage"
            type="number"
            value={values.testCoverage}
            onChange={(e) => setValue('testCoverage', parseInt(e.target.value) || 0)}
            placeholder="80"
            min="0"
            max="100"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label>Development Frameworks</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {frameworks.map((framework) => (
            <div key={framework} className="flex items-center space-x-2">
              <Checkbox
                id={framework}
                checked={values.frameworks?.includes(framework) || false}
                onCheckedChange={() => toggleFramework(framework)}
              />
              <Label htmlFor={framework} className="text-sm font-normal">
                {framework}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="auditScope">Audit Scope</Label>
        <Textarea
          id="auditScope"
          value={values.auditScope}
          onChange={(e) => setValue('auditScope', e.target.value)}
          placeholder="Describe what specific contracts, functions, or areas you want audited..."
          rows={3}
        />
      </div>
    </div>
  );
}

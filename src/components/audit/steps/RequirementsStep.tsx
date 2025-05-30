
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface RequirementsStepProps {
  values: any;
  setValue: (field: string, value: any) => void;
  errors: any;
}

export function RequirementsStep({ values, setValue, errors }: RequirementsStepProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="deadline">Preferred Deadline *</Label>
          <Input
            id="deadline"
            type="date"
            value={values.deadline}
            onChange={(e) => setValue('deadline', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
          {errors.deadline && <p className="text-sm text-red-500">{errors.deadline}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget">Budget (USD) *</Label>
          <Input
            id="budget"
            type="number"
            value={values.budget}
            onChange={(e) => setValue('budget', parseFloat(e.target.value) || 0)}
            placeholder="5000"
            min="0"
          />
          {errors.budget && <p className="text-sm text-red-500">{errors.budget}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="urgencyLevel">Urgency Level</Label>
        <Select value={values.urgencyLevel} onValueChange={(value) => setValue('urgencyLevel', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select urgency level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low - Standard timeline</SelectItem>
            <SelectItem value="normal">Normal - Moderate priority</SelectItem>
            <SelectItem value="high">High - Rush delivery</SelectItem>
            <SelectItem value="critical">Critical - Emergency audit</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="specificConcerns">Specific Security Concerns</Label>
        <Textarea
          id="specificConcerns"
          value={values.specificConcerns}
          onChange={(e) => setValue('specificConcerns', e.target.value)}
          placeholder="Are there any specific vulnerabilities or areas you're particularly concerned about?"
          rows={3}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="previousAudits"
          checked={values.previousAudits}
          onCheckedChange={(checked) => setValue('previousAudits', checked)}
        />
        <Label htmlFor="previousAudits" className="text-sm font-normal">
          This project has been audited before
        </Label>
      </div>
    </div>
  );
}

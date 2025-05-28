
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Code } from "lucide-react";
import { AuditFormData, AuditFormErrors } from '@/types/audit-request.types';
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";

interface TechnicalInfoStepProps {
  formData: AuditFormData;
  formErrors?: AuditFormErrors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: keyof AuditFormData, value: string) => void;
  handleCheckboxChange: (name: keyof AuditFormData, checked: boolean) => void;
  prevStep: () => void;
  nextStep: () => void;
}

const TechnicalInfoStep: React.FC<TechnicalInfoStepProps> = ({
  formData,
  formErrors = {},
  handleChange,
  handleSelectChange,
  handleCheckboxChange,
  prevStep,
  nextStep
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Code className="mr-2 h-5 w-5 text-primary" /> Technical Information
      </h2>
      
      <div className="space-y-2">
        <FormItem>
          <FormLabel htmlFor="repositoryUrl" className="text-sm font-medium">
            Repository URL <span className="text-muted-foreground text-xs">(Private repos will require access arrangements)</span>
          </FormLabel>
          <FormControl>
            <Input 
              id="repositoryUrl" 
              name="repositoryUrl" 
              placeholder="https://github.com/your-organization/your-repo" 
              value={formData.repositoryUrl}
              onChange={handleChange}
              className={formErrors.repositoryUrl ? "border-destructive" : ""}
              aria-invalid={!!formErrors.repositoryUrl}
              aria-describedby={formErrors.repositoryUrl ? "repositoryUrl-error" : undefined}
            />
          </FormControl>
          {formErrors.repositoryUrl && (
            <FormMessage>{formErrors.repositoryUrl}</FormMessage>
          )}
          <FormDescription>
            We'll keep your code confidential and can sign an NDA if required.
          </FormDescription>
        </FormItem>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormItem>
          <FormLabel htmlFor="contractCount" className="text-sm font-medium">Number of Smart Contracts *</FormLabel>
          <FormControl>
            <Select 
              value={formData.contractCount} 
              onValueChange={(value) => handleSelectChange("contractCount", value)}
            >
              <SelectTrigger 
                className={formErrors.contractCount ? "border-destructive" : ""} 
                aria-invalid={!!formErrors.contractCount}
              >
                <SelectValue placeholder="Select number of contracts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-3">1-3 contracts</SelectItem>
                <SelectItem value="4-10">4-10 contracts</SelectItem>
                <SelectItem value="11-20">11-20 contracts</SelectItem>
                <SelectItem value="20+">More than 20 contracts</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          {formErrors.contractCount && (
            <FormMessage>{formErrors.contractCount}</FormMessage>
          )}
        </FormItem>
        
        <FormItem>
          <FormLabel htmlFor="linesOfCode" className="text-sm font-medium">Approximate Lines of Code *</FormLabel>
          <FormControl>
            <Select 
              value={formData.linesOfCode} 
              onValueChange={(value) => handleSelectChange("linesOfCode", value)}
            >
              <SelectTrigger 
                className={formErrors.linesOfCode ? "border-destructive" : ""}
                aria-invalid={!!formErrors.linesOfCode}
              >
                <SelectValue placeholder="Select code size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="<1000">Less than 1,000 lines</SelectItem>
                <SelectItem value="1000-5000">1,000 - 5,000 lines</SelectItem>
                <SelectItem value="5001-15000">5,001 - 15,000 lines</SelectItem>
                <SelectItem value="15000+">More than 15,000 lines</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          {formErrors.linesOfCode && (
            <FormMessage>{formErrors.linesOfCode}</FormMessage>
          )}
        </FormItem>
      </div>

      <FormItem>
        <FormLabel htmlFor="auditScope" className="text-sm font-medium">Audit Scope *</FormLabel>
        <FormControl>
          <Textarea 
            id="auditScope" 
            name="auditScope" 
            placeholder="Describe which parts of your codebase need to be audited and any specific areas of focus..." 
            className={`min-h-[120px] ${formErrors.auditScope ? "border-destructive" : ""}`}
            value={formData.auditScope}
            onChange={handleChange}
            aria-invalid={!!formErrors.auditScope}
            aria-describedby={formErrors.auditScope ? "auditScope-error" : undefined}
            required
          />
        </FormControl>
        {formErrors.auditScope && (
          <FormMessage>{formErrors.auditScope}</FormMessage>
        )}
        <FormDescription>
          Clearly defining the scope helps ensure the audit focuses on the most critical components.
        </FormDescription>
      </FormItem>

      <div className="flex items-start space-x-2 mt-4">
        <Checkbox 
          id="previousAudits"
          checked={formData.previousAudits}
          onCheckedChange={(checked) => handleCheckboxChange("previousAudits", checked === true)}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="previousAudits"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Previous audits conducted
          </label>
          <p className="text-sm text-muted-foreground">
            Check this if your code has been audited before. You'll be able to upload previous audit reports in the next step.
          </p>
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <Button 
          type="button" 
          onClick={prevStep}
          variant="outline"
        >
          Back
        </Button>
        <Button 
          type="button" 
          onClick={nextStep}
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
        >
          Next Step: Requirements
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TechnicalInfoStep;


import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ListChecks } from "lucide-react";
import { AuditFormData, AuditFormErrors } from '@/types/audit-request.types';
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";

interface RequirementsStepProps {
  formData: AuditFormData;
  formErrors?: AuditFormErrors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  prevStep: () => void;
  nextStep: () => void;
}

const RequirementsStep: React.FC<RequirementsStepProps> = ({
  formData,
  formErrors = {},
  handleChange,
  handleSelectChange,
  prevStep,
  nextStep
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <ListChecks className="mr-2 h-5 w-5 text-primary" /> Requirements & Preferences
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormItem className={formErrors.deadline ? "error" : ""}>
          <FormLabel htmlFor="deadline" className="text-sm font-medium">Expected Timeline *</FormLabel>
          <FormControl>
            <Select 
              value={formData.deadline} 
              onValueChange={(value) => handleSelectChange("deadline", value)}
            >
              <SelectTrigger className={formErrors.deadline ? "border-destructive" : ""}>
                <SelectValue placeholder="Select your deadline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urgent">Urgent (within 1 week)</SelectItem>
                <SelectItem value="standard">Standard (2-3 weeks)</SelectItem>
                <SelectItem value="flexible">Flexible (1 month or more)</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          {formErrors.deadline && (
            <FormMessage>{formErrors.deadline}</FormMessage>
          )}
          <FormDescription>
            Faster turnaround times may affect auditor availability and pricing.
          </FormDescription>
        </FormItem>
        
        <FormItem className={formErrors.budget ? "error" : ""}>
          <FormLabel htmlFor="budget" className="text-sm font-medium">Budget Range *</FormLabel>
          <FormControl>
            <Select 
              value={formData.budget} 
              onValueChange={(value) => handleSelectChange("budget", value)}
            >
              <SelectTrigger className={formErrors.budget ? "border-destructive" : ""}>
                <SelectValue placeholder="Select your budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under5k">Under $5,000</SelectItem>
                <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
                <SelectItem value="15k-30k">$15,000 - $30,000</SelectItem>
                <SelectItem value="30k-50k">$30,000 - $50,000</SelectItem>
                <SelectItem value="above50k">Above $50,000</SelectItem>
                <SelectItem value="flexible">Flexible / To be discussed</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          {formErrors.budget && (
            <FormMessage>{formErrors.budget}</FormMessage>
          )}
          <FormDescription>
            Budget range helps match you with appropriate auditors.
          </FormDescription>
        </FormItem>
      </div>
      
      <FormItem>
        <FormLabel htmlFor="specificConcerns" className="text-sm font-medium">Specific Security Concerns</FormLabel>
        <FormControl>
          <Textarea 
            id="specificConcerns" 
            name="specificConcerns" 
            placeholder="Describe any specific security concerns or areas you'd like the auditors to focus on..." 
            className="min-h-[120px]"
            value={formData.specificConcerns}
            onChange={handleChange}
          />
        </FormControl>
        <FormDescription>
          Optional: Let auditors know if you have specific security concerns.
        </FormDescription>
      </FormItem>
      
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
          Next Step: AI Matching
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default RequirementsStep;

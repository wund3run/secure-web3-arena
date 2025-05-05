
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ListChecks, Cpu } from "lucide-react";
import { AuditFormData, AuditFormErrors } from '@/types/audit-request.types';
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

interface RequirementsStepProps {
  formData: AuditFormData;
  formErrors?: AuditFormErrors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleCheckboxChange?: (name: string, checked: boolean) => void;
  prevStep: () => void;
  nextStep: () => void;
}

const RequirementsStep: React.FC<RequirementsStepProps> = ({
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
        <ListChecks className="mr-2 h-5 w-5 text-primary" /> Requirements & Preferences
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormItem>
          <FormLabel htmlFor="deadline" className="text-sm font-medium">Expected Timeline *</FormLabel>
          <FormControl>
            <Select 
              value={formData.deadline} 
              onValueChange={(value) => handleSelectChange("deadline", value)}
            >
              <SelectTrigger 
                className={formErrors.deadline ? "border-destructive" : ""}
                aria-invalid={!!formErrors.deadline}
              >
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
        
        <FormItem>
          <FormLabel htmlFor="budget" className="text-sm font-medium">Budget Range *</FormLabel>
          <FormControl>
            <Select 
              value={formData.budget} 
              onValueChange={(value) => handleSelectChange("budget", value)}
            >
              <SelectTrigger 
                className={formErrors.budget ? "border-destructive" : ""}
                aria-invalid={!!formErrors.budget}
              >
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

      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
        <div className="flex items-start space-x-4">
          <div className="bg-primary/20 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
            <Cpu className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-lg">AI-Enhanced Security</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Our AI systems can help detect vulnerabilities before and during the audit process, providing continuous security monitoring for your project.
            </p>
            <div className="flex items-center space-x-2 mb-3">
              <Checkbox 
                id="aiAssisted" 
                checked={formData.aiAssisted} 
                onCheckedChange={checked => 
                  handleCheckboxChange && handleCheckboxChange("aiAssisted", Boolean(checked))
                }
              />
              <label 
                htmlFor="aiAssisted" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Include AI-assisted vulnerability detection
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="continuousMonitoring" 
                checked={formData.continuousMonitoring}
                onCheckedChange={checked => 
                  handleCheckboxChange && handleCheckboxChange("continuousMonitoring", Boolean(checked))
                }
              />
              <label 
                htmlFor="continuousMonitoring" 
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Add continuous security monitoring
              </label>
            </div>
            <div className="mt-3">
              <Link to="/security-insights" className="text-primary hover:underline text-sm">
                Preview AI security features
              </Link>
            </div>
          </div>
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
          Next Step: AI Matching
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default RequirementsStep;

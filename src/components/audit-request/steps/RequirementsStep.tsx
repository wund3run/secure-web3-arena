
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Briefcase, AlertCircle } from "lucide-react";
import { AuditFormData } from '../AuditRequestForm';

interface RequirementsStepProps {
  formData: AuditFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  prevStep: () => void;
  nextStep: () => void;
}

const RequirementsStep: React.FC<RequirementsStepProps> = ({
  formData,
  handleChange,
  handleSelectChange,
  prevStep,
  nextStep
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Briefcase className="mr-2 h-5 w-5 text-primary" /> Requirements & Preferences
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label htmlFor="budget" className="text-sm font-medium">Estimated Budget Range *</label>
          <Select 
            value={formData.budget} 
            onValueChange={(value) => handleSelectChange("budget", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="<5k">Less than $5,000</SelectItem>
              <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
              <SelectItem value="15k-50k">$15,000 - $50,000</SelectItem>
              <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
              <SelectItem value="100k+">More than $100,000</SelectItem>
              <SelectItem value="flexible">Flexible / Not sure</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="deadline" className="text-sm font-medium">Expected Timeline/Deadline *</label>
          <Select 
            value={formData.deadline} 
            onValueChange={(value) => handleSelectChange("deadline", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="urgent">Urgent (less than 1 week)</SelectItem>
              <SelectItem value="1-2weeks">1-2 weeks</SelectItem>
              <SelectItem value="2-4weeks">2-4 weeks</SelectItem>
              <SelectItem value="1-2months">1-2 months</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="specificConcerns" className="text-sm font-medium">Specific Security Concerns</label>
        <Textarea 
          id="specificConcerns" 
          name="specificConcerns" 
          placeholder="Are there any specific security concerns or areas you want the auditors to focus on?" 
          className="min-h-[100px]"
          value={formData.specificConcerns}
          onChange={handleChange}
        />
      </div>

      <div className="bg-muted/50 rounded-lg p-4 mt-6">
        <h3 className="text-sm font-medium flex items-center mb-2">
          <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
          How Our AI Matching Works
        </h3>
        <p className="text-sm text-muted-foreground">
          Our advanced AI system analyzes your project details and matches you with the most suitable security experts based on their expertise, reputation, and past performance with similar projects. For optimal matching results, please provide as much detail as possible.
        </p>
      </div>

      <div className="flex items-start space-x-2 mt-6">
        <Checkbox id="terms" required />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the terms and conditions *
          </label>
          <p className="text-sm text-muted-foreground">
            By submitting this form, you agree to our <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
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
          Next Step: Review
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default RequirementsStep;

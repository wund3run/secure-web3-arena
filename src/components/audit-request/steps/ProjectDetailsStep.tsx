
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, FileText } from "lucide-react";
import { AuditFormData, AuditFormErrors } from '@/types/audit-request.types';
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";

interface ProjectDetailsStepProps {
  formData: AuditFormData;
  formErrors?: AuditFormErrors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  projectType: string;
  setProjectType: React.Dispatch<React.SetStateAction<string>>;
  handleEcosystemClick: (ecosystem: string) => void;
  nextStep: () => void;
}

const ProjectDetailsStep: React.FC<ProjectDetailsStepProps> = ({
  formData,
  formErrors = {},
  handleChange,
  projectType,
  setProjectType,
  handleEcosystemClick,
  nextStep
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <FileText className="mr-2 h-5 w-5 text-primary" /> Project Details
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormItem className={formErrors.projectName ? "error" : ""}>
          <FormLabel htmlFor="projectName" className="text-sm font-medium">Project Name *</FormLabel>
          <FormControl>
            <Input 
              id="projectName" 
              name="projectName" 
              placeholder="Enter your project name" 
              value={formData.projectName}
              onChange={handleChange}
              className={formErrors.projectName ? "border-destructive" : ""}
            />
          </FormControl>
          {formErrors.projectName && (
            <FormMessage>{formErrors.projectName}</FormMessage>
          )}
        </FormItem>
        
        <FormItem className={formErrors.contactName ? "error" : ""}>
          <FormLabel htmlFor="contactName" className="text-sm font-medium">Contact Name *</FormLabel>
          <FormControl>
            <Input 
              id="contactName" 
              name="contactName" 
              placeholder="Enter your name" 
              value={formData.contactName}
              onChange={handleChange}
              className={formErrors.contactName ? "border-destructive" : ""}
            />
          </FormControl>
          {formErrors.contactName && (
            <FormMessage>{formErrors.contactName}</FormMessage>
          )}
        </FormItem>
      </div>
      
      <FormItem className={formErrors.contactEmail ? "error" : ""}>
        <FormLabel htmlFor="contactEmail" className="text-sm font-medium">Contact Email *</FormLabel>
        <FormControl>
          <Input 
            id="contactEmail" 
            name="contactEmail" 
            type="email" 
            placeholder="Enter your email address" 
            value={formData.contactEmail}
            onChange={handleChange}
            className={formErrors.contactEmail ? "border-destructive" : ""}
          />
        </FormControl>
        {formErrors.contactEmail && (
          <FormMessage>{formErrors.contactEmail}</FormMessage>
        )}
      </FormItem>
      
      <div className="space-y-3">
        <FormLabel className="text-sm font-medium block">Blockchain Ecosystem *</FormLabel>
        <FormControl>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {["Ethereum", "Solana", "Binance Smart Chain", "Polygon", "Avalanche", "Other"].map((ecosystem) => (
              <div
                key={ecosystem}
                className={`
                  cursor-pointer rounded-lg border p-3 text-center transition-all
                  ${formData.blockchain === ecosystem 
                    ? 'border-primary bg-primary/10 text-primary' 
                    : 'border-border/40 hover:border-primary/60 hover:bg-muted'}
                `}
                onClick={() => handleEcosystemClick(ecosystem)}
              >
                <div className="font-medium">{ecosystem}</div>
              </div>
            ))}
          </div>
        </FormControl>
        
        {formData.blockchain === "Other" && (
          <FormItem className={formErrors.customBlockchain ? "error mt-3" : "mt-3"}>
            <FormLabel htmlFor="customBlockchain" className="text-sm font-medium">Blockchain Name *</FormLabel>
            <FormControl>
              <Input 
                id="customBlockchain" 
                name="customBlockchain" 
                placeholder="Specify blockchain name" 
                value={formData.customBlockchain}
                onChange={handleChange}
                className={formErrors.customBlockchain ? "border-destructive" : ""}
              />
            </FormControl>
            {formErrors.customBlockchain && (
              <FormMessage>{formErrors.customBlockchain}</FormMessage>
            )}
          </FormItem>
        )}
      </div>
      
      <FormItem className={formErrors.projectDescription ? "error" : ""}>
        <FormLabel htmlFor="projectDescription" className="text-sm font-medium">Project Description *</FormLabel>
        <FormControl>
          <Textarea 
            id="projectDescription" 
            name="projectDescription" 
            placeholder="Describe your project, its purpose, and what you're trying to achieve..." 
            className={`min-h-[120px] ${formErrors.projectDescription ? "border-destructive" : ""}`}
            value={formData.projectDescription}
            onChange={handleChange}
            required
          />
        </FormControl>
        {formErrors.projectDescription && (
          <FormMessage>{formErrors.projectDescription}</FormMessage>
        )}
        <FormDescription>
          A detailed description helps auditors understand your project better.
        </FormDescription>
      </FormItem>
      
      <div className="flex justify-end mt-8">
        <Button 
          type="button" 
          onClick={nextStep}
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
        >
          Next Step: Technical Information
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProjectDetailsStep;

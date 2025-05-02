
import React, { useState } from 'react';
import { toast } from "sonner";
import ProjectDetailsStep from './steps/ProjectDetailsStep';
import TechnicalInfoStep from './steps/TechnicalInfoStep';
import RequirementsStep from './steps/RequirementsStep';
import FormProgress from './FormProgress';

export interface AuditFormData {
  projectName: string;
  projectDescription: string;
  contactEmail: string;
  contactName: string;
  blockchain: string;
  repositoryUrl: string;
  contractCount: string;
  linesOfCode: string;
  deadline: string;
  budget: string;
  auditScope: string;
  previousAudits: boolean;
  specificConcerns: string;
}

interface AuditRequestFormProps {
  onSubmitSuccess: () => void;
}

const AuditRequestForm = ({ onSubmitSuccess }: AuditRequestFormProps) => {
  const [formStep, setFormStep] = useState(1);
  const [projectType, setProjectType] = useState("");
  const [formData, setFormData] = useState<AuditFormData>({
    projectName: "",
    projectDescription: "",
    contactEmail: "",
    contactName: "",
    blockchain: "Ethereum",
    repositoryUrl: "",
    contractCount: "",
    linesOfCode: "",
    deadline: "",
    budget: "",
    auditScope: "",
    previousAudits: false,
    specificConcerns: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked });
  };

  const handleEcosystemClick = (ecosystem: string) => {
    setFormData({ ...formData, blockchain: ecosystem });
    toast.success(`Selected ${ecosystem} as your blockchain ecosystem`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Audit request submitted successfully!", {
      description: "Our AI will match you with the perfect auditors for your project.",
    });
    onSubmitSuccess();
  };

  const nextStep = () => {
    window.scrollTo(0, 0);
    setFormStep(formStep + 1);
  };

  const prevStep = () => {
    window.scrollTo(0, 0);
    setFormStep(formStep - 1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Progress indicator */}
      <FormProgress formStep={formStep} />

      {/* Form */}
      <div className="bg-card border border-border/40 rounded-xl p-6 md:p-8 shadow-sm">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Project Details */}
          {formStep === 1 && (
            <ProjectDetailsStep
              formData={formData}
              handleChange={handleChange}
              projectType={projectType}
              setProjectType={setProjectType}
              handleEcosystemClick={handleEcosystemClick}
              nextStep={nextStep}
            />
          )}

          {/* Step 2: Technical Information */}
          {formStep === 2 && (
            <TechnicalInfoStep
              formData={formData}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
              handleCheckboxChange={handleCheckboxChange}
              prevStep={prevStep}
              nextStep={nextStep}
            />
          )}

          {/* Step 3: Requirements & Submission */}
          {formStep === 3 && (
            <RequirementsStep
              formData={formData}
              handleChange={handleChange}
              handleSelectChange={handleSelectChange}
              prevStep={prevStep}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default AuditRequestForm;

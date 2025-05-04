
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import ProjectDetailsStep from './steps/ProjectDetailsStep';
import TechnicalInfoStep from './steps/TechnicalInfoStep';
import RequirementsStep from './steps/RequirementsStep';
import ReviewStep from './steps/ReviewStep';
import FormProgress from './FormProgress';
import AIMatchingJourney from './AIMatchingJourney';

export interface AuditFormData {
  projectName: string;
  projectDescription: string;
  contactEmail: string;
  contactName: string;
  blockchain: string;
  customBlockchain?: string;
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
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState(1);
  const [projectType, setProjectType] = useState("");
  const [showAIMatching, setShowAIMatching] = useState(false);
  const [formData, setFormData] = useState<AuditFormData>({
    projectName: "",
    projectDescription: "",
    contactEmail: "",
    contactName: "",
    blockchain: "Ethereum",
    customBlockchain: "",
    repositoryUrl: "",
    contractCount: "",
    linesOfCode: "",
    deadline: "",
    budget: "",
    auditScope: "",
    previousAudits: false,
    specificConcerns: ""
  });

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      toast.error("Authentication required", {
        description: "You need to sign in to request an audit.",
      });
      navigate('/auth');
    } else {
      // Pre-fill user information if available
      supabase
        .from('extended_profiles')
        .select('full_name, email')
        .eq('id', user.id)
        .single()
        .then(({ data, error }) => {
          if (!error && data) {
            setFormData(prev => ({
              ...prev,
              contactName: data.full_name || '',
              contactEmail: user.email || ''
            }));
          }
        });
    }
  }, [user, navigate]);

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
    if (ecosystem !== "Other") {
      toast.success(`Selected ${ecosystem} as your blockchain ecosystem`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Authentication required", {
        description: "You need to sign in to submit an audit request.",
      });
      navigate('/auth');
      return;
    }
    
    try {
      // If "Other" is selected, use the custom blockchain name instead
      const blockchain = formData.blockchain === "Other" && formData.customBlockchain 
        ? formData.customBlockchain 
        : formData.blockchain;
      
      // Prepare data for database
      const auditRequestData = {
        client_id: user.id,
        project_name: formData.projectName,
        project_description: formData.projectDescription,
        blockchain,
        repository_url: formData.repositoryUrl,
        contract_count: parseInt(formData.contractCount.split('-')[0]) || 0,
        lines_of_code: parseInt(formData.linesOfCode.split('-')[0]) || 0,
        deadline: formData.deadline,
        budget: formData.budget,
        audit_scope: formData.auditScope,
        previous_audits: formData.previousAudits,
        specific_concerns: formData.specificConcerns,
        status: 'pending'
      };
      
      console.log("Submitting data:", auditRequestData);
      
      const { error } = await supabase
        .from('audit_requests')
        .insert(auditRequestData);
      
      if (error) {
        throw error;
      }
      
      toast.success("Audit request submitted successfully!", {
        description: "Our AI will match you with the perfect auditors for your project.",
      });
      
      onSubmitSuccess();
    } catch (error: any) {
      toast.error("Error submitting audit request", {
        description: error.message || "Please try again later",
      });
      console.error("Error submitting audit request:", error);
    }
  };

  const nextStep = () => {
    window.scrollTo(0, 0);
    
    // After requirements step, show AI matching
    if (formStep === 3) {
      setShowAIMatching(true);
    } else {
      setFormStep(formStep + 1);
    }
  };

  const prevStep = () => {
    window.scrollTo(0, 0);
    
    // If coming back from AI matching, return to step 3
    if (showAIMatching) {
      setShowAIMatching(false);
    } else {
      setFormStep(formStep - 1);
    }
  };

  const completeAIMatching = () => {
    setShowAIMatching(false);
    setFormStep(4); // Go to review step after AI matching
    window.scrollTo(0, 0);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Progress indicator */}
      <FormProgress formStep={formStep} showAIMatching={showAIMatching} />

      {/* Form */}
      <div className="bg-card border border-border/40 rounded-xl p-6 md:p-8 shadow-sm">
        <form onSubmit={handleSubmit}>
          {/* AI Matching Journey */}
          {showAIMatching ? (
            <AIMatchingJourney 
              formData={formData} 
              onProceed={completeAIMatching}
            />
          ) : (
            <>
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

              {/* Step 3: Requirements & Preferences */}
              {formStep === 3 && (
                <RequirementsStep
                  formData={formData}
                  handleChange={handleChange}
                  handleSelectChange={handleSelectChange}
                  prevStep={prevStep}
                  nextStep={nextStep}
                />
              )}

              {/* Step 4: Review & Submit */}
              {formStep === 4 && (
                <ReviewStep
                  formData={formData}
                  prevStep={prevStep}
                />
              )}
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuditRequestForm;

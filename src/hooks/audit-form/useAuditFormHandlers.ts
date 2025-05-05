
import { AuditFormData, AuditFormErrors } from "@/types/audit-request.types";
import { toast } from "sonner";
import { showFeedback } from "@/components/ui/interactive-feedback";

export const useAuditFormHandlers = (
  formData: AuditFormData,
  setFormData: (data: AuditFormData) => void,
  formErrors: AuditFormErrors,
  setFormErrors: (errors: AuditFormErrors) => void
) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field when user changes selection
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
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

  return {
    handleChange,
    handleSelectChange,
    handleCheckboxChange,
    handleEcosystemClick
  };
};

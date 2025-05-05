
import { AuditFormData, AuditFormErrors, FormStepValidators } from "@/types/audit-request.types";
import { isValidEmail, isNotEmpty, meetsMinLength, isValidUrl } from "@/utils/formValidation";

export const validateFormStep = (
  step: number, 
  formData: AuditFormData
): { isValid: boolean; errors: AuditFormErrors } => {
  const validators: FormStepValidators = {
    1: validateProjectDetails,
    2: validateTechnicalInfo,
    3: validateRequirements,
    4: () => ({ isValid: true, errors: {} }) // Review step doesn't need validation
  };

  // Use the appropriate validator for the current step or return valid if no validator exists
  const validator = validators[step] || (() => ({ isValid: true, errors: {} }));
  return validator(formData);
};

const validateProjectDetails = (formData: AuditFormData): { isValid: boolean; errors: AuditFormErrors } => {
  const errors: AuditFormErrors = {};

  if (!isNotEmpty(formData.projectName)) {
    errors.projectName = "Project name is required";
  } else if (formData.projectName.length < 3) {
    errors.projectName = "Project name must be at least 3 characters";
  }

  if (!isNotEmpty(formData.contactName)) {
    errors.contactName = "Contact name is required";
  } else if (formData.contactName.length < 2) {
    errors.contactName = "Contact name must be at least 2 characters";
  }

  if (!isNotEmpty(formData.contactEmail)) {
    errors.contactEmail = "Email address is required";
  } else if (!isValidEmail(formData.contactEmail)) {
    errors.contactEmail = "Please enter a valid email address (e.g., example@domain.com)";
  }

  if (!isNotEmpty(formData.projectDescription)) {
    errors.projectDescription = "Project description is required";
  } else if (!meetsMinLength(formData.projectDescription, 20)) {
    errors.projectDescription = "Please provide a more detailed project description (minimum 20 characters)";
  }

  if (!isNotEmpty(formData.blockchain)) {
    errors.blockchain = "Please select a blockchain ecosystem";
  }

  // For "Other" blockchain, validate the custom blockchain name
  if (formData.blockchain === "Other" && !isNotEmpty(formData.customBlockchain)) {
    errors.customBlockchain = "Please specify the blockchain name";
  } else if (formData.blockchain === "Other" && formData.customBlockchain.length < 2) {
    errors.customBlockchain = "Blockchain name must be at least 2 characters";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

const validateTechnicalInfo = (formData: AuditFormData): { isValid: boolean; errors: AuditFormErrors } => {
  const errors: AuditFormErrors = {};

  // Repository URL is optional but if provided, should be a valid URL format
  if (formData.repositoryUrl) {
    if (!formData.repositoryUrl.startsWith('http')) {
      errors.repositoryUrl = "Please enter a valid URL starting with http:// or https://";
    } else if (!isValidUrl(formData.repositoryUrl)) {
      errors.repositoryUrl = "Please enter a valid repository URL";
    }
  }

  if (!isNotEmpty(formData.contractCount)) {
    errors.contractCount = "Number of contracts is required";
  }

  if (!isNotEmpty(formData.linesOfCode)) {
    errors.linesOfCode = "Code size is required";
  }

  if (!isNotEmpty(formData.auditScope)) {
    errors.auditScope = "Audit scope is required";
  } else if (!meetsMinLength(formData.auditScope, 30)) {
    errors.auditScope = "Please provide a more detailed audit scope (minimum 30 characters)";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

const validateRequirements = (formData: AuditFormData): { isValid: boolean; errors: AuditFormErrors } => {
  const errors: AuditFormErrors = {};

  if (!isNotEmpty(formData.deadline)) {
    errors.deadline = "Timeline is required";
  }

  if (!isNotEmpty(formData.budget)) {
    errors.budget = "Budget range is required";
  }

  // Specific concerns field is optional, no validation needed

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

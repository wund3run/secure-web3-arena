
import { EnhancedValidation } from '../security/enhancedValidation';
import { InputSanitizer } from '../security/inputSanitizer';

export class ProductionValidation {
  // Validate audit request data before submission
  static validateAuditRequest(data: unknown): { isValid: boolean; errors: string[]; sanitizedData?: unknown } {
    const errors: string[] = [];
    const sanitizedData: unknown = {};

    // Validate and sanitize project name
    const projectNameResult = EnhancedValidation.validateText(data.project_name, {
      required: true,
      minLength: 3,
      maxLength: 100
    });
    if (!projectNameResult.isValid) {
      errors.push(...projectNameResult.errors);
    } else {
      sanitizedData.project_name = projectNameResult.sanitizedValue;
    }

    // Validate and sanitize project description
    const descriptionResult = EnhancedValidation.validateText(data.project_description, {
      required: true,
      minLength: 20,
      maxLength: 5000,
      allowHTML: true
    });
    if (!descriptionResult.isValid) {
      errors.push(...descriptionResult.errors);
    } else {
      sanitizedData.project_description = descriptionResult.sanitizedValue;
    }

    // Validate blockchain selection
    if (!data.blockchain?.trim()) {
      errors.push('Blockchain selection is required');
    } else {
      sanitizedData.blockchain = InputSanitizer.sanitizeText(data.blockchain);
    }

    // Validate client ID
    if (!data.client_id) {
      errors.push('User authentication required');
    } else {
      sanitizedData.client_id = data.client_id;
    }

    // Validate budget
    if (data.budget) {
      const budgetResult = EnhancedValidation.validateNumber(data.budget, {
        min: 0,
        max: 10000000
      });
      if (!budgetResult.isValid) {
        errors.push(...budgetResult.errors);
      } else {
        sanitizedData.budget = budgetResult.sanitizedValue;
      }
    }

    // Validate deadline
    if (data.deadline) {
      const deadlineDate = new Date(data.deadline);
      if (deadlineDate < new Date()) {
        errors.push('Deadline must be in the future');
      } else {
        sanitizedData.deadline = data.deadline;
      }
    }

    // Validate repository URL
    if (data.repository_url) {
      const urlResult = EnhancedValidation.validateURL(data.repository_url);
      if (!urlResult.isValid) {
        errors.push(...urlResult.errors);
      } else {
        sanitizedData.repository_url = urlResult.sanitizedValue;
      }
    }

    // Sanitize audit scope and specific concerns
    if (data.audit_scope) {
      sanitizedData.audit_scope = InputSanitizer.sanitizeHTML(data.audit_scope);
    }

    if (data.specific_concerns) {
      sanitizedData.specific_concerns = InputSanitizer.sanitizeHTML(data.specific_concerns);
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedData: errors.length === 0 ? sanitizedData : undefined
    };
  }

  // Validate auditor profile data
  static validateAuditorProfile(data: unknown): { isValid: boolean; errors: string[]; sanitizedData?: unknown } {
    const errors: string[] = [];
    const sanitizedData: unknown = {};

    if (!data.user_id) {
      errors.push('User authentication required');
    } else {
      sanitizedData.user_id = data.user_id;
    }

    // Validate years of experience
    if (data.years_experience !== undefined) {
      const expResult = EnhancedValidation.validateNumber(data.years_experience, {
        min: 0,
        max: 50,
        integer: true
      });
      if (!expResult.isValid) {
        errors.push(...expResult.errors);
      } else {
        sanitizedData.years_experience = expResult.sanitizedValue;
      }
    }

    // Validate hourly rates
    if (data.hourly_rate_min && data.hourly_rate_max) {
      const minRate = EnhancedValidation.validateNumber(data.hourly_rate_min, { min: 0, max: 10000 });
      const maxRate = EnhancedValidation.validateNumber(data.hourly_rate_max, { min: 0, max: 10000 });
      
      if (!minRate.isValid || !maxRate.isValid) {
        errors.push('Invalid hourly rate values');
      } else if (minRate.sanitizedValue! > maxRate.sanitizedValue!) {
        errors.push('Minimum hourly rate cannot exceed maximum hourly rate');
      } else {
        sanitizedData.hourly_rate_min = minRate.sanitizedValue;
        sanitizedData.hourly_rate_max = maxRate.sanitizedValue;
      }
    }

    // Validate portfolio URL
    if (data.portfolio_url) {
      const urlResult = EnhancedValidation.validateURL(data.portfolio_url);
      if (!urlResult.isValid) {
        errors.push(...urlResult.errors);
      } else {
        sanitizedData.portfolio_url = urlResult.sanitizedValue;
      }
    }

    // Sanitize text fields
    if (data.bio) {
      sanitizedData.bio = InputSanitizer.sanitizeHTML(data.bio);
    }

    if (data.business_name) {
      sanitizedData.business_name = InputSanitizer.sanitizeText(data.business_name);
    }

    // Sanitize arrays
    if (data.specialization_tags) {
      sanitizedData.specialization_tags = data.specialization_tags.map((tag: string) => 
        InputSanitizer.sanitizeText(tag)
      );
    }

    if (data.blockchain_expertise) {
      sanitizedData.blockchain_expertise = data.blockchain_expertise.map((blockchain: string) => 
        InputSanitizer.sanitizeText(blockchain)
      );
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedData: errors.length === 0 ? sanitizedData : undefined
    };
  }

  // Enhanced email validation
  static isValidEmail(email: string): boolean {
    const result = EnhancedValidation.validateEmail(email);
    return result.isValid;
  }

  // Enhanced URL validation
  static isValidUrl(url: string): boolean {
    const result = EnhancedValidation.validateURL(url);
    return result.isValid;
  }

  // Enhanced input sanitization
  static sanitizeInput(input: string): string {
    return InputSanitizer.sanitizeText(input);
  }

  // Enhanced file upload validation
  static validateFileUpload(file: File, allowedTypes: string[], maxSizeMB: number): { isValid: boolean; error?: string } {
    const result = EnhancedValidation.validateFile(file, {
      allowedTypes,
      maxSizeMB,
      required: true
    });

    return {
      isValid: result.isValid,
      error: result.errors.length > 0 ? result.errors[0] : undefined
    };
  }
}

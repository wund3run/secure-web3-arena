
import { EnhancedValidation } from '../security/enhancedValidation';
import { InputSanitizer } from '../security/inputSanitizer';
import { AuditorProfileData, AuditRequestData } from './types';

export class ProductionValidation {
  // Validate audit request data before submission
    static validateAuditRequest(data: unknown): { isValid: boolean; errors: string[]; sanitizedData?: Partial<AuditRequestData> } {
    const errors: string[] = [];
    const sanitizedData: Partial<AuditRequestData> = {};

    const req = data as Partial<AuditRequestData>;
    // Validate and sanitize project name
    const projectNameResult = EnhancedValidation.validateText(req.project_name, {
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
    const descriptionResult = EnhancedValidation.validateText(req.project_description, {
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
    if (!req.blockchain?.trim()) {
      errors.push('Blockchain selection is required');
    } else {
      sanitizedData.blockchain = InputSanitizer.sanitizeText(req.blockchain!);
    }
    // Validate client ID
    if (!req.client_id) {
      errors.push('User authentication required');
    } else {
      sanitizedData.client_id = req.client_id;
    }
    // Validate budget
    if (req.budget) {
      const budgetResult = EnhancedValidation.validateNumber(req.budget, {
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
    if (req.deadline) {
      const deadlineDate = new Date(req.deadline);
      if (deadlineDate < new Date()) {
        errors.push('Deadline must be in the future');
      } else {
        sanitizedData.deadline = req.deadline;
      }
    }

    // Validate repository URL
    if (req.repository_url) {
      const urlResult = EnhancedValidation.validateURL(req.repository_url);
      if (!urlResult.isValid) {
        errors.push(...urlResult.errors);
      } else {
        sanitizedData.repository_url = urlResult.sanitizedValue;
      }
    }

    if (req.audit_scope) {
      sanitizedData.audit_scope = InputSanitizer.sanitizeHTML(req.audit_scope);
    }
    if (req.specific_concerns) {
      sanitizedData.specific_concerns = InputSanitizer.sanitizeHTML(req.specific_concerns);
    }
    return {
      isValid: errors.length === 0,
      errors,
      sanitizedData: errors.length === 0 ? sanitizedData : undefined
    };
  }

  static validateAuditorProfile(data: unknown): { isValid: boolean; errors: string[]; sanitizedData?: AuditorProfileData } {
    const errors: string[] = [];
    const sanitizedData: AuditorProfileData = {} as AuditorProfileData;
    const profile = data as Partial<AuditorProfileData>;
    if (!profile.user_id) {
      errors.push('User authentication required');
    } else {
      sanitizedData.user_id = profile.user_id;
    }
    // Validate years of experience
    if (profile.years_experience !== undefined) {
        const expResult = EnhancedValidation.validateNumber(profile.years_experience, {
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
      if (profile.hourly_rate_min && profile.hourly_rate_max) {
        const minRate = EnhancedValidation.validateNumber(profile.hourly_rate_min, { min: 0, max: 10000 });
        const maxRate = EnhancedValidation.validateNumber(profile.hourly_rate_max, { min: 0, max: 10000 });
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
      if (profile.portfolio_url) {
        const urlResult = EnhancedValidation.validateURL(profile.portfolio_url);
        if (!urlResult.isValid) {
          errors.push(...urlResult.errors);
        } else {
          sanitizedData.portfolio_url = urlResult.sanitizedValue;
        }
      }
      // Sanitize text fields
      if (profile.bio) {
        sanitizedData.bio = InputSanitizer.sanitizeHTML(profile.bio);
      }
      if (profile.business_name) {
        sanitizedData.business_name = InputSanitizer.sanitizeText(profile.business_name);
      }
      // Sanitize arrays
      if (profile.specialization_tags) {
        sanitizedData.specialization_tags = profile.specialization_tags.map((tag: string) => 
          InputSanitizer.sanitizeText(tag)
        );
      }
      if (profile.blockchain_expertise) {
        sanitizedData.blockchain_expertise = profile.blockchain_expertise.map((blockchain: string) => 
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

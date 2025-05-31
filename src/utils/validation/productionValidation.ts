
export class ProductionValidation {
  // Validate audit request data before submission
  static validateAuditRequest(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.project_name?.trim()) {
      errors.push('Project name is required');
    }

    if (!data.blockchain?.trim()) {
      errors.push('Blockchain selection is required');
    }

    if (!data.client_id) {
      errors.push('User authentication required');
    }

    if (data.budget && (isNaN(data.budget) || data.budget <= 0)) {
      errors.push('Budget must be a positive number');
    }

    if (data.deadline && new Date(data.deadline) < new Date()) {
      errors.push('Deadline must be in the future');
    }

    if (data.repository_url && !this.isValidUrl(data.repository_url)) {
      errors.push('Repository URL must be valid');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Validate auditor profile data
  static validateAuditorProfile(data: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.user_id) {
      errors.push('User authentication required');
    }

    if (data.years_experience !== undefined && (isNaN(data.years_experience) || data.years_experience < 0)) {
      errors.push('Years of experience must be a non-negative number');
    }

    if (data.hourly_rate_min && data.hourly_rate_max && data.hourly_rate_min > data.hourly_rate_max) {
      errors.push('Minimum hourly rate cannot exceed maximum hourly rate');
    }

    if (data.portfolio_url && !this.isValidUrl(data.portfolio_url)) {
      errors.push('Portfolio URL must be valid');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Validate email format
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate URL format
  static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  // Sanitize user input
  static sanitizeInput(input: string): string {
    return input
      .trim()
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/[<>]/g, ''); // Remove < and > characters
  }

  // Validate file upload
  static validateFileUpload(file: File, allowedTypes: string[], maxSizeMB: number): { isValid: boolean; error?: string } {
    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: `File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`
      };
    }

    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return {
        isValid: false,
        error: `File size ${(file.size / 1024 / 1024).toFixed(2)}MB exceeds maximum allowed size of ${maxSizeMB}MB`
      };
    }

    return { isValid: true };
  }
}

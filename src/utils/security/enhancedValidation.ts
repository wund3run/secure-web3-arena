
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  sanitizedValue?: any;
}

export interface ValidationOptions {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  allowHTML?: boolean;
  min?: number;
  max?: number;
  integer?: boolean;
  allowedTypes?: string[];
  maxSizeMB?: number;
}

export class EnhancedValidation {
  // Enhanced text validation with XSS protection
  static validateText(input: string, options: ValidationOptions = {}): ValidationResult {
    const errors: string[] = [];
    
    if (options.required && (!input || input.trim().length === 0)) {
      errors.push('This field is required');
      return { isValid: false, errors };
    }

    if (!input) {
      return { isValid: true, errors: [], sanitizedValue: '' };
    }

    if (options.minLength && input.length < options.minLength) {
      errors.push(`Must be at least ${options.minLength} characters`);
    }

    if (options.maxLength && input.length > options.maxLength) {
      errors.push(`Must be no more than ${options.maxLength} characters`);
    }

    if (options.pattern && !options.pattern.test(input)) {
      errors.push('Invalid format');
    }

    // XSS protection
    let sanitizedValue = input;
    if (!options.allowHTML) {
      sanitizedValue = this.sanitizeHTML(input);
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedValue
    };
  }

  // Enhanced email validation
  static validateEmail(email: string): ValidationResult {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errors: string[] = [];

    if (!email || email.trim().length === 0) {
      errors.push('Email is required');
      return { isValid: false, errors };
    }

    if (!emailRegex.test(email)) {
      errors.push('Invalid email format');
    }

    // Check for common email security issues
    if (email.includes('..') || email.startsWith('.') || email.endsWith('.')) {
      errors.push('Invalid email format');
    }

    const sanitizedValue = email.toLowerCase().trim();

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedValue
    };
  }

  // Enhanced URL validation
  static validateURL(url: string): ValidationResult {
    const errors: string[] = [];

    if (!url || url.trim().length === 0) {
      errors.push('URL is required');
      return { isValid: false, errors };
    }

    try {
      const urlObj = new URL(url);
      
      // Only allow HTTP/HTTPS protocols
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        errors.push('Only HTTP and HTTPS URLs are allowed');
      }

      // Prevent localhost/internal IPs in production
      if (urlObj.hostname === 'localhost' || 
          urlObj.hostname.startsWith('127.') ||
          urlObj.hostname.startsWith('192.168.') ||
          urlObj.hostname.startsWith('10.')) {
        errors.push('Internal URLs are not allowed');
      }

    } catch {
      errors.push('Invalid URL format');
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedValue: url.trim()
    };
  }

  // Enhanced number validation
  static validateNumber(input: any, options: ValidationOptions = {}): ValidationResult {
    const errors: string[] = [];
    
    if (options.required && (input === null || input === undefined || input === '')) {
      errors.push('This field is required');
      return { isValid: false, errors };
    }

    const num = Number(input);
    
    if (isNaN(num)) {
      errors.push('Must be a valid number');
      return { isValid: false, errors };
    }

    if (options.integer && !Number.isInteger(num)) {
      errors.push('Must be a whole number');
    }

    if (options.min !== undefined && num < options.min) {
      errors.push(`Must be at least ${options.min}`);
    }

    if (options.max !== undefined && num > options.max) {
      errors.push(`Must be no more than ${options.max}`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedValue: num
    };
  }

  // File validation
  static validateFile(file: File, options: ValidationOptions = {}): ValidationResult {
    const errors: string[] = [];

    if (options.required && !file) {
      errors.push('File is required');
      return { isValid: false, errors };
    }

    if (!file) {
      return { isValid: true, errors: [] };
    }

    if (options.allowedTypes && !options.allowedTypes.includes(file.type)) {
      errors.push(`File type not allowed. Allowed types: ${options.allowedTypes.join(', ')}`);
    }

    if (options.maxSizeMB) {
      const maxSizeBytes = options.maxSizeMB * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        errors.push(`File size must be less than ${options.maxSizeMB}MB`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedValue: file
    };
  }

  // Sanitize HTML to prevent XSS
  private static sanitizeHTML(input: string): string {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  }

  // SQL injection prevention for dynamic queries
  static sanitizeForSQL(input: string): string {
    return input.replace(/['";\\]/g, '');
  }

  // Validate blockchain address
  static validateBlockchainAddress(address: string, blockchain: string): ValidationResult {
    const errors: string[] = [];

    if (!address || address.trim().length === 0) {
      errors.push('Address is required');
      return { isValid: false, errors };
    }

    switch (blockchain.toLowerCase()) {
      case 'ethereum':
        if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
          errors.push('Invalid Ethereum address format');
        }
        break;
      case 'bitcoin':
        if (!/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(address) && 
            !/^bc1[a-z0-9]{39,59}$/.test(address)) {
          errors.push('Invalid Bitcoin address format');
        }
        break;
      default:
        // Generic validation for other blockchains
        if (address.length < 20 || address.length > 100) {
          errors.push('Invalid address length');
        }
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedValue: address.trim()
    };
  }
}

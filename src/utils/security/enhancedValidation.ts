
import { InputSanitizer } from './inputSanitizer';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  sanitizedValue?: any;
  securityLevel: 'low' | 'medium' | 'high';
}

export class EnhancedValidation {
  // Enhanced email validation with security checks
  static validateEmail(email: string): ValidationResult {
    const errors: string[] = [];
    let securityLevel: 'low' | 'medium' | 'high' = 'low';

    if (!email?.trim()) {
      return {
        isValid: false,
        errors: ['Email is required'],
        securityLevel: 'low'
      };
    }

    const sanitizedEmail = InputSanitizer.sanitizeText(email);
    
    // Basic email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      errors.push('Invalid email format');
    }

    // Check for suspicious patterns
    if (sanitizedEmail.includes('script') || sanitizedEmail.includes('<') || sanitizedEmail.includes('>')) {
      errors.push('Email contains invalid characters');
      securityLevel = 'high';
    }

    // Length validation
    if (sanitizedEmail.length > 254) {
      errors.push('Email address too long');
    }

    // Domain validation
    const domain = sanitizedEmail.split('@')[1];
    if (domain && domain.length > 253) {
      errors.push('Email domain too long');
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedValue: errors.length === 0 ? sanitizedEmail : undefined,
      securityLevel
    };
  }

  // Enhanced URL validation
  static validateURL(url: string): ValidationResult {
    const errors: string[] = [];
    let securityLevel: 'low' | 'medium' | 'high' = 'low';

    if (!url?.trim()) {
      return {
        isValid: false,
        errors: ['URL is required'],
        securityLevel: 'low'
      };
    }

    const sanitizedUrl = InputSanitizer.sanitizeText(url);

    try {
      const urlObj = new URL(sanitizedUrl);
      
      // Only allow HTTPS and HTTP
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        errors.push('Only HTTP and HTTPS URLs are allowed');
        securityLevel = 'high';
      }

      // Check for suspicious schemes
      if (['javascript:', 'data:', 'vbscript:', 'file:'].includes(urlObj.protocol)) {
        errors.push('URL scheme not allowed');
        securityLevel = 'high';
      }

      // Length validation
      if (sanitizedUrl.length > 2048) {
        errors.push('URL too long');
      }

    } catch {
      errors.push('Invalid URL format');
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedValue: errors.length === 0 ? sanitizedUrl : undefined,
      securityLevel
    };
  }

  // Enhanced text validation
  static validateText(text: string, options: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    allowHTML?: boolean;
  } = {}): ValidationResult {
    const errors: string[] = [];
    let securityLevel: 'low' | 'medium' | 'high' = 'low';

    if (!text && options.required) {
      return {
        isValid: false,
        errors: ['This field is required'],
        securityLevel: 'low'
      };
    }

    if (!text) {
      return {
        isValid: true,
        errors: [],
        sanitizedValue: '',
        securityLevel: 'low'
      };
    }

    // Sanitize based on HTML allowance
    const sanitizedText = options.allowHTML 
      ? InputSanitizer.sanitizeHTML(text)
      : InputSanitizer.sanitizeText(text);

    // Length validation
    if (options.minLength && sanitizedText.length < options.minLength) {
      errors.push(`Minimum length is ${options.minLength} characters`);
    }

    if (options.maxLength && sanitizedText.length > options.maxLength) {
      errors.push(`Maximum length is ${options.maxLength} characters`);
    }

    // Security pattern detection
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,
      /data:text\/html/i
    ];

    if (suspiciousPatterns.some(pattern => pattern.test(text))) {
      errors.push('Text contains potentially unsafe content');
      securityLevel = 'high';
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedValue: errors.length === 0 ? sanitizedText : undefined,
      securityLevel
    };
  }

  // Enhanced number validation
  static validateNumber(value: any, options: {
    min?: number;
    max?: number;
    integer?: boolean;
    required?: boolean;
  } = {}): ValidationResult {
    const errors: string[] = [];

    if (value === null || value === undefined || value === '') {
      if (options.required) {
        return {
          isValid: false,
          errors: ['This field is required'],
          securityLevel: 'low'
        };
      }
      return {
        isValid: true,
        errors: [],
        securityLevel: 'low'
      };
    }

    const num = Number(value);
    
    if (isNaN(num) || !isFinite(num)) {
      errors.push('Must be a valid number');
    } else {
      if (options.integer && !Number.isInteger(num)) {
        errors.push('Must be a whole number');
      }

      if (options.min !== undefined && num < options.min) {
        errors.push(`Must be at least ${options.min}`);
      }

      if (options.max !== undefined && num > options.max) {
        errors.push(`Must be no more than ${options.max}`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedValue: errors.length === 0 ? num : undefined,
      securityLevel: 'low'
    };
  }

  // File validation with security checks
  static validateFile(file: File, options: {
    allowedTypes?: string[];
    maxSizeMB?: number;
    required?: boolean;
  } = {}): ValidationResult {
    const errors: string[] = [];
    let securityLevel: 'low' | 'medium' | 'high' = 'low';

    if (!file && options.required) {
      return {
        isValid: false,
        errors: ['File is required'],
        securityLevel: 'low'
      };
    }

    if (!file) {
      return {
        isValid: true,
        errors: [],
        securityLevel: 'low'
      };
    }

    const validation = InputSanitizer.validateFileUpload(file);
    
    if (!validation.isValid) {
      errors.push(validation.error!);
      securityLevel = 'high';
    }

    // Additional type checking
    if (options.allowedTypes && !options.allowedTypes.includes(file.type)) {
      errors.push('File type not allowed');
      securityLevel = 'medium';
    }

    // Size checking
    const maxBytes = (options.maxSizeMB || 10) * 1024 * 1024;
    if (file.size > maxBytes) {
      errors.push(`File size must be less than ${options.maxSizeMB || 10}MB`);
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedValue: errors.length === 0 ? file : undefined,
      securityLevel
    };
  }
}

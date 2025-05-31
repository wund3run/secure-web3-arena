
import { InputSanitizer } from './inputSanitizer';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  sanitizedValue?: any;
}

export class EnhancedValidation {
  /**
   * Validates and sanitizes email input
   */
  static validateEmail(email: string): ValidationResult {
    const sanitized = InputSanitizer.sanitizeText(email);
    const errors: string[] = [];
    
    if (!sanitized) {
      errors.push('Email is required');
      return { isValid: false, errors };
    }
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(sanitized)) {
      errors.push('Please enter a valid email address');
    }
    
    if (sanitized.length > 254) {
      errors.push('Email address is too long');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      sanitizedValue: sanitized
    };
  }

  /**
   * Validates and sanitizes URL input
   */
  static validateURL(url: string, required: boolean = false): ValidationResult {
    const errors: string[] = [];
    
    if (!url) {
      if (required) {
        errors.push('URL is required');
      }
      return { isValid: !required, errors, sanitizedValue: '' };
    }
    
    const sanitized = InputSanitizer.sanitizeURL(url);
    
    if (!sanitized) {
      errors.push('Invalid URL format or protocol');
      return { isValid: false, errors };
    }
    
    try {
      new URL(sanitized);
    } catch {
      errors.push('Please enter a valid URL');
    }
    
    if (sanitized.length > 2048) {
      errors.push('URL is too long');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      sanitizedValue: sanitized
    };
  }

  /**
   * Validates and sanitizes text input
   */
  static validateText(text: string, options: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    allowHTML?: boolean;
  } = {}): ValidationResult {
    const { required = false, minLength = 0, maxLength = 10000, allowHTML = false } = options;
    const errors: string[] = [];
    
    if (!text) {
      if (required) {
        errors.push('This field is required');
      }
      return { isValid: !required, errors, sanitizedValue: '' };
    }
    
    const sanitized = allowHTML ? InputSanitizer.sanitizeHTML(text) : InputSanitizer.sanitizeText(text);
    
    if (sanitized.length < minLength) {
      errors.push(`Must be at least ${minLength} characters long`);
    }
    
    if (sanitized.length > maxLength) {
      errors.push(`Must be no more than ${maxLength} characters long`);
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      sanitizedValue: sanitized
    };
  }

  /**
   * Validates numeric input with range checking
   */
  static validateNumber(value: any, options: {
    required?: boolean;
    min?: number;
    max?: number;
    integer?: boolean;
  } = {}): ValidationResult {
    const { required = false, min, max, integer = false } = options;
    const errors: string[] = [];
    
    if (value === null || value === undefined || value === '') {
      if (required) {
        errors.push('This field is required');
      }
      return { isValid: !required, errors, sanitizedValue: null };
    }
    
    const num = Number(value);
    
    if (isNaN(num)) {
      errors.push('Please enter a valid number');
      return { isValid: false, errors };
    }
    
    if (integer && !Number.isInteger(num)) {
      errors.push('Please enter a whole number');
    }
    
    if (min !== undefined && num < min) {
      errors.push(`Must be at least ${min}`);
    }
    
    if (max !== undefined && num > max) {
      errors.push(`Must be no more than ${max}`);
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      sanitizedValue: num
    };
  }

  /**
   * Validates file uploads
   */
  static validateFile(file: File, options: {
    allowedTypes?: string[];
    maxSizeMB?: number;
    required?: boolean;
  } = {}): ValidationResult {
    const { allowedTypes = [], maxSizeMB = 10, required = false } = options;
    const errors: string[] = [];
    
    if (!file) {
      if (required) {
        errors.push('File is required');
      }
      return { isValid: !required, errors };
    }
    
    // Validate file type
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      errors.push(`File type ${file.type} is not allowed. Allowed types: ${allowedTypes.join(', ')}`);
    }
    
    // Validate file size
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      errors.push(`File size ${(file.size / 1024 / 1024).toFixed(2)}MB exceeds maximum allowed size of ${maxSizeMB}MB`);
    }
    
    // Validate file name
    const sanitizedName = InputSanitizer.sanitizeFileName(file.name);
    if (!sanitizedName) {
      errors.push('Invalid file name');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      sanitizedValue: file
    };
  }
}

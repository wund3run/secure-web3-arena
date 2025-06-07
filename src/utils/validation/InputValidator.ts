
import DOMPurify from 'dompurify';

export class InputValidator {
  private static emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private static urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
  private static sqlInjectionPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/i,
    /(--|\*\/|\/\*)/,
    /('|(\\')|(;|%3B)|(--)|(%2D%2D))/
  ];

  static sanitizeHtml(input: string): string {
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
      ALLOWED_ATTR: []
    });
  }

  static validateEmail(email: string): { isValid: boolean; error?: string } {
    if (!email) {
      return { isValid: false, error: 'Email is required' };
    }
    
    if (!this.emailRegex.test(email)) {
      return { isValid: false, error: 'Invalid email format' };
    }

    if (email.length > 254) {
      return { isValid: false, error: 'Email too long' };
    }

    return { isValid: true };
  }

  static validateUrl(url: string): { isValid: boolean; error?: string } {
    if (!url) {
      return { isValid: false, error: 'URL is required' };
    }

    if (!this.urlRegex.test(url)) {
      return { isValid: false, error: 'Invalid URL format' };
    }

    return { isValid: true };
  }

  static validatePassword(password: string): { isValid: boolean; error?: string; strength: number } {
    if (!password) {
      return { isValid: false, error: 'Password is required', strength: 0 };
    }

    if (password.length < 8) {
      return { isValid: false, error: 'Password must be at least 8 characters', strength: 0 };
    }

    let strength = 0;
    
    // Check for lowercase
    if (/[a-z]/.test(password)) strength++;
    
    // Check for uppercase
    if (/[A-Z]/.test(password)) strength++;
    
    // Check for numbers
    if (/\d/.test(password)) strength++;
    
    // Check for special characters
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    
    // Check for length bonus
    if (password.length >= 12) strength++;

    const isValid = strength >= 3;
    const error = isValid ? undefined : 'Password must contain at least 3 of: lowercase, uppercase, numbers, special characters';

    return { isValid, error, strength };
  }

  static checkForSqlInjection(input: string): boolean {
    return this.sqlInjectionPatterns.some(pattern => pattern.test(input));
  }

  static sanitizeInput(input: string): string {
    // Remove potential XSS
    let sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    // Remove SQL injection patterns
    this.sqlInjectionPatterns.forEach(pattern => {
      sanitized = sanitized.replace(pattern, '');
    });

    // Trim and normalize whitespace
    sanitized = sanitized.trim().replace(/\s+/g, ' ');

    return sanitized;
  }

  static validateFileUpload(file: File): { isValid: boolean; error?: string } {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'text/plain',
      'application/json'
    ];

    if (file.size > maxSize) {
      return { isValid: false, error: 'File too large (max 10MB)' };
    }

    if (!allowedTypes.includes(file.type)) {
      return { isValid: false, error: 'File type not allowed' };
    }

    // Check for potentially dangerous file extensions
    const dangerousExtensions = /\.(exe|bat|cmd|scr|pif|jar|com|dll)$/i;
    if (dangerousExtensions.test(file.name)) {
      return { isValid: false, error: 'File type not allowed' };
    }

    return { isValid: true };
  }
}

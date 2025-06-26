
import DOMPurify from 'dompurify';

export class InputSanitizer {
  // Configure DOMPurify with secure defaults
  private static purifyConfig = {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
    RETURN_DOM_IMPORT: false,
    SANITIZE_DOM: true
  };

  // Enhanced HTML sanitization
  static sanitizeHTML(input: string, allowTags: string[] = []): string {
    const config = {
      ...this.purifyConfig,
      ALLOWED_TAGS: allowTags.length > 0 ? allowTags : this.purifyConfig.ALLOWED_TAGS
    };
    
    return DOMPurify.sanitize(input, config);
  }

  // Basic text sanitization
  static sanitizeText(input: string): string {
    return input
      .trim()
      .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
      .replace(/[<>]/g, '') // Remove angle brackets
      .substring(0, 10000); // Limit length
  }

  // Sanitize JSON input
  static sanitizeJSON(input: any): any {
    if (typeof input === 'string') {
      return this.sanitizeText(input);
    }
    
    if (Array.isArray(input)) {
      return input.map(item => this.sanitizeJSON(item));
    }
    
    if (typeof input === 'object' && input !== null) {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(input)) {
        sanitized[this.sanitizeText(key)] = this.sanitizeJSON(value);
      }
      return sanitized;
    }
    
    return input;
  }

  // Validate and sanitize file uploads
  static validateFileUpload(file: File): { isValid: boolean; error?: string; sanitizedName?: string } {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf', 'text/plain', 'application/json'
    ];
    
    const dangerousExtensions = /\.(exe|bat|cmd|scr|pif|jar|com|dll|sh|ps1|vbs)$/i;
    
    if (file.size > maxSize) {
      return { isValid: false, error: 'File size exceeds 10MB limit' };
    }
    
    if (!allowedTypes.includes(file.type)) {
      return { isValid: false, error: 'File type not allowed' };
    }
    
    if (dangerousExtensions.test(file.name)) {
      return { isValid: false, error: 'File extension not allowed' };
    }
    
    // Sanitize filename
    const sanitizedName = file.name
      .replace(/[^\w.-]/g, '_')
      .replace(/_{2,}/g, '_')
      .substring(0, 255);
    
    return { isValid: true, sanitizedName };
  }
}

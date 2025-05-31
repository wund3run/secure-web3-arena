import DOMPurify from 'dompurify';

export class InputSanitizer {
  /**
   * Sanitizes HTML content to prevent XSS attacks
   */
  static sanitizeHTML(input: string): string {
    if (!input) return '';
    
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li'],
      ALLOWED_ATTR: [],
      KEEP_CONTENT: true,
      RETURN_DOM: false,
      RETURN_DOM_FRAGMENT: false
    });
  }

  /**
   * Sanitizes plain text input by removing HTML tags and script content
   */
  static sanitizeText(input: string): string {
    if (!input) return '';
    
    return input
      .trim()
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
      .replace(/<[^>]*>/g, '') // Remove all HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+\s*=/gi, ''); // Remove event handlers
  }

  /**
   * Sanitizes URLs to prevent protocol-based attacks
   */
  static sanitizeURL(url: string): string {
    if (!url) return '';
    
    const trimmedUrl = url.trim();
    
    // Allow only http, https, and relative URLs
    const allowedProtocols = /^(https?:\/\/|\/)/i;
    
    if (!allowedProtocols.test(trimmedUrl)) {
      return '';
    }
    
    // Remove dangerous protocols
    return trimmedUrl.replace(/javascript:|data:|vbscript:/gi, '');
  }

  /**
   * Validates and sanitizes file names
   */
  static sanitizeFileName(fileName: string): string {
    if (!fileName) return '';
    
    return fileName
      .replace(/[<>:"/\\|?*]/g, '') // Remove invalid file name characters
      .replace(/\.\./g, '') // Remove directory traversal attempts
      .trim();
  }

  /**
   * Sanitizes JSON input to prevent injection
   */
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
}

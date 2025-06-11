
export class InputSanitizer {
  // Sanitize text input to prevent XSS
  static sanitizeText(input: string): string {
    if (!input) return '';
    
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove angle brackets
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove event handlers
      .replace(/data:/gi, ''); // Remove data: protocol
  }

  // Sanitize HTML content while preserving safe tags
  static sanitizeHTML(input: string): string {
    if (!input) return '';

    const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    const allowedAttributes = ['class', 'id'];

    // Create a temporary element to parse HTML
    const temp = document.createElement('div');
    temp.innerHTML = input;

    // Remove all script tags
    const scripts = temp.querySelectorAll('script');
    scripts.forEach(script => script.remove());

    // Remove all style tags
    const styles = temp.querySelectorAll('style');
    styles.forEach(style => style.remove());

    // Process all elements
    const allElements = temp.querySelectorAll('*');
    allElements.forEach(element => {
      // Remove disallowed tags
      if (!allowedTags.includes(element.tagName.toLowerCase())) {
        element.replaceWith(...element.childNodes);
        return;
      }

      // Remove disallowed attributes
      const attributes = Array.from(element.attributes);
      attributes.forEach(attr => {
        if (!allowedAttributes.includes(attr.name.toLowerCase())) {
          element.removeAttribute(attr.name);
        }
      });

      // Remove event handlers
      const eventAttributes = attributes.filter(attr => 
        attr.name.toLowerCase().startsWith('on')
      );
      eventAttributes.forEach(attr => {
        element.removeAttribute(attr.name);
      });
    });

    return temp.innerHTML;
  }

  // Sanitize for SQL (though we should use parameterized queries)
  static sanitizeSQL(input: string): string {
    if (!input) return '';
    
    return input
      .replace(/['";\\]/g, '') // Remove quotes and backslashes
      .replace(/--/g, '') // Remove SQL comments
      .replace(/\/\*/g, '') // Remove multi-line comment start
      .replace(/\*\//g, '') // Remove multi-line comment end
      .replace(/\bDROP\b/gi, '') // Remove DROP keyword
      .replace(/\bDELETE\b/gi, '') // Remove DELETE keyword
      .replace(/\bUPDATE\b/gi, '') // Remove UPDATE keyword
      .replace(/\bINSERT\b/gi, '') // Remove INSERT keyword
      .replace(/\bALTER\b/gi, '') // Remove ALTER keyword
      .replace(/\bCREATE\b/gi, '') // Remove CREATE keyword
      .replace(/\bTRUNCATE\b/gi, ''); // Remove TRUNCATE keyword
  }

  // Sanitize file names
  static sanitizeFileName(fileName: string): string {
    if (!fileName) return '';
    
    return fileName
      .replace(/[^a-zA-Z0-9.-]/g, '_') // Replace special chars with underscore
      .replace(/\.{2,}/g, '.') // Replace multiple dots with single dot
      .replace(/^\./, '') // Remove leading dot
      .substring(0, 255); // Limit length
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
        const sanitizedKey = this.sanitizeText(key);
        sanitized[sanitizedKey] = this.sanitizeJSON(value);
      }
      return sanitized;
    }
    
    return input;
  }

  // Remove potential path traversal attacks
  static sanitizePath(path: string): string {
    if (!path) return '';
    
    return path
      .replace(/\.\./g, '') // Remove parent directory references
      .replace(/[\\:*?"<>|]/g, '') // Remove invalid path characters
      .replace(/^\/+/, '') // Remove leading slashes
      .replace(/\/+/g, '/'); // Replace multiple slashes with single slash
  }

  // Sanitize URLs to prevent redirect attacks
  static sanitizeURL(url: string): string {
    if (!url) return '';
    
    try {
      const urlObj = new URL(url);
      
      // Only allow HTTP and HTTPS
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        return '';
      }
      
      // Remove dangerous characters from pathname
      urlObj.pathname = urlObj.pathname.replace(/[<>'"]/g, '');
      
      return urlObj.toString();
    } catch {
      return '';
    }
  }

  // Sanitize phone numbers
  static sanitizePhoneNumber(phone: string): string {
    if (!phone) return '';
    
    return phone
      .replace(/[^\d+()-\s]/g, '') // Keep only digits, plus, parentheses, hyphens, and spaces
      .trim();
  }

  // Sanitize credit card numbers (for logging/display, not storage)
  static sanitizeCreditCard(cardNumber: string): string {
    if (!cardNumber) return '';
    
    const digits = cardNumber.replace(/\D/g, '');
    if (digits.length < 4) return '****';
    
    return '**** **** **** ' + digits.slice(-4);
  }
}

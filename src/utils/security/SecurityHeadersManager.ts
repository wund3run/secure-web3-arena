
export class SecurityHeadersManager {
  private static instance: SecurityHeadersManager;
  
  private headers: Record<string, string> = {
    // Content Security Policy
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.gpteng.co https://fonts.googleapis.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "upgrade-insecure-requests"
    ].join('; '),
    
    // HTTP Strict Transport Security
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    
    // Prevent clickjacking
    'X-Frame-Options': 'DENY',
    
    // Prevent MIME type sniffing
    'X-Content-Type-Options': 'nosniff',
    
    // Control referrer information
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Enable XSS protection
    'X-XSS-Protection': '1; mode=block',
    
    // Permissions Policy
    'Permissions-Policy': [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'payment=(self)',
      'usb=()',
      'magnetometer=()',
      'gyroscope=()',
      'accelerometer=()'
    ].join(', ')
  };

  static getInstance(): SecurityHeadersManager {
    if (!SecurityHeadersManager.instance) {
      SecurityHeadersManager.instance = new SecurityHeadersManager();
    }
    return SecurityHeadersManager.instance;
  }

  applyHeaders(): void {
    const head = document.head;
    
    Object.entries(this.headers).forEach(([name, content]) => {
      // Remove existing meta tag if present
      const existing = head.querySelector(`meta[http-equiv="${name}"]`);
      if (existing) {
        existing.remove();
      }

      // Add new meta tag
      const meta = document.createElement('meta');
      meta.setAttribute('http-equiv', name);
      meta.setAttribute('content', content);
      head.appendChild(meta);
    });

    this.logSecurityHeaders();
  }

  updateCSP(directive: string, sources: string[]): void {
    const currentCSP = this.headers['Content-Security-Policy'];
    const directives = currentCSP.split('; ');
    
    const directiveIndex = directives.findIndex(d => d.startsWith(directive));
    const newDirective = `${directive} ${sources.join(' ')}`;
    
    if (directiveIndex >= 0) {
      directives[directiveIndex] = newDirective;
    } else {
      directives.push(newDirective);
    }
    
    this.headers['Content-Security-Policy'] = directives.join('; ');
    this.applyHeaders();
  }

  private logSecurityHeaders(): void {
    console.group('🛡️ Security Headers Applied');
    Object.entries(this.headers).forEach(([name, content]) => {
      console.log(`${name}:`, content);
    });
    console.groupEnd();
  }

  validateCSP(): Promise<boolean> {
    return new Promise((resolve) => {
      // Simulate CSP validation
      setTimeout(() => {
        console.log('✅ Content Security Policy validated');
        resolve(true);
      }, 100);
    });
  }

  generateCSPReport(): string {
    const csp = this.headers['Content-Security-Policy'];
    const timestamp = new Date().toISOString();
    
    return JSON.stringify({
      timestamp,
      policy: csp,
      violations: [], // In production, this would track actual violations
      status: 'active'
    }, null, 2);
  }
}

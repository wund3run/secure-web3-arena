
export class EnhancedCSP {
  private static readonly NONCE = Math.random().toString(36).substring(2);
  
  private static readonly CSP_DIRECTIVES = {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      `'nonce-${EnhancedCSP.NONCE}'`,
      "https://js.stripe.com",
      "https://maps.googleapis.com"
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'", // Required for Tailwind
      "https://fonts.googleapis.com"
    ],
    'font-src': [
      "'self'",
      "https://fonts.gstatic.com"
    ],
    'img-src': [
      "'self'",
      "data:",
      "https:",
      "blob:"
    ],
    'connect-src': [
      "'self'",
      "https://*.supabase.co",
      "wss://*.supabase.co",
      "https://api.stripe.com"
    ],
    'frame-src': [
      "'self'",
      "https://js.stripe.com"
    ],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
    'upgrade-insecure-requests': [],
    'block-all-mixed-content': []
  };

  static generateCSP(): string {
    return Object.entries(EnhancedCSP.CSP_DIRECTIVES)
      .map(([directive, sources]) => 
        sources.length > 0 ? `${directive} ${sources.join(' ')}` : directive
      )
      .join('; ');
  }

  static applyHeaders(): void {
    const csp = EnhancedCSP.generateCSP();
    
    // Apply CSP via meta tag
    const cspMeta = document.createElement('meta');
    cspMeta.httpEquiv = 'Content-Security-Policy';
    cspMeta.content = csp;
    document.head.appendChild(cspMeta);

    // Additional security headers
    const securityHeaders = [
      { name: 'X-Content-Type-Options', content: 'nosniff' },
      { name: 'X-Frame-Options', content: 'DENY' },
      { name: 'X-XSS-Protection', content: '1; mode=block' },
      { name: 'Referrer-Policy', content: 'strict-origin-when-cross-origin' },
      { name: 'Permissions-Policy', content: 'camera=(), microphone=(), geolocation=(), payment=(self)' }
    ];

    securityHeaders.forEach(header => {
      const existing = document.head.querySelector(`meta[http-equiv="${header.name}"]`);
      if (existing) existing.remove();

      const metaTag = document.createElement('meta');
      metaTag.setAttribute('http-equiv', header.name);
      metaTag.content = header.content;
      document.head.appendChild(metaTag);
    });

    console.log('🛡️ Enhanced security headers applied');
  }

  static getNonce(): string {
    return EnhancedCSP.NONCE;
  }

  // Report CSP violations
  static setupViolationReporting(): void {
    document.addEventListener('securitypolicyviolation', (event) => {
      console.warn('🚨 CSP Violation:', {
        blockedURI: event.blockedURI,
        violatedDirective: event.violatedDirective,
        originalPolicy: event.originalPolicy,
        documentURI: event.documentURI
      });

      // In production, send to monitoring service
      if (process.env.NODE_ENV === 'production') {
        fetch('/api/csp-violation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            blockedURI: event.blockedURI,
            violatedDirective: event.violatedDirective,
            documentURI: event.documentURI,
            timestamp: new Date().toISOString()
          })
        }).catch(console.error);
      }
    });
  }
}

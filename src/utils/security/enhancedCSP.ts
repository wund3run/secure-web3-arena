
export class EnhancedCSP {
  private static readonly NONCE = Math.random().toString(36).substring(2);
  
  private static readonly CSP_DIRECTIVES = {
    'default-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
    'script-src': [
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      "https://cdn.gpteng.co",
      "https://js.stripe.com",
      "https://maps.googleapis.com",
      "https://fonts.googleapis.com"
    ],
    'style-src': [
      "'self'",
      "'unsafe-inline'",
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
      "https://api.stripe.com",
      "https://cdn.gpteng.co"
    ],
    'frame-src': [
      "'self'",
      "https://js.stripe.com"
    ],
    'object-src': ["'none'"],
    'base-uri': ["'self'"]
  };

  static generateCSP(): string {
    return Object.entries(EnhancedCSP.CSP_DIRECTIVES)
      .map(([directive, sources]) => 
        sources.length > 0 ? `${directive} ${sources.join(' ')}` : directive
      )
      .join('; ');
  }

  static applyHeaders(): void {
    // Skip CSP application in development to avoid blocking issues
    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 CSP disabled in development mode');
      return;
    }

    const csp = EnhancedCSP.generateCSP();
    
    // Apply CSP via meta tag
    const cspMeta = document.createElement('meta');
    cspMeta.httpEquiv = 'Content-Security-Policy';
    cspMeta.content = csp;
    document.head.appendChild(cspMeta);

    console.log('🛡️ Security headers applied');
  }

  static getNonce(): string {
    return EnhancedCSP.NONCE;
  }

  static setupViolationReporting(): void {
    // Only setup violation reporting in production
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    document.addEventListener('securitypolicyviolation', (event) => {
      console.warn('🚨 CSP Violation:', {
        blockedURI: event.blockedURI,
        violatedDirective: event.violatedDirective,
        originalPolicy: event.originalPolicy,
        documentURI: event.documentURI
      });
    });
  }
}

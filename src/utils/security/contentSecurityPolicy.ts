
// Enhanced Content Security Policy configuration
export const enhancedCSP = {
  directives: {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      "'unsafe-inline'", // Required for React
      "'unsafe-eval'", // Required for development
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
      "https://api.stripe.com",
      "https://api.openai.com"
    ],
    'frame-src': [
      "'self'",
      "https://js.stripe.com"
    ],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
    'upgrade-insecure-requests': []
  }
};

export const applyEnhancedSecurityHeaders = (): void => {
  // Apply CSP
  const cspString = Object.entries(enhancedCSP.directives)
    .map(([directive, sources]) => 
      sources.length > 0 ? `${directive} ${sources.join(' ')}` : directive
    )
    .join('; ');

  const cspMeta = document.createElement('meta');
  cspMeta.httpEquiv = 'Content-Security-Policy';
  cspMeta.content = cspString;
  document.head.appendChild(cspMeta);

  // Additional security headers
  const securityHeaders = [
    { name: 'X-Content-Type-Options', content: 'nosniff' },
    { name: 'X-Frame-Options', content: 'DENY' },
    { name: 'X-XSS-Protection', content: '1; mode=block' },
    { name: 'Referrer-Policy', content: 'strict-origin-when-cross-origin' },
    { name: 'Permissions-Policy', content: 'geolocation=(), microphone=(), camera=()' }
  ];

  securityHeaders.forEach(header => {
    const metaTag = document.createElement('meta');
    metaTag.setAttribute('http-equiv', header.name);
    metaTag.content = header.content;
    document.head.appendChild(metaTag);
  });
};

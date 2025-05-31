
/**
 * Security headers configuration for enhanced protection
 */
export const securityHeaders = {
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
    "base-uri 'self'"
  ].join('; '),
  
  // Prevent clickjacking
  'X-Frame-Options': 'DENY',
  
  // Prevent MIME type sniffing
  'X-Content-Type-Options': 'nosniff',
  
  // Control referrer information
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Enable XSS protection
  'X-XSS-Protection': '1; mode=block'
};

/**
 * Apply security headers to the document
 */
export const applySecurityHeaders = () => {
  // Add meta tags for security headers that can be set via HTML
  const head = document.head;
  
  // Content Security Policy
  const cspMeta = document.createElement('meta');
  cspMeta.setAttribute('http-equiv', 'Content-Security-Policy');
  cspMeta.setAttribute('content', securityHeaders['Content-Security-Policy']);
  head.appendChild(cspMeta);
  
  // Referrer Policy
  const referrerMeta = document.createElement('meta');
  referrerMeta.setAttribute('name', 'referrer');
  referrerMeta.setAttribute('content', 'strict-origin-when-cross-origin');
  head.appendChild(referrerMeta);
};

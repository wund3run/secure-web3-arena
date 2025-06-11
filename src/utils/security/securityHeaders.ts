
export const applySecurityHeaders = (): void => {
  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://maps.googleapis.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://*.supabase.co https://api.stripe.com https://api.openai.com",
    "frame-src 'self' https://js.stripe.com",
    "object-src 'none'",
    "base-uri 'self'"
  ].join('; ');

  const meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  meta.content = csp;
  document.head.appendChild(meta);

  // Additional security headers via meta tags
  const securityHeaders = [
    { name: 'X-Content-Type-Options', content: 'nosniff' },
    { name: 'X-Frame-Options', content: 'DENY' },
    { name: 'X-XSS-Protection', content: '1; mode=block' },
    { name: 'Referrer-Policy', content: 'strict-origin-when-cross-origin' }
  ];

  securityHeaders.forEach(header => {
    const metaTag = document.createElement('meta');
    metaTag.setAttribute('http-equiv', header.name);
    metaTag.content = header.content;
    document.head.appendChild(metaTag);
  });
};

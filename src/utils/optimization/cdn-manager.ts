
/**
 * CDN and external resource management
 */
export class CDNManager {
  /**
   * Prepare for CDN integration
   */
  prepareCDNAssets(): void {
    const staticAssets = [
      '/src/assets/hawkly-logo.svg',
      '/src/assets/hawkly-logo-dark.svg',
      '/src/assets/hawkly-logo-light.svg'
    ];

    // Add CDN hints for external resources
    const cdnHints = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];

    cdnHints.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });

    // Preconnect to likely CDN domains
    const preconnectDomains = [
      'https://cdn.jsdelivr.net',
      'https://unpkg.com'
    ];

    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }
}

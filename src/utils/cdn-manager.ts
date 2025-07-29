
export class CDNManager {
  private static cdnUrl = 'https://cdn.hawkly.dev';
  
  static getAssetUrl(path: string): string {
    if (path.startsWith('http')) return path;
    return `${this.cdnUrl}${path.startsWith('/') ? '' : '/'}${path}`;
  }
  
  static preloadCriticalAssets(): void {
    const criticalAssets = [
      '/assets/hawkly-logo.svg',
      '/assets/hawkly-logo-dark.svg',
      '/assets/hawkly-logo-light.svg'
    ];
    
    criticalAssets.forEach(asset => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = this.getAssetUrl(asset);
      document.head.appendChild(link);
    });
  }
  
  static setupDNSPrefetch(): void {
    const domains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://cdn.jsdelivr.net'
    ];
    
    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });
  }
}

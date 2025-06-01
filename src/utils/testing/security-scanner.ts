
export interface SecurityIssue {
  type: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  recommendation: string;
  element?: string;
  timestamp: number;
}

export class SecurityScanner {
  scanPage(): SecurityIssue[] {
    const issues: SecurityIssue[] = [];
    
    // Check for common security issues
    this.checkForMissingCSP(issues);
    this.checkForInsecureLinks(issues);
    this.checkForSensitiveDataExposure(issues);
    
    return issues;
  }

  private checkForMissingCSP(issues: SecurityIssue[]) {
    const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (!cspMeta) {
      issues.push({
        type: 'missing-csp',
        severity: 'medium',
        description: 'Content Security Policy (CSP) header is missing',
        recommendation: 'Implement CSP to prevent XSS attacks',
        timestamp: Date.now()
      });
    }
  }

  private checkForInsecureLinks(issues: SecurityIssue[]) {
    const insecureLinks = document.querySelectorAll('a[href^="http://"]');
    if (insecureLinks.length > 0) {
      issues.push({
        type: 'insecure-links',
        severity: 'low',
        description: `Found ${insecureLinks.length} insecure HTTP links`,
        recommendation: 'Use HTTPS for all external links',
        element: `${insecureLinks.length} links`,
        timestamp: Date.now()
      });
    }
  }

  private checkForSensitiveDataExposure(issues: SecurityIssue[]) {
    // Check for potential sensitive data in DOM
    const sensitivePatterns = [
      /api[_-]?key/i,
      /secret/i,
      /password/i,
      /token/i
    ];

    const textContent = document.body.textContent || '';
    sensitivePatterns.forEach(pattern => {
      if (pattern.test(textContent)) {
        issues.push({
          type: 'sensitive-data-exposure',
          severity: 'high',
          description: 'Potential sensitive data found in DOM',
          recommendation: 'Remove sensitive data from client-side code',
          timestamp: Date.now()
        });
      }
    });
  }
}

export const securityScanner = new SecurityScanner();

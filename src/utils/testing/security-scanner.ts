
export interface SecurityIssue {
  type: 'xss' | 'csrf' | 'insecure-content' | 'weak-auth' | 'data-exposure';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  element?: string;
  recommendation: string;
}

export class SecurityScanner {
  private issues: SecurityIssue[] = [];

  scanPage(): SecurityIssue[] {
    this.issues = [];
    
    this.checkXSS();
    this.checkCSRF();
    this.checkInsecureContent();
    this.checkWeakAuthentication();
    this.checkDataExposure();
    
    return this.issues;
  }

  private checkXSS() {
    // Check for potential XSS vulnerabilities
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      const value = (input as HTMLInputElement).value;
      if (value.includes('<script>') || value.includes('javascript:')) {
        this.issues.push({
          type: 'xss',
          severity: 'high',
          description: 'Potential XSS vulnerability detected in input field',
          element: input.tagName + (input.id ? `#${input.id}` : ''),
          recommendation: 'Implement proper input sanitization and validation'
        });
      }
    });
  }

  private checkCSRF() {
    // Check for CSRF protection
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      const csrfToken = form.querySelector('input[name="_token"], input[name="csrf_token"]');
      if (!csrfToken && form.method.toLowerCase() === 'post') {
        this.issues.push({
          type: 'csrf',
          severity: 'medium',
          description: 'Form missing CSRF protection',
          element: 'form',
          recommendation: 'Add CSRF token to all POST forms'
        });
      }
    });
  }

  private checkInsecureContent() {
    // Check for mixed content
    if (location.protocol === 'https:') {
      const httpResources = document.querySelectorAll('[src^="http:"], [href^="http:"]');
      if (httpResources.length > 0) {
        this.issues.push({
          type: 'insecure-content',
          severity: 'medium',
          description: 'Mixed content detected (HTTP resources on HTTPS page)',
          recommendation: 'Use HTTPS for all external resources'
        });
      }
    }
  }

  private checkWeakAuthentication() {
    // Check password field requirements
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    passwordInputs.forEach(input => {
      const minLength = input.getAttribute('minlength');
      if (!minLength || parseInt(minLength) < 8) {
        this.issues.push({
          type: 'weak-auth',
          severity: 'medium',
          description: 'Weak password requirements detected',
          element: 'password input',
          recommendation: 'Enforce minimum password length of 8 characters'
        });
      }
    });
  }

  private checkDataExposure() {
    // Check for exposed sensitive data in localStorage/sessionStorage
    const sensitiveKeys = ['password', 'token', 'key', 'secret'];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
        this.issues.push({
          type: 'data-exposure',
          severity: 'high',
          description: `Potentially sensitive data stored in localStorage: ${key}`,
          recommendation: 'Avoid storing sensitive data in browser storage'
        });
      }
    }
  }

  generateSecurityReport() {
    const issues = this.scanPage();
    
    return {
      summary: {
        totalIssues: issues.length,
        criticalIssues: issues.filter(i => i.severity === 'critical').length,
        highIssues: issues.filter(i => i.severity === 'high').length,
        mediumIssues: issues.filter(i => i.severity === 'medium').length,
        lowIssues: issues.filter(i => i.severity === 'low').length,
      },
      issues,
      recommendations: [...new Set(issues.map(i => i.recommendation))],
    };
  }
}

export const securityScanner = new SecurityScanner();

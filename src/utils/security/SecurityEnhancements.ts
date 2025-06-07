
import { SecurityHeadersManager } from './SecurityHeadersManager';
import { auditLogger } from './AuditLogger';

export class SecurityEnhancements {
  private static instance: SecurityEnhancements;
  private sessionTimeout: number = 30 * 60 * 1000; // 30 minutes
  private sessionCheckInterval: NodeJS.Timeout | null = null;

  static getInstance(): SecurityEnhancements {
    if (!SecurityEnhancements.instance) {
      SecurityEnhancements.instance = new SecurityEnhancements();
    }
    return SecurityEnhancements.instance;
  }

  initialize(): void {
    this.setupSessionManagement();
    this.setupSecurityEventListeners();
    this.initializeRateLimiting();
  }

  private setupSessionManagement(): void {
    // Monitor session activity
    this.sessionCheckInterval = setInterval(() => {
      this.checkSessionTimeout();
    }, 60000); // Check every minute

    // Track user activity
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, () => {
        this.updateLastActivity();
      }, { passive: true });
    });
  }

  private checkSessionTimeout(): void {
    const lastActivity = localStorage.getItem('last_activity');
    if (lastActivity) {
      const timeSinceLastActivity = Date.now() - parseInt(lastActivity);
      if (timeSinceLastActivity > this.sessionTimeout) {
        this.handleSessionTimeout();
      }
    }
  }

  private updateLastActivity(): void {
    localStorage.setItem('last_activity', Date.now().toString());
  }

  private handleSessionTimeout(): void {
    auditLogger.log(
      'user_logout',
      'Session timeout due to inactivity',
      { reason: 'timeout', duration: this.sessionTimeout },
      'medium'
    );

    // Clear session data
    localStorage.removeItem('last_activity');
    sessionStorage.clear();

    // Redirect to login
    window.location.href = '/auth?reason=timeout';
  }

  private setupSecurityEventListeners(): void {
    // Detect potential XSS attempts
    document.addEventListener('securitypolicyviolation', (event) => {
      auditLogger.log(
        'security_violation',
        'CSP violation detected',
        {
          blockedURI: event.blockedURI,
          violatedDirective: event.violatedDirective,
          documentURI: event.documentURI
        },
        'high'
      );
    });

    // Monitor for suspicious activity patterns
    this.monitorSuspiciousActivity();
  }

  private monitorSuspiciousActivity(): void {
    let rapidClickCount = 0;
    let lastClickTime = 0;

    document.addEventListener('click', () => {
      const now = Date.now();
      if (now - lastClickTime < 100) {
        rapidClickCount++;
        if (rapidClickCount > 20) {
          auditLogger.log(
            'security_violation',
            'Rapid clicking detected - possible bot activity',
            { clickCount: rapidClickCount, timeWindow: '10 seconds' },
            'medium'
          );
          rapidClickCount = 0;
        }
      } else {
        rapidClickCount = 0;
      }
      lastClickTime = now;
    });
  }

  private initializeRateLimiting(): void {
    const apiCallCounts = new Map<string, { count: number; lastReset: number }>();
    const originalFetch = window.fetch;

    window.fetch = async (...args) => {
      const url = args[0]?.toString() || '';
      const now = Date.now();
      const minute = Math.floor(now / 60000);

      // Rate limiting per endpoint
      const endpoint = new URL(url, window.location.origin).pathname;
      const current = apiCallCounts.get(endpoint) || { count: 0, lastReset: minute };

      if (current.lastReset !== minute) {
        current.count = 0;
        current.lastReset = minute;
      }

      current.count++;
      apiCallCounts.set(endpoint, current);

      // Alert on excessive requests (100 per minute per endpoint)
      if (current.count > 100) {
        auditLogger.log(
          'security_violation',
          'Rate limit exceeded',
          { endpoint, count: current.count, timeWindow: '1 minute' },
          'high'
        );
      }

      return originalFetch.apply(window, args);
    };
  }

  cleanup(): void {
    if (this.sessionCheckInterval) {
      clearInterval(this.sessionCheckInterval);
    }
  }
}

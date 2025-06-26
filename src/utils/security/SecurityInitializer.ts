
import { EnhancedCSP } from './enhancedCSP';
import { EnhancedSecurityService } from './enhancedSecurityService';
import { SecurityHeadersManager } from './SecurityHeadersManager';
import { auditLogger } from './AuditLogger';

export class SecurityInitializer {
  private static initialized = false;

  static async initialize(): Promise<void> {
    if (SecurityInitializer.initialized) {
      return;
    }

    try {
      console.log('🔒 Initializing security systems...');

      // Apply enhanced CSP and security headers
      EnhancedCSP.applyHeaders();
      EnhancedCSP.setupViolationReporting();

      // Initialize security headers manager
      const headersManager = SecurityHeadersManager.getInstance();
      headersManager.applyHeaders();

      // Setup session monitoring
      SecurityInitializer.setupSessionMonitoring();

      // Setup activity monitoring
      SecurityInitializer.setupActivityMonitoring();

      // Initialize audit logging
      await auditLogger.log(
        'security_initialization',
        'Security systems initialized successfully',
        { 
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href
        },
        'low'
      );

      SecurityInitializer.initialized = true;
      console.log('✅ Security initialization complete');

    } catch (error) {
      console.error('❌ Security initialization failed:', error);
      throw error;
    }
  }

  private static setupSessionMonitoring(): void {
    // Monitor for session changes
    setInterval(async () => {
      const isValid = await EnhancedSecurityService.validateSession();
      if (!isValid) {
        console.warn('⚠️ Invalid session detected');
        // Could trigger logout or session refresh
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    // Track activity for session timeout
    let lastActivity = Date.now();
    const updateActivity = () => {
      lastActivity = Date.now();
      localStorage.setItem('last_activity', lastActivity.toString());
    };

    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, updateActivity, { passive: true });
    });
  }

  private static setupActivityMonitoring(): void {
    // Monitor for suspicious rapid clicks
    let clickCount = 0;
    let clickTimer: NodeJS.Timeout;

    document.addEventListener('click', () => {
      clickCount++;
      
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => {
        if (clickCount > 50) { // More than 50 clicks in 10 seconds
          EnhancedSecurityService.logSecurityEvent(
            'SUSPICIOUS_ACTIVITY',
            'Rapid clicking detected',
            { clickCount, timeWindow: '10 seconds' }
          );
        }
        clickCount = 0;
      }, 10000);
    });

    // Monitor for multiple rapid form submissions
    let submitCount = 0;
    let submitTimer: NodeJS.Timeout;

    document.addEventListener('submit', () => {
      submitCount++;
      
      clearTimeout(submitTimer);
      submitTimer = setTimeout(() => {
        if (submitCount > 10) { // More than 10 submissions in 1 minute
          EnhancedSecurityService.logSecurityEvent(
            'SUSPICIOUS_ACTIVITY',
            'Rapid form submissions detected',
            { submitCount, timeWindow: '1 minute' }
          );
        }
        submitCount = 0;
      }, 60000);
    });
  }

  static getStatus(): { initialized: boolean; timestamp?: string } {
    return {
      initialized: SecurityInitializer.initialized,
      timestamp: SecurityInitializer.initialized ? new Date().toISOString() : undefined
    };
  }
}

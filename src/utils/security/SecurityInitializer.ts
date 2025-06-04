
import { SecurityHeadersManager } from './SecurityHeadersManager';
import { auditLogger } from './AuditLogger';

export class SecurityInitializer {
  private static initialized = false;

  static async initialize(): Promise<void> {
    if (this.initialized) return;

    console.log('🔒 Initializing Hawkly Security Systems...');

    try {
      // Apply security headers
      const headerManager = SecurityHeadersManager.getInstance();
      headerManager.applyHeaders();
      await headerManager.validateCSP();

      // Initialize session monitoring
      this.initializeSessionMonitoring();

      // Initialize security event listeners
      this.initializeSecurityListeners();

      // Log security initialization
      await auditLogger.log(
        'system_configuration_changed',
        'Security systems initialized',
        {
          timestamp: new Date().toISOString(),
          components: ['security_headers', 'audit_logging', 'session_monitoring']
        },
        'medium'
      );

      this.initialized = true;
      console.log('✅ Security systems initialized successfully');

    } catch (error) {
      console.error('❌ Failed to initialize security systems:', error);
      
      await auditLogger.log(
        'security_violation',
        'Security initialization failed',
        { error: error instanceof Error ? error.message : 'Unknown error' },
        'critical'
      );
    }
  }

  private static initializeSessionMonitoring(): void {
    // Generate session ID
    if (!sessionStorage.getItem('hawkly_session_id')) {
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('hawkly_session_id', sessionId);
    }

    // Monitor for session tampering
    const originalSessionId = sessionStorage.getItem('hawkly_session_id');
    
    setInterval(() => {
      const currentSessionId = sessionStorage.getItem('hawkly_session_id');
      if (currentSessionId !== originalSessionId) {
        auditLogger.log(
          'security_violation',
          'Session ID tampering detected',
          {
            original: originalSessionId,
            current: currentSessionId
          },
          'critical'
        );
      }
    }, 30000); // Check every 30 seconds
  }

  private static initializeSecurityListeners(): void {
    // Monitor for console access (potential developer tools usage)
    let devtoolsOpen = false;
    setInterval(() => {
      const threshold = 160;
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtoolsOpen) {
          devtoolsOpen = true;
          auditLogger.log(
            'security_violation',
            'Developer tools detected',
            { 
              viewport: {
                outer: { width: window.outerWidth, height: window.outerHeight },
                inner: { width: window.innerWidth, height: window.innerHeight }
              }
            },
            'medium'
          );
        }
      } else {
        devtoolsOpen = false;
      }
    }, 1000);

    // Monitor for rapid API calls (potential abuse)
    let apiCallCount = 0;
    const originalFetch = window.fetch;
    
    window.fetch = async (...args) => {
      apiCallCount++;
      
      // Reset counter every minute
      setTimeout(() => apiCallCount--, 60000);
      
      // Alert on suspicious activity
      if (apiCallCount > 100) {
        auditLogger.log(
          'security_violation',
          'Excessive API calls detected',
          { callCount: apiCallCount, url: args[0] },
          'high'
        );
      }
      
      return originalFetch.apply(window, args);
    };

    // Monitor for copy/paste in sensitive fields
    document.addEventListener('paste', (event) => {
      const target = event.target as HTMLElement;
      if (target.matches('input[type="password"], input[data-sensitive]')) {
        auditLogger.log(
          'data_access',
          'Paste operation in sensitive field',
          { fieldType: target.getAttribute('type') || 'unknown' },
          'low'
        );
      }
    });

    // Monitor for page visibility changes (potential security concern)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        auditLogger.log(
          'data_access',
          'Page became hidden',
          { timestamp: new Date().toISOString() },
          'low'
        );
      }
    });
  }

  static getSecurityStatus(): {
    initialized: boolean;
    timestamp: string;
    components: string[];
  } {
    return {
      initialized: this.initialized,
      timestamp: new Date().toISOString(),
      components: this.initialized 
        ? ['security_headers', 'audit_logging', 'session_monitoring', 'security_listeners']
        : []
    };
  }
}

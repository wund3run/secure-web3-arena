
import { EnhancedCSP } from './enhancedCSP';
import { SecurityHeadersManager } from './SecurityHeadersManager';

export class SecurityInitializer {
  private static initialized = false;

  static async initialize(): Promise<void> {
    if (SecurityInitializer.initialized) {
      return;
    }

    try {
      console.log('🔒 Initializing security systems...');

      // Only apply security headers in production
      if (process.env.NODE_ENV === 'production') {
        EnhancedCSP.applyHeaders();
        EnhancedCSP.setupViolationReporting();

        const headersManager = SecurityHeadersManager.getInstance();
        headersManager.applyHeaders();
      } else {
        console.log('🔧 Security headers disabled in development mode');
      }

      SecurityInitializer.initialized = true;
      console.log('✅ Security initialization complete');

    } catch (error) {
      console.error('❌ Security initialization failed:', error);
    }
  }

  static getStatus(): { initialized: boolean; timestamp?: string } {
    return {
      initialized: SecurityInitializer.initialized,
      timestamp: SecurityInitializer.initialized ? new Date().toISOString() : undefined
    };
  }
}

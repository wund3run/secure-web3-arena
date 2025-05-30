import { useEffect } from 'react';
import { useAuth } from '@/contexts/auth/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface SecurityEvent {
  event_type: string;
  user_id?: string;
  details: any;
  ip_address?: string;
  user_agent?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

class SecurityLogger {
  private static instance: SecurityLogger;
  
  static getInstance(): SecurityLogger {
    if (!SecurityLogger.instance) {
      SecurityLogger.instance = new SecurityLogger();
    }
    return SecurityLogger.instance;
  }

  async logSecurityEvent(event: SecurityEvent) {
    try {
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.warn('Security Event:', event);
      }

      // In production, you would send this to your logging service
      // For now, we'll store in local storage for demo purposes
      const events = JSON.parse(localStorage.getItem('security_events') || '[]');
      events.push({
        ...event,
        timestamp: new Date().toISOString(),
        session_id: crypto.randomUUID(),
      });
      
      // Keep only last 100 events
      if (events.length > 100) {
        events.splice(0, events.length - 100);
      }
      
      localStorage.setItem('security_events', JSON.stringify(events));

    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  }

  async logFailedLogin(email: string, reason: string) {
    await this.logSecurityEvent({
      event_type: 'failed_login',
      details: { email, reason },
      severity: 'medium',
      ip_address: await this.getClientIP(),
      user_agent: navigator.userAgent,
    });
  }

  async logSuccessfulLogin(userId: string) {
    await this.logSecurityEvent({
      event_type: 'successful_login',
      user_id: userId,
      details: { login_method: 'email_password' },
      severity: 'low',
      ip_address: await this.getClientIP(),
      user_agent: navigator.userAgent,
    });
  }

  async logAdminAction(userId: string, action: string, target: any) {
    await this.logSecurityEvent({
      event_type: 'admin_action',
      user_id: userId,
      details: { action, target },
      severity: 'high',
      ip_address: await this.getClientIP(),
      user_agent: navigator.userAgent,
    });
  }

  async logSuspiciousActivity(userId: string | undefined, activity: string, details: any) {
    await this.logSecurityEvent({
      event_type: 'suspicious_activity',
      user_id: userId,
      details: { activity, ...details },
      severity: 'critical',
      ip_address: await this.getClientIP(),
      user_agent: navigator.userAgent,
    });
  }

  private async getClientIP(): Promise<string> {
    try {
      // In a real application, you'd get this from your backend
      return 'client-ip-hidden'; // Placeholder
    } catch {
      return 'unknown';
    }
  }
}

export const securityLogger = SecurityLogger.getInstance();

// React component to initialize security monitoring
export function SecurityAuditLogger() {
  const { user } = useAuth();

  useEffect(() => {
    // Monitor for suspicious activity
    const handleSuspiciousActivity = (event: Event) => {
      // Check for rapid clicks, unusual patterns, etc.
      const target = event.target as HTMLElement;
      
      if (target?.tagName === 'SCRIPT') {
        securityLogger.logSuspiciousActivity(
          user?.id,
          'script_injection_attempt',
          { element: target.outerHTML }
        );
      }
    };

    // Monitor for console access (potential XSS)
    const originalLog = console.log;
    console.log = (...args) => {
      if (args.some(arg => typeof arg === 'string' && arg.includes('javascript:'))) {
        securityLogger.logSuspiciousActivity(
          user?.id,
          'console_javascript_execution',
          { args }
        );
      }
      originalLog.apply(console, args);
    };

    document.addEventListener('click', handleSuspiciousActivity);
    document.addEventListener('focus', handleSuspiciousActivity, true);

    return () => {
      document.removeEventListener('click', handleSuspiciousActivity);
      document.removeEventListener('focus', handleSuspiciousActivity, true);
      console.log = originalLog;
    };
  }, [user?.id]);

  return null;
}

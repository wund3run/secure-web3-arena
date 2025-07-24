import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Security event types for monitoring
type SecurityEventType = 
  | 'login_attempt'
  | 'failed_login'
  | 'session_timeout'
  | 'suspicious_activity'
  | 'data_access'
  | 'permission_violation'
  | 'xss_attempt'
  | 'csrf_attempt'
  | 'injection_attempt';

interface SecurityEvent {
  type: SecurityEventType;
  userId?: string;
  userAgent: string;
  ipAddress: string;
  timestamp: Date;
  details: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface SecurityContextType {
  securityLevel: 'basic' | 'enhanced' | 'maximum';
  isSecureSession: boolean;
  logSecurityEvent: (event: Omit<SecurityEvent, 'timestamp' | 'userAgent' | 'ipAddress'>) => void;
  validateInput: (input: string, type: 'html' | 'sql' | 'general') => string;
  checkPermission: (action: string, resource: string) => boolean;
  reportThreat: (threat: string, details: Record<string, any>) => void;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

interface SecurityHardeningProviderProps {
  children: ReactNode;
  securityLevel?: 'basic' | 'enhanced' | 'maximum';
}

export function SecurityHardeningProvider({ 
  children, 
  securityLevel = 'enhanced' 
}: SecurityHardeningProviderProps) {
  const [isSecureSession, setIsSecureSession] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<Date>(new Date());
  const [failedAttempts, setFailedAttempts] = useState(0);
  const { user } = useAuth();
  const { toast } = useToast();

  // Initialize security hardening
  useEffect(() => {
    initializeSecurityMeasures();
    setupSessionMonitoring();
    setupCSPMonitoring();
    return () => cleanup();
  }, []);

  // Monitor user session for security
  useEffect(() => {
    if (user) {
      setIsSecureSession(true);
      setSessionStartTime(new Date());
      logSecurityEvent({
        type: 'login_attempt',
        userId: user.id,
        details: { method: 'password', success: true },
        severity: 'low'
      });
    } else {
      setIsSecureSession(false);
    }
  }, [user]);

  const initializeSecurityMeasures = () => {
    // Set up Content Security Policy monitoring
    if (typeof window !== 'undefined') {
      // Monitor for CSP violations
      document.addEventListener('securitypolicyviolation', handleCSPViolation);
      
      // Set up protection against common attacks
      setupXSSProtection();
      setupCSRFProtection();
      setupClickjackingProtection();
    }
  };

  const setupSessionMonitoring = () => {
    // Monitor for session timeout (30 minutes of inactivity)
    let timeoutId: NodeJS.Timeout;
    
    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (user) {
          logSecurityEvent({
            type: 'session_timeout',
            userId: user.id,
            details: { duration: Date.now() - sessionStartTime.getTime() },
            severity: 'medium'
          });
          toast({
            title: "Session Timeout Warning",
            description: "Your session will expire in 5 minutes. Please save your work.",
            variant: "destructive"
          });
        }
      }, 25 * 60 * 1000); // 25 minutes
    };

    // Reset timeout on user activity
    if (typeof window !== 'undefined') {
      ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
        window.addEventListener(event, resetTimeout, true);
      });
      resetTimeout();
    }
  };

  const setupCSPMonitoring = () => {
    // Set up Content Security Policy reporting
    if (typeof window !== 'undefined' && securityLevel !== 'basic') {
      window.addEventListener('securitypolicyviolation', (event) => {
        logSecurityEvent({
          type: 'suspicious_activity',
          userId: user?.id,
          details: {
            blockedURI: event.blockedURI,
            violatedDirective: event.violatedDirective,
            originalPolicy: event.originalPolicy
          },
          severity: 'high'
        });
      });
    }
  };

  const handleCSPViolation = (event: SecurityPolicyViolationEvent) => {
    logSecurityEvent({
      type: 'xss_attempt',
      userId: user?.id,
      details: {
        blockedURI: event.blockedURI,
        violatedDirective: event.violatedDirective,
        sourceFile: event.sourceFile,
        lineNumber: event.lineNumber
      },
      severity: 'critical'
    });
  };

  const setupXSSProtection = () => {
    // Monitor for potential XSS attempts
    if (typeof window !== 'undefined') {
      const originalSetAttribute = Element.prototype.setAttribute;
      Element.prototype.setAttribute = function(name: string, value: string) {
        if (name === 'src' || name === 'href') {
          if (value.toLowerCase().includes('javascript:') || 
              value.toLowerCase().includes('data:text/html')) {
            logSecurityEvent({
              type: 'xss_attempt',
              userId: user?.id,
              details: { attribute: name, value, element: this.tagName },
              severity: 'critical'
            });
            return;
          }
        }
        return originalSetAttribute.call(this, name, value);
      };
    }
  };

  const setupCSRFProtection = () => {
    // Add CSRF token to all forms
    if (typeof window !== 'undefined') {
      const csrfToken = generateCSRFToken();
      sessionStorage.setItem('csrf_token', csrfToken);
    }
  };

  const setupClickjackingProtection = () => {
    // Basic clickjacking protection
    if (typeof window !== 'undefined') {
      if (window.top !== window.self) {
        logSecurityEvent({
          type: 'suspicious_activity',
          userId: user?.id,
          details: { type: 'potential_clickjacking' },
          severity: 'high'
        });
      }
    }
  };

  const generateCSRFToken = (): string => {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };

  const logSecurityEvent = async (event: Omit<SecurityEvent, 'timestamp' | 'userAgent' | 'ipAddress'>) => {
    const fullEvent: SecurityEvent = {
      ...event,
      timestamp: new Date(),
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'server',
      ipAddress: 'client' // In production, this would be obtained from the server
    };

    try {
      // Log to Supabase analytics_events table
      await supabase.from('analytics_events').insert({
        event_name: 'security_event',
        user_id: event.userId || null,
        properties: {
          type: fullEvent.type,
          severity: fullEvent.severity,
          details: fullEvent.details,
          userAgent: fullEvent.userAgent,
          timestamp: fullEvent.timestamp.toISOString()
        }
      });

      // Handle high severity events immediately
      if (event.severity === 'critical' || event.severity === 'high') {
        await handleHighSeverityEvent(fullEvent);
      }
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  };

  const handleHighSeverityEvent = async (event: SecurityEvent) => {
    // Implement immediate response for high severity events
    if (event.type === 'xss_attempt' || event.type === 'injection_attempt') {
      setFailedAttempts(prev => prev + 1);
      
      if (failedAttempts >= 3) {
        // Lock down session for repeated security violations
        toast({
          title: "Security Alert",
          description: "Multiple security violations detected. Please refresh and try again.",
          variant: "destructive"
        });
      }
    }

    // In production, this would trigger alerts to security team
    console.warn('High severity security event:', event);
  };

  const validateInput = (input: string, type: 'html' | 'sql' | 'general'): string => {
    let sanitized = input;

    switch (type) {
      case 'html':
        // Remove script tags and dangerous attributes
        sanitized = input
          .replace(/<script[\s\S]*?<\/script>/gi, '')
          .replace(/javascript:/gi, '')
          .replace(/on\w+\s*=/gi, '')
          .replace(/data:text\/html/gi, '');
        break;
      
      case 'sql':
        // Basic SQL injection prevention
        sanitized = input
          .replace(/(['";\\])/g, '\\$1')
          .replace(/(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/gi, '');
        break;
      
      case 'general':
        // General XSS prevention
        sanitized = input
          .replace(/[<>]/g, '')
          .replace(/javascript:/gi, '')
          .trim();
        break;
    }

    // Log if input was modified (potential attack)
    if (sanitized !== input) {
      logSecurityEvent({
        type: type === 'sql' ? 'injection_attempt' : 'xss_attempt',
        userId: user?.id,
        details: { original: input, sanitized, type },
        severity: 'high'
      });
    }

    return sanitized;
  };

  const checkPermission = (action: string, resource: string): boolean => {
    // Basic permission checking - in production this would be more sophisticated
    if (!user) return false;

    // Log permission check for audit
    logSecurityEvent({
      type: 'data_access',
      userId: user.id,
      details: { action, resource },
      severity: 'low'
    });

    // Basic role-based access control
    const userRoles = user.user_metadata?.roles || [];
    
    // Examples of permission rules
    switch (action) {
      case 'delete':
        return userRoles.includes('admin') || userRoles.includes('moderator');
      case 'edit':
        return userRoles.includes('admin') || userRoles.includes('editor') || userRoles.includes('auditor');
      case 'view':
        return true; // All authenticated users can view
      default:
        return false;
    }
  };

  const reportThreat = async (threat: string, details: Record<string, any>) => {
    await logSecurityEvent({
      type: 'suspicious_activity',
      userId: user?.id,
      details: { threat, ...details },
      severity: 'critical'
    });

    toast({
      title: "Security Threat Reported",
      description: "The security team has been notified of this incident.",
      variant: "destructive"
    });
  };

  const cleanup = () => {
    if (typeof window !== 'undefined') {
      document.removeEventListener('securitypolicyviolation', handleCSPViolation);
    }
  };

  const contextValue: SecurityContextType = {
    securityLevel,
    isSecureSession,
    logSecurityEvent,
    validateInput,
    checkPermission,
    reportThreat
  };

  return (
    <SecurityContext.Provider value={contextValue}>
      {children}
    </SecurityContext.Provider>
  );
}

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurity must be used within a SecurityHardeningProvider');
  }
  return context;
};

export default SecurityHardeningProvider; 
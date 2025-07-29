
import React, { createContext, useContext, useEffect, useState } from 'react';
import { SecurityInitializer } from '@/utils/security/SecurityInitializer';
import { EnhancedSecurityService } from '@/utils/security/enhancedSecurityService';
import { auditLogger } from '@/utils/security/AuditLogger';
import { useAuth } from '@/contexts/auth';

interface EnhancedSecurityContextType {
  securityInitialized: boolean;
  securityLevel: 'low' | 'medium' | 'high';
  reportSecurityIncident: (incident: string, details?: Record<string, any>) => void;
  checkRateLimit: (key: string, maxAttempts: number, windowMs: number) => boolean;
  validateInput: (input: string, context?: string) => boolean;
}

const EnhancedSecurityContext = createContext<EnhancedSecurityContextType | undefined>(undefined);

export function EnhancedSecurityProvider({ children }: { children: React.ReactNode }) {
  const [securityInitialized, setSecurityInitialized] = useState(false);
  const [securityLevel, setSecurityLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const { user } = useAuth();

  useEffect(() => {
    const initializeSecurity = async () => {
      try {
        await SecurityInitializer.initialize();
        setSecurityInitialized(true);
        setSecurityLevel('low'); // Security successfully initialized
      } catch (error) {
        console.error('Security initialization failed:', error);
        setSecurityLevel('high'); // Security failed to initialize
      }
    };

    initializeSecurity();
  }, []);

  useEffect(() => {
    if (user && securityInitialized) {
      auditLogger.log(
        'user_session_start',
        'User session started with enhanced security',
        { 
          userId: user.id,
          email: user.email,
          securityLevel,
          timestamp: new Date().toISOString()
        },
        'medium'
      );
    }
  }, [user, securityInitialized, securityLevel]);

  const reportSecurityIncident = (incident: string, details?: Record<string, any>) => {
    EnhancedSecurityService.logSecurityEvent(
      'SECURITY_INCIDENT',
      incident,
      { ...details, reportedAt: new Date().toISOString() }
    );
    
    // Increase security level temporarily
    setSecurityLevel('high');
    setTimeout(() => setSecurityLevel('medium'), 5 * 60 * 1000); // Reset after 5 minutes
  };

  const checkRateLimit = (key: string, maxAttempts: number, windowMs: number): boolean => {
    return EnhancedSecurityService.checkRateLimit(key, maxAttempts, windowMs);
  };

  const validateInput = (input: string, context?: string): boolean => {
    const isSuspicious = EnhancedSecurityService.detectSuspiciousActivity(input, context);
    if (isSuspicious) {
      setSecurityLevel('high');
      setTimeout(() => setSecurityLevel('medium'), 2 * 60 * 1000); // Reset after 2 minutes
    }
    return !isSuspicious;
  };

  const value: EnhancedSecurityContextType = {
    securityInitialized,
    securityLevel,
    reportSecurityIncident,
    checkRateLimit,
    validateInput
  };

  return (
    <EnhancedSecurityContext.Provider value={value}>
      {children}
    </EnhancedSecurityContext.Provider>
  );
}

export const useEnhancedSecurity = () => {
  const context = useContext(EnhancedSecurityContext);
  if (context === undefined) {
    throw new Error('useEnhancedSecurity must be used within an EnhancedSecurityProvider');
  }
  return context;
};

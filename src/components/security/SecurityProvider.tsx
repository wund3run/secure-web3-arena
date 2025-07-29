
import React, { createContext, useContext, useEffect, useState } from 'react';
import { SecurityInitializer } from '@/utils/security/SecurityInitializer';
import { auditLogger } from '@/utils/security/AuditLogger';
import { useAuth } from '@/contexts/auth';

interface SecurityContextType {
  securityInitialized: boolean;
  auditLog: typeof auditLogger;
  reportSecurityIncident: (incident: string, details?: Record<string, unknown>) => void;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export function SecurityProvider({ children }: { children: React.ReactNode }) {
  const [securityInitialized, setSecurityInitialized] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const initializeSecurity = async () => {
      try {
        await SecurityInitializer.initialize();
        setSecurityInitialized(true);
      } catch (error) {
        console.error('Security initialization failed:', error);
      }
    };

    initializeSecurity();
  }, []);

  useEffect(() => {
    if (user && securityInitialized) {
      auditLogger.log(
        'user_login',
        'User session started',
        { 
          userId: user.id,
          email: user.email,
          loginMethod: 'password' // This could be enhanced to track actual method
        },
        'medium'
      );
    }
  }, [user, securityInitialized]);

  const reportSecurityIncident = (incident: string, details?: Record<string, unknown>) => {
    auditLogger.log(
      'security_violation',
      incident,
      details,
      'critical'
    );
  };

  const value: SecurityContextType = {
    securityInitialized,
    auditLog: auditLogger,
    reportSecurityIncident
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
}

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};

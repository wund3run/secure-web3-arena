
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { auditLogger } from '@/utils/security/AuditLogger';
import { SecurityEnhancements } from '@/utils/security/SecurityEnhancements';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle, Lock } from 'lucide-react';

interface SecurityContextType {
  securityLevel: 'low' | 'medium' | 'high';
  threats: SecurityThreat[];
  addThreat: (threat: Omit<SecurityThreat, 'id' | 'timestamp'>) => void;
  clearThreats: () => void;
  reportIncident: (incident: string, details?: Record<string, any>) => void;
}

interface SecurityThreat {
  id: string;
  type: 'authentication' | 'data_breach' | 'suspicious_activity' | 'system_vulnerability';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: Date;
  resolved: boolean;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export function EnhancedSecurityProvider({ children }: { children: React.ReactNode }) {
  const [securityLevel, setSecurityLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [threats, setThreats] = useState<SecurityThreat[]>([]);
  const [initialized, setInitialized] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const initializeSecurity = async () => {
      try {
        SecurityEnhancements.getInstance().initialize();
        setInitialized(true);
        
        if (user) {
          auditLogger.log(
            'user_login',
            'Enhanced security session started',
            { 
              userId: user.id,
              email: user.email,
              securityLevel,
              timestamp: new Date().toISOString()
            },
            'medium'
          );
        }
      } catch (error) {
        console.error('Security initialization failed:', error);
        addThreat({
          type: 'system_vulnerability',
          severity: 'high',
          message: 'Security system initialization failed',
          resolved: false
        });
      }
    };

    initializeSecurity();

    return () => {
      SecurityEnhancements.getInstance().cleanup();
    };
  }, [user]);

  const addThreat = (threat: Omit<SecurityThreat, 'id' | 'timestamp'>) => {
    const newThreat: SecurityThreat = {
      ...threat,
      id: crypto.randomUUID(),
      timestamp: new Date()
    };

    setThreats(prev => [newThreat, ...prev.slice(0, 9)]); // Keep max 10 threats

    // Auto-escalate security level based on threat severity
    if (threat.severity === 'critical') {
      setSecurityLevel('high');
    } else if (threat.severity === 'high' && securityLevel === 'low') {
      setSecurityLevel('medium');
    }

    // Log the threat
    auditLogger.log(
      'security_violation',
      threat.message,
      { 
        threatType: threat.type,
        severity: threat.severity,
        securityLevel
      },
      threat.severity as any
    );
  };

  const clearThreats = () => {
    setThreats([]);
    setSecurityLevel('medium');
  };

  const reportIncident = (incident: string, details?: Record<string, any>) => {
    auditLogger.log(
      'security_violation',
      incident,
      details,
      'critical'
    );

    addThreat({
      type: 'suspicious_activity',
      severity: 'high',
      message: incident,
      resolved: false
    });
  };

  const activeThreatCount = threats.filter(t => !t.resolved).length;
  const criticalThreats = threats.filter(t => t.severity === 'critical' && !t.resolved);

  return (
    <SecurityContext.Provider value={{
      securityLevel,
      threats,
      addThreat,
      clearThreats,
      reportIncident
    }}>
      {/* Security Status Indicator */}
      {initialized && activeThreatCount > 0 && (
        <div className="fixed top-4 right-4 z-50 max-w-sm">
          <Alert variant={criticalThreats.length > 0 ? "destructive" : "default"}>
            {criticalThreats.length > 0 ? (
              <AlertTriangle className="h-4 w-4" />
            ) : securityLevel === 'high' ? (
              <Shield className="h-4 w-4" />
            ) : (
              <Lock className="h-4 w-4" />
            )}
            <AlertDescription>
              {criticalThreats.length > 0 
                ? `${criticalThreats.length} critical security threat(s) detected`
                : `Security level: ${securityLevel.toUpperCase()} - ${activeThreatCount} active threat(s)`
              }
            </AlertDescription>
          </Alert>
        </div>
      )}

      {children}
    </SecurityContext.Provider>
  );
}

export const useEnhancedSecurity = () => {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useEnhancedSecurity must be used within an EnhancedSecurityProvider');
  }
  return context;
};

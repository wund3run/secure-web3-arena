import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth';

interface ABTest {
  id: string;
  name: string;
  variants: string[];
  allocation: Record<string, number>;
  active: boolean;
}

interface ABTestContextType {
  getVariant: (testId: string) => string;
  trackConversion: (testId: string, conversionType: string) => void;
  isTestActive: (testId: string) => boolean;
}

const ABTestContext = createContext<ABTestContextType | undefined>(undefined);

export function ABTestProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [tests, setTests] = useState<ABTest[]>([]);
  const [userVariants, setUserVariants] = useState<Record<string, string>>({});

  useEffect(() => {
    // Define active A/B tests
    const activeTests: ABTest[] = [
      {
        id: 'onboarding_flow',
        name: 'Onboarding Flow Optimization',
        variants: ['control', 'enhanced'],
        allocation: { control: 0.5, enhanced: 0.5 },
        active: true
      },
      {
        id: 'pricing_display',
        name: 'Pricing Display Test',
        variants: ['simple', 'detailed'],
        allocation: { simple: 0.4, detailed: 0.6 },
        active: true
      },
      {
        id: 'cta_button_text',
        name: 'CTA Button Text Test',
        variants: ['get_started', 'request_audit', 'start_now'],
        allocation: { get_started: 0.33, request_audit: 0.34, start_now: 0.33 },
        active: true
      }
    ];

    setTests(activeTests);

    // Assign user to variants
    if (user) {
      const savedVariants = localStorage.getItem(`ab_tests_${user.id}`);
      if (savedVariants) {
        setUserVariants(JSON.parse(savedVariants));
      } else {
        assignUserToVariants(activeTests, user.id);
      }
    } else {
      // For anonymous users, use session-based assignment
      const sessionId = sessionStorage.getItem('analytics_session');
      if (sessionId) {
        const savedVariants = localStorage.getItem(`ab_tests_session_${sessionId}`);
        if (savedVariants) {
          setUserVariants(JSON.parse(savedVariants));
        } else {
          assignUserToVariants(activeTests, sessionId);
        }
      }
    }
  }, [user]);

  const assignUserToVariants = (tests: ABTest[], userId: string) => {
    const variants: Record<string, string> = {};
    
    tests.forEach(test => {
      if (test.active) {
        // Use userId as seed for consistent assignment
        const hash = simpleHash(userId + test.id);
        const random = (hash % 10000) / 10000;
        
        let cumulativeProbability = 0;
        for (const [variant, allocation] of Object.entries(test.allocation)) {
          cumulativeProbability += allocation;
          if (random <= cumulativeProbability) {
            variants[test.id] = variant;
            break;
          }
        }
      }
    });

    setUserVariants(variants);
    
    // Save assignments
    const storageKey = user ? `ab_tests_${user.id}` : `ab_tests_session_${sessionStorage.getItem('analytics_session')}`;
    localStorage.setItem(storageKey, JSON.stringify(variants));
  };

  const simpleHash = (str: string): number => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  };

  const getVariant = (testId: string): string => {
    const test = tests.find(t => t.id === testId);
    if (!test || !test.active) {
      return 'control'; // Default variant
    }
    
    return userVariants[testId] || 'control';
  };

  const trackConversion = (testId: string, conversionType: string) => {
    const variant = getVariant(testId);
    
    // Track A/B test conversion
    if ((window as any).trackConversion) {
      (window as any).trackConversion({
        action: 'ab_test_conversion',
        category: 'experimentation',
        label: `${testId}_${variant}_${conversionType}`,
        metadata: {
          testId,
          variant,
          conversionType,
          userId: user?.id
        }
      });
    }

    // Store conversion data
    const conversions = JSON.parse(localStorage.getItem('ab_test_conversions') || '[]');
    conversions.push({
      testId,
      variant,
      conversionType,
      timestamp: new Date().toISOString(),
      userId: user?.id
    });
    
    // Keep only last 100 conversions
    if (conversions.length > 100) {
      conversions.splice(0, conversions.length - 100);
    }
    
    localStorage.setItem('ab_test_conversions', JSON.stringify(conversions));
  };

  const isTestActive = (testId: string): boolean => {
    const test = tests.find(t => t.id === testId);
    return test?.active || false;
  };

  const value: ABTestContextType = {
    getVariant,
    trackConversion,
    isTestActive
  };

  return (
    <ABTestContext.Provider value={value}>
      {children}
    </ABTestContext.Provider>
  );
}

export const useABTest = () => {
  const context = useContext(ABTestContext);
  if (context === undefined) {
    throw new Error('useABTest must be used within an ABTestProvider');
  }
  return context;
};

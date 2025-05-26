import React, { createContext, useContext, useEffect, useState } from "react";

interface ABTest {
  id: string;
  name: string;
  variants: string[];
  traffic: number; // percentage of users to include in test
}

interface ABTestContextType {
  getVariant: (testId: string) => string;
  trackConversion: (testId: string, conversionType: string) => void;
}

const ABTestContext = createContext<ABTestContextType>({
  getVariant: () => "control",
  trackConversion: () => {}
});

export const useABTest = () => useContext(ABTestContext);

interface ABTestProviderProps {
  children: React.ReactNode;
}

export function ABTestProvider({ children }: ABTestProviderProps) {
  const [userTests, setUserTests] = useState<Record<string, string>>({});

  const activeTests: ABTest[] = [
    {
      id: "onboarding_flow",
      name: "Onboarding Flow Optimization",
      variants: ["control", "simplified", "gamified"],
      traffic: 50
    },
    {
      id: "pricing_display",
      name: "Pricing Display Test",
      variants: ["control", "value_focused", "comparison_table"],
      traffic: 30
    },
    {
      id: "cta_buttons",
      name: "Call-to-Action Button Text",
      variants: ["control", "urgent", "benefit_focused"],
      traffic: 25
    }
  ];

  useEffect(() => {
    // Load existing test assignments from localStorage
    const savedTests = localStorage.getItem("hawkly_ab_tests");
    if (savedTests) {
      setUserTests(JSON.parse(savedTests));
    } else {
      // Assign user to test variants
      const assignments: Record<string, string> = {};
      
      activeTests.forEach(test => {
        // Check if user should be included in this test
        if (Math.random() * 100 < test.traffic) {
          // Randomly assign variant
          const variantIndex = Math.floor(Math.random() * test.variants.length);
          assignments[test.id] = test.variants[variantIndex];
        } else {
          assignments[test.id] = "control";
        }
      });
      
      setUserTests(assignments);
      localStorage.setItem("hawkly_ab_tests", JSON.stringify(assignments));
    }
  }, []);

  const getVariant = (testId: string): string => {
    return userTests[testId] || "control";
  };

  const trackConversion = (testId: string, conversionType: string) => {
    const variant = getVariant(testId);
    
    // Store conversion data for analysis
    const conversions = JSON.parse(localStorage.getItem("hawkly_ab_conversions") || "[]");
    conversions.push({
      testId,
      variant,
      conversionType,
      timestamp: new Date().toISOString()
    });
    
    // Keep only last 1000 conversions to prevent storage bloat
    if (conversions.length > 1000) {
      conversions.splice(0, conversions.length - 1000);
    }
    
    localStorage.setItem("hawkly_ab_conversions", JSON.stringify(conversions));
    
    console.log(`A/B Test Conversion: ${testId} (${variant}) - ${conversionType}`);
  };

  return (
    <ABTestContext.Provider value={{ getVariant, trackConversion }}>
      {children}
    </ABTestContext.Provider>
  );
}

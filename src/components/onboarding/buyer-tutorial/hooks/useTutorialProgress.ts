
import { useState } from "react";

export function useTutorialProgress() {
  const [activeTab, setActiveTab] = useState<string>("choose-auditor");
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [progress, setProgress] = useState({
    "choose-auditor": 0,
    "prepare-audit": 0,
    "review-report": 0
  });

  const incrementProgress = (tab: string) => {
    setProgress(prev => {
      // For the auditor selection tab, increment by 20% each time (5 items)
      // For other tabs, increment by 25% each time (4 items)
      const incrementAmount = tab === "choose-auditor" ? 20 : 25;
      
      // Don't exceed 100%
      const newProgress = Math.min(100, prev[tab as keyof typeof prev] + incrementAmount);
      
      return {
        ...prev,
        [tab]: newProgress
      };
    });
  };

  // Check if all tabs are complete
  const allCompleted = 
    progress["choose-auditor"] === 100 &&
    progress["prepare-audit"] === 100 &&
    progress["review-report"] === 100;

  return {
    activeTab,
    setActiveTab,
    currentStep,
    setCurrentStep,
    progress,
    incrementProgress,
    allCompleted
  };
}

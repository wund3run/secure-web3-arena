
import { useState } from "react";

export function useTutorialProgress() {
  const [activeTab, setActiveTab] = useState("choose-auditor");
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState({
    "choose-auditor": 0,
    "prepare-audit": 0,
    "review-report": 0
  });
  
  const incrementProgress = (tab: string) => {
    if (progress[tab as keyof typeof progress] < 100) {
      setProgress(prev => ({
        ...prev,
        [tab]: Math.min(prev[tab as keyof typeof progress] + 25, 100)
      }));
    }
  };
  
  const allCompleted = Object.values(progress).every(p => p === 100);

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

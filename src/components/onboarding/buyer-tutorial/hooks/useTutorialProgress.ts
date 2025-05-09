import { useState, useCallback } from "react";

export function useTutorialProgress() {
  const [activeTab, setActiveTab] = useState<string>("choose-auditor");
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [progress, setProgress] = useState({
    "choose-auditor": 0,
    "prepare-audit": 0,
    "review-report": 0
  });
  
  // Keep track of viewed details to prevent progress from being incremented multiple times
  const [viewedDetails, setViewedDetails] = useState<Set<string>>(new Set());

  const incrementProgress = useCallback((tab: string, detailId?: string) => {
    if (detailId && viewedDetails.has(detailId)) {
      return; // Already viewed this detail, don't increment again
    }

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

    // If a detail ID was provided, mark it as viewed
    if (detailId) {
      setViewedDetails(prev => new Set(prev).add(detailId));
    }
  }, [viewedDetails]);

  // Handle tab change
  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    
    // If this is the first time visiting this tab, increment progress once
    if (progress[tab as keyof typeof progress] === 0) {
      incrementProgress(tab);
    }
  }, [progress, incrementProgress]);

  // Check if all tabs are complete
  const allCompleted = 
    progress["choose-auditor"] === 100 &&
    progress["prepare-audit"] === 100 &&
    progress["review-report"] === 100;

  return {
    activeTab,
    setActiveTab: handleTabChange,
    currentStep,
    setCurrentStep,
    progress,
    incrementProgress,
    allCompleted,
    viewedDetails
  };
}

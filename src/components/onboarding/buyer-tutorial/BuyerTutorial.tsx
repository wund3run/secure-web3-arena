
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight, Book } from "lucide-react";
import { TutorialTabs } from "./TutorialTabs";
import { useTutorialProgress } from "./hooks/useTutorialProgress";

interface BuyerTutorialProps {
  onComplete: () => void;
  onClose: () => void;
}

export function BuyerTutorial({ onComplete, onClose }: BuyerTutorialProps) {
  const [showingDetails, setShowingDetails] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  const {
    activeTab,
    setActiveTab,
    progress,
    incrementProgress,
    currentStep,
    setCurrentStep,
    allCompleted
  } = useTutorialProgress();

  // Auto-increment progress every time user changes tabs
  useEffect(() => {
    if (activeTab && currentStep === 0) {
      incrementProgress(activeTab);
      setCurrentStep(1); // Move to first step
    }
  }, [activeTab]);

  const toggleDetails = (id: string) => {
    setShowingDetails(showingDetails === id ? null : id);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-md">
      <CardHeader className="pb-3 border-b">
        <CardTitle className="flex items-center text-xl font-semibold">
          <Book className="h-5 w-5 mr-2 text-primary" />
          Smart Contract Audit Guide
        </CardTitle>
      </CardHeader>
      
      <TutorialTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        showingDetails={showingDetails}
        toggleDetails={toggleDetails}
        incrementProgress={incrementProgress}
        progress={progress}
      />
      
      <CardFooter className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={onClose}>Close</Button>
        <Button 
          onClick={() => {
            incrementProgress(activeTab);
            if (allCompleted) {
              onComplete();
            }
          }}
          className="gap-2"
        >
          {!allCompleted ? "Mark Section Complete" : "Finish Tutorial"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

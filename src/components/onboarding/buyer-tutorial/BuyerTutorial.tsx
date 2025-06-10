
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight, Book, X } from "lucide-react";
import { TutorialTabs } from "./TutorialTabs";
import { useTutorialProgress } from "./hooks/useTutorialProgress";
import { toast } from "sonner";

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

  // Auto-increment progress when first loading tutorial
  useEffect(() => {
    if (activeTab && currentStep === 0) {
      setCurrentStep(1); // Move to first step
    }
  }, [activeTab, currentStep, setCurrentStep]);

  const toggleDetails = (id: string) => {
    // If we're closing details, don't increment progress
    if (showingDetails === id) {
      setShowingDetails(null);
      return;
    }

    // Opening new details, increment progress and track it
    setShowingDetails(id);
    incrementProgress(activeTab, id);
  };

  const handleMarkComplete = () => {
    incrementProgress(activeTab);
    
    if (allCompleted) {
      toast.success("Tutorial completed! You're ready to find an auditor.", {
        duration: 3000,
      });
      onComplete();
    } else {
      // Show progress toast
      const nextTab = 
        activeTab === "choose-auditor" ? "prepare-audit" : 
        activeTab === "prepare-audit" ? "review-report" : 
        "choose-auditor";
      
      toast.success(`Section completed!`, {
        description: `${progress[activeTab as keyof typeof progress]}% of section done.`,
        duration: 2000,
      });
      
      // Move to next tab if current one is complete
      if (progress[activeTab as keyof typeof progress] === 100) {
        setActiveTab(nextTab);
      }
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-md overflow-hidden">
      <CardHeader className="pb-3 border-b flex flex-row items-center justify-between bg-muted/30">
        <CardTitle className="flex items-center text-xl font-semibold">
          <Book className="h-5 w-5 mr-2 text-primary" />
          Smart Contract Audit Guide
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="px-0 py-0">
        <TutorialTabs />
      </CardContent>
      
      <CardFooter className="flex justify-between pt-4 px-6 pb-4 border-t">
        <Button variant="outline" onClick={onClose}>Close</Button>
        <Button 
          onClick={handleMarkComplete}
          className="gap-2"
          variant={allCompleted ? "default" : "secondary"}
        >
          {!allCompleted ? "Mark Section Complete" : "Finish Tutorial"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

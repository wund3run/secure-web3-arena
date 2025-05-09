
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, FileCheck, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { AuditorSelectionContent } from "./tab-contents/AuditorSelectionContent";
import { AuditPreparationContent } from "./tab-contents/AuditPreparationContent";
import { ReportReviewContent } from "./tab-contents/ReportReviewContent";

interface TutorialTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  showingDetails: string | null;
  toggleDetails: (id: string) => void;
  incrementProgress: (tab: string) => void;
  progress: {
    "choose-auditor": number;
    "prepare-audit": number;
    "review-report": number;
  };
}

export function TutorialTabs({
  activeTab,
  onTabChange,
  showingDetails,
  toggleDetails,
  incrementProgress,
  progress
}: TutorialTabsProps) {
  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => {
        onTabChange(value);
        // Increment progress when user changes tabs
        incrementProgress(value);
      }}
    >
      <div className="px-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="choose-auditor" className="text-xs sm:text-sm">
            <Shield className="h-4 w-4 mr-1 hidden sm:inline" />
            Choosing an Auditor
          </TabsTrigger>
          <TabsTrigger value="prepare-audit" className="text-xs sm:text-sm">
            <FileCheck className="h-4 w-4 mr-1 hidden sm:inline" />
            Preparing for Audit
          </TabsTrigger>
          <TabsTrigger value="review-report" className="text-xs sm:text-sm">
            <Book className="h-4 w-4 mr-1 hidden sm:inline" />
            Reviewing Reports
          </TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="choose-auditor" className="m-0">
        <AuditorSelectionContent 
          showingDetails={showingDetails} 
          toggleDetails={toggleDetails} 
          progress={progress["choose-auditor"]} 
        />
      </TabsContent>
      
      <TabsContent value="prepare-audit" className="m-0">
        <AuditPreparationContent 
          showingDetails={showingDetails} 
          toggleDetails={toggleDetails} 
          progress={progress["prepare-audit"]} 
        />
      </TabsContent>
      
      <TabsContent value="review-report" className="m-0">
        <ReportReviewContent 
          showingDetails={showingDetails} 
          toggleDetails={toggleDetails} 
          progress={progress["review-report"]} 
        />
      </TabsContent>
    </Tabs>
  );
}

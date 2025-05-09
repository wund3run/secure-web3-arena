
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
      className="w-full"
    >
      <div className="px-6 pt-4">
        <TabsList className="w-full grid grid-cols-3 h-auto p-1 mb-2">
          <TabsTrigger value="choose-auditor" className="py-2 text-xs sm:text-sm flex items-center justify-center">
            <Shield className="h-4 w-4 mr-2 hidden sm:inline" />
            <span>Choosing an Auditor</span>
          </TabsTrigger>
          <TabsTrigger value="prepare-audit" className="py-2 text-xs sm:text-sm flex items-center justify-center">
            <FileCheck className="h-4 w-4 mr-2 hidden sm:inline" />
            <span>Preparing for Audit</span>
          </TabsTrigger>
          <TabsTrigger value="review-report" className="py-2 text-xs sm:text-sm flex items-center justify-center">
            <Book className="h-4 w-4 mr-2 hidden sm:inline" />
            <span>Reviewing Reports</span>
          </TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="choose-auditor" className="m-0 border-0">
        <AuditorSelectionContent 
          showingDetails={showingDetails} 
          toggleDetails={toggleDetails} 
          progress={progress["choose-auditor"]} 
        />
      </TabsContent>
      
      <TabsContent value="prepare-audit" className="m-0 border-0">
        <AuditPreparationContent 
          showingDetails={showingDetails} 
          toggleDetails={toggleDetails} 
          progress={progress["prepare-audit"]} 
        />
      </TabsContent>
      
      <TabsContent value="review-report" className="m-0 border-0">
        <ReportReviewContent 
          showingDetails={showingDetails} 
          toggleDetails={toggleDetails} 
          progress={progress["review-report"]} 
        />
      </TabsContent>
    </Tabs>
  );
}

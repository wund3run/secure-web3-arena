
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, CheckCircle, FileCheck, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { AuditorSelectionContent } from "./tab-contents/AuditorSelectionContent";
import { AuditPreparationContent } from "./tab-contents/AuditPreparationContent";
import { ReportReviewContent } from "./tab-contents/ReportReviewContent";

interface TutorialTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  showingDetails: string | null;
  toggleDetails: (id: string) => void;
  incrementProgress: (tab: string, detailId?: string) => void;
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
      onValueChange={onTabChange}
      className="w-full"
    >
      <div className="px-6 pt-4">
        <TabsList className="w-full grid grid-cols-3 h-auto p-1 mb-2">
          <TabsTrigger 
            value="choose-auditor" 
            className="py-2 text-xs sm:text-sm flex items-center justify-center relative"
          >
            <Shield className="h-4 w-4 mr-2 hidden sm:inline" />
            <span>Choosing an Auditor</span>
            {progress["choose-auditor"] === 100 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></span>
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="prepare-audit" 
            className="py-2 text-xs sm:text-sm flex items-center justify-center relative"
          >
            <FileCheck className="h-4 w-4 mr-2 hidden sm:inline" />
            <span>Preparing for Audit</span>
            {progress["prepare-audit"] === 100 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></span>
            )}
          </TabsTrigger>
          <TabsTrigger 
            value="review-report" 
            className="py-2 text-xs sm:text-sm flex items-center justify-center relative"
          >
            <Book className="h-4 w-4 mr-2 hidden sm:inline" />
            <span>Reviewing Reports</span>
            {progress["review-report"] === 100 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <div className="mt-2 mb-4 px-1">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Progress: {progress[activeTab as keyof typeof progress]}%</span>
            {progress[activeTab as keyof typeof progress] === 100 && (
              <span className="flex items-center text-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                Complete
              </span>
            )}
          </div>
          <Progress 
            value={progress[activeTab as keyof typeof progress]} 
            className="h-1.5" 
            indicatorClassName={progress[activeTab as keyof typeof progress] === 100 ? "bg-green-500" : undefined}
          />
        </div>
      </div>
      
      <TabsContent value="choose-auditor" className="m-0 border-0">
        <AuditorSelectionContent 
          showingDetails={showingDetails} 
          toggleDetails={toggleDetails} 
          progress={progress["choose-auditor"]} 
          incrementProgress={(detailId) => incrementProgress("choose-auditor", detailId)}
        />
      </TabsContent>
      
      <TabsContent value="prepare-audit" className="m-0 border-0">
        <AuditPreparationContent 
          showingDetails={showingDetails} 
          toggleDetails={toggleDetails} 
          progress={progress["prepare-audit"]} 
          incrementProgress={(detailId) => incrementProgress("prepare-audit", detailId)}
        />
      </TabsContent>
      
      <TabsContent value="review-report" className="m-0 border-0">
        <ReportReviewContent 
          showingDetails={showingDetails} 
          toggleDetails={toggleDetails} 
          progress={progress["review-report"]} 
          incrementProgress={(detailId) => incrementProgress("review-report", detailId)}
        />
      </TabsContent>
    </Tabs>
  );
}

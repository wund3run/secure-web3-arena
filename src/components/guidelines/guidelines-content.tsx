
import { ProcessContent } from "@/components/guidelines/tabs/process-content";
import { ClassificationContent } from "@/components/guidelines/tabs/classification-content";
import { ToolsContent } from "@/components/guidelines/tabs/tools-content";
import { ReportingContent } from "@/components/guidelines/tabs/reporting-content";
import { ProtocolContent } from "@/components/guidelines/tabs/protocol-content";

interface GuidelinesContentProps {
  activeTab: string;
}

export function GuidelinesContent({ activeTab }: GuidelinesContentProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      {activeTab === "process" && <ProcessContent />}
      {activeTab === "classification" && <ClassificationContent />}
      {activeTab === "tools" && <ToolsContent />}
      {activeTab === "reporting" && <ReportingContent />}
      {activeTab === "protocol" && <ProtocolContent />}
    </div>
  );
}

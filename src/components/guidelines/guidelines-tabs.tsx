
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GuidelinesTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function GuidelinesTabs({ activeTab, setActiveTab }: GuidelinesTabsProps) {
  return (
    <div className="mb-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
          <TabsTrigger value="process">Audit Process</TabsTrigger>
          <TabsTrigger value="classification">Vulnerability Classification</TabsTrigger>
          <TabsTrigger value="tools">Tools & Methodology</TabsTrigger>
          <TabsTrigger value="reporting">Reporting Standards</TabsTrigger>
          <TabsTrigger value="protocol">Auditor Protocol</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

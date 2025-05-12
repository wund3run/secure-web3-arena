
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clipboard, Shield, MessageSquare, FileText, Calendar, UserCircle } from "lucide-react";

interface AuditTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const AuditTabs: React.FC<AuditTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="overflow-auto">
      <TabsList className="w-full md:w-auto">
        <TabsTrigger 
          value="overview" 
          className="gap-2"
          onClick={() => onTabChange('overview')}
        >
          <Clipboard className="h-4 w-4" />
          <span>Overview</span>
        </TabsTrigger>
        <TabsTrigger 
          value="vulnerabilities" 
          className="gap-2"
          onClick={() => onTabChange('vulnerabilities')}
        >
          <Shield className="h-4 w-4" />
          <span>Vulnerabilities</span>
        </TabsTrigger>
        <TabsTrigger 
          value="collaborate" 
          className="gap-2"
          onClick={() => onTabChange('collaborate')}
        >
          <MessageSquare className="h-4 w-4" />
          <span>Collaborate</span>
        </TabsTrigger>
        <TabsTrigger 
          value="reports" 
          className="gap-2"
          onClick={() => onTabChange('reports')}
        >
          <FileText className="h-4 w-4" />
          <span>Reports</span>
        </TabsTrigger>
        <TabsTrigger 
          value="timeline" 
          className="gap-2"
          onClick={() => onTabChange('timeline')}
        >
          <Calendar className="h-4 w-4" />
          <span>Timeline</span>
        </TabsTrigger>
        <TabsTrigger 
          value="team" 
          className="gap-2"
          onClick={() => onTabChange('team')}
        >
          <UserCircle className="h-4 w-4" />
          <span>Team</span>
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

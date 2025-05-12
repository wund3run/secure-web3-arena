
import React from 'react';
import { toast } from "sonner";
import { BookOpen, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SecurityRiskScorecard } from '@/components/security-visualizations/SecurityRiskScorecard';
import { VulnerabilityHeatmap } from '@/components/security-visualizations/VulnerabilityHeatmap';
import { EmbeddedLearningCard } from '@/components/educational/EmbeddedLearningCard';
import { CustomizableDashboard } from '@/components/dashboard/CustomizableDashboard';

interface OverviewTabProps {
  auditData: any;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ auditData }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security Score Card */}
        <div className="lg:col-span-2">
          <SecurityRiskScorecard 
            projectName={auditData.name}
            overallScore={auditData.securityScore}
            categories={auditData.riskCategories}
            lastUpdated="May 21, 2023"
          />
        </div>
        
        {/* Educational Resources */}
        <div>
          <EmbeddedLearningCard
            title="Learning Resources"
            description="Educational content related to your audit findings"
            resources={auditData.learningResources}
            contextual={true}
          />
        </div>
      </div>
      
      {/* Widgets Dashboard */}
      <CustomizableDashboard 
        title="Audit Dashboard"
        widgets={[
          {
            id: '1',
            title: 'Vulnerability Heatmap',
            size: 'medium',
            type: 'heatmap',
            colSpan: 2,
            content: (
              <div className="p-4">
                <VulnerabilityHeatmap 
                  categories={auditData.vulnerabilities}
                  className="border-none shadow-none"
                />
              </div>
            ),
            minimizable: true
          },
          {
            id: '2',
            title: 'Recent Activity',
            size: 'small',
            type: 'activity',
            content: (
              <div className="p-4">
                <ul className="space-y-3">
                  {auditData.messages.map((msg: any, idx: number) => (
                    <li key={idx} className="border-b pb-2 last:border-0">
                      <div className="flex items-start gap-3">
                        <span className="text-sm font-medium">{msg.sender.name}</span>
                        <span className="text-sm text-muted-foreground">{msg.timestamp}</span>
                      </div>
                      <p className="text-sm truncate">
                        {msg.content.length > 80 ? `${msg.content.substring(0, 80)}...` : msg.content}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ),
            minimizable: true
          },
          {
            id: '3',
            title: 'Smart Contract Coverage',
            size: 'small',
            type: 'coverage',
            content: (
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold">86%</div>
                    <div className="text-sm text-muted-foreground">Code Coverage</div>
                  </div>
                  <div className="h-16 w-16 rounded-full border-4 border-primary flex items-center justify-center">
                    <span className="text-lg font-bold">86%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Contract Core</span>
                    <span>92%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '92%' }}></div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Oracle Integration</span>
                    <span>78%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '78%' }}></div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>External Interfaces</span>
                    <span>84%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '84%' }}></div>
                  </div>
                </div>
              </div>
            ),
            minimizable: true
          },
          {
            id: '4',
            title: 'Learning Resources',
            size: 'small',
            type: 'resources',
            content: (
              <div className="p-4">
                <div className="flex items-center mb-3 text-primary">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <h3 className="font-medium">Recommended Reading</h3>
                </div>
                <ul className="space-y-3">
                  {auditData.learningResources.map((resource: any, idx: number) => (
                    <li key={idx} className="border-b pb-2 last:border-0">
                      <p className="text-sm font-medium">{resource.title}</p>
                      <div className="flex items-center justify-between mt-1">
                        <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                        <span className="text-xs text-muted-foreground">{resource.readingTime} read</span>
                      </div>
                    </li>
                  ))}
                </ul>
                <Button variant="ghost" size="sm" className="w-full mt-3">
                  <PlusCircle className="h-4 w-4 mr-1" />
                  View All Resources
                </Button>
              </div>
            ),
            minimizable: true
          }
        ]}
        onAddWidget={() => toast.info("Widget customization coming soon")}
      />
    </div>
  );
};

import React, { useState } from "react";
import { usePlatformValidator } from "@/utils/validation/hooks/usePlatformValidator";
import { Button } from "@/components/ui/button";
import { ValidationIssue } from "@/utils/validation/types";

// Import our refactored components
import {
  ScoreCard,
  SeverityCard,
  IssuesTypeCard,
  ActionsCard,
  DetailedAnalysis,
  ReportHeader,
  calculateScore,
  getScoreDetails
} from "./accessibility";

export function AccessibilityReport() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [downloadFormat, setDownloadFormat] = useState<"pdf" | "csv" | "json">("pdf");
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  // Use the platform validator to get issues
  const { issues, runValidation, isValidating } = usePlatformValidator({
    includePerformance: true
  });
  
  // Filter issues by type
  const accessibilityIssues = issues.filter(issue => issue.type === 'accessibility');
  const performanceIssues = issues.filter(issue => issue.type === 'performance');
  const designIssues = issues.filter(issue => 
    ['design', 'styling', 'responsive', 'ui'].includes(issue.type)
  );
  const contentIssues = issues.filter(issue => 
    ['content', 'navigation', 'link'].includes(issue.type)
  );
  
  // Count issues by severity
  const highSeverityCount = issues.filter(issue => issue.severity === 'high').length;
  const mediumSeverityCount = issues.filter(issue => issue.severity === 'medium').length;
  const lowSeverityCount = issues.filter(issue => issue.severity === 'low').length;
  
  // Calculate overall score and get score details
  const score = calculateScore(highSeverityCount, mediumSeverityCount, lowSeverityCount);
  const { grade, color } = getScoreDetails(score);
  
  // Handle report download
  const handleDownloadReport = () => {
    setIsGeneratingReport(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGeneratingReport(false);
      alert(`Report would be downloaded as ${downloadFormat.toUpperCase()}`);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Report Header */}
      <ReportHeader 
        downloadFormat={downloadFormat}
        setDownloadFormat={setDownloadFormat}
        handleDownloadReport={handleDownloadReport}
        isGeneratingReport={isGeneratingReport}
      />
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ScoreCard score={score} grade={grade} color={color} />
        
        <SeverityCard 
          highSeverityCount={highSeverityCount}
          mediumSeverityCount={mediumSeverityCount}
          lowSeverityCount={lowSeverityCount}
          totalIssuesCount={issues.length}
        />

        <IssuesTypeCard 
          accessibilityIssues={accessibilityIssues.length}
          performanceIssues={performanceIssues.length}
          designIssues={designIssues.length}
          contentIssues={contentIssues.length}
        />
        
        <ActionsCard 
          runValidation={runValidation}
          isValidating={isValidating}
        />
      </div>
      
      {/* Detailed Analysis */}
      <DetailedAnalysis 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        issues={issues}
        highSeverityCount={highSeverityCount}
        accessibilityIssues={accessibilityIssues}
        performanceIssues={performanceIssues}
        designIssues={designIssues}
        contentIssues={contentIssues}
      />
    </div>
  );
}

export default AccessibilityReport;

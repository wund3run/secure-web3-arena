
import React from "react";
import { Button } from "@/components/ui/button";
import { IssueList } from "./IssueList";
import { ValidationIssue } from "@/utils/validation/types";
import { CheckCircle } from "lucide-react";

interface OverviewTabContentProps {
  issues: ValidationIssue[];
  highSeverityCount: number;
  accessibilityIssues: ValidationIssue[];
  performanceIssues: ValidationIssue[];
  designIssues: ValidationIssue[];
  contentIssues: ValidationIssue[];
  setActiveTab?: (tab: string) => void;
}

export const OverviewTabContent: React.FC<OverviewTabContentProps> = ({ 
  issues, 
  highSeverityCount, 
  accessibilityIssues, 
  performanceIssues,
  designIssues,
  contentIssues,
  setActiveTab
}) => {
  if (issues.length === 0) {
    return (
      <div className="py-8 text-center">
        <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-2" />
        <p className="text-xl font-medium text-green-500 mb-1">No issues detected!</p>
        <p className="text-muted-foreground">
          The platform appears to be functioning properly with no detected issues.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-medium mb-2">High Priority Issues</h3>
          {issues.filter(i => i.severity === 'high').length > 0 ? (
            <IssueList issues={issues.filter(i => i.severity === 'high')} />
          ) : (
            <p className="text-muted-foreground">No high priority issues found!</p>
          )}
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Medium Priority Issues</h3>
          {issues.filter(i => i.severity === 'medium').slice(0, 3).length > 0 ? (
            <IssueList issues={issues.filter(i => i.severity === 'medium').slice(0, 3)} />
          ) : (
            <p className="text-muted-foreground">No medium priority issues found!</p>
          )}
          {issues.filter(i => i.severity === 'medium').length > 3 && setActiveTab && (
            <Button variant="link" className="mt-2 p-0" onClick={() => setActiveTab("accessibility")}>
              View {issues.filter(i => i.severity === 'medium').length - 3} more medium issues
            </Button>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Recommendations Summary</h3>
        <ul className="list-disc pl-5 space-y-1">
          {highSeverityCount > 0 && (
            <li>Address {highSeverityCount} high severity issue(s) before launch</li>
          )}
          {accessibilityIssues.length > 0 && (
            <li>Fix {accessibilityIssues.length} accessibility issue(s) to improve WCAG compliance</li>
          )}
          {performanceIssues.length > 0 && (
            <li>Address {performanceIssues.length} performance issue(s) to improve page load time</li>
          )}
          {designIssues.length > 0 && (
            <li>Fix {designIssues.length} design issue(s) for better user experience</li>
          )}
          {contentIssues.length > 0 && (
            <li>Improve {contentIssues.length} content/navigation issue(s) for better information architecture</li>
          )}
          {issues.length === 0 && (
            <li className="text-green-500">No issues detected - great job!</li>
          )}
        </ul>
      </div>
    </div>
  );
};

interface CategoryTabContentProps {
  title: string;
  issues: ValidationIssue[];
}

export const CategoryTabContent: React.FC<CategoryTabContentProps> = ({ title, issues }) => {
  return (
    <>
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <IssueList issues={issues} />
    </>
  );
};

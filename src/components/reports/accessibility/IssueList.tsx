
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";
import { ValidationIssue } from "@/utils/validation/types";

interface IssueListProps {
  issues: ValidationIssue[];
}

export const IssueList: React.FC<IssueListProps> = ({ issues }) => {
  if (issues.length === 0) {
    return (
      <div className="py-8 text-center">
        <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-2" />
        <p className="text-muted-foreground">No issues found in this category</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {issues.map((issue, index) => (
        <div key={index} className="border rounded-md p-4">
          <div className="flex items-center gap-2 mb-2">
            {issue.severity === 'high' && <AlertCircle className="h-5 w-5 text-red-500" />}
            {issue.severity === 'medium' && <AlertTriangle className="h-5 w-5 text-orange-500" />}
            {issue.severity === 'low' && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
            <h4 className="font-medium">{issue.description}</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Location: {issue.location}
          </p>
          {issue.suggestion && (
            <Alert variant="default" className="mt-2">
              <AlertTitle className="text-sm font-medium">Recommendation</AlertTitle>
              <AlertDescription className="text-sm">
                {issue.suggestion}
              </AlertDescription>
            </Alert>
          )}
        </div>
      ))}
    </div>
  );
};

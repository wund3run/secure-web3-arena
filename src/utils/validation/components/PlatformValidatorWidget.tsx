
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";
import { usePlatformValidator } from "../hooks/usePlatformValidator";
import { StakeholderType, ValidationIssue, ValidationSeverity } from "../types";

interface PlatformValidatorWidgetProps {
  stakeholder?: StakeholderType;
}

export function PlatformValidatorWidget({
  stakeholder = "general",
}: PlatformValidatorWidgetProps) {
  const [showAll, setShowAll] = useState(false);
  const { issues, isValidating, lastValidated, runValidation } =
    usePlatformValidator({
      stakeholderType: stakeholder,
      runOnMount: true,
      includePerformance: true,
    });

  // Group issues by type
  const issuesByType = issues.reduce<Record<string, ValidationIssue[]>>(
    (acc, issue) => {
      if (!acc[issue.type]) {
        acc[issue.type] = [];
      }
      acc[issue.type].push(issue);
      return acc;
    },
    {}
  );

  // Count issues by severity
  const highCount = issues.filter((issue) => issue.severity === "high").length;
  const mediumCount = issues.filter(
    (issue) => issue.severity === "medium"
  ).length;
  const lowCount = issues.filter((issue) => issue.severity === "low").length;

  return (
    <div className="space-y-4 rounded-md border p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h2 className="text-lg font-semibold">Platform Validation</h2>
          <p className="text-sm text-muted-foreground">
            {lastValidated
              ? `Last checked: ${lastValidated.toLocaleTimeString()}`
              : "Not validated yet"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            variant={highCount > 0 ? "destructive" : "outline"}
            className="flex items-center gap-1"
          >
            <XCircle className="h-3 w-3" />
            {highCount} High
          </Badge>
          <Badge
            variant={mediumCount > 0 ? "default" : "outline"}
            className="flex items-center gap-1 bg-amber-500"
          >
            <AlertTriangle className="h-3 w-3" />
            {mediumCount} Medium
          </Badge>
          <Badge
            variant={lowCount > 0 ? "secondary" : "outline"}
            className="flex items-center gap-1"
          >
            <CheckCircle className="h-3 w-3" />
            {lowCount} Low
          </Badge>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Summary" : "Show All Issues"}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={runValidation}
          disabled={isValidating}
          className="flex items-center gap-1"
        >
          <RefreshCw
            className={`h-3 w-3 ${isValidating ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {issues.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8">
          <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
          <p className="text-muted-foreground">No issues detected</p>
        </div>
      ) : (
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="issue-0"
        >
          {Object.entries(issuesByType).map(([type, typeIssues], idx) => (
            <AccordionItem key={type} value={`issue-${idx}`}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <span className="capitalize">{type}</span>
                  <Badge variant="outline">{typeIssues.length}</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {typeIssues
                    .slice(0, showAll ? undefined : 3)
                    .map((issue, issueIdx) => (
                      <div
                        key={issueIdx}
                        className="border rounded-md p-3 text-sm space-y-1"
                      >
                        <div className="flex items-start justify-between">
                          <div className="font-medium">{issue.description}</div>
                          {getSeverityBadge(issue.severity)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Location: {issue.location}
                        </div>
                        {issue.suggestion && (
                          <div className="text-xs mt-2 p-2 bg-muted rounded">
                            <span className="font-medium">Suggestion:</span>{" "}
                            {issue.suggestion}
                          </div>
                        )}
                      </div>
                    ))}

                  {!showAll && typeIssues.length > 3 && (
                    <Button
                      variant="link"
                      size="sm"
                      className="px-0"
                      onClick={() => setShowAll(true)}
                    >
                      Show {typeIssues.length - 3} more issues
                    </Button>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}

function getSeverityBadge(severity: ValidationSeverity) {
  switch (severity) {
    case "high":
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          High
        </Badge>
      );
    case "medium":
      return (
        <Badge variant="default" className="flex items-center gap-1 bg-amber-500">
          <AlertTriangle className="h-3 w-3" />
          Medium
        </Badge>
      );
    case "low":
      return (
        <Badge variant="secondary" className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Low
        </Badge>
      );
  }
}

export default PlatformValidatorWidget;

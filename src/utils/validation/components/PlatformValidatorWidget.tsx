
import React, { useState } from "react";
import { usePlatformValidator } from "../hooks/usePlatformValidator";
import { AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";

export function PlatformValidatorWidget({ onClose }: { onClose?: () => void }) {
  const { issues, isValidating, runValidation } = usePlatformValidator();
  const [isOpen, setIsOpen] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  
  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };
  
  if (!isOpen) return null;
  
  // Group issues by type
  const issuesByType = issues.reduce((acc, issue) => {
    if (!acc[issue.type]) {
      acc[issue.type] = [];
    }
    acc[issue.type].push(issue);
    return acc;
  }, {} as Record<string, typeof issues>);
  
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'low':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 bg-card border shadow-lg rounded-lg overflow-hidden max-h-[80vh]">
      <div className="p-4 bg-muted flex justify-between items-center border-b">
        <h3 className="font-medium">Platform Validator</h3>
        <button onClick={handleClose} className="text-muted-foreground hover:text-foreground">
          ✕
        </button>
      </div>
      <div className="p-4 overflow-y-auto max-h-[calc(80vh-4rem)]">
        <div className="flex justify-between mb-4">
          <div>
            <span className="font-medium">Issues found: </span>
            <span className={issues.length > 0 ? 'text-red-500' : 'text-green-500'}>
              {issues.length}
            </span>
          </div>
          <button
            onClick={runValidation}
            disabled={isValidating}
            className="text-sm bg-primary text-primary-foreground px-2 py-1 rounded hover:bg-primary/90 disabled:opacity-50"
            aria-label={isValidating ? "Scanning in progress..." : "Scan for issues"}
          >
            {isValidating ? 'Scanning...' : 'Scan Again'}
          </button>
        </div>
        
        {issues.length > 0 ? (
          <div className="space-y-4">
            {Object.entries(issuesByType).map(([type, typeIssues]) => (
              <div key={type} className="border rounded-md overflow-hidden">
                <button 
                  onClick={() => setExpandedCategory(expandedCategory === type ? null : type)}
                  className="w-full flex justify-between items-center p-2 text-left bg-muted hover:bg-muted/80"
                  aria-expanded={expandedCategory === type}
                >
                  <div className="flex items-center">
                    <span className="capitalize font-medium">{type}</span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      ({typeIssues.length} {typeIssues.length === 1 ? 'issue' : 'issues'})
                    </span>
                  </div>
                  <span>{expandedCategory === type ? '−' : '+'}</span>
                </button>
                
                {expandedCategory === type && (
                  <ul className="divide-y">
                    {typeIssues.map((issue, i) => (
                      <li key={i} className="p-2 text-xs">
                        <div className="flex items-center gap-1 font-medium">
                          {getSeverityIcon(issue.severity)}
                          {issue.description}
                        </div>
                        <div className="text-muted-foreground mt-1">Location: {issue.location}</div>
                        {issue.suggestion && (
                          <div className="mt-1 text-blue-500">Tip: {issue.suggestion}</div>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-center py-4">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <p className="text-green-500">No issues detected on this page! 🎉</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlatformValidatorWidget;

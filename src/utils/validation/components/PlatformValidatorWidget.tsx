
import React, { useState, useEffect } from "react";
import { usePlatformValidator } from "../hooks/usePlatformValidator";
import { AlertTriangle, CheckCircle, AlertCircle, RefreshCw, X, Filter, List } from "lucide-react";
import { ValidationIssue } from "../types";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export interface PlatformValidatorWidgetProps {
  onClose?: () => void;
  stakeholderType?: 'auditor' | 'project-owner' | 'admin' | 'general';
  showAllTypes?: boolean;
}

export function PlatformValidatorWidget({ 
  onClose, 
  stakeholderType = 'general',
  showAllTypes = false 
}: PlatformValidatorWidgetProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<('high' | 'medium' | 'low')[]>([
    'high', 'medium', 'low'
  ]);
  const [filterType, setFilterType] = useState<string[]>([]);
  const [showFixSuggestions, setShowFixSuggestions] = useState(true);

  // Use the enhanced validator hook
  const { issues, isValidating, lastValidated, runValidation } = usePlatformValidator({
    stakeholderType,
    filterBySeverity: filterSeverity
  });
  
  // Handle closing the widget
  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };
  
  // Initialize filter types based on available issues
  useEffect(() => {
    if (issues.length > 0) {
      const types = [...new Set(issues.map(issue => issue.type))];
      if (filterType.length === 0) {
        setFilterType(types);
      }
    }
  }, [issues]);
  
  // Apply filters to issues
  const filteredIssues = issues.filter(issue => 
    filterSeverity.includes(issue.severity) && 
    filterType.includes(issue.type)
  );
  
  if (!isOpen) return null;
  
  // Group issues by type
  const issuesByType = filteredIssues.reduce((acc, issue) => {
    if (!acc[issue.type]) {
      acc[issue.type] = [];
    }
    acc[issue.type].push(issue);
    return acc;
  }, {} as Record<string, ValidationIssue[]>);
  
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

  const typeCounts = issues.reduce((acc, issue) => {
    acc[issue.type] = (acc[issue.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const formatTimestamp = (date: Date | null) => {
    if (!date) return 'Not yet validated';
    
    // Format to something like "2 minutes ago" or the actual time if longer
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins === 1) return '1 minute ago';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    
    return date.toLocaleTimeString();
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 bg-card border shadow-lg rounded-lg overflow-hidden max-h-[80vh]">
      <div className="p-4 bg-muted flex justify-between items-center border-b">
        <h3 className="font-medium">Platform Validator</h3>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => runValidation()} 
            disabled={isValidating}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Re-run validation"
          >
            <RefreshCw size={16} className={isValidating ? 'animate-spin' : ''} />
          </button>
          <button 
            onClick={handleClose} 
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close validator"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      
      <div className="p-4 overflow-y-auto max-h-[calc(80vh-4rem)]">
        <div className="flex justify-between mb-4">
          <div>
            <span className="font-medium">Issues found: </span>
            <span className={filteredIssues.length > 0 ? 'text-red-500' : 'text-green-500'}>
              {filteredIssues.length}
            </span>
            <p className="text-xs text-muted-foreground">
              Last scan: {formatTimestamp(lastValidated)}
            </p>
          </div>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Filter size={16} />
                  <span className="sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <div className="p-2">
                  <p className="text-xs font-medium mb-1">Severity</p>
                  {['high', 'medium', 'low'].map((severity) => (
                    <DropdownMenuCheckboxItem
                      key={severity}
                      checked={filterSeverity.includes(severity as any)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFilterSeverity([...filterSeverity, severity as any]);
                        } else {
                          setFilterSeverity(filterSeverity.filter(s => s !== severity));
                        }
                      }}
                    >
                      <span className="capitalize">{severity}</span>
                    </DropdownMenuCheckboxItem>
                  ))}
                  
                  {showAllTypes && (
                    <>
                      <p className="text-xs font-medium mt-2 mb-1">Type</p>
                      {Object.keys(typeCounts).map((type) => (
                        <DropdownMenuCheckboxItem
                          key={type}
                          checked={filterType.includes(type)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFilterType([...filterType, type]);
                            } else {
                              setFilterType(filterType.filter(t => t !== type));
                            }
                          }}
                        >
                          <span className="capitalize">{type} ({typeCounts[type]})</span>
                        </DropdownMenuCheckboxItem>
                      ))}
                    </>
                  )}
                  
                  <div className="mt-2">
                    <DropdownMenuCheckboxItem
                      checked={showFixSuggestions}
                      onCheckedChange={setShowFixSuggestions}
                    >
                      Show suggestions
                    </DropdownMenuCheckboxItem>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button
              onClick={runValidation}
              disabled={isValidating}
              className="text-xs"
              size="sm"
              variant="outline"
            >
              {isValidating ? 'Scanning...' : 'Scan Again'}
            </Button>
          </div>
        </div>
        
        {filteredIssues.length > 0 ? (
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
                      <li key={i} className="p-3 text-sm">
                        <div className="flex items-center gap-1 font-medium">
                          {getSeverityIcon(issue.severity)}
                          {issue.description}
                        </div>
                        <div className="text-muted-foreground mt-1 text-xs">
                          Location: {issue.location}
                        </div>
                        {showFixSuggestions && issue.suggestion && (
                          <div className="mt-2 text-blue-500 text-xs flex items-start">
                            <span className="font-medium mr-1">Tip:</span> 
                            {issue.suggestion}
                          </div>
                        )}
                        {issue.affectedStakeholders && issue.affectedStakeholders.length > 0 && (
                          <div className="mt-2 text-xs flex flex-wrap gap-1">
                            {issue.affectedStakeholders.map(s => (
                              <span 
                                key={s}
                                className="px-1.5 py-0.5 rounded-full bg-muted text-xs"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
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

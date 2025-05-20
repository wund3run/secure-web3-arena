
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, CheckCircle2, Info, Bug } from "lucide-react";
import { generateUXAuditReport, UXAuditReport } from '@/utils/validation/generate-ux-report';
import { ValidationIssue } from '@/utils/validation/types';

/**
 * Component that generates and displays a comprehensive UI/UX audit report
 */
export const UXAuditReportView: React.FC = () => {
  const location = useLocation();
  const [report, setReport] = useState<UXAuditReport | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('summary');
  
  useEffect(() => {
    setIsLoading(true);
    
    // Wait for DOM to be fully loaded before running audit
    const auditTimeout = setTimeout(() => {
      const auditReport = generateUXAuditReport(location.pathname);
      setReport(auditReport);
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(auditTimeout);
  }, [location.pathname]);
  
  // Function to render issues list with severity badges
  const renderIssuesList = (issues: ValidationIssue[]) => {
    if (issues.length === 0) {
      return (
        <div className="flex items-center justify-center py-6 text-muted-foreground">
          <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
          No issues found
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        {issues.map((issue, index) => (
          <div key={index} className="border rounded-md p-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{issue.description}</p>
                <p className="text-sm text-muted-foreground">Location: {issue.location}</p>
              </div>
              <Badge variant={
                issue.severity === 'high' ? 'destructive' : 
                issue.severity === 'medium' ? 'default' : 
                'outline'
              }>
                {issue.severity}
              </Badge>
            </div>
            {issue.suggestion && (
              <div className="mt-2 text-sm border-t pt-2">
                <span className="font-medium">Suggestion: </span> 
                {issue.suggestion}
              </div>
            )}
            {issue.wcagCriterion && (
              <div className="mt-1 text-xs text-blue-600">
                {issue.wcagCriterion}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>UI/UX Audit Report</CardTitle>
          <CardDescription>Analyzing interface and user experience...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-12">
          <div className="flex flex-col items-center text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Scanning for UI/UX issues and inconsistencies...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!report) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>UI/UX Audit Error</CardTitle>
          <CardDescription>Failed to generate report</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Could not generate UI/UX audit report. Please try again or contact support.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>UI/UX Audit Report</CardTitle>
            <CardDescription>
              Generated on {report.timestamp.toLocaleDateString()} at {report.timestamp.toLocaleTimeString()}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge variant={report.totalIssues === 0 ? "success" : "outline"} className="h-7">
              Total: {report.totalIssues}
            </Badge>
            {report.criticalIssues > 0 && (
              <Badge variant="destructive" className="h-7">
                Critical: {report.criticalIssues}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {report.totalIssues > 0 && (
          <Alert className={`mb-6 ${report.criticalIssues > 0 ? 'bg-red-50 text-red-800 border-red-200' : 'bg-amber-50 text-amber-800 border-amber-200'}`}>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>
              {report.criticalIssues > 0 
                ? 'Critical issues detected' 
                : 'Issues need attention'}
            </AlertTitle>
            <AlertDescription>
              This report found {report.totalIssues} issues that should be addressed before public launch.
              {report.criticalIssues > 0 && ' The critical issues require immediate attention.'}
            </AlertDescription>
          </Alert>
        )}
        
        {report.totalIssues === 0 && (
          <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>No issues detected</AlertTitle>
            <AlertDescription>
              The UI/UX audit found no issues. The page is ready for public launch!
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="navigation">
              Navigation
              {report.routeIssues.length > 0 && (
                <span className="ml-1 text-xs bg-red-100 text-red-800 px-1 rounded-full">
                  {report.routeIssues.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="accessibility">
              Accessibility
              {report.accessibilityIssues.length > 0 && (
                <span className="ml-1 text-xs bg-red-100 text-red-800 px-1 rounded-full">
                  {report.accessibilityIssues.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="stakeholder">
              Stakeholder
              {report.stakeholderIssues.length > 0 && (
                <span className="ml-1 text-xs bg-red-100 text-red-800 px-1 rounded-full">
                  {report.stakeholderIssues.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="responsive">
              Responsive
              {report.responsiveIssues.length > 0 && (
                <span className="ml-1 text-xs bg-red-100 text-red-800 px-1 rounded-full">
                  {report.responsiveIssues.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Issues by Severity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>High Priority:</span>
                      <Badge variant={report.highPriorityIssues > 0 ? "destructive" : "outline"}>
                        {report.highPriorityIssues}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Medium Priority:</span>
                      <Badge variant={report.mediumPriorityIssues > 0 ? "default" : "outline"}>
                        {report.mediumPriorityIssues}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Low Priority:</span>
                      <Badge variant="outline">{report.lowPriorityIssues}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Issues by Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Navigation:</span>
                      <Badge variant={report.routeIssues.length > 0 ? "default" : "outline"}>
                        {report.routeIssues.length}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Accessibility:</span>
                      <Badge variant={report.accessibilityIssues.length > 0 ? "default" : "outline"}>
                        {report.accessibilityIssues.length}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Responsive Design:</span>
                      <Badge variant={report.responsiveIssues.length > 0 ? "default" : "outline"}>
                        {report.responsiveIssues.length}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {report.suggestedFixes.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Suggested Fixes</h3>
                <ul className="list-disc list-inside space-y-1">
                  {report.suggestedFixes.slice(0, 5).map((fix, index) => (
                    <li key={index} className="text-sm">{fix}</li>
                  ))}
                  {report.suggestedFixes.length > 5 && (
                    <li className="text-sm text-muted-foreground">
                      + {report.suggestedFixes.length - 5} more suggestions (see detailed tabs)
                    </li>
                  )}
                </ul>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="navigation">
            <h3 className="text-lg font-medium mb-4">Navigation Issues</h3>
            {renderIssuesList(report.routeIssues)}
          </TabsContent>
          
          <TabsContent value="accessibility">
            <h3 className="text-lg font-medium mb-4">Accessibility Issues</h3>
            {renderIssuesList(report.accessibilityIssues)}
          </TabsContent>
          
          <TabsContent value="stakeholder">
            <h3 className="text-lg font-medium mb-4">Stakeholder Experience Issues</h3>
            {renderIssuesList(report.stakeholderIssues)}
          </TabsContent>
          
          <TabsContent value="responsive">
            <h3 className="text-lg font-medium mb-4">Responsive Design Issues</h3>
            {renderIssuesList(report.responsiveIssues)}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <div className="flex items-center text-sm text-muted-foreground">
          <Info className="h-4 w-4 mr-1" />
          Run this tool on each page to find UI/UX issues
        </div>
        <Button variant="outline" size="sm">
          <Bug className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </CardFooter>
    </Card>
  );
};

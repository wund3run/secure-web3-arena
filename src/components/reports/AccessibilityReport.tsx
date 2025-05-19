import React, { useState, useEffect } from "react";
import { usePlatformValidator } from "@/utils/validation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, AlertTriangle, CheckCircle, BarChart2, Download } from "lucide-react";
import { ValidationIssue } from "@/utils/validation/types";

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
  
  // Calculate overall score (0-100)
  // Formula: 100 - (highSeverity * 10 + mediumSeverity * 3 + lowSeverity * 1)
  const calculateScore = () => {
    const penalty = highSeverityCount * 10 + mediumSeverityCount * 3 + lowSeverityCount * 1;
    return Math.max(0, Math.min(100, 100 - penalty));
  };
  
  const score = calculateScore();
  
  // Get score grade and color
  const getScoreDetails = () => {
    if (score >= 90) return { grade: 'A', color: 'text-green-500' };
    if (score >= 80) return { grade: 'B', color: 'text-emerald-500' };
    if (score >= 70) return { grade: 'C', color: 'text-yellow-500' };
    if (score >= 60) return { grade: 'D', color: 'text-orange-500' };
    return { grade: 'F', color: 'text-red-500' };
  };
  
  const { grade, color } = getScoreDetails();
  
  // Handle report download
  const handleDownloadReport = () => {
    setIsGeneratingReport(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGeneratingReport(false);
      alert(`Report would be downloaded as ${downloadFormat.toUpperCase()}`);
    }, 1500);
  };
  
  // Get issue list component for a tab
  const IssueList = ({ issues }: { issues: ValidationIssue[] }) => {
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

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Platform Validation Report</h2>
          <p className="text-muted-foreground mt-1">
            Comprehensive analysis of accessibility, performance, and user experience
          </p>
        </div>
        
        <div className="flex gap-2 items-start">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDownloadFormat("pdf")}
              className={downloadFormat === "pdf" ? "bg-muted" : ""}
            >
              PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDownloadFormat("csv")}
              className={downloadFormat === "csv" ? "bg-muted" : ""}
            >
              CSV
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDownloadFormat("json")}
              className={downloadFormat === "json" ? "bg-muted" : ""}
            >
              JSON
            </Button>
          </div>
          
          <Button 
            onClick={handleDownloadReport} 
            disabled={isGeneratingReport}
            size="sm"
          >
            <Download className="mr-2 h-4 w-4" />
            {isGeneratingReport ? "Generating..." : "Download Report"}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className={`text-4xl font-bold tracking-tight ${color}`}>{score}</div>
                <div className={`text-xl font-semibold ${color}`}>Grade: {grade}</div>
              </div>
              <div className="rounded-full bg-muted p-2">
                <BarChart2 className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Issues by Severity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                  <span className="text-sm">High: {highSeverityCount}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mr-2" />
                  <span className="text-sm">Medium: {mediumSeverityCount}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2" />
                  <span className="text-sm">Low: {lowSeverityCount}</span>
                </div>
              </div>
              <div>
                <div className="text-2xl font-semibold">{issues.length}</div>
                <div className="text-xs text-muted-foreground">Total Issues</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Issues by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Accessibility</span>
                <Badge variant={accessibilityIssues.length > 0 ? "destructive" : "secondary"}>
                  {accessibilityIssues.length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Performance</span>
                <Badge variant={performanceIssues.length > 0 ? "destructive" : "secondary"}>
                  {performanceIssues.length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Design & UI</span>
                <Badge variant={designIssues.length > 0 ? "destructive" : "secondary"}>
                  {designIssues.length}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Content & Navigation</span>
                <Badge variant={contentIssues.length > 0 ? "destructive" : "secondary"}>
                  {contentIssues.length}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={runValidation}
              disabled={isValidating}
            >
              {isValidating ? "Scanning..." : "Re-scan Platform"}
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Detailed Analysis</CardTitle>
          <CardDescription>
            Comprehensive breakdown of issues by category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="design">Design & UI</TabsTrigger>
              <TabsTrigger value="content">Content & Navigation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              {issues.length > 0 ? (
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
                      {issues.filter(i => i.severity === 'medium').length > 3 && (
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
              ) : (
                <div className="py-8 text-center">
                  <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-2" />
                  <p className="text-xl font-medium text-green-500 mb-1">No issues detected!</p>
                  <p className="text-muted-foreground">
                    The platform appears to be functioning properly with no detected issues.
                  </p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="accessibility">
              <h3 className="text-lg font-medium mb-4">Accessibility Issues</h3>
              <IssueList issues={accessibilityIssues} />
            </TabsContent>
            
            <TabsContent value="performance">
              <h3 className="text-lg font-medium mb-4">Performance Issues</h3>
              <IssueList issues={performanceIssues} />
            </TabsContent>
            
            <TabsContent value="design">
              <h3 className="text-lg font-medium mb-4">Design & UI Issues</h3>
              <IssueList issues={designIssues} />
            </TabsContent>
            
            <TabsContent value="content">
              <h3 className="text-lg font-medium mb-4">Content & Navigation Issues</h3>
              <IssueList issues={contentIssues} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default AccessibilityReport;

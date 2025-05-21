
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { usePlatformValidator } from "@/utils/validation/hooks/usePlatformValidator";
import { PlatformReportTable } from "@/components/platform-report/PlatformReportTable";
import { RouteCheckerPanel } from "@/utils/validation/route-checker";
import { ValidationIssue } from "@/utils/validation/types";
import { Link } from "react-router-dom";
import { AlertTriangle, CheckCircle, ExternalLink, FileText, Link2 } from "lucide-react";

export default function PlatformReport() {
  const [showRouteChecker, setShowRouteChecker] = useState(false);
  const [activeTab, setActiveTab] = useState("issues");
  
  // Use platform validator to check for issues
  const { issues, isValidating, runValidation, lastValidated } = usePlatformValidator({
    runOnMount: true,
    includePerformance: true,
    filterBySeverity: ["high", "medium"]
  });
  
  // Group issues by type
  const [issuesByType, setIssuesByType] = useState<Record<string, ValidationIssue[]>>({});
  
  useEffect(() => {
    const grouped = issues.reduce((acc: Record<string, ValidationIssue[]>, issue) => {
      if (!acc[issue.type]) {
        acc[issue.type] = [];
      }
      acc[issue.type].push(issue);
      return acc;
    }, {});
    
    setIssuesByType(grouped);
  }, [issues]);
  
  // Get total counts
  const getIssueCounts = () => {
    const highCount = issues.filter(i => i.severity === "high").length;
    const mediumCount = issues.filter(i => i.severity === "medium").length;
    const lowCount = issues.filter(i => i.severity === "low").length;
    
    return { high: highCount, medium: mediumCount, low: lowCount, total: issues.length };
  };
  
  const counts = getIssueCounts();

  return (
    <>
      <Helmet>
        <title>Platform Status Report | Hawkly</title>
        <meta name="description" content="Comprehensive report on platform health, usability, and performance for Hawkly Web3 security marketplace." />
      </Helmet>
      <Navbar />
      <main className="min-h-screen bg-background pt-6 pb-12">
        <div className="container max-w-7xl">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Platform Status Report</h1>
              <p className="text-muted-foreground">
                Comprehensive analysis of issues, usability, and performance
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                onClick={() => runValidation()} 
                disabled={isValidating}
              >
                {isValidating ? "Scanning..." : "Run New Scan"}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowRouteChecker(!showRouteChecker)}
              >
                {showRouteChecker ? "Hide Route Checker" : "Show Route Checker"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className={counts.high > 0 ? "border-red-200" : ""}>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">{counts.high}</CardTitle>
                <CardDescription>High Severity Issues</CardDescription>
              </CardHeader>
            </Card>
            <Card className={counts.medium > 0 ? "border-amber-200" : ""}>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">{counts.medium}</CardTitle>
                <CardDescription>Medium Severity Issues</CardDescription>
              </CardHeader>
            </Card>
            <Card className={counts.low > 0 ? "border-blue-200" : ""}>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">{counts.low}</CardTitle>
                <CardDescription>Low Severity Issues</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-muted/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">{counts.total}</CardTitle>
                <CardDescription>Total Issues Found</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                {lastValidated && (
                  <p className="text-xs text-muted-foreground">
                    Last scanned: {lastValidated.toLocaleTimeString()}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {showRouteChecker && (
            <div className="mb-8">
              <RouteCheckerPanel />
            </div>
          )}

          {issues.length === 0 && !isValidating ? (
            <Card className="mb-8 border-green-200 bg-green-50/30">
              <CardContent className="pt-6 flex items-center justify-center flex-col text-center p-12">
                <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                <h2 className="text-xl font-semibold mb-2">All Systems Operational</h2>
                <p className="text-muted-foreground mb-4 max-w-lg">
                  No issues were detected in the current scan. The platform appears to be working optimally across all checked metrics.
                </p>
                <Button onClick={() => runValidation()}>Run Another Scan</Button>
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="issues">All Issues</TabsTrigger>
                <TabsTrigger value="ui">UI/UX Issues</TabsTrigger>
                <TabsTrigger value="functionality">Functionality</TabsTrigger>
                <TabsTrigger value="stakeholders">By Stakeholder</TabsTrigger>
              </TabsList>
              
              <TabsContent value="issues" className="space-y-6">
                {isValidating ? (
                  <Card className="p-8 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                      <p>Scanning platform for issues...</p>
                    </div>
                  </Card>
                ) : (
                  <PlatformReportTable issues={issues} />
                )}
              </TabsContent>
              
              <TabsContent value="ui" className="space-y-6">
                <PlatformReportTable 
                  issues={issues.filter(issue => 
                    ['ui', 'responsive', 'accessibility', 'navigation'].includes(issue.type)
                  )} 
                />
              </TabsContent>
              
              <TabsContent value="functionality" className="space-y-6">
                <PlatformReportTable 
                  issues={issues.filter(issue => 
                    ['functionality', 'performance', 'interactive'].includes(issue.type)
                  )} 
                />
              </TabsContent>
              
              <TabsContent value="stakeholders" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span>Auditor Experience</span>
                        <Badge>Primary</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <PlatformReportTable 
                        issues={issues.filter(issue => 
                          issue.affectedStakeholders?.includes('auditor')
                        )}
                        compact
                      />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span>Project Owner Experience</span>
                        <Badge>Primary</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <PlatformReportTable 
                        issues={issues.filter(issue => 
                          issue.affectedStakeholders?.includes('project-owner')
                        )}
                        compact
                      />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          )}
          
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Quick Links to Key Platform Areas</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[
                  { title: "Onboarding", path: "/service-provider-onboarding", icon: FileText },
                  { title: "Marketplace", path: "/marketplace", icon: Link2 },
                  { title: "Submit Service", path: "/submit-service", icon: ExternalLink },
                  { title: "Request Audit", path: "/request-audit", icon: FileText }
                ].map((link) => (
                  <Link
                    to={link.path}
                    key={link.path}
                    className="flex items-center p-3 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <link.icon className="h-5 w-5 mr-2 text-primary" />
                    <span>{link.title}</span>
                  </Link>
                ))}
              </div>
            </div>
            
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Usage Information</AlertTitle>
              <AlertDescription>
                This report helps identify issues across the platform. Use the tabs to filter by issue type 
                and stakeholder impact. Run new scans after making changes to verify improvements.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

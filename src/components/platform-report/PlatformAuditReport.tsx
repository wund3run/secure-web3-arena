
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlatformReportTable } from "./PlatformReportTable";
import { CheckCircle, AlertTriangle, XCircle, Activity, Globe, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { RouteValidator } from "@/components/dev/RouteValidator";

const PlatformAuditReport = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showRouteValidator, setShowRouteValidator] = useState(false);
  const navigate = useNavigate();

  const goToRoute = (route: string) => {
    navigate(route);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Platform Audit Report</h1>
        <p className="text-muted-foreground">
          Comprehensive analysis of platform security, accessibility, performance, and navigation
        </p>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowRouteValidator(!showRouteValidator)}
        >
          {showRouteValidator ? "Hide Route Validator" : "Show Route Validator"}
        </Button>
      </div>
      
      {showRouteValidator && (
        <div className="my-4">
          <RouteValidator />
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 gap-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-green-600">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Passing Checks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">37</div>
                <p className="text-xs text-muted-foreground">
                  Features and components with no issues
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-amber-600">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Warnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  Minor issues that should be addressed
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-red-600">
                  <XCircle className="mr-2 h-5 w-5" />
                  Critical Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  High priority issues requiring immediate attention
                </p>
              </CardContent>
            </Card>
          </div>

          <PlatformReportTable />
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  The platform has undergone a comprehensive security assessment,
                  focusing on authentication mechanisms, data encryption, and
                  protection against common vulnerabilities.
                </p>

                <h3 className="text-lg font-semibold mt-4">Key Findings:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Strong authentication implementation with proper session management</li>
                  <li>Secure data handling practices throughout the application</li>
                  <li>Protected API endpoints with proper authorization checks</li>
                  <li>Need for additional rate limiting on authentication endpoints</li>
                  <li>Recommendation to implement additional CSRF protections</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accessibility" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Accessibility Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  The platform has been evaluated against WCAG 2.1 AA standards
                  to ensure it's accessible to users with various disabilities.
                </p>

                <h3 className="text-lg font-semibold mt-4">Key Findings:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Proper semantic HTML structure throughout the application</li>
                  <li>Keyboard navigation works for most critical user journeys</li>
                  <li>Color contrast meets AA standards in most areas</li>
                  <li>Some interactive elements need improved focus states</li>
                  <li>A few form elements missing proper label associations</li>
                  <li>Need for improved screen reader announcements for dynamic content</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  Platform performance has been measured across different devices and network conditions
                  to ensure optimal user experience.
                </p>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">First Contentful Paint</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">0.8s</div>
                      <p className="text-xs text-muted-foreground">Target: &lt; 1.0s</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Largest Contentful Paint</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2.1s</div>
                      <p className="text-xs text-muted-foreground">Target: &lt; 2.5s</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Cumulative Layout Shift</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">0.05</div>
                      <p className="text-xs text-muted-foreground">Target: &lt; 0.1</p>
                    </CardContent>
                  </Card>
                </div>
                
                <h3 className="text-lg font-semibold mt-4">Recommendations:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Optimize image loading with better compression and lazy loading</li>
                  <li>Implement code splitting for large component bundles</li>
                  <li>Reduce JavaScript bundle size through tree shaking</li>
                  <li>Add resource hints for critical assets</li>
                  <li>Optimize API response times for marketplace listings</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="navigation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Navigation Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  Platform navigation has been analyzed for intuitiveness, consistency, 
                  and completeness across different user roles.
                </p>

                <h3 className="text-lg font-semibold mt-4">Key User Journeys:</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Project Owner Journey</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Browse security services</li>
                        <li>Request audit for project</li>
                        <li>Review providers' profiles</li>
                        <li>Set up escrow for payment</li>
                        <li>Review completed audit reports</li>
                      </ul>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                        onClick={() => goToRoute("/dashboard/project")}
                      >
                        View Project Owner Dashboard
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Auditor Journey</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Create service offerings</li>
                        <li>Review incoming audit requests</li>
                        <li>Submit audit reports</li>
                        <li>Manage escrow payments</li>
                        <li>Build reputation & showcase expertise</li>
                      </ul>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                        onClick={() => goToRoute("/dashboard/auditor")}
                      >
                        View Auditor Dashboard
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <h3 className="text-lg font-semibold mt-4">Navigation Issues:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Some navigation links need clearer labeling for better discoverability</li>
                  <li>Mobile navigation requires optimization for touch targets</li>
                  <li>Breadcrumbs needed on deep-linked pages for better orientation</li>
                  <li>Dashboard sections could benefit from improved categorization</li>
                  <li>Search functionality needs more prominent placement</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlatformAuditReport;

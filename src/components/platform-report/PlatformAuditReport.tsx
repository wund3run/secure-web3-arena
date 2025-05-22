
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlatformReportTable } from "./PlatformReportTable";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

const PlatformAuditReport = () => {
  const [activeTab, setActiveTab] = React.useState("overview");

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Platform Audit Report</h1>
        <p className="text-muted-foreground">
          Comprehensive analysis of platform security, accessibility, and performance
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 gap-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
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
      </Tabs>
    </div>
  );
};

export default PlatformAuditReport;


import React from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { UXAuditReportView } from "@/components/reports/UXAuditReport";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

export default function PlatformReport() {
  return (
    <>
      <Helmet>
        <title>Platform UI/UX Audit | Hawkly</title>
        <meta
          name="description"
          content="Comprehensive UI/UX audit report for the Hawkly platform."
        />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main id="main-content" className="flex-grow py-8 container max-w-7xl" tabIndex={-1}>
          {/* Breadcrumb navigation */}
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <Home className="h-4 w-4 mr-1" />
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/resources">Resources</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink aria-current="page">Platform Audit</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <h1 className="text-3xl font-bold mb-8">Platform UI/UX Audit Report</h1>
          
          <div className="mb-6">
            <p className="text-muted-foreground mb-4">
              This comprehensive report analyzes the platform's user interface and experience across different stakeholder types. 
              It evaluates navigation links, accessibility standards, responsive design, and user interaction patterns.
            </p>
          </div>
          
          <UXAuditReportView />
          
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">How to Interpret This Report</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Navigation Issues</h3>
                <p className="text-muted-foreground">
                  Problems related to links, routes, and overall site navigation that could confuse users.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Accessibility Issues</h3>
                <p className="text-muted-foreground">
                  Barriers that might prevent users with disabilities from effectively using the platform.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Stakeholder Experience</h3>
                <p className="text-muted-foreground">
                  Issues specific to different user types (auditors, project owners, admins) that affect their workflows.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Responsive Design</h3>
                <p className="text-muted-foreground">
                  Problems with how the interface adapts to different screen sizes and devices.
                </p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

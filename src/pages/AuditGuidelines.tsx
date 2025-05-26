
import React from "react";
import { ContentPage } from "@/components/content/content-page";
import { Shield, CheckCircle, AlertTriangle, BookOpen } from "lucide-react";

export default function AuditGuidelines() {
  return (
    <ContentPage
      title="Security Audit Guidelines"
      description="Comprehensive guidelines for conducting security audits on the Hawkly platform"
      className="px-4 md:px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-lg p-6 mb-8 border border-border/40">
          <div className="flex items-center mb-4">
            <Shield className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Security Audit Guidelines</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Professional standards and best practices for security audits on the Hawkly platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-background rounded-lg p-6 border border-border/40">
            <BookOpen className="h-8 w-8 text-primary mb-3" />
            <h3 className="text-xl font-semibold mb-2">Methodology</h3>
            <p className="text-muted-foreground">
              Standardized audit processes and testing procedures for comprehensive security assessments.
            </p>
          </div>
          <div className="bg-background rounded-lg p-6 border border-border/40">
            <CheckCircle className="h-8 w-8 text-green-500 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Best Practices</h3>
            <p className="text-muted-foreground">
              Industry-proven techniques and recommendations for effective security auditing.
            </p>
          </div>
          <div className="bg-background rounded-lg p-6 border border-border/40">
            <AlertTriangle className="h-8 w-8 text-amber-500 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Risk Assessment</h3>
            <p className="text-muted-foreground">
              Guidelines for identifying, categorizing, and prioritizing security vulnerabilities.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Audit Process Overview</h2>
            <div className="bg-card rounded-lg p-6 border border-border/40">
              <ol className="list-decimal pl-6 space-y-3">
                <li><strong>Initial Assessment:</strong> Conduct a preliminary review to understand the project's scope, architecture, and security requirements.</li>
                <li><strong>Code Review:</strong> Perform both manual and automated reviews to identify vulnerabilities, focusing on critical areas like fund transfers, access controls, and external calls.</li>
                <li><strong>Testing:</strong> Execute functional and security tests, including edge cases and potential exploit scenarios.</li>
                <li><strong>Reporting:</strong> Submit a detailed report with findings, severity levels, remediation suggestions, and verification of fixes.</li>
                <li><strong>Remediation Support:</strong> Provide guidance on fixing issues and verify the effectiveness of implemented solutions.</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Vulnerability Categorization</h2>
            <div className="bg-card rounded-lg p-6 border border-border/40">
              <p className="mb-4">Categorize vulnerabilities by severity:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">Critical</h4>
                  <p className="text-red-700 text-sm">Issues that can result in loss of funds or system compromise</p>
                </div>
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">High</h4>
                  <p className="text-orange-700 text-sm">Issues affecting data integrity that are not immediately exploitable</p>
                </div>
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Medium</h4>
                  <p className="text-yellow-700 text-sm">Risks that arise under specific conditions</p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Low</h4>
                  <p className="text-green-700 text-sm">Minor issues or best practice recommendations</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Required Tools</h2>
            <div className="bg-card rounded-lg p-6 border border-border/40">
              <p className="mb-4">Utilize approved tools for automated analysis:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>MythX:</strong> For detecting vulnerabilities in smart contracts</li>
                <li><strong>Slither:</strong> For static analysis of Solidity code</li>
                <li><strong>Echidna:</strong> For fuzz testing</li>
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                Ensure tools are updated to their latest versions.
              </p>
            </div>
          </section>
        </div>
      </div>
    </ContentPage>
  );
}


import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Shield, 
  Clock, 
  Users,
  Download,
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AuditGuidelines() {
  const auditPhases = [
    {
      phase: "Initial Assessment",
      duration: "1-2 days",
      description: "Preliminary review to understand project scope, architecture, and security requirements",
      deliverables: ["Project scope document", "Risk assessment matrix", "Timeline estimation"]
    },
    {
      phase: "Code Review",
      duration: "3-7 days",
      description: "Manual and automated reviews to identify vulnerabilities in smart contracts",
      deliverables: ["Detailed vulnerability report", "Code quality assessment", "Gas optimization recommendations"]
    },
    {
      phase: "Testing & Validation",
      duration: "2-3 days",
      description: "Execute functional and security tests including edge cases and exploit scenarios",
      deliverables: ["Test results documentation", "Proof of concept exploits", "Security test coverage report"]
    },
    {
      phase: "Final Report",
      duration: "1-2 days",
      description: "Comprehensive audit report with findings, severity levels, and remediation guidance",
      deliverables: ["Executive summary", "Technical audit report", "Remediation roadmap"]
    }
  ];

  const severityLevels = [
    {
      level: "Critical",
      color: "destructive",
      description: "Issues that can result in loss of funds or complete system compromise",
      examples: ["Reentrancy vulnerabilities", "Authorization bypasses", "Fund drainage exploits"],
      response: "Immediate fix required before deployment"
    },
    {
      level: "High",
      color: "secondary",
      description: "Issues affecting data integrity or availability that are not immediately exploitable",
      examples: ["Access control failures", "Data validation issues", "State manipulation"],
      response: "Fix required before production release"
    },
    {
      level: "Medium",
      color: "outline",
      description: "Security risks that arise under specific conditions or configuration",
      examples: ["Timestamp dependence", "Front-running susceptibility", "Denial of service vectors"],
      response: "Should be addressed in next update cycle"
    },
    {
      level: "Low",
      color: "outline",
      description: "Minor issues, code quality improvements, or best practice recommendations",
      examples: ["Gas optimization opportunities", "Code clarity improvements", "Documentation gaps"],
      response: "Consider for future improvements"
    }
  ];

  const requiredTools = [
    { name: "MythX", description: "Automated vulnerability detection for smart contracts", category: "Automated Analysis" },
    { name: "Slither", description: "Static analysis framework for Solidity", category: "Static Analysis" },
    { name: "Echidna", description: "Property-based fuzz testing for Ethereum smart contracts", category: "Fuzz Testing" },
    { name: "Manticore", description: "Symbolic execution tool for smart contracts", category: "Symbolic Analysis" },
    { name: "Hardhat", description: "Development environment for Ethereum", category: "Testing Framework" }
  ];

  return (
    <StandardLayout 
      title="Security Audit Guidelines" 
      description="Comprehensive guidelines for conducting professional Web3 security audits"
    >
      <div className="container py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Security Audit Guidelines</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional standards and methodologies for conducting comprehensive Web3 security audits. 
            Follow these guidelines to ensure high-quality, consistent audit deliverables.
          </p>
        </div>

        {/* Audit Process */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Audit Process Overview</h2>
          <div className="space-y-6">
            {auditPhases.map((phase, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-3">
                        <Badge variant="outline">Phase {index + 1}</Badge>
                        {phase.phase}
                      </CardTitle>
                      <CardDescription className="mt-2">{phase.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{phase.duration}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-2">Key Deliverables:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {phase.deliverables.map((deliverable, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Vulnerability Classification */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Vulnerability Classification</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {severityLevels.map((severity, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Badge variant={severity.color as any}>{severity.level}</Badge>
                    <AlertTriangle className="h-5 w-5" />
                  </CardTitle>
                  <CardDescription>{severity.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Common Examples:</h4>
                      <ul className="space-y-1">
                        {severity.examples.map((example, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground">• {example}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-t pt-3">
                      <span className="text-sm font-medium">Response Timeline: </span>
                      <span className="text-sm">{severity.response}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Required Tools */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Required Audit Tools</h2>
          <Card>
            <CardHeader>
              <CardTitle>Industry-Standard Security Tools</CardTitle>
              <CardDescription>
                All auditors must utilize these approved tools for comprehensive security analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {requiredTools.map((tool, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{tool.name}</h4>
                      <Badge variant="outline" className="text-xs">{tool.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Professional Conduct */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Professional Standards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Client Communication
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Maintain clear, professional, and timely communication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Provide regular progress updates and milestone reports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Respond to client inquiries within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Document all communications and decisions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Confidentiality & Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Adhere to strict NDA and confidentiality agreements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Secure all client data and audit materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Follow responsible disclosure practices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Use platform's secure communication channels</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Download Resources */}
        <div className="text-center bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Get Started with Professional Auditing</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Download our comprehensive audit toolkit and templates to ensure your audits meet 
            industry standards and client expectations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              <Download className="mr-2 h-5 w-5" />
              Download Audit Toolkit
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/service-provider-onboarding">
                Apply to Join Network
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
}

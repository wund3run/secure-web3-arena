
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Scale, Shield, Users } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Scale className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Terms of Service</h1>
              <Badge variant="secondary" className="ml-2">Effective March 2025</Badge>
            </div>
            <p className="text-xl text-muted-foreground">
              Legal terms and conditions for using the Hawkly platform
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  1. Platform Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  Hawkly operates as a Web3 security marketplace connecting project owners with verified security auditors. 
                  By using our platform, you agree to these terms and conditions.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Platform Services Include:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Smart contract security audits</li>
                    <li>Code review services</li>
                    <li>Penetration testing</li>
                    <li>Security consulting</li>
                    <li>Escrow payment protection</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  2. User Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Project Owners must:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Provide accurate project information and requirements</li>
                    <li>Grant necessary access for audit completion</li>
                    <li>Respond to auditor communications in a timely manner</li>
                    <li>Pay agreed fees through the platform's escrow system</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Auditors must:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Maintain verified credentials and expertise</li>
                    <li>Deliver audit reports within agreed timelines</li>
                    <li>Maintain confidentiality of all project information</li>
                    <li>Provide professional and thorough security assessments</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  3. Payment and Escrow Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">
                  All payments are processed through our secure escrow system to protect both parties.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Payment Protection</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Funds held in secure escrow</li>
                      <li>• Released upon milestone completion</li>
                      <li>• Dispute resolution available</li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Refund Policy</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Full refund if audit not started</li>
                      <li>• Partial refund for incomplete work</li>
                      <li>• Dispute resolution process</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Hawkly provides a platform for security services but does not guarantee the security 
                  of any audited code or project. Security audits are assessments that may not identify 
                  all vulnerabilities.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Important:</strong> Security audits do not guarantee complete security. 
                    Project owners should implement multiple security measures and continue monitoring 
                    their systems post-audit.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm">
                    All project code and intellectual property remain the property of the project owner. 
                    Auditors may not use, copy, or distribute any project code outside the scope of the audit.
                  </p>
                  <p className="text-sm">
                    Audit reports and findings are owned by the project owner and may be shared at their discretion.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  For questions about these terms, please contact us:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Legal Inquiries</h4>
                    <p className="text-sm">legal@hawkly.com</p>
                  </div>
                  <div>
                    <h4 className="font-medium">General Support</h4>
                    <p className="text-sm">support@hawkly.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;

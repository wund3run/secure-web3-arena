
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, CreditCard, Shield, AlertTriangle } from 'lucide-react';

export function ServiceTerms() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <FileText className="h-6 w-6 text-primary" />
          <h1 className="text-4xl font-bold">Service Terms & Conditions</h1>
          <Badge variant="secondary" className="ml-2">Updated 2025</Badge>
        </div>
        <p className="text-muted-foreground">
          Comprehensive terms covering audit services, payments, and dispute resolution
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4" />
              Audit Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Professional security audit terms and quality guarantees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <CreditCard className="h-4 w-4" />
              Payment Terms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Transparent pricing, refunds, and payment protection</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4" />
              Dispute Resolution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Fair and efficient conflict resolution procedures</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4" />
              Liability & Insurance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Professional liability coverage and limitations</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              1. Security Audit Services
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Service Scope & Standards</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Audit Methodology:</strong> Industry-standard security assessment following OWASP and NIST guidelines</li>
                <li><strong>Code Coverage:</strong> Comprehensive analysis of smart contract logic, dependencies, and integrations</li>
                <li><strong>Vulnerability Classification:</strong> Critical, High, Medium, Low severity ratings with detailed remediation guidance</li>
                <li><strong>Deliverables:</strong> Executive summary, technical report, gas optimization recommendations, and verification testing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Quality Assurance</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Auditor Certification:</strong> All auditors certified through recognized security programs</li>
                <li><strong>Peer Review:</strong> Multi-auditor verification for critical findings</li>
                <li><strong>Follow-up Support:</strong> 30-day post-audit support for remediation questions</li>
                <li><strong>Re-verification:</strong> Free verification testing after fixes implementation</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              2. Payment Terms & Refund Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Payment Structure</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Upfront Payment:</strong> 50% due upon audit commencement</li>
                <li><strong>Milestone Payment:</strong> 30% due upon preliminary findings delivery</li>
                <li><strong>Final Payment:</strong> 20% due upon final report delivery</li>
                <li><strong>Accepted Methods:</strong> USD, EUR, major cryptocurrencies (ETH, BTC, USDC)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Refund Policy</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Cancellation Period:</strong> Full refund if cancelled within 24 hours of engagement</li>
                <li><strong>Partial Completion:</strong> Pro-rated refund based on work completed at cancellation time</li>
                <li><strong>Quality Guarantee:</strong> 100% refund if audit quality standards are not met</li>
                <li><strong>Processing Time:</strong> Refunds processed within 5-10 business days</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              3. Dispute Resolution Procedures
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Escalation Process</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Direct Resolution:</strong> Initial dispute handled directly with assigned auditor</li>
                <li><strong>Platform Mediation:</strong> Hawkly mediation team reviews disputes within 48 hours</li>
                <li><strong>Expert Panel:</strong> Complex technical disputes reviewed by independent security experts</li>
                <li><strong>Final Arbitration:</strong> Binding arbitration through established crypto arbitration services</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Resolution Timeline</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Response Time:</strong> Initial response within 24 hours</li>
                <li><strong>Investigation:</strong> Thorough review completed within 5 business days</li>
                <li><strong>Resolution:</strong> Final decision and remedy within 10 business days</li>
                <li><strong>Appeal Process:</strong> 30-day window for dispute appeal with additional evidence</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              4. Liability & Professional Insurance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Liability Limitations</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Service Liability:</strong> Limited to audit fees paid, maximum $500K per incident</li>
                <li><strong>Consequential Damages:</strong> No liability for indirect, incidental, or consequential damages</li>
                <li><strong>Time Limitation:</strong> Claims must be filed within 12 months of audit completion</li>
                <li><strong>Scope Limitation:</strong> Liability limited to issues within defined audit scope</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Insurance Coverage</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Minimum Coverage:</strong> $1M USD per claim, $2M annual aggregate</li>
                <li><strong>Platform Insurance:</strong> Additional platform liability coverage available</li>
                <li><strong>High-Value Audits:</strong> Enhanced coverage options for projects {">"} $100K</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              5. Compliance & Legal Framework
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Regulatory Compliance</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Data Protection:</strong> Full GDPR compliance for EU clients, CCPA compliance for California</li>
                <li><strong>Financial Regulations:</strong> AML/KYC procedures for high-value engagements</li>
                <li><strong>Export Controls:</strong> Compliance with international export control laws</li>
                <li><strong>Professional Standards:</strong> Adherence to established cybersecurity professional codes</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Governing Law</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><strong>Jurisdiction:</strong> Governed by laws of jurisdiction where client is domiciled</li>
                <li><strong>International Disputes:</strong> Singapore International Arbitration Centre (SIAC) rules</li>
                <li><strong>Contract Language:</strong> English language governs all contract interpretations</li>
                <li><strong>Amendment Process:</strong> Material changes require explicit client consent</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="bg-muted/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Important Notes</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong>Service Agreement:</strong> These terms form part of the comprehensive service agreement executed for each audit engagement.</p>
            <p><strong>Updates:</strong> Terms may be updated with 30-day notice. Existing engagements remain under original terms.</p>
            <p><strong>Contact:</strong> Questions about these terms should be directed to legal@hawkly.com</p>
            <p><strong>Effective Date:</strong> These terms are effective from January 1, 2025, and supersede all previous versions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}


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
            <CardTitle>1. Audit Service Standards</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Quality Commitments:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>All auditors are certified professionals with minimum 2+ years experience</li>
                <li>Comprehensive review following industry-standard methodologies (OWASP, NIST)</li>
                <li>Detailed reports with severity classifications and remediation guidance</li>
                <li>Post-audit support for 30 days included in all packages</li>
                <li>Re-audit at 50% discount if critical issues are found within 90 days</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Delivery Timelines:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>Basic Audits (up to 1000 LOC):</strong> 5-7 business days</li>
                <li><strong>Comprehensive Audits:</strong> 7-14 business days</li>
                <li><strong>Enterprise Audits:</strong> 14-21 business days</li>
                <li><strong>Emergency Audits:</strong> 24-48 hours (premium rates apply)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Payment Terms & Refund Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Payment Structure:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>Milestone-based payments:</strong> 50% upfront, 50% upon delivery</li>
                <li><strong>Escrow protection:</strong> Funds held securely until work completion</li>
                <li><strong>Accepted payments:</strong> Credit cards, bank transfers, crypto (BTC, ETH, USDC)</li>
                <li><strong>Platform fee:</strong> 5% of project value (split between parties)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Refund Policy:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>Full refund:</strong> If audit is not delivered within agreed timeline</li>
                <li><strong>Partial refund:</strong> Pro-rata refund for work not completed</li>
                <li><strong>Quality guarantee:</strong> Refund if audit doesn't meet minimum standards</li>
                <li><strong>Cooling-off period:</strong> 7-day cancellation for new bookings</li>
                <li><strong>Processing time:</strong> Refunds processed within 5-10 business days</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Dispute Resolution Procedures</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Resolution Process:</h4>
              <ol className="list-decimal pl-6 space-y-2 text-sm">
                <li><strong>Direct Resolution (0-48 hours):</strong> Parties attempt to resolve directly through platform messaging</li>
                <li><strong>Platform Mediation (2-7 days):</strong> Hawkly support team mediates with access to project history</li>
                <li><strong>Expert Arbitration (7-14 days):</strong> Independent blockchain security expert provides binding decision</li>
                <li><strong>Legal Arbitration (14+ days):</strong> Formal arbitration through accredited arbitration bodies</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Dispute Types Covered:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Quality of audit work and thoroughness</li>
                <li>Timeline delays and delivery issues</li>
                <li>Communication and professionalism concerns</li>
                <li>Payment and refund disputes</li>
                <li>Intellectual property and confidentiality breaches</li>
              </ul>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm">
                <strong>Jurisdiction:</strong> Disputes are governed by the laws of the jurisdiction where the client is located, 
                with international arbitration available through ICC or LCIA for cross-border disputes.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Professional Liability & Insurance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Liability Limitations:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>Audit Fee Limitation:</strong> Auditor liability limited to audit fee paid</li>
                <li><strong>Platform Liability:</strong> Hawkly liability limited to platform fees collected</li>
                <li><strong>No Consequential Damages:</strong> No liability for lost profits or business interruption</li>
                <li><strong>Discovery Period:</strong> Claims must be made within 2 years of audit completion</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Professional Insurance:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>Auditor Coverage:</strong> All auditors maintain professional indemnity insurance</li>
                <li><strong>Minimum Coverage:</strong> $1M USD per claim, $2M annual aggregate</li>
                <li><strong>Platform Insurance:</strong> Additional platform liability coverage available</li>
                <li><strong>High-Value Audits:</strong> Enhanced coverage options for projects >$100K</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Intellectual Property & Confidentiality</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Code Ownership:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Clients retain full ownership of source code and smart contracts</li>
                <li>Auditors may not use, copy, or distribute client code outside audit scope</li>
                <li>Audit reports remain confidential to commissioning party</li>
                <li>Platform retains rights to anonymized security statistics</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Non-Disclosure Requirements:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>All auditors sign comprehensive NDAs before project access</li>
                <li>Vulnerability disclosure only permitted with client authorization</li>
                <li>Audit findings remain confidential for minimum 90 days post-delivery</li>
                <li>Public disclosure requires written client consent</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Service Modifications & Termination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Service Changes:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>30 days notice for material changes to service terms</li>
                <li>Existing projects completed under original terms</li>
                <li>Price changes apply to new projects only</li>
                <li>Enhanced features may require service tier upgrades</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Account Termination:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Users may close accounts at any time with 7 days notice</li>
                <li>Active projects must be completed or transferred</li>
                <li>Data deletion follows privacy policy retention periods</li>
                <li>Platform reserves right to terminate for terms violations</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

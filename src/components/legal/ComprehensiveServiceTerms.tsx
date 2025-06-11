
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, CreditCard, AlertTriangle, FileText, Clock, Users } from 'lucide-react';

export const ComprehensiveServiceTerms = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
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

      {/* Service Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4" />
              Professional Standards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Certified auditors with proven track records</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              Quality Guarantees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">100% satisfaction guarantee with quality assurance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4" />
              24/7 Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Round-the-clock technical and customer support</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Terms */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Audit Service Standards</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Professional Qualifications:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Minimum 3 years of blockchain security experience</li>
                <li>Certification from recognized security institutions (CEH, CISSP, or equivalent)</li>
                <li>Proven track record with minimum 50 successful audits</li>
                <li>Continuous professional development and training</li>
                <li>Background verification and professional references</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Audit Process Standards:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Comprehensive methodology following OWASP and NIST frameworks</li>
                <li>Multiple review stages with senior auditor oversight</li>
                <li>Automated and manual testing approaches</li>
                <li>Detailed reporting with remediation guidance</li>
                <li>Post-audit support for 30 days</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Payment Terms & Policies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Transparent Pricing:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Fixed-price quotes with no hidden fees</li>
                <li>Milestone-based payments for larger projects</li>
                <li>Secure escrow protection for all transactions</li>
                <li>Multiple payment methods including crypto</li>
                <li>Competitive pricing with quality guarantees</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Refund Policy:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>7-day cooling-off period:</strong> Full refund for cancellations within 7 days</li>
                <li><strong>Quality guarantee:</strong> Full refund if audit doesn't meet standards</li>
                <li><strong>Milestone refunds:</strong> Pro-rata refunds for incomplete milestones</li>
                <li><strong>Delayed delivery:</strong> Automatic refund if delivery exceeds agreed timeline by 50%</li>
                <li><strong>Satisfaction guarantee:</strong> Refund if client is not satisfied with final audit</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Professional Liability & Insurance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Insurance Coverage:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>Professional Indemnity:</strong> $2M USD coverage per auditor</li>
                <li><strong>Platform Insurance:</strong> Additional $5M USD platform liability coverage</li>
                <li><strong>Cyber Liability:</strong> Comprehensive data breach and cyber attack protection</li>
                <li><strong>Enhanced Coverage:</strong> Available for high-value projects ({">"}$500K)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Liability Framework:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Direct liability limited to audit fees paid (minimum $10K coverage)</li>
                <li>No liability for losses due to client implementation decisions</li>
                <li>Force majeure protections for blockchain network issues</li>
                <li>Joint liability with insurance coverage for verified claims</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Dispute Resolution Procedures</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Escalation Process:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>Level 1:</strong> Direct resolution with project manager (24-48 hours)</li>
                <li><strong>Level 2:</strong> Mediation through certified blockchain arbitrators (7 days)</li>
                <li><strong>Level 3:</strong> Binding arbitration with industry experts (30 days)</li>
                <li><strong>Final Resort:</strong> Legal proceedings in agreed jurisdiction</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Resolution Guarantees:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>48-hour response time for all dispute notifications</li>
                <li>Free mediation services for all platform users</li>
                <li>Neutral arbitrators with blockchain security expertise</li>
                <li>Transparent process with regular status updates</li>
                <li>Enforceable decisions with platform compliance monitoring</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Quality Guarantees & Service Level Agreements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Delivery Commitments:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>Response Time:</strong> Initial response within 4 hours</li>
                <li><strong>Project Kickoff:</strong> Within 24 hours of payment confirmation</li>
                <li><strong>Progress Updates:</strong> Daily updates during active audit phases</li>
                <li><strong>Delivery Timeline:</strong> 95% on-time delivery guarantee</li>
                <li><strong>Quality Review:</strong> Independent quality assurance on all audits</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Performance Metrics:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>99.9% platform uptime guarantee</li>
                <li>Average audit completion: 7-14 days depending on scope</li>
                <li>Client satisfaction rate: Minimum 95% target</li>
                <li>Issue resolution: 98% within first contact</li>
                <li>Audit accuracy: Independent verification program</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Globe, Users, Lock, AlertTriangle, FileText } from 'lucide-react';

export const ComprehensivePrivacyPolicy = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <Badge variant="secondary" className="ml-2">GDPR & DPDP Compliant</Badge>
        </div>
        <p className="text-muted-foreground">
          Comprehensive privacy protection under EU GDPR and Indian DPDP Act 2023
        </p>
      </div>

      {/* Compliance Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Globe className="h-4 w-4" />
              EU GDPR Compliant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Full compliance with European data protection standards</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4" />
              Indian DPDP Act 2023
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Adherence to India's Digital Personal Data Protection Act</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Lock className="h-4 w-4" />
              Enterprise Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Bank-grade encryption and security measures</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Data Collection & Processing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Personal Information We Collect:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Identity data: Name, email address, professional credentials</li>
                <li>Contact data: Communication preferences, audit project details</li>
                <li>Financial data: Payment information (processed securely via third parties)</li>
                <li>Technical data: IP address, browser type, device information</li>
                <li>Usage data: Platform interactions, audit history, security preferences</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Legal Basis for Processing (GDPR Article 6):</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li><strong>Contract Performance:</strong> Processing necessary for audit services delivery</li>
                <li><strong>Legitimate Interest:</strong> Platform security, fraud prevention, service improvement</li>
                <li><strong>Consent:</strong> Marketing communications, non-essential cookies</li>
                <li><strong>Legal Obligation:</strong> Compliance with financial and security regulations</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Your Rights Under GDPR & DPDP</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">EU Users (GDPR Rights):</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Right to access your personal data</li>
                  <li>Right to rectification of inaccurate data</li>
                  <li>Right to erasure ("right to be forgotten")</li>
                  <li>Right to restrict processing</li>
                  <li>Right to data portability</li>
                  <li>Right to object to processing</li>
                  <li>Rights related to automated decision-making</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Indian Users (DPDP Rights):</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Right to information about data processing</li>
                  <li>Right to correction and erasure</li>
                  <li>Right to data portability</li>
                  <li>Right to grievance redressal</li>
                  <li>Right to nominate (for deceased users)</li>
                  <li>Right to withdraw consent</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Data Security & Protection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Technical Safeguards:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>End-to-end encryption for all sensitive data transmission</li>
                <li>AES-256 encryption for data at rest</li>
                <li>Multi-factor authentication for all user accounts</li>
                <li>Regular security audits and penetration testing</li>
                <li>Secure data centers with 24/7 monitoring</li>
                <li>Role-based access controls and data segregation</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Organizational Measures:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Data Protection Impact Assessments (DPIA) for high-risk processing</li>
                <li>Privacy by Design principles in all system development</li>
                <li>Regular staff training on data protection</li>
                <li>Incident response procedures with 72-hour breach notification</li>
                <li>Third-party vendor security assessments</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. International Data Transfers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Cross-Border Transfer Safeguards:</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Standard Contractual Clauses (SCCs) for EU data transfers</li>
                <li>Adequacy decisions where available</li>
                <li>Explicit consent for transfers to non-adequate countries</li>
                <li>Data localization compliance for Indian users</li>
                <li>Regular review of transfer mechanisms</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Contact & Grievance Redressal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Data Protection Contacts:</h4>
                <ul className="list-none space-y-1 text-sm">
                  <li><strong>EU Data Protection Officer:</strong> dpo-eu@hawkly.com</li>
                  <li><strong>Indian Data Protection Officer:</strong> dpo-india@hawkly.com</li>
                  <li><strong>General Privacy Inquiries:</strong> privacy@hawkly.com</li>
                  <li><strong>Response Time:</strong> Within 72 hours</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Supervisory Authorities:</h4>
                <ul className="list-none space-y-1 text-sm">
                  <li><strong>EU Users:</strong> Your local Data Protection Authority</li>
                  <li><strong>Indian Users:</strong> Data Protection Board of India</li>
                  <li><strong>Escalation:</strong> Right to lodge complaints with authorities</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
